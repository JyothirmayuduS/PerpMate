"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import SideNav from "@/components/layout/SideNav";
import { Timer, ArrowRight, Award, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function MockTestsHub() {
  const router = useRouter();
  const { user, mockTests, attempts } = useStore();

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <SideNav />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-6 pt-24 md:p-10 max-w-5xl mx-auto pb-24">
        
        {/* Header Section */}
        <header className="mb-10 mt-12 md:mt-0 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-outline-variant pb-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl font-extrabold text-primary mb-3 tracking-tight">
              Mock Tests
            </h2>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              Real exam simulations for top companies. Prepare strategically with timed, accurate patterns and get in-depth feedback analysis.
            </p>
          </div>
        </header>

        {/* Active Mock Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {mockTests.map((test) => {
            const hasAttempt = attempts.some(a => a.testId === test.id);
            const matchingAttempt = attempts.find(a => a.testId === test.id);

            return (
              <div 
                key={test.id}
                className={`bento-card rounded-2xl p-6 flex flex-col justify-between min-h-[220px] ${
                  test.completed ? "bg-surface-container-low/40" : ""
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-surface-container-high border border-outline-variant px-3 py-1 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider text-primary">
                      {test.company}
                    </span>
                    <span className={`font-sans text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      test.difficulty === "Easy"
                        ? "text-emerald-600 bg-emerald-50"
                        : test.difficulty === "Medium"
                        ? "text-amber-600 bg-amber-50"
                        : "text-red-600 bg-red-50"
                    }`}>
                      {test.difficulty}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-primary mb-2">
                    {test.title}
                  </h3>

                  <div className="flex items-center gap-4 text-on-surface-variant font-sans text-xs mb-6">
                    <div className="flex items-center gap-1">
                      <Timer className="w-4 h-4" />
                      <span>{test.durationMinutes} mins</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <HelpCircle className="w-4 h-4" />
                      <span>{test.totalQuestions} Questions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-secondary-container" />
                      <span>+{test.xpAward} XP</span>
                    </div>
                  </div>
                </div>

                <div>
                  {test.completed && matchingAttempt ? (
                    <div className="flex items-center justify-between p-3.5 bg-emerald-50/20 border border-emerald-500/20 rounded-xl">
                      <div className="flex items-center gap-2 text-emerald-700">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="font-sans text-xs font-bold">Best Score: {matchingAttempt.scorePercent}%</span>
                      </div>
                      <Link 
                        href={`/tests/${test.id}`}
                        className="font-sans text-[10px] font-extrabold uppercase text-primary hover:underline flex items-center gap-1"
                      >
                        Retake Test <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ) : (
                    <Link
                      href={`/tests/${test.id}`}
                      className="w-full py-3 px-4 bg-primary text-on-primary rounded-xl font-sans text-xs font-bold text-center flex items-center justify-center gap-2 hover:scale-[0.99] transition-transform shadow-sm cursor-pointer"
                    >
                      Start Test
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Previous Attempts Section */}
        <div>
          <h3 className="font-display text-2xl font-bold text-primary mb-6">
            Attempt History
          </h3>

          {attempts.length === 0 ? (
            <div className="text-center py-10 bg-surface-container-lowest border border-outline-variant rounded-2xl">
              <p className="font-sans text-xs text-on-surface-variant font-medium">You haven't completed any mock tests yet.</p>
            </div>
          ) : (
            <div className="border border-outline-variant rounded-2xl bg-surface-container-lowest overflow-hidden">
              <table className="w-full border-collapse font-sans text-xs">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant text-left text-on-surface-variant uppercase font-bold tracking-wider text-[10px]">
                    <th className="p-4">Test Title</th>
                    <th className="p-4">Score</th>
                    <th className="p-4">Accuracy</th>
                    <th className="p-4">XP Gained</th>
                    <th className="p-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {attempts.map((attempt, idx) => (
                    <tr key={idx} className="border-b border-outline-variant/40 hover:bg-surface-container-low/20 last:border-none">
                      <td className="p-4 font-bold text-primary">{attempt.testTitle}</td>
                      <td className="p-4 font-bold text-primary">{attempt.scorePercent}%</td>
                      <td className="p-4 text-on-surface-variant">
                        {attempt.correctAnswers} / {attempt.totalQuestions} Correct
                      </td>
                      <td className="p-4 text-emerald-600 font-bold">+{attempt.xpGained} XP</td>
                      <td className="p-4 text-on-surface-variant font-medium">{attempt.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
