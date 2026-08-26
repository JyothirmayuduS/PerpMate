"use client";

import { useState, useEffect, use, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useStore, MockTest } from "@/store/useStore";
import SideNav from "@/components/layout/SideNav";
import { Timer, ArrowLeft, ArrowRight, CheckCircle2, Award, Sparkles, XCircle, HelpCircle } from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";

export default function ActiveTestTaker({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const { user, mockTests, questions, addAttempt } = useStore();

  const [test, setTest] = useState<MockTest | null>(null);
  const [testState, setTestState] = useState<"instructions" | "testing" | "summary">("instructions");
  
  // Quiz variables
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, "A" | "B" | "C" | "D">>({});
  const [timeLeft, setTimeLeft] = useState(0);
  
  // Summary variables
  const [scorePercent, setScorePercent] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);

  useEffect(() => {
    if (!user) {
      router.push("/auth");
      return;
    }

    const t = mockTests.find((item) => item.id === id);
    if (t) {
      setTest(t);
      setTimeLeft(t.durationMinutes * 60);
    } else {
      router.push("/tests");
    }
  }, [id, mockTests, user, router]);
  const handleSubmitTest = useCallback(() => {
    // Calculate final scores
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOption) {
        correct++;
      }
    });

    const percent = Math.round((correct / questions.length) * 100);
    const xpGained = correct === questions.length ? test!.xpAward : Math.round((correct / questions.length) * test!.xpAward);

    setCorrectCount(correct);
    setScorePercent(percent);
    setXpEarned(xpGained);
    setTestState("summary");

    // Add attempt in store
    addAttempt({
      testId: test!.id,
      testTitle: test!.title,
      scorePercent: percent,
      correctAnswers: correct,
      totalQuestions: questions.length,
      xpGained,
      date: new Date().toISOString().split("T")[0]
    });

    // Burst confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, [questions, selectedAnswers, test, addAttempt]);


  // Timer countdown hook
  useEffect(() => {
    if (testState !== "testing") return;
    if (timeLeft <= 0) {
      handleSubmitTest();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, testState, handleSubmitTest]);

  if (!user || !test) return null;

  const formatCountdown = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleStartTest = () => {
    setTestState("testing");
  };

  const handleSelectOption = (opt: "A" | "B" | "C" | "D") => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIdx]: opt
    });
  };



  return (
    <div className="min-h-screen bg-background text-on-surface">
      <SideNav />

      {/* Main Canvas Area */}
      <main className="flex-1 ml-0 md:ml-64 flex flex-col p-6 md:p-10 min-h-screen justify-center items-center">
        
        {/* Instructions View */}
        {testState === "instructions" && (
          <div className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 flex flex-col gap-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] animate-fade-in-up">
            <div className="flex items-center gap-3 border-b border-outline-variant pb-4">
              <span className="bg-surface-container-high border border-outline-variant px-3 py-1 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider text-primary">
                {test.company}
              </span>
              <h2 className="font-display text-2xl font-bold text-primary">
                Exam Instructions
              </h2>
            </div>

            <div className="space-y-4 font-sans text-xs text-on-surface-variant leading-relaxed">
              <p className="font-bold text-primary">
                Please review the guidelines below before starting the {test.title}:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>This test contains <strong>{questions.length} questions</strong> representing core topics.</li>
                <li>You have a total of <strong>{test.durationMinutes} minutes</strong> to answer all questions.</li>
                <li>Do not reload or navigate away from this tab, as your progress is only recorded upon final submission.</li>
                <li>Correctly solving all problems rewards you with up to <strong>+{test.xpAward} XP</strong>.</li>
              </ul>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-outline-variant mt-4">
              <Link 
                href="/tests"
                className="px-5 py-2.5 border border-outline-variant rounded-lg font-sans text-[10px] font-extrabold uppercase hover:bg-background transition-colors cursor-pointer"
              >
                Cancel
              </Link>
              <button 
                onClick={handleStartTest}
                className="px-6 py-2.5 bg-primary text-on-primary rounded-lg font-sans text-[10px] font-extrabold uppercase hover:scale-98 transition-transform shadow-sm cursor-pointer"
              >
                Start Examination
              </button>
            </div>
          </div>
        )}

        {/* Active Testing View */}
        {testState === "testing" && (
          <div className="w-full max-w-4xl bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 md:p-10 flex flex-col gap-8">
            
            {/* Header info */}
            <div className="flex justify-between items-center w-full border-b border-outline-variant pb-6">
              <div className="flex items-center gap-3">
                <span className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider bg-surface-container-high px-3 py-1 rounded-full">
                  Question {currentIdx + 1} of {questions.length}
                </span>
              </div>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-background border border-red-500/20 text-red-600 rounded-full shadow-sm">
                <Timer className="w-4 h-4 animate-pulse" />
                <span className="font-sans text-xs font-extrabold tabular-nums tracking-widest">
                  {formatCountdown(timeLeft)}
                </span>
              </div>
            </div>

            {/* Question bubble navigation */}
            <div className="flex gap-2.5 flex-wrap">
              {questions.map((_, idx) => {
                const isSelected = selectedAnswers[idx] !== undefined;
                const isCurrent = currentIdx === idx;
                
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIdx(idx)}
                    className={`w-9 h-9 rounded-lg border font-sans text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                      isCurrent
                        ? "bg-primary text-on-primary border-primary"
                        : isSelected
                        ? "bg-secondary-container/20 border-secondary-container text-secondary"
                        : "bg-background border-outline-variant hover:border-primary"
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Current Question content */}
            <div className="py-2">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary leading-snug">
                {questions[currentIdx].text}
              </h2>
            </div>

            {/* MCQ grid options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {(Object.keys(questions[currentIdx].options) as Array<"A" | "B" | "C" | "D">).map((key) => {
                const optionText = questions[currentIdx].options[key];
                const isSelected = selectedAnswers[currentIdx] === key;

                return (
                  <button
                    key={key}
                    onClick={() => handleSelectOption(key)}
                    className={`group flex items-start gap-4 p-5 rounded-2xl border transition-all duration-200 text-left w-full cursor-pointer ${
                      isSelected 
                        ? "border-primary border-2 bg-surface shadow-none" 
                        : "border-outline-variant bg-surface-container-lowest hover:border-outline hover:shadow-[0_8px_20px_rgba(0,0,0,0.04)]"
                    }`}
                  >
                    <div className={`w-9 h-9 shrink-0 flex items-center justify-center rounded-lg border font-extrabold font-sans text-xs transition-colors ${
                      isSelected 
                        ? "bg-primary text-on-primary border-primary" 
                        : "bg-background border-outline-variant text-on-surface-variant group-hover:bg-primary group-hover:text-on-primary group-hover:border-primary"
                    }`}>
                      {key}
                    </div>
                    <div className="pt-1.5 font-sans text-sm text-primary font-semibold leading-relaxed">
                      {optionText}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="pt-6 border-t border-outline-variant flex items-center justify-between w-full">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(currentIdx - 1)}
                className={`flex items-center gap-2 px-5 py-3 border border-outline-variant rounded-xl font-sans text-xs font-bold hover:bg-background transition-colors ${
                  currentIdx === 0 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>

              {currentIdx === questions.length - 1 ? (
                <button
                  onClick={handleSubmitTest}
                  className="px-8 py-3.5 bg-secondary-container text-on-secondary-container rounded-xl font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:-translate-y-[1px] hover:shadow-md transition-all active:scale-95 cursor-pointer border border-secondary-container"
                >
                  <span>Finish Exam</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setCurrentIdx(currentIdx + 1)}
                  className="flex items-center gap-2 px-5 py-3 border border-outline-variant rounded-xl font-sans text-xs font-bold hover:bg-background transition-colors cursor-pointer"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        )}

        {/* Summary Results View */}
        {testState === "summary" && (
          <div className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 flex flex-col gap-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] animate-fade-in-up">
            
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                <Sparkles className="w-8 h-8 text-emerald-600 fill-emerald-100" />
              </div>
              <h2 className="font-display text-3xl font-bold text-primary mb-1">
                Scoreboard Summary
              </h2>
              <p className="font-sans text-xs text-on-surface-variant">
                You have successfully completed the {test.title}.
              </p>
            </div>

            {/* Score grids */}
            <div className="grid grid-cols-3 gap-4 border-y border-outline-variant py-6 my-2">
              <div className="text-center">
                <p className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Final Score
                </p>
                <p className="font-display text-3xl font-extrabold text-primary">
                  {scorePercent}%
                </p>
              </div>

              <div className="text-center border-x border-outline-variant/60">
                <p className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Accuracy
                </p>
                <p className="font-display text-3xl font-extrabold text-primary">
                  {correctCount} / {questions.length}
                </p>
              </div>

              <div className="text-center">
                <p className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  XP Awarded
                </p>
                <p className="font-display text-3xl font-extrabold text-emerald-600">
                  +{xpEarned}
                </p>
              </div>
            </div>

            {/* Graphical representation bar chart */}
            <div className="space-y-3">
              <h4 className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                Accuracy Breakdown
              </h4>
              <div className="w-full h-8 bg-surface-container-high rounded-lg overflow-hidden flex">
                <div 
                  className="bg-emerald-500 h-full flex items-center justify-center text-[10px] font-bold text-white transition-all duration-500" 
                  style={{ width: `${scorePercent}%` }}
                >
                  {scorePercent > 0 && `${scorePercent}% Correct`}
                </div>
                <div 
                  className="bg-red-500 h-full flex items-center justify-center text-[10px] font-bold text-white transition-all duration-500" 
                  style={{ width: `${100 - scorePercent}%` }}
                >
                  {scorePercent < 100 && `${100 - scorePercent}% Incorrect`}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-outline-variant flex justify-center mt-4">
              <Link 
                href="/tests"
                className="px-8 py-3.5 bg-primary text-on-primary rounded-xl font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:-translate-y-[1px] hover:shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>Return to Hub</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
