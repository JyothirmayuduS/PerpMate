import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`;

export async function POST(req: NextRequest) {
  try {
    const { studyYear, targetCompanies, targetRole, targetLevel } = await req.json();

    const yearDescriptions: Record<string, string> = {
      "1": "1st year college student (just started CS, needs fundamentals)",
      "2": "2nd year college student (knows basic programming, ready for data structures)",
      "3": "3rd year college student (intermediate level, starting interview prep)",
      "4": "4th year / final year student (needs intensive placement preparation, urgent timeline)",
    };

    const yearContext = yearDescriptions[studyYear] || "college student";
    const companiesText = targetCompanies?.length > 0 ? targetCompanies.join(", ") : "top tech companies";

    const prompt = `You are an expert placement preparation advisor for Indian engineering students. Generate a detailed, personalized placement preparation roadmap.

Student Profile:
- Study Year: ${yearContext}
- Target Companies: ${companiesText}
- Target Role: ${targetRole || "Software Engineer"}
- Current Level: ${targetLevel || "Intermediate"}

Generate a JSON roadmap with exactly this structure (respond with ONLY valid JSON, no markdown):
{
  "phases": [
    {
      "id": "phase-1",
      "title": "Phase title",
      "emoji": "single emoji",
      "duration": "e.g. 4 weeks",
      "description": "One line description of the phase goal",
      "status": "completed" | "active" | "upcoming",
      "topics": [
        {
          "id": "t-1-1",
          "name": "Topic name",
          "type": "dsa" | "system" | "aptitude" | "behavioural" | "project",
          "difficulty": "Easy" | "Medium" | "Hard",
          "hours": number (estimated hours),
          "resources": ["resource1", "resource2"],
          "done": false
        }
      ],
      "milestone": "What the student can do after completing this phase",
      "weeklyGoal": "Specific weekly target in hours"
    }
  ],
  "summary": {
    "totalWeeks": number,
    "totalHours": number,
    "focusAreas": ["area1", "area2", "area3"],
    "urgencyLevel": "Low" | "Medium" | "High" | "Critical",
    "aiTip": "One personalized motivational tip based on year and targets"
  }
}

Guidelines based on year:
- 1st year: Focus on fundamentals (programming basics, math, C/C++/Python) — 4-5 phases over 12-16 months
- 2nd year: Mix of DSA foundation + projects — 4 phases over 10-12 months  
- 3rd year: DSA + system design + interview practice — 5 phases over 8-10 months
- 4th year: Intensive — DSA revision + mock interviews + company-specific prep — 4 phases over 3-4 months (urgent)

Make phases realistic for a ${yearContext}. First 1-2 phases should be "completed" to show progress. The current active phase is "active". Rest are "upcoming".
Tailor the topics specifically for ${companiesText}.`;

    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4096,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", errText);
      return NextResponse.json({ error: "Gemini API failed", detail: errText }, { status: 500 });
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    // Strategy: find the first { and last } to extract JSON regardless of surrounding text
    const firstBrace = rawText.indexOf("{");
    const lastBrace = rawText.lastIndexOf("}");
    
    let jsonText = rawText;
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      jsonText = rawText.slice(firstBrace, lastBrace + 1);
    } else {
      // Fallback: strip markdown/thinking tags
      jsonText = rawText
        .replace(/<think>[\s\S]*?<\/think>/g, "")
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
    }

    let roadmap;
    try {
      roadmap = JSON.parse(jsonText);
    } catch {
      console.error("JSON parse error, raw:", jsonText);
      return NextResponse.json({ error: "Invalid JSON from AI", raw: jsonText }, { status: 500 });
    }

    return NextResponse.json({ roadmap });
  } catch (err) {
    console.error("Route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
