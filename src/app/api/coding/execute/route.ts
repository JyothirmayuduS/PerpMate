import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
  code: z.string().min(1).max(30000),
  language: z.enum(["python", "java", "cpp"]),
  functionName: z.string().regex(/^[A-Za-z_][A-Za-z0-9_]*$/),
  tests: z.array(z.object({
    label: z.string(),
    input: z.array(z.unknown()),
    expected: z.unknown(),
    hidden: z.boolean().optional(),
  })).min(1).max(100),
});

const judgeConfig = {
  python: { languageId: 71, label: "Python 3" },
  java: { languageId: 62, label: "Java" },
  cpp: { languageId: 54, label: "C++" },
} as const;

function pythonLiteral(value: unknown) {
  return JSON.stringify(value)
    .replace(/\btrue\b/g, "True")
    .replace(/\bfalse\b/g, "False")
    .replace(/\bnull\b/g, "None");
}

function buildPythonProgram(code: string, functionName: string, tests: z.infer<typeof requestSchema>["tests"]) {
  const declaredFunction = code.match(/\bdef\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(/)?.[1] || functionName;
  const encodedTests = pythonLiteral(tests);
  return `${code}

import json
import time

__tests = ${encodedTests}
__results = []
__started = time.perf_counter()
for __test in __tests:
    try:
        __actual = ${declaredFunction}(*__test["input"])
        __results.append({"label": __test["label"], "passed": __actual == __test["expected"], "expected": __test["expected"], "actual": __actual, "hidden": __test.get("hidden", False)})
    except Exception as __error:
        __results.append({"label": __test["label"], "passed": False, "expected": __test["expected"], "error": str(__error), "hidden": __test.get("hidden", False)})
print(json.dumps({"passed": sum(1 for __result in __results if __result["passed"]), "total": len(__results), "runtimeMs": max(1, round((time.perf_counter() - __started) * 1000)), "results": __results}))
`;
}

function javaLiteral(value: unknown): string {
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) {
    const nested = value.some(Array.isArray);
    const strings = value.length > 0 && value.every((item) => typeof item === "string");
    const booleans = value.length > 0 && value.every((item) => typeof item === "boolean");
    const type = nested ? "int[][]" : strings ? "String[]" : booleans ? "boolean[]" : "int[]";
    return `new ${type}{${value.map(javaLiteral).join(", ")}}`;
  }
  return "null";
}

function buildJavaProgram(code: string, functionName: string, tests: z.infer<typeof requestSchema>["tests"]) {
  const calls = tests.map((test) => `System.out.println(format(s.${functionName}(${test.input.map(javaLiteral).join(", ")})));`).join("\n");
  return `import java.util.*;
import java.lang.reflect.Array;
${code}
public class Main {
  static String format(Object value) {
    if (value == null) return "null";
    if (value instanceof String) return "\\\"" + value.toString().replace("\\\"", "\\\\\\\"") + "\\\"";
    if (value.getClass().isArray()) {
      StringBuilder out = new StringBuilder("[");
      for (int i = 0; i < Array.getLength(value); i++) { if (i > 0) out.append(","); out.append(format(Array.get(value, i))); }
      return out.append("]").toString();
    }
    return String.valueOf(value);
  }
  public static void main(String[] args) {
    Solution s = new Solution();
    ${calls}
  }
}`;
}

function buildCppProgram(code: string, functionName: string, tests: z.infer<typeof requestSchema>["tests"]) {
  const calls = tests.map((test) => `std::cout << encode(s.${functionName}(${test.input.map((value) => buildCppLiteral(value)).join(", ")})) << "\\n";`).join("\n");
  return `#include <bits/stdc++.h>
using namespace std;
string encode(const string& value) { string out = "\\\""; for (char c : value) { if (c == '\\\"') out += "\\\\\\\""; else out += c; } return out + "\\\""; }
string encode(const char* value) { return encode(string(value)); }
template <typename T> string encode(const vector<T>& values) { string out = "["; for (size_t i = 0; i < values.size(); i++) { if (i) out += ","; out += encode(values[i]); } return out + "]"; }
template <typename T> string encode(const T& value) { return to_string(value); }
string encode(bool value) { return value ? "true" : "false"; }
${code}
int main() {
  Solution s;
  ${calls}
}`;
}

function buildCppLiteral(value: unknown): string {
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) return `{${value.map(buildCppLiteral).join(", ")}}`;
  return "{}";
}

export async function POST(request: NextRequest) {
  const parsed = requestSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid code execution request" }, { status: 400 });

  const { code, language, functionName, tests } = parsed.data;
  const source = language === "python"
    ? buildPythonProgram(code, functionName, tests)
    : language === "java"
      ? buildJavaProgram(code, functionName, tests)
      : buildCppProgram(code, functionName, tests);
  const config = judgeConfig[language];

  try {
    const response = await fetch("https://ce.judge0.com/submissions?base64_encoded=false&wait=true", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language_id: config.languageId, source_code: source, cpu_time_limit: 8, wall_time_limit: 12 }),
      signal: AbortSignal.timeout(12000),
    });
    const result = await response.json() as { stdout?: string; stderr?: string; compile_output?: string; message?: string; status?: { id?: number; description?: string }; time?: string };
    if (!response.ok || !result.status) return NextResponse.json({ passed: 0, total: tests.length, runtimeMs: 0, results: [], error: result.message || "The language runner rejected this code." });
    if (result.status.id !== 3) return NextResponse.json({ passed: 0, total: tests.length, runtimeMs: 0, results: [], error: (result.compile_output || result.stderr || result.message || result.status.description || "Compilation failed").trim() });

    if (language === "python") {
      const output = (result.stdout || "").trim().split("\n").filter(Boolean).at(-1);
      if (!output) throw new Error("The program did not return test results.");
      return NextResponse.json(JSON.parse(output));
    }

    const output = (result.stdout || "").trim().split("\n").filter(Boolean);
    const results = tests.map((test, index) => {
      let actual: unknown = output[index] ?? "";
      try { actual = JSON.parse(actual as string); } catch { /* scalar compiler output */ }
      return { label: test.label, passed: JSON.stringify(actual) === JSON.stringify(test.expected), expected: test.expected, actual, hidden: test.hidden };
    });
    return NextResponse.json({ passed: results.filter((item) => item.passed).length, total: results.length, runtimeMs: Math.max(1, Math.round(Number(result.time || 0) * 1000)), results });
  } catch (error) {
    return NextResponse.json({ passed: 0, total: tests.length, runtimeMs: 0, results: [], error: error instanceof Error ? error.message : "The language runner failed." });
  }
}
