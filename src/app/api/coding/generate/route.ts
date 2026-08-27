import { randomInt, randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { codingQuestions } from "@/data/codingQuestions";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`;

const requestSchema = z.object({
  studyYear: z.coerce.number().int().min(1).max(4),
  companies: z.array(z.string().trim().min(1).max(60)).max(8).optional().default([]),
  pattern: z.string().trim().min(2).max(60).optional(),
});

const generatedCodingQuestionSchema = z.object({
  title: z.string().trim().min(5).max(90),
  summary: z.string().trim().min(10).max(160),
  difficulty: z.enum(["Foundation", "Easy", "Medium", "Hard"]),
  category: z.string().trim().min(2).max(50),
  pattern: z.string().trim().min(2).max(60),
  companies: z.array(z.string().trim().min(1).max(60)).min(1).max(8),
  durationMinutes: z.number().int().min(10).max(90),
  xp: z.number().int().min(20).max(150),
  functionName: z.string().regex(/^[A-Za-z_$][A-Za-z0-9_$]*$/),
  problemStatement: z.string().trim().min(40).max(1200),
  realWorldExample: z.string().trim().min(30).max(600),
  prerequisites: z.array(z.string().trim().min(1).max(80)).min(2).max(6),
  learningSteps: z.array(z.string().trim().min(5).max(240)).min(3).max(6),
  examples: z.array(
    z.object({
      input: z.string().min(1).max(500),
      output: z.string().min(1).max(500),
      explanation: z.string().min(5).max(500),
    }),
  ).min(1).max(3),
  constraints: z.array(z.string().trim().min(1).max(180)).min(2).max(6),
  hints: z.array(z.string().trim().min(3).max(240)).min(2).max(4),
  starterCode: z.string().min(20).max(3000),
  solutionCode: z.string().min(20).max(5000),
  tests: z.array(
    z.object({
      label: z.string().trim().min(2).max(80),
      input: z.array(z.any()).max(8),
      expected: z.any(),
      hidden: z.boolean().optional(),
    }),
  ).min(3).max(6),
});

const yearGuidance: Record<number, string> = {
  1: "Teach one programming fundamental with simple arrays, strings, loops, functions, or conditions. Avoid advanced DSA.",
  2: "Teach one foundational DSA pattern such as hashing, two pointers, stack, queue, recursion, or linked-list reasoning.",
  3: "Use a placement interview pattern such as sliding window, binary search, trees, graphs, heaps, intervals, or basic dynamic programming.",
  4: "Create a placement-ready medium or hard pattern problem that rewards optimization and clear complexity reasoning.",
};

function buildLocalCodingQuestion(
  studyYear: number,
  companies: string[],
  requestedPattern?: string,
) {
  const yearCandidates = codingQuestions.filter((question) =>
    question.studyYears.includes(studyYear),
  );
  const patternCandidates = requestedPattern
    ? yearCandidates.filter((question) => question.pattern === requestedPattern)
    : [];
  const companyCandidates = companies.length > 0
    ? yearCandidates.filter((question) =>
        question.companies.some((company) => companies.includes(company)),
      )
    : [];
  const candidates = patternCandidates.length > 0
    ? patternCandidates
    : companyCandidates.length > 0
      ? companyCandidates
      : yearCandidates;
  const template = candidates[randomInt(candidates.length)];

  return {
    ...template,
    id: `custom-${randomUUID()}`,
    studyYears: [studyYear],
    acceptance: 0,
    companies: [...new Set([...companies, ...template.companies])].slice(0, 8),
  };
}

export async function POST(request: NextRequest) {
  let fallbackRequest: z.infer<typeof requestSchema> | null = null;
  try {
    const parsedRequest = requestSchema.safeParse(await request.json());
    if (!parsedRequest.success) {
      return NextResponse.json({ error: "Invalid coding challenge request" }, { status: 400 });
    }

    fallbackRequest = parsedRequest.data;
    const { studyYear, companies, pattern } = parsedRequest.data;

    if (!GEMINI_API_KEY) {
      return NextResponse.json({
        question: buildLocalCodingQuestion(studyYear, companies, pattern),
      });
    }
    const companyText = companies.length > 0
      ? companies.join(", ")
      : "a broad mix of Indian service, consulting, product, fintech, enterprise, and global companies";

    const prompt = `You create original educational coding challenges for BTech placement preparation.

Create exactly one JavaScript function problem for a ${studyYear}${studyYear === 1 ? "st" : studyYear === 2 ? "nd" : studyYear === 3 ? "rd" : "th"}-year student.
Learning level: ${yearGuidance[studyYear]}
Company context: ${companyText}.
${pattern ? `Requested pattern: ${pattern}.` : "Choose a pattern that complements a varied practice queue."}

Rules:
- The challenge must be original and use a realistic product, campus, business, or engineering example.
- It must be solvable as one pure JavaScript function using only JSON-serializable inputs and output.
- Do not require DOM, network, Node APIs, classes, stdin, console input, or external packages.
- starterCode and solutionCode must declare the exact functionName with a standard function declaration.
- Provide 3 to 6 deterministic tests. Mark at least one test hidden.
- expected values must be valid JSON values. Do not use undefined, NaN, Infinity, Map, Set, or BigInt as inputs or outputs.
- The reference solution must pass every supplied test.
- Company names indicate skill-pattern relevance, not a claim that this exact question was asked.

Respond with ONLY valid JSON and no markdown using this shape:
{
  "title": "...",
  "summary": "...",
  "difficulty": "Foundation | Easy | Medium | Hard",
  "category": "...",
  "pattern": "...",
  "companies": ["..."],
  "durationMinutes": 30,
  "xp": 60,
  "functionName": "camelCaseName",
  "problemStatement": "...",
  "realWorldExample": "...",
  "prerequisites": ["..."],
  "learningSteps": ["..."],
  "examples": [{"input":"...","output":"...","explanation":"..."}],
  "constraints": ["..."],
  "hints": ["..."],
  "starterCode": "function camelCaseName(...) {\\n  // Write your solution here\\n}",
  "solutionCode": "function camelCaseName(...) {\\n  ...\\n}",
  "tests": [{"label":"...","input":[],"expected":null,"hidden":false}]
}`;

    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 5000,
          responseMimeType: "application/json",
        },
      }),
    });

    if (!response.ok) {
      return NextResponse.json({
        question: buildLocalCodingQuestion(studyYear, companies, pattern),
      });
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const start = rawText.indexOf("{");
    const end = rawText.lastIndexOf("}");
    if (start === -1 || end === -1) {
      return NextResponse.json({
        question: buildLocalCodingQuestion(studyYear, companies, pattern),
      });
    }

    let generated: unknown;
    try {
      generated = JSON.parse(rawText.slice(start, end + 1));
    } catch {
      return NextResponse.json({
        question: buildLocalCodingQuestion(studyYear, companies, pattern),
      });
    }

    const parsedQuestion = generatedCodingQuestionSchema.safeParse(generated);
    if (!parsedQuestion.success) {
      return NextResponse.json({
        question: buildLocalCodingQuestion(studyYear, companies, pattern),
      });
    }

    const question = parsedQuestion.data;
    if (
      !question.starterCode.includes(`function ${question.functionName}`) ||
      !question.solutionCode.includes(`function ${question.functionName}`)
    ) {
      return NextResponse.json({
        question: buildLocalCodingQuestion(studyYear, companies, pattern),
      });
    }

    return NextResponse.json({
      question: {
        id: `custom-${randomUUID()}`,
        ...question,
        studyYears: [studyYear],
        acceptance: 0,
      },
    });
  } catch (error) {
    console.error(error);
    if (fallbackRequest) {
      return NextResponse.json({
        question: buildLocalCodingQuestion(
          fallbackRequest.studyYear,
          fallbackRequest.companies,
          fallbackRequest.pattern,
        ),
      });
    }
    return NextResponse.json({ error: "Could not create a fresh coding challenge" }, { status: 500 });
  }
}
