"use client";

import { use, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Lightbulb } from "lucide-react";
import SideNav from "@/components/layout/SideNav";
import { codingModuleSlug, getCodingModule } from "@/data/codingModules";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";

export default function CodingModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const { slug } = use(params);
  const { user } = useStore();
  const learningModule = getCodingModule(slug);

  useEffect(() => {
    if (!user) router.push("/auth");
  }, [router, user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <SideNav />
      <main className="md:ml-64 min-h-screen px-6 pb-24 pt-24 md:px-10 md:pt-10">
        <div className="mx-auto max-w-4xl">
          <Link href="/coding" className="mb-8 inline-flex items-center gap-2 font-sans text-sm font-semibold text-on-surface-variant transition-colors hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Back to Coding Lab
          </Link>

          <header className="mb-8 rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm md:p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-container/15 text-secondary">
              <BookOpen className="h-6 w-6" />
            </div>
            <p className="mb-2 font-sans text-[10px] font-extrabold uppercase tracking-[0.2em] text-secondary">Coding module</p>
            <h1 className="font-display text-3xl font-extrabold text-primary md:text-4xl">{learningModule.title}</h1>
            <p className="mt-3 max-w-2xl font-sans text-sm leading-6 text-on-surface-variant">{learningModule.summary}</p>
          </header>

          <div className="grid gap-4 md:grid-cols-2">
            <section className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
              <h2 className="mb-3 font-display text-lg font-bold text-primary">Why this matters</h2>
              <p className="font-sans text-sm leading-6 text-on-surface-variant">{learningModule.whyItMatters}</p>
            </section>
            <section className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
              <h2 className="mb-3 font-display text-lg font-bold text-primary">Real-world example</h2>
              <p className="font-sans text-sm leading-6 text-on-surface-variant">{learningModule.example}</p>
            </section>
          </div>

          <section className="mt-4 rounded-2xl bg-primary p-6 text-on-primary">
            <div className="mb-3 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-secondary-container" />
              <h2 className="font-display text-lg font-bold">Remember this</h2>
            </div>
            <p className="font-sans text-sm leading-6 text-on-primary/75">{learningModule.takeaway}</p>
          </section>

          <section className="mt-6 rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
            <h2 className="mb-4 font-display text-lg font-bold text-primary">A simple learning loop</h2>
            <div className="space-y-3">
              {["Explain the idea without code.", "Trace it on the smallest useful input.", "Solve one guided problem and inspect the execution map."].map((step) => (
                <div key={step} className="flex items-center gap-3 rounded-xl bg-surface-container-low p-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-secondary" />
                  <span className="font-sans text-sm text-primary">{step}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={`/coding?search=${encodeURIComponent(learningModule.title)}`} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-sans text-xs font-bold text-on-primary transition-opacity hover:opacity-90">
              Practise {learningModule.title} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={`/coding/modules/${codingModuleSlug("Arrays")}`} className="inline-flex items-center rounded-full border border-outline-variant px-5 py-3 font-sans text-xs font-bold text-primary transition-colors hover:border-primary">
              Open fundamentals
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
