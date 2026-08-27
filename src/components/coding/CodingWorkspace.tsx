"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Code2,
  Copy,
  Eye,
  Gauge,
  Lightbulb,
  ListChecks,
  LoaderCircle,
  Play,
  RotateCcw,
  Send,
  Sparkles,
  Terminal,
  TrendingUp,
  XCircle,
  Zap,
} from "lucide-react";
import SideNav from "@/components/layout/SideNav";
import { codingQuestions, type CodingQuestion } from "@/data/codingQuestions";
import { getComplexityGuide } from "@/data/codingComplexity";
import {
  codingLanguageMeta,
  getLanguageTemplate,
  getSupportedLanguages,
  type CodingLanguage,
} from "@/data/codingLanguages";
import { runCompiledLanguageTests, runJavaScriptTests, type CodingRunResult } from "@/lib/codingRunner";
import { useStore } from "@/store/useStore";
import { createClient } from "../../../utils/supabase/client";

type WorkspaceTab = "description" | "concept" | "complexity" | "testcases" | "hints" | "solution";

const difficultyStyles = {
  Foundation: "bg-violet-50 text-violet-700 border-violet-200",
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Hard: "bg-red-50 text-red-700 border-red-200",
};

function displayValue(value: unknown) {
  if (typeof value === "string") return JSON.stringify(value);
  if (value === undefined) return "undefined";
  return JSON.stringify(value);
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export default function CodingWorkspace({ question }: { question: CodingQuestion }) {
  const router = useRouter();
  const { user, updateXP } = useStore();
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("description");
  const supportedLanguages = useMemo(() => getSupportedLanguages(question), [question]);
  const complexity = useMemo(() => getComplexityGuide(question), [question]);
  const [selectedLanguage, setSelectedLanguage] = useState<CodingLanguage>("javascript");
  const [solutionLanguage, setSolutionLanguage] = useState<CodingLanguage>("javascript");
  const activeTemplate = getLanguageTemplate(question, selectedLanguage) || {
    starterCode: question.starterCode,
    solutionCode: question.solutionCode,
  };
  const languageMeta = codingLanguageMeta[selectedLanguage];
  const solutionTemplate = getLanguageTemplate(question, solutionLanguage) || activeTemplate;
  const [code, setCode] = useState(() => activeTemplate.starterCode);
  const [isHydrated, setIsHydrated] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [runResult, setRunResult] = useState<CodingRunResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Ready to run your code");
  const [customCase, setCustomCase] = useState(() => JSON.stringify({
    input: question.tests[0]?.input || [],
    expected: question.tests[0]?.expected ?? null,
  }, null, 2));
  const [showSolution, setShowSolution] = useState(false);
  const [copied, setCopied] = useState(false);
  const [solved, setSolved] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!user) router.push("/auth");
  }, [router, user]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const savedLanguage = window.localStorage.getItem(`prepmate_language_${question.id}`) as CodingLanguage | null;
      const nextLanguage = savedLanguage && getSupportedLanguages(question).includes(savedLanguage)
        ? savedLanguage
        : "javascript";
      const nextTemplate = getLanguageTemplate(question, nextLanguage) || {
        starterCode: question.starterCode,
        solutionCode: question.solutionCode,
      };
      setSelectedLanguage(nextLanguage);
      setSolutionLanguage(nextLanguage);
      setCode(window.localStorage.getItem(`prepmate_code_${question.id}_${nextLanguage}`) || nextTemplate.starterCode);
      try {
        const solvedQuestions = JSON.parse(window.localStorage.getItem("prepmate_coding_solved") || "[]") as string[];
        setSolved(solvedQuestions.includes(question.id));
      } catch {
        setSolved(false);
      }
      setIsHydrated(true);
    }, 0);
    return () => window.clearTimeout(timeout);
  }, [question]);

  useEffect(() => {
    if (!isHydrated) return;
    const timeout = window.setTimeout(() => {
      window.localStorage.setItem(`prepmate_code_${question.id}_${selectedLanguage}`, code);
      window.localStorage.setItem(`prepmate_language_${question.id}`, selectedLanguage);
    }, 250);
    return () => window.clearTimeout(timeout);
  }, [code, isHydrated, question.id, selectedLanguage]);

  const nextQuestion = useMemo(() => {
    const currentIndex = codingQuestions.findIndex((item) => item.id === question.id);
    return codingQuestions[(currentIndex + 1) % codingQuestions.length];
  }, [question.id]);

  if (!user) return null;

  const executeTests = async (selectedTests: CodingQuestion["tests"], submit: boolean, label: string) => {
    setIsRunning(true);
    setRunResult(null);
    setStatusMessage(submit ? "Checking all hidden and public tests..." : label);

    const result = languageMeta.executable
      ? await runJavaScriptTests(code, question.functionName, selectedTests)
      : await runCompiledLanguageTests(code, selectedLanguage as Exclude<CodingLanguage, "javascript">, question.functionName, selectedTests);
    setRunResult(result);
    setIsRunning(false);

    const passedAll = result.total > 0 && result.passed === result.total && !result.error;
    setStatusMessage(
      passedAll
        ? submit
          ? "Accepted — every test passed"
          : "Sample tests passed"
        : result.error || `${result.passed} of ${result.total} tests passed`,
    );

    if (!submit || !passedAll) return;

    const solvedQuestions = JSON.parse(
      window.localStorage.getItem("prepmate_coding_solved") || "[]",
    ) as string[];
    const firstSolve = !solvedQuestions.includes(question.id);
    if (firstSolve) {
      solvedQuestions.push(question.id);
      window.localStorage.setItem("prepmate_coding_solved", JSON.stringify(solvedQuestions));
      updateXP(question.xp);
    }
    setSolved(true);

    const attempt = {
      questionId: question.id,
      questionTitle: question.title,
      status: "accepted",
      passedTests: result.passed,
      totalTests: result.total,
      runtimeMs: result.runtimeMs,
      sourceCode: code,
      language: selectedLanguage,
      createdAt: new Date().toISOString(),
    };
    const attempts = JSON.parse(
      window.localStorage.getItem("prepmate_coding_attempts") || "[]",
    ) as typeof attempt[];
    window.localStorage.setItem(
      "prepmate_coding_attempts",
      JSON.stringify([attempt, ...attempts].slice(0, 100)),
    );

    const supabase = createClient();
    if (supabase && isUuid(user.id)) {
      await supabase.from("coding_attempts").insert({
        user_id: user.id,
        question_id: question.id,
        question_title: question.title,
        study_year: Number(user.studyYear) || 3,
        language: selectedLanguage,
        status: "accepted",
        passed_tests: result.passed,
        total_tests: result.total,
        runtime_ms: result.runtimeMs,
        source_code: code,
      });
    }
  };

  const execute = (submit: boolean) => executeTests(
    submit ? question.tests : question.tests.filter((test) => !test.hidden),
    submit,
    "Running public sample tests...",
  );

  const executeCustom = () => {
    try {
      const parsed = JSON.parse(customCase) as { input?: unknown; expected?: unknown; label?: string } | Array<{ input?: unknown; expected?: unknown; label?: string }>;
      const cases = Array.isArray(parsed) ? parsed : [parsed];
      if (cases.length === 0 || cases.length > 10) throw new Error("Add between 1 and 10 custom test cases.");
      if (cases.some((test) => !Array.isArray(test.input) || !Object.prototype.hasOwnProperty.call(test, "expected"))) {
        throw new Error("Every test needs an input array and an expected value.");
      }
      return executeTests([
        ...cases.map((test, index) => ({
          label: test.label?.trim() || `Custom test ${index + 1}`,
          input: test.input as unknown[],
          expected: test.expected,
        })),
      ], false, `Running ${cases.length} custom test${cases.length === 1 ? "" : "s"}...`);
    } catch (error) {
      setRunResult({ passed: 0, total: 1, runtimeMs: 0, results: [], error: error instanceof Error ? error.message : "Use valid JSON for the custom test." });
      setStatusMessage("Custom test needs valid JSON");
    }
  };

  const handleEditorKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Tab") return;
    event.preventDefault();
    const textarea = event.currentTarget;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const nextCode = `${code.slice(0, start)}  ${code.slice(end)}`;
    setCode(nextCode);
    window.requestAnimationFrame(() => {
      textarea.selectionStart = textarea.selectionEnd = start + 2;
    });
  };

  const copySolution = async () => {
    await navigator.clipboard.writeText(solutionTemplate.solutionCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const changeLanguage = (language: CodingLanguage) => {
    const template = getLanguageTemplate(question, language);
    if (!template) return;
    window.localStorage.setItem(`prepmate_code_${question.id}_${selectedLanguage}`, code);
    setSelectedLanguage(language);
    setSolutionLanguage(language);
    setCode(
      window.localStorage.getItem(`prepmate_code_${question.id}_${language}`) ||
        template.starterCode,
    );
    setRunResult(null);
    setShowSolution(false);
    setStatusMessage("Ready to run your code");
  };

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <SideNav />

      <main className="md:ml-64 min-h-screen pb-24 md:pb-0 flex flex-col">
        <header className="h-auto min-h-16 border-b border-outline-variant bg-surface-container-lowest px-4 md:px-6 py-3 flex flex-wrap items-center gap-3 sticky top-16 md:top-0 z-30">
          <Link
            href="/coding"
            className="h-9 w-9 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-colors"
            aria-label="Back to Coding Lab"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-base md:text-lg font-bold text-primary truncate">
                {question.title}
              </h1>
              <span className={`rounded-full border px-2.5 py-1 font-sans text-[8px] font-extrabold ${difficultyStyles[question.difficulty]}`}>
                {question.difficulty}
              </span>
              {solved && (
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-sans text-[8px] font-extrabold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Solved
                </span>
              )}
            </div>
            <p className="font-sans text-[9px] text-on-surface-variant font-bold mt-0.5">
              {question.pattern} • {complexity.optimized.time} • {supportedLanguages.length} language{supportedLanguages.length === 1 ? "" : "s"} • {question.xp} XP
            </p>
          </div>
          <Link
            href={`/coding/${nextQuestion.id}`}
            className="rounded-full border border-outline-variant px-4 py-2 font-sans text-[10px] font-bold text-primary flex items-center gap-2 hover:border-primary transition-colors"
          >
            Next problem <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </header>

        <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 min-h-0">
          <section className="border-r border-outline-variant bg-surface-container-lowest xl:h-[calc(100vh-64px)] xl:overflow-y-auto">
            <nav className="sticky top-0 z-20 bg-surface-container-lowest border-b border-outline-variant px-4 md:px-6 flex overflow-x-auto hide-scrollbar">
              {(
                [
                  ["description", "Description"],
                  ["concept", "Learn concept"],
                  ["complexity", "Complexity"],
                  ["testcases", "Test cases"],
                  ["hints", "Hints"],
                  ["solution", "Solution"],
                ] as Array<[WorkspaceTab, string]>
              ).map(([tab, label]) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`shrink-0 px-4 py-4 font-sans text-[10px] font-extrabold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                    activeTab === tab
                      ? "border-secondary-container text-primary"
                      : "border-transparent text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>

            <div className="p-6 md:p-8 max-w-3xl">
              {activeTab === "description" && (
                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {question.companies.map((company) => (
                      <span key={company} className="rounded bg-surface-container px-2.5 py-1 font-sans text-[9px] font-bold text-on-surface-variant">
                        {company}
                      </span>
                    ))}
                    <span className="rounded bg-emerald-50 px-2.5 py-1 font-sans text-[9px] font-extrabold text-emerald-700 flex items-center gap-1">
                      <Gauge className="h-3 w-3" /> Time {complexity.optimized.time}
                    </span>
                    <span className="rounded bg-violet-50 px-2.5 py-1 font-sans text-[9px] font-extrabold text-violet-700">
                      Space {complexity.optimized.space}
                    </span>
                  </div>
                  <p className="font-sans text-sm text-primary leading-7 mb-8">
                    {question.problemStatement}
                  </p>

                  <div className="space-y-5 mb-8">
                    {question.examples.map((example, index) => (
                      <div key={example.input}>
                        <h2 className="font-display text-base font-bold text-primary mb-2">Example {index + 1}</h2>
                        <div className="rounded-xl bg-primary text-on-primary p-4 font-mono text-xs leading-6 overflow-x-auto">
                          <p><span className="text-on-primary/50">Input:</span> {example.input}</p>
                          <p><span className="text-on-primary/50">Output:</span> {example.output}</p>
                        </div>
                        <p className="font-sans text-xs text-on-surface-variant mt-2 leading-relaxed">
                          {example.explanation}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h2 className="font-display text-base font-bold text-primary mb-3">Constraints</h2>
                    <ul className="space-y-2">
                      {question.constraints.map((constraint) => (
                        <li key={constraint} className="font-mono text-xs text-on-surface-variant flex gap-2">
                          <span className="text-secondary-container">•</span> {constraint}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "concept" && (
                <div>
                  <div className="rounded-2xl bg-secondary-container/10 border border-secondary-container/20 p-5 mb-7">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-secondary" />
                      <h2 className="font-display text-lg font-bold text-primary">Why this matters in real products</h2>
                    </div>
                    <p className="font-sans text-sm text-on-surface-variant leading-7">
                      {question.realWorldExample}
                    </p>
                  </div>

                  <h2 className="font-display text-xl font-bold text-primary mb-4">Learn {question.pattern}</h2>
                  <div className="space-y-4 mb-8">
                    {question.learningSteps.map((step, index) => (
                      <div key={step} className="flex gap-4 rounded-2xl border border-outline-variant p-4">
                        <div className="h-8 w-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-display text-xs font-bold shrink-0">
                          {index + 1}
                        </div>
                        <p className="font-sans text-sm text-primary leading-6 pt-1">{step}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-outline-variant bg-background p-5 mb-8">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="h-4 w-4 text-secondary-container" />
                      <h3 className="font-display text-lg font-bold text-primary">Logic walkthrough</h3>
                    </div>
                    <p className="font-sans text-xs text-on-surface-variant leading-6 mb-4">
                      Follow the state change from the sample input to the expected output. Use each checkpoint to explain your code aloud.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto_1fr_auto] items-center gap-3">
                      <div className="rounded-xl bg-primary px-3 py-2 font-mono text-[10px] text-on-primary break-all">Input<br />{question.examples[0]?.input || "—"}</div>
                      {question.learningSteps.slice(0, 3).map((step, index) => (
                        <div key={step} className="contents">
                          <ArrowRight className="hidden md:block h-4 w-4 text-secondary-container" />
                          <div className="rounded-xl border border-secondary-container/30 bg-secondary-container/10 px-3 py-2 font-sans text-[10px] font-bold text-primary">
                            {index + 1}. {step}
                          </div>
                        </div>
                      ))}
                      <ArrowRight className="hidden md:block h-4 w-4 text-secondary-container" />
                      <div className="rounded-xl bg-emerald-50 px-3 py-2 font-mono text-[10px] text-emerald-800 break-all">Output<br />{question.examples[0]?.output || "—"}</div>
                    </div>
                  </div>

                  <h3 className="font-display text-base font-bold text-primary mb-3">Know these first</h3>
                  <div className="flex flex-wrap gap-2">
                    {question.prerequisites.map((item) => (
                      <span key={item} className="rounded-full border border-outline-variant bg-surface-container-low px-3 py-1.5 font-sans text-[10px] font-bold text-primary">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "complexity" && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-11 w-11 rounded-xl bg-secondary-container/10 text-secondary flex items-center justify-center">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-bold text-primary">Complexity coach</h2>
                      <p className="font-sans text-xs text-on-surface-variant">Understand what changes before memorizing Big-O.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-7">
                    <div className="rounded-2xl border border-red-200 bg-red-50/60 p-5">
                      <p className="font-sans text-[9px] font-extrabold uppercase tracking-wider text-red-700 mb-3">Brute-force thinking</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="rounded-full bg-white px-3 py-1.5 font-mono text-xs font-bold text-red-700">Time {complexity.bruteForce.time}</span>
                        <span className="rounded-full bg-white px-3 py-1.5 font-mono text-xs font-bold text-red-700">Space {complexity.bruteForce.space}</span>
                      </div>
                      <p className="font-sans text-xs text-red-900/75 leading-6">{complexity.bruteForce.explanation}</p>
                    </div>
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
                      <p className="font-sans text-[9px] font-extrabold uppercase tracking-wider text-emerald-700 mb-3">Optimized pattern</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="rounded-full bg-white px-3 py-1.5 font-mono text-xs font-bold text-emerald-700">Time {complexity.optimized.time}</span>
                        <span className="rounded-full bg-white px-3 py-1.5 font-mono text-xs font-bold text-emerald-700">Space {complexity.optimized.space}</span>
                      </div>
                      <p className="font-sans text-xs text-emerald-900/75 leading-6">{complexity.optimized.explanation}</p>
                    </div>
                  </div>

                  <h3 className="font-display text-lg font-bold text-primary mb-4">How to improve your approach</h3>
                  <div className="space-y-3 mb-7">
                    {complexity.improvementSteps.map((step, index) => (
                      <div key={step} className="rounded-2xl border border-outline-variant p-4 flex gap-3">
                        <span className="h-7 w-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-display text-[10px] font-bold shrink-0">{index + 1}</span>
                        <p className="font-sans text-sm text-primary leading-6">{step}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl bg-primary p-5 text-on-primary flex gap-3">
                    <Lightbulb className="h-5 w-5 text-secondary-container shrink-0" />
                    <div>
                      <p className="font-sans text-[9px] font-extrabold uppercase tracking-wider text-on-primary/60 mb-1">Interview explanation</p>
                      <p className="font-sans text-xs leading-6">{complexity.interviewTip}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "testcases" && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-11 w-11 rounded-xl bg-secondary-container/10 text-secondary flex items-center justify-center">
                      <ListChecks className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-bold text-primary">Judge test suite</h2>
                      <p className="font-sans text-xs text-on-surface-variant">Public examples help you start; hidden cases protect the final submission.</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {question.tests.map((test, index) => (
                      <div key={`${test.label}-${index}`} className="rounded-2xl border border-outline-variant bg-background p-4">
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="h-7 w-7 rounded-lg bg-primary text-on-primary flex items-center justify-center font-mono text-[10px] font-bold">{index + 1}</span>
                            <span className="font-sans text-sm font-bold text-primary">{test.hidden ? `Hidden test ${index + 1}` : test.label}</span>
                          </div>
                          <span className={`rounded-full px-2.5 py-1 font-sans text-[9px] font-extrabold ${test.hidden ? "bg-violet-50 text-violet-700" : "bg-emerald-50 text-emerald-700"}`}>
                            {test.hidden ? "Hidden on submit" : "Public sample"}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-[11px]">
                          <div className="rounded-xl bg-primary p-3 text-on-primary/80 overflow-x-auto"><span className="text-on-primary/45">Input</span>{"\n"}{displayValue(test.input)}</div>
                          <div className="rounded-xl bg-surface-container p-3 text-primary overflow-x-auto"><span className="text-on-surface-variant">Expected</span>{"\n"}{test.hidden ? "Hidden until submission" : displayValue(test.expected)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "hints" && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                      <Lightbulb className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-bold text-primary">Progressive hints</h2>
                      <p className="font-sans text-xs text-on-surface-variant">Open only what you need.</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {question.hints.map((hint, index) => (
                      <details key={hint} className="group rounded-2xl border border-outline-variant bg-background p-4">
                        <summary className="font-sans text-sm font-bold text-primary cursor-pointer list-none flex items-center justify-between">
                          Hint {index + 1}
                          <ChevronDown className="h-4 w-4 text-on-surface-variant transition-transform group-open:rotate-180" />
                        </summary>
                        <p className="font-sans text-sm text-on-surface-variant leading-6 mt-3 pt-3 border-t border-outline-variant">
                          {hint}
                        </p>
                      </details>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "solution" && (
                <div>
                  <div className="rounded-2xl border border-outline-variant p-6 text-center mb-6">
                    <Eye className="h-6 w-6 text-secondary-container mx-auto mb-3" />
                    <h2 className="font-display text-xl font-bold text-primary mb-2">Reference solution</h2>
                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed max-w-md mx-auto mb-5">
                      Try the hints and run your own approach first. Revealing the answer is useful for comparison, not memorization.
                    </p>
                    {!showSolution && (
                      <button
                        type="button"
                        onClick={() => setShowSolution(true)}
                        className="rounded-full bg-primary px-5 py-2.5 font-sans text-[10px] font-extrabold uppercase tracking-wider text-on-primary cursor-pointer"
                      >
                        Reveal solution
                      </button>
                    )}
                  </div>
                  {showSolution && (
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {supportedLanguages.map((language) => (
                          <button
                            key={language}
                            type="button"
                            onClick={() => setSolutionLanguage(language)}
                            className={`rounded-full border px-3 py-1.5 font-sans text-[10px] font-extrabold cursor-pointer transition-colors ${solutionLanguage === language ? "border-secondary-container bg-secondary-container text-primary" : "border-outline-variant text-on-surface-variant hover:border-primary"}`}
                          >
                            {codingLanguageMeta[language].label}
                          </button>
                        ))}
                      </div>
                      <div className="rounded-2xl bg-primary text-on-primary overflow-hidden">
                      <div className="border-b border-on-primary/10 px-4 py-3 flex items-center justify-between">
                        <span className="font-sans text-[9px] font-bold uppercase tracking-wider text-on-primary/60">{codingLanguageMeta[solutionLanguage].label} reference</span>
                        <button type="button" onClick={copySolution} className="text-on-primary/70 hover:text-on-primary flex items-center gap-1.5 font-sans text-[9px] font-bold cursor-pointer">
                          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                          {copied ? "Copied" : "Copy"}
                        </button>
                      </div>
                      <pre className="p-5 overflow-x-auto font-mono text-xs leading-6"><code>{solutionTemplate.solutionCode}</code></pre>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>

          <section className="bg-[#151515] text-white xl:h-[calc(100vh-64px)] flex flex-col min-h-[720px]">
            <div className="h-12 border-b border-white/10 px-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-[#ff5c36]" />
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-white/70">Code</span>
              </div>
              <div className="flex items-center gap-2">
                <label className="relative">
                  <span className="sr-only">Coding language</span>
                  <select
                    value={selectedLanguage}
                    onChange={(event) => changeLanguage(event.target.value as CodingLanguage)}
                    className="appearance-none rounded-lg border border-white/10 bg-white/5 py-1.5 pl-3 pr-8 font-sans text-[10px] font-bold text-white/80 outline-none cursor-pointer"
                  >
                    {supportedLanguages.map((language) => (
                      <option key={language} value={language} className="bg-[#151515] text-white">
                        {codingLanguageMeta[language].label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-white/40 pointer-events-none" />
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setCode(activeTemplate.starterCode);
                    setRunResult(null);
                    setStatusMessage("Editor reset");
                  }}
                  className="h-8 w-8 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:text-white cursor-pointer"
                  aria-label="Reset code"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="relative flex-1 min-h-[360px] overflow-hidden bg-[#151515]">
              <div className="absolute inset-y-0 left-0 w-12 border-r border-white/5 bg-[#111] overflow-hidden select-none pointer-events-none">
                <pre
                  className="absolute left-0 right-0 top-0 px-3 pt-4 text-right font-mono text-xs leading-6 text-white/25"
                  style={{ transform: `translateY(-${scrollTop}px)` }}
                >
                  {code.split("\n").map((_, index) => `${index + 1}\n`).join("")}
                </pre>
              </div>
              <textarea
                ref={editorRef}
                value={code}
                onChange={(event) => setCode(event.target.value)}
                onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
                onKeyDown={handleEditorKeyDown}
                spellCheck={false}
                aria-label={`${languageMeta.label} solution editor`}
                className="absolute inset-0 w-full h-full resize-none bg-transparent pl-16 pr-5 py-4 font-mono text-[13px] leading-6 text-[#f3f3f3] caret-[#ff5c36] outline-none overflow-auto tab-size-2"
              />
            </div>

            <div className="border-t border-white/10 bg-[#111] shrink-0">
              <div className="h-11 px-4 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2 min-w-0">
                  <Terminal className="h-4 w-4 text-[#ff5c36] shrink-0" />
                  <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-white/60 shrink-0">Test results</span>
                  <span className="font-sans text-[10px] text-white/35 truncate">{statusMessage}</span>
                </div>
                {runResult && (
                  <span className={`font-sans text-[10px] font-bold ${runResult.passed === runResult.total && !runResult.error ? "text-emerald-400" : "text-amber-400"}`}>
                    {runResult.passed}/{runResult.total} • {runResult.runtimeMs} ms
                  </span>
                )}
              </div>

              <div className="h-44 overflow-y-auto p-4">
                {!runResult && !isRunning && (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <Play className="h-5 w-5 text-white/20 mb-2" />
                    <p className="font-sans text-[10px] text-white/35">Run the sample tests when you are ready.</p>
                  </div>
                )}
                {isRunning && (
                  <div className="h-full flex items-center justify-center gap-2 text-white/50">
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    <span className="font-sans text-[10px] font-bold">Running in a secure code sandbox...</span>
                  </div>
                )}
                {runResult?.error && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-red-300 font-mono text-xs">
                    {runResult.error}
                  </div>
                )}
                {runResult && runResult.results.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {runResult.results.map((result, index) => (
                      <div key={`${result.label}-${index}`} className={`rounded-xl border p-3 ${result.passed ? "border-emerald-500/20 bg-emerald-500/5" : "border-red-500/20 bg-red-500/5"}`}>
                        <div className="flex items-center gap-2 mb-2">
                          {result.passed ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : <XCircle className="h-3.5 w-3.5 text-red-400" />}
                          <span className="font-sans text-[10px] font-bold text-white/80">{result.hidden ? `Hidden test ${index + 1}` : result.label}</span>
                        </div>
                        {!result.hidden && !result.passed && (
                          <div className="space-y-1 font-mono text-[10px] text-white/45">
                            <p>Expected: {displayValue(result.expected)}</p>
                            <p>Received: {result.error || displayValue(result.actual)}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {runResult && (
                  <div className="mt-3 rounded-xl border border-[#ff5c36]/20 bg-[#ff5c36]/5 p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Gauge className="h-3.5 w-3.5 text-[#ff8a70]" />
                      <span className="font-sans text-[10px] font-extrabold uppercase tracking-wider text-[#ffb3a3]">Complexity coach</span>
                    </div>
                    <p className="font-sans text-[10px] leading-5 text-white/65">
                      This run took {runResult.runtimeMs} ms. The expected optimized pattern is {complexity.optimized.time} time and {complexity.optimized.space} space; runtime is a measurement, while Big-O describes how the work grows as input grows.
                    </p>
                    <p className="font-sans text-[10px] leading-5 text-white/45 mt-1">Next improvement: {complexity.improvementSteps[0]}</p>
                    <button type="button" onClick={() => setActiveTab("complexity")} className="mt-2 text-[10px] font-bold text-[#ff9b84] hover:text-white cursor-pointer">Open the step-by-step complexity coach →</button>
                  </div>
                )}
              </div>

              <div className="h-16 border-t border-white/10 px-4 flex items-center justify-between gap-3">
                <div className="hidden sm:flex items-center gap-2 text-white/30 font-sans text-[9px]">
                  <><Zap className="h-3.5 w-3.5" /> 12 second safety limit • {languageMeta.label} runner</>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={executeCustom}
                    disabled={isRunning}
                    className="rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 font-sans text-[10px] font-bold text-white flex items-center gap-2 hover:bg-white/10 disabled:opacity-50 cursor-pointer"
                  >
                    <Terminal className="h-3.5 w-3.5" /> Custom
                  </button>
                  <button
                    type="button"
                    onClick={() => execute(false)}
                    disabled={isRunning}
                    className="rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 font-sans text-[10px] font-bold text-white flex items-center gap-2 hover:bg-white/10 disabled:opacity-50 cursor-pointer"
                  >
                    <Play className="h-3.5 w-3.5" /> Run
                  </button>
                  <button
                    type="button"
                    onClick={() => execute(true)}
                    disabled={isRunning}
                    className="rounded-lg bg-[#ff5c36] px-4 py-2.5 font-sans text-[10px] font-extrabold text-[#5a0f00] flex items-center gap-2 hover:brightness-105 disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" /> Submit
                  </button>
                </div>
              </div>
              <div className="border-t border-white/10 px-4 py-3">
                <label htmlFor="custom-test-case" className="font-sans text-[9px] font-extrabold uppercase tracking-wider text-white/45">Custom test case · JSON</label>
                <textarea
                  id="custom-test-case"
                  value={customCase}
                  onChange={(event) => setCustomCase(event.target.value)}
                  spellCheck={false}
                  className="mt-2 w-full min-h-20 resize-y rounded-lg border border-white/10 bg-white/5 p-2.5 font-mono text-[10px] leading-5 text-white/75 outline-none focus:border-[#ff5c36]"
                  aria-label="Custom test case JSON"
                />
                <p className="mt-1 font-sans text-[9px] text-white/30">Use one object or an array of objects: <span className="font-mono">{"{ \"input\": [...], \"expected\": ... }"}</span>. Add a <span className="font-mono">label</span> optionally.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
