import { randomInt } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { allAptitudeQuestions, aptitudeSections } from "@/data/aptitudeData";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`;

const PREREQ_COUNT: Record<string, number> = {
  Easy: 1,
  Medium: 3,
  Difficult: 4,
  Hard: 5,
};

const requestSchema = z.object({
  topic: z.string().trim().min(2).max(80),
  difficulty: z.enum(["Easy", "Medium", "Difficult", "Hard"]),
  companies: z.array(z.string().trim().min(1).max(60)).max(8).optional().default([]),
});

const generatedQuestionSchema = z.object({
  topic: z.string().min(1),
  difficulty: z.enum(["Easy", "Medium", "Difficult", "Hard"]),
  difficulty_level: z.number().int().min(1).max(4),
  question: z.string().min(20),
  options: z.object({
    A: z.string().min(1),
    B: z.string().min(1),
    C: z.string().min(1),
    D: z.string().min(1),
  }),
  correctOption: z.enum(["A", "B", "C", "D"]),
  explanation: z.string().min(10),
  company_tag: z.array(z.string()).default([]),
  prerequisites: z.array(
    z.object({
      title: z.string().min(1),
      summary: z.string().min(1),
      slug: z.string().min(1),
    }),
  ),
  simple_explanation: z.string().optional(),
  formulas: z.array(z.string()).optional(),
  tips: z.string().optional(),
});

function buildLocalQuestion(
  topic: string,
  difficulty: "Easy" | "Medium" | "Difficult" | "Hard",
  companies: string[],
) {
  const matchingTopic = aptitudeSections
    .flatMap((section) => section.topics)
    .find((item) => item.name.toLowerCase() === topic.toLowerCase());
  const topicQuestions = matchingTopic?.questions || allAptitudeQuestions;
  const sameDifficulty = topicQuestions.filter((question) => question.difficulty === difficulty);
  const candidates = sameDifficulty.length > 0 ? sameDifficulty : topicQuestions;
  const template = candidates[randomInt(candidates.length)];
  const difficultyLevel = { Easy: 1, Medium: 2, Difficult: 3, Hard: 4 }[difficulty];

  return generatedQuestionSchema.parse({
    topic: template.topic || topic,
    difficulty,
    difficulty_level: difficultyLevel,
    question: template.text,
    options: template.options,
    correctOption: template.correctOption,
    explanation: template.explanation,
    company_tag: companies.length > 0 ? companies : template.company_tag || matchingTopic?.company_focus || [],
    prerequisites: template.prerequisites || [
      {
        title: matchingTopic?.name || topic,
        summary: "Review the core rule, identify the known values, and solve step by step.",
        slug: (matchingTopic?.id || topic).toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      },
    ],
    simple_explanation: template.simple_explanation,
    formulas: template.formulas,
    tips: template.tips,
  });
}

export async function POST(req: NextRequest) {
  let fallbackRequest: z.infer<typeof requestSchema> | null = null;
  try {
    const parsedRequest = requestSchema.safeParse(await req.json());
    if (!parsedRequest.success) {
      return NextResponse.json(
        { error: "Invalid question request", details: parsedRequest.error.flatten() },
        { status: 400 },
      );
    }

    fallbackRequest = parsedRequest.data;
    const { topic, difficulty, companies } = parsedRequest.data;

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ question: buildLocalQuestion(topic, difficulty, companies) });
    }

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
      return NextResponse.json({ question: buildLocalQuestion(topic, difficulty, companies) });
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    // Extract JSON between first { and last }
    const start = rawText.indexOf("{");
    const end = rawText.lastIndexOf("}");
    if (start === -1 || end === -1) {
      return NextResponse.json({ question: buildLocalQuestion(topic, difficulty, companies) });
    }

    const jsonText = rawText.slice(start, end + 1);
    let question: unknown;
    try {
      question = JSON.parse(jsonText);
    } catch {
      return NextResponse.json({ question: buildLocalQuestion(topic, difficulty, companies) });
    }

    const parsedQuestion = generatedQuestionSchema.safeParse(question);
    if (!parsedQuestion.success) {
      return NextResponse.json({ question: buildLocalQuestion(topic, difficulty, companies) });
    }

    return NextResponse.json({ question: parsedQuestion.data });
  } catch (err) {
    console.error(err);
    if (fallbackRequest) {
      return NextResponse.json({
        question: buildLocalQuestion(
          fallbackRequest.topic,
          fallbackRequest.difficulty,
          fallbackRequest.companies,
        ),
      });
    }
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
