"use client";

import { use, useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import CodingWorkspace from "@/components/coding/CodingWorkspace";
import SideNav from "@/components/layout/SideNav";
import type { CodingQuestion } from "@/data/codingQuestions";

const emptySubscribe = () => () => {};

export default function CustomCodingQuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const savedQuestion = useSyncExternalStore(
    emptySubscribe,
    () => window.localStorage.getItem(`prepmate_coding_custom_${id}`),
    () => null,
  );
  const question = useMemo(() => {
    if (!savedQuestion) return null;
    try {
      const parsed = JSON.parse(savedQuestion) as CodingQuestion;
      return parsed.id === id && parsed.functionName && parsed.starterCode ? parsed : null;
    } catch {
      return null;
    }
  }, [id, savedQuestion]);

  if (question) return <CodingWorkspace key={question.id} question={question} />;

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <SideNav />
      <main className="md:ml-64 min-h-screen flex items-center justify-center p-6">
        <div className="bento-card rounded-3xl p-8 md:p-10 max-w-lg text-center">
          <div className="h-14 w-14 rounded-2xl bg-secondary-container/10 text-secondary mx-auto mb-5 flex items-center justify-center">
            <Sparkles className="h-6 w-6" />
          </div>
          <h1 className="font-display text-2xl font-extrabold text-primary mb-2">
            This fresh challenge is not on this device
          </h1>
          <p className="font-sans text-xs text-on-surface-variant leading-relaxed mb-6">
            Generated challenges are saved privately in the browser that created them. Build another one from the Coding Lab.
          </p>
          <Link href="/coding" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-sans text-[10px] font-extrabold text-on-primary">
            <ArrowLeft className="h-4 w-4" /> Back to Coding Lab
          </Link>
        </div>
      </main>
    </div>
  );
}
