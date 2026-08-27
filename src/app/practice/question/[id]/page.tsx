"use client";

import { useState, useEffect, use, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useStore, Question, Prerequisite } from "@/store/useStore";
import SideNav from "@/components/layout/SideNav";
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle, Clock, ListOrdered,
  BookOpen, Info, ChevronDown, ChevronUp, ExternalLink, X,
  Sparkles, RefreshCw, AlertTriangle, Building2, Flame,
  Lightbulb, Calculator, Brain
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import MathFormula from "@/components/MathFormula";

// ─── Difficulty Config ─────────────────────────────────────────────────────────

const diffConfig: Record<string, { color: string; bg: string; border: string; dot: string; label: string }> = {
  Easy:     { color: "text-emerald-700", bg: "bg-emerald-50",  border: "border-emerald-200", dot: "bg-emerald-500",  label: "🟢 Easy" },
  Medium:   { color: "text-amber-700",   bg: "bg-amber-50",    border: "border-amber-200",   dot: "bg-amber-400",    label: "🟡 Medium" },
  Difficult:{ color: "text-orange-700",  bg: "bg-orange-50",   border: "border-orange-200",  dot: "bg-orange-500",   label: "🟠 Difficult" },
  Hard:     { color: "text-red-700",     bg: "bg-red-50",      border: "border-red-200",     dot: "bg-red-500",      label: "🔴 Hard" },
};

// ─── Prerequisites Panel ───────────────────────────────────────────────────────

function PrerequisitesPanel({
  prerequisites,
  isMobileSheet = false,
  onClose,
}: {
  prerequisites: Prerequisite[];
  isMobileSheet?: boolean;
  onClose?: () => void;
}) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggleExpand = (slug: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });
  };

  const toggleCheck = (slug: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });
  };

  const allChecked = checked.size === prerequisites.length && prerequisites.length > 0;

  return (
    <div className={`flex flex-col gap-3 ${isMobileSheet ? "p-4" : ""}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary" />
          <h3 className="font-display text-sm font-extrabold text-primary">📚 Basics You Need</h3>
          <div className="relative group">
            <Info className="w-3.5 h-3.5 text-on-surface-variant cursor-help" />
            <div className="absolute left-0 top-5 bg-surface-container border border-outline-variant rounded-xl px-3 py-2 w-52 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              <p className="font-sans text-[10px] text-on-surface-variant leading-relaxed">
                These are foundational concepts you should know before attempting this question. The harder the question, the longer this list.
              </p>
            </div>
          </div>
        </div>
        {isMobileSheet && onClose && (
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-surface-container transition-colors cursor-pointer">
            <X className="w-4 h-4 text-on-surface-variant" />
          </button>
        )}
      </div>

      {/* Concept rows */}
      <div className="space-y-2">
        {prerequisites.map((prereq, i) => {
          const isExp = expanded.has(prereq.slug);
          const isDone = checked.has(prereq.slug);

          return (
            <div
              key={prereq.slug}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isDone
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-outline-variant/60 bg-surface-container-lowest"
              }`}
            >
              {/* Row header */}
              <button
                onClick={() => toggleExpand(prereq.slug)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-left cursor-pointer hover:bg-surface-container-low/50 transition-colors"
              >
                {/* Index bubble */}
                <span className={`w-5 h-5 rounded-full text-[9px] font-extrabold flex items-center justify-center shrink-0 ${
                  isDone ? "bg-emerald-500 text-white" : "bg-surface-container border border-outline-variant text-on-surface-variant"
                }`}>
                  {isDone ? "✓" : i + 1}
                </span>

                <span className={`flex-1 font-sans text-xs font-bold transition-colors ${
                  isDone ? "text-emerald-700 line-through" : "text-primary"
                }`}>
                  {prereq.title}
                </span>

                {isExp
                  ? <ChevronUp className="w-3.5 h-3.5 text-on-surface-variant shrink-0" />
                  : <ChevronDown className="w-3.5 h-3.5 text-on-surface-variant shrink-0" />
                }
              </button>

              {/* Expanded body */}
              {isExp && (
                <div className="px-3 pb-3 space-y-2">
                  {/* Formula summary */}
                  <div className="bg-primary/5 border border-primary/15 rounded-lg px-3 py-2">
                    <p className="font-sans text-[10px] font-semibold text-primary/80 leading-relaxed">
                      {prereq.summary}
                    </p>
                  </div>

                  {/* Action row */}
                  <div className="flex items-center justify-end">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleCheck(prereq.slug)}
                      className={`flex items-center gap-1.5 text-[10px] font-extrabold px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                        isDone
                          ? "bg-emerald-500 text-white border-emerald-500"
                          : "border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
                      }`}
                    >
                      {isDone ? (
                        <><CheckCircle2 className="w-3 h-3" /> I know this ✓</>
                      ) : (
                        <>○ I know this</>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* All-checked CTA */}
      <AnimatePresence>
        {allChecked && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            className="bg-emerald-500 text-white rounded-xl p-3 flex items-center gap-2.5 shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4 fill-white shrink-0" />
            <div>
              <p className="font-sans text-[10px] font-extrabold uppercase tracking-wider">You're ready!</p>
              <p className="font-sans text-[10px] font-semibold opacity-90">All basics covered — solve now 🚀</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function QuestionPlayer({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const { user, questions, updateXP, updateProgress, logPracticeAttempt } = useStore();

  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<"A" | "B" | "C" | "D" | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    if (!question || submitted) return;
    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [question, submitted]);
  const [time, setTime] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Mobile bottom sheet state
  const [showMobileSheet, setShowMobileSheet] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!user) { router.push("/auth"); return; }
    const q = questions.find((item) => item.id === id);
    if (q) {
      setQuestion(q);
    } else {
      router.push("/practice");
    }
  }, [id, questions, user, router, mounted]);

  useEffect(() => {
    if (submitted) return;
    const interval = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [submitted]);



  if (!mounted || !user || !question) return null;

  const formatTimer = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const handleSelectOption = (opt: "A" | "B" | "C" | "D") => {
    if (submitted) return;
    setSelectedOption(opt);
  };

  const handleSubmit = () => {
    if (!selectedOption || submitted) return;
    const correct = selectedOption === question.correctOption;
    setIsCorrect(correct);
    setSubmitted(true);

    logPracticeAttempt({
      questionId: question.id,
      topicId: question.topic,
      timeSpentSeconds: timeSpent,
      isCorrect: correct,
      timestamp: new Date().toISOString()
    });

    if (correct) {
      updateXP(20);
      updateProgress(question.topic, 100);
    } else {
      updateProgress(question.topic, 40);
    }
  };

  const sectionQuestions = questions.filter(q => q.topic === question.topic);
  const questionIdx = sectionQuestions.findIndex((q) => q.id === id);
  const totalQ = sectionQuestions.length;
  
  const hasNextQuestion = questionIdx !== -1 && questionIdx < totalQ - 1;
  const nextQuestionId = hasNextQuestion ? sectionQuestions[questionIdx + 1].id : null;

  const diff = question.difficulty;
  const dConf = diff ? diffConfig[diff] : null;
  const hasPrereqs = (question.prerequisites?.length ?? 0) > 0;

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <SideNav />

      <main className="ml-0 md:ml-64 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 mt-20 md:mt-0">



          {/* ── Two-Column Layout ── */}
          <div className="flex flex-col lg:flex-row gap-6 items-start">

            {/* ═══ LEFT COLUMN — 60% — Question ═══ */}
            <div className="flex-[3] min-w-0 w-full">
              <div className="bg-surface-container-lowest border border-outline-variant rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 md:p-8 flex flex-col gap-6 animate-fade-in-up">

                {/* Top Bar */}
                <div className="flex justify-between items-center border-b border-outline-variant/50 pb-5">
                  <div className="flex items-center gap-3">
                    <Link
                      href="/practice"
                      className="p-2 border border-outline-variant rounded-full hover:bg-surface-container-high transition-colors cursor-pointer text-on-surface-variant hover:text-primary"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <div className="flex items-center gap-2">
                      <ListOrdered className="w-5 h-5 text-on-surface-variant" />
                      <h2 className="font-display text-base font-bold text-primary">
                        Q {questionIdx !== -1 ? questionIdx + 1 : 1} of {totalQ}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Difficulty Badge */}
                    {dConf && (
                      <div className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-extrabold ${dConf.bg} ${dConf.color} ${dConf.border}`}>
                        <span className={`w-2 h-2 rounded-full ${dConf.dot}`} />
                        {diff}
                      </div>
                    )}

                    {/* Company Tags */}
                    {question.company_tag && question.company_tag.length > 0 && (
                      <div className="hidden md:flex items-center gap-1">
                        {question.company_tag.slice(0, 2).map(c => (
                          <span key={c} className="flex items-center gap-1 px-2.5 py-1 border border-outline-variant rounded-full text-[9px] font-extrabold text-on-surface-variant bg-surface-container">
                            <Building2 className="w-2.5 h-2.5" />
                            {c}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Timer */}
                    <div className="flex items-center gap-2 px-4 py-2 bg-surface border border-outline-variant rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                      <Clock className="w-4 h-4 text-on-surface-variant" />
                      <span className="font-sans text-xs text-primary font-bold tracking-widest tabular-nums">
                        {formatTimer(time)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile tags row */}
                <div className="flex md:hidden items-center flex-wrap gap-2">
                  {dConf && (
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-extrabold ${dConf.bg} ${dConf.color} ${dConf.border}`}>
                      <span className={`w-2 h-2 rounded-full ${dConf.dot}`} />
                      {diff}
                    </div>
                  )}
                  {question.company_tag?.slice(0, 2).map(c => (
                    <span key={c} className="flex items-center gap-1 px-2.5 py-1 border border-outline-variant rounded-full text-[9px] font-extrabold text-on-surface-variant bg-surface-container">
                      <Building2 className="w-2.5 h-2.5" />{c}
                    </span>
                  ))}
                </div>

                {/* Mobile Prerequisites trigger */}
                {hasPrereqs && (
                  <button
                    onClick={() => setShowMobileSheet(true)}
                    className="lg:hidden flex items-center gap-2 self-start px-4 py-2 bg-primary/10 border border-primary/20 text-primary rounded-full font-sans text-xs font-extrabold cursor-pointer hover:bg-primary/15 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Need basics? ({question.prerequisites?.length} concepts)
                  </button>
                )}

                <div className="py-1">
                  <p className="font-display text-[22px] md:text-[26px] text-on-surface leading-snug font-bold">
                    {question.text}
                  </p>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {(Object.keys(question.options) as Array<"A" | "B" | "C" | "D">).map((key) => {
                    const text = question.options[key];
                    const isSelected = selectedOption === key;

                    let cardStyles = "border-outline-variant bg-surface-container-lowest hover:border-outline hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:-translate-y-[2px]";
                    let letterStyles = "bg-surface border-outline-variant text-on-surface-variant group-hover:bg-primary group-hover:text-on-primary group-hover:border-primary";
                    let hasLeftLine = false;
                    let lineColor = "";

                    if (isSelected && !submitted) {
                      cardStyles = "border-2 border-primary bg-surface shadow-none";
                      letterStyles = "bg-primary text-on-primary border-primary";
                    }

                    if (submitted) {
                      if (key === question.correctOption) {
                        cardStyles = "border-2 border-[#009668] bg-[#009668]/10 shadow-none cursor-default relative overflow-hidden";
                        letterStyles = "bg-[#009668] text-white border-[#009668]";
                        hasLeftLine = true;
                        lineColor = "bg-[#009668]";
                      } else if (isSelected && !isCorrect) {
                        cardStyles = "border-2 border-error bg-error-container/20 shadow-none cursor-default relative overflow-hidden";
                        letterStyles = "bg-error text-on-error border-error";
                        hasLeftLine = true;
                        lineColor = "bg-error";
                      } else {
                        cardStyles = "opacity-50 border-outline-variant cursor-default";
                      }
                    }

                    return (
                      <button
                        key={key}
                        disabled={submitted}
                        onClick={() => handleSelectOption(key)}
                        className={`group flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 text-left w-full ${cardStyles}`}
                      >
                        {hasLeftLine && <div className={`absolute left-0 top-0 bottom-0 w-1 ${lineColor}`} />}
                        <div className={`w-9 h-9 shrink-0 flex items-center justify-center rounded-lg border font-bold font-sans text-xs transition-colors ${letterStyles}`}>
                          {key}
                        </div>
                        <div className="pt-1.5 font-sans text-sm text-on-surface font-medium leading-relaxed">
                          {text}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Panel */}
                {submitted && (
                  <div className={`p-5 rounded-xl border flex flex-col gap-4 animate-fade-in-up ${
                    isCorrect
                      ? "border-[#009668] bg-[#009668]/10"
                      : "border-error bg-error-container/30"
                  }`}>
                    <div className="flex items-center gap-3">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-6 h-6 text-[#009668] fill-white" />
                          <h3 className="font-display text-lg font-bold text-[#009668]">Correct Answer! (+20 XP)</h3>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-6 h-6 text-error fill-white" />
                          <h3 className="font-display text-lg font-bold text-error">Incorrect — Review the explanation</h3>
                        </>
                      )}
                    </div>

                    <div className="bg-surface-container-lowest text-primary rounded-xl p-5 border border-outline-variant/60 shadow-sm space-y-4">
                      
                      {/* Simple Explanation / Concept */}
                      {question.simple_explanation && (
                        <div>
                          <h4 className="font-sans text-[10px] font-bold text-on-surface-variant mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
                            <Lightbulb className="w-4 h-4 text-primary" /> The Concept
                          </h4>
                          <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                            {question.simple_explanation}
                          </p>
                        </div>
                      )}

                      {/* Formulas Used */}
                      {question.formulas && question.formulas.length > 0 && (
                        <div>
                          <h4 className="font-sans text-[10px] font-bold text-on-surface-variant mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
                            <Calculator className="w-4 h-4 text-primary" /> Formulas Used
                          </h4>
                          <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 space-y-2">
                            {question.formulas.map((formula, idx) => (
                              <div key={idx} className="font-mono text-[11px] font-semibold text-primary/90">
                                {formula}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Step-by-Step Solution (Math) */}
                      <div>
                        <h4 className="font-sans text-[10px] font-bold text-on-surface-variant mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
                          <ListOrdered className="w-4 h-4 text-primary" /> Step-by-Step Solution
                        </h4>
                        <div className="font-sans text-xs text-on-surface-variant leading-relaxed whitespace-pre-wrap overflow-x-auto pb-2">
                          {question.explanation.includes('\\') ? (
                            <MathFormula block={true} math={question.explanation} />
                          ) : (
                            <span>{question.explanation}</span>
                          )}
                        </div>
                      </div>

                      {/* Pro Tips */}
                      {question.tips && (
                        <div className="bg-amber-50 border border-amber-200/60 rounded-lg p-3">
                          <h4 className="font-sans text-[10px] font-bold text-amber-700 mb-1 uppercase tracking-wide flex items-center gap-1.5">
                            <Brain className="w-4 h-4 text-amber-600" /> Pro Tip
                          </h4>
                          <p className="font-sans text-xs text-amber-800/90 leading-relaxed font-medium">
                            {question.tips}
                          </p>
                        </div>
                      )}

                    </div>
                  </div>
                )}

                {/* Bottom Action Bar */}
                <div className="pt-4 border-t border-outline-variant/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {[0,1,2,3].map(i => (
                      <div key={i} className={`w-2.5 h-2.5 rounded-full ${questionIdx >= i ? "bg-primary" : "bg-outline-variant"}`} />
                    ))}
                    <span className="ml-1.5 font-sans text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">
                      {questionIdx !== -1 ? questionIdx + 1 : "1"} of {totalQ}
                    </span>
                  </div>

                  {!submitted ? (
                    <button
                      onClick={handleSubmit}
                      disabled={!selectedOption}
                      className={`px-7 py-3 bg-primary text-on-primary rounded-xl font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:scale-[0.98] transition-transform active:scale-95 ${
                        !selectedOption ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                      }`}
                    >
                      <span>Submit Answer</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <Link
                      href={hasNextQuestion ? `/practice/question/${nextQuestionId}` : "/practice"}
                      className="px-7 py-3 bg-primary text-on-primary rounded-xl font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:scale-[0.98] transition-transform active:scale-95 cursor-pointer"
                    >
                      <span>{hasNextQuestion ? "Next Question" : "Back to Hub"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* ═══ RIGHT COLUMN — 40% — Prerequisites Panel (Desktop) ═══ */}
            <div className="hidden lg:block flex-[2] min-w-0 w-full">
              <div className="sticky top-24">
                {hasPrereqs ? (
                  <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 shadow-sm">
                    <PrerequisitesPanel prerequisites={question.prerequisites!} />
                  </div>
                ) : (
                  <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 flex flex-col items-center gap-3 text-center">
                    <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center">
                      <Flame className="w-5 h-5 text-emerald-600 fill-emerald-300" />
                    </div>
                    <p className="font-display text-sm font-bold text-primary">No prerequisites</p>
                    <p className="font-sans text-[10px] text-on-surface-variant leading-relaxed">
                      This is a foundational concept — you should be able to jump straight in!
                    </p>
                  </div>
                )}

                {/* Difficulty guide legend */}
                <div className="mt-4 bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-4">
                  <p className="font-sans text-[9px] font-extrabold text-on-surface-variant uppercase tracking-wider mb-3">Difficulty Guide</p>
                  <div className="space-y-1.5">
                    {Object.entries(diffConfig).map(([level, conf]) => (
                      <div key={level} className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${conf.dot}`} />
                        <span className={`text-[10px] font-bold ${conf.color}`}>{level}</span>
                        <span className="text-[9px] text-on-surface-variant font-semibold">·</span>
                        <span className="text-[9px] text-on-surface-variant font-semibold">
                          {level === "Easy" ? "Direct formula" : level === "Medium" ? "1-2 twists" : level === "Difficult" ? "Multi-step" : "Tricky + shortcuts"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>{/* end two-column */}
        </div>
      </main>

      {/* ═══ MOBILE BOTTOM SHEET ═══ */}
      <AnimatePresence>
        {showMobileSheet && hasPrereqs && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileSheet(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />

            {/* Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-surface-container-lowest rounded-t-3xl shadow-2xl border-t border-outline-variant max-h-[80vh] overflow-y-auto"
            >
              {/* Handle bar */}
              <div className="sticky top-0 bg-surface-container-lowest border-b border-outline-variant/50 px-4 pt-3 pb-2">
                <div className="w-10 h-1 bg-outline-variant rounded-full mx-auto mb-3" />
              </div>

              <div className="p-4 pb-safe">
                <PrerequisitesPanel
                  prerequisites={question.prerequisites!}
                  isMobileSheet
                  onClose={() => setShowMobileSheet(false)}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
