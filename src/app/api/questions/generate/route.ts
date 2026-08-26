import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`;

const PREREQ_COUNT: Record<string, number> = {
  Easy: 1,
  Medium: 3,
  Difficult: 4,
  Hard: 5,
};

export async function POST(req: NextRequest) {
  try {
    const { topic, difficulty, companies } = await req.json();

    const prereqCount = PREREQ_COUNT[difficulty] ?? 2;
    const companiesText = companies?.length > 0 ? companies.join(", ") : "TCS, Infosys, Wipro";

    const prompt = `You are an expert aptitude question setter for Indian placement exams.

Generate one placement aptitude question at [${difficulty}] difficulty level on the topic [${topic}], specifically tailored for ${companiesText} placement exams.

Difficulty guide:
- Easy: Direct formula application, 1 basic concept needed
- Medium: 1-2 twists on formula, 2-3 concepts needed
- Difficult: Multi-step, combined concepts, 3-4 concepts needed
- Hard: Tricky/optimal thinking, 4+ concepts + shortcuts needed

IMPORTANT: Generate exactly ${prereqCount} prerequisites (foundational concepts the student must know BEFORE solving).

Respond with ONLY valid JSON (no markdown, no explanation outside JSON):
{
  "topic": "${topic}",
  "difficulty": "${difficulty}",
  "difficulty_level": ${Object.keys(PREREQ_COUNT).indexOf(difficulty) + 1},
  "question": "Full question text here (include all numbers, units, context)",
  "options": {
    "A": "option A text",
    "B": "option B text",
    "C": "option C text",
    "D": "option D text"
  },
  "correctOption": "A",
  "explanation": "Step-by-step solution showing all working. Use \\n for newlines.",
  "company_tag": ${JSON.stringify(companies || ["TCS"])},
  "prerequisites": [
    { "title": "Concept Name", "summary": "One-line rule or formula (max 15 words)", "slug": "concept-slug" }
  ]
}`;

    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.8, maxOutputTokens: 2048 },
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: "Gemini error", detail: err }, { status: 500 });
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    // Extract JSON between first { and last }
    const start = rawText.indexOf("{");
    const end = rawText.lastIndexOf("}");
    if (start === -1 || end === -1) {
      return NextResponse.json({ error: "No JSON found", raw: rawText.slice(0, 300) }, { status: 500 });
    }

    const jsonText = rawText.slice(start, end + 1);
    let question;
    try {
      question = JSON.parse(jsonText);
    } catch {
      return NextResponse.json({ error: "Parse failed", raw: jsonText.slice(0, 300) }, { status: 500 });
    }

    return NextResponse.json({ question });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
