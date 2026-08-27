"use client";

import { Suspense, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Clock3,
  Code2,
  Filter,
  Gauge,
  Languages,
  Layers3,
  LoaderCircle,
  RefreshCw,
  Search,
  Sparkles,
} from "lucide-react";
import SideNav from "@/components/layout/SideNav";
import { codingPatterns, codingQuestions, yearLearningPaths, type CodingQuestion } from "@/data/codingQuestions";
import { getComplexityGuide } from "@/data/codingComplexity";
import {
  codingLanguageMeta,
  getSupportedLanguages,
  type CodingLanguage,
} from "@/data/codingLanguages";
import { companyNames, getCompanyGroup } from "@/data/companyCatalog";
import { useStore } from "@/store/useStore";

const difficultyStyles = {
  Foundation: "bg-violet-50 text-violet-700 border-violet-200",
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Hard: "bg-red-50 text-red-700 border-red-200",
};

const emptySubscribe = () => () => {};

function customQuestionsSnapshot() {
  const keys = Array.from({ length: window.localStorage.length }, (_, index) =>
    window.localStorage.key(index),
  )
    .filter((key): key is string => Boolean(key?.startsWith("prepmate_coding_custom_")))
    .sort();
  const questions: CodingQuestion[] = [];
  for (const key of keys) {
    try {
      const question = JSON.parse(window.localStorage.getItem(key) || "null") as CodingQuestion | null;
      if (question?.id && question.functionName && question.starterCode) questions.push(question);
    } catch {
      // Keep one damaged saved challenge from hiding the rest of the local queue.
    }
  }
  return JSON.stringify(questions);
}

function seededScore(value: string, seed: number) {
  let hash = seed;
  for (let index = 0; index < value.length; index++) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function CodingPracticeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedPattern, setSelectedPattern] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState<"All" | CodingLanguage>("All");
  const [selectedCompany, setSelectedCompany] = useState(() => {
    const requestedCompany = searchParams.get("company");
    return requestedCompany && companyNames.includes(requestedCompany) ? requestedCompany : "All";
  });
  const [freshSeed, setFreshSeed] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState("");
  const customQuestionsJson = useSyncExternalStore(
    emptySubscribe,
    customQuestionsSnapshot,
    () => "[]",
  );
  const customQuestions = useMemo(() => {
    try {
      return JSON.parse(customQuestionsJson) as CodingQuestion[];
    } catch {
      return [];
    }
  }, [customQuestionsJson]);
  const allQuestions = useMemo(
    () => [...customQuestions, ...codingQuestions],
    [customQuestions],
  );

  useEffect(() => {
    if (!user) router.push("/auth");
  }, [router, user]);

  const studyYear = user?.studyYear || "3";
  const path = yearLearningPaths[studyYear] || yearLearningPaths["3"];

  const createFreshChallenge = async () => {
    setIsGenerating(true);
    setGenerationError("");
    try {
      const companies = selectedCompany !== "All"
        ? [selectedCompany]
        : user?.targetCompanies.slice(0, 8) || [];
      const response = await fetch("/api/coding/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studyYear: Number(studyYear) || 3,
          companies,
          pattern: selectedPattern === "All" ? undefined : selectedPattern,
        }),
      });
      const payload = (await response.json()) as { error?: string; question?: CodingQuestion };
      if (!response.ok || !payload.question) {
        throw new Error(payload.error || "Could not create a fresh challenge.");
      }
      window.localStorage.setItem(
        `prepmate_coding_custom_${payload.question.id}`,
        JSON.stringify(payload.question),
      );
      router.push(`/coding/custom/${payload.question.id}`);
    } catch (error) {
      setGenerationError(error instanceof Error ? error.message : "Could not create a fresh challenge.");
    } finally {
      setIsGenerating(false);
    }
  };

  const visibleQuestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const selectedCompanyGroup = selectedCompany === "All"
      ? undefined
      : getCompanyGroup(selectedCompany);
    const hasDirectMatches = selectedCompany === "All" || allQuestions.some((question) =>
      question.companies.includes(selectedCompany),
    );

    return allQuestions
      .filter((question) => {
        const matchesQuery =
          !query ||
          question.title.toLowerCase().includes(query) ||
          question.summary.toLowerCase().includes(query) ||
          question.pattern.toLowerCase().includes(query) ||
          question.companies.some((company) => company.toLowerCase().includes(query));
        const matchesDifficulty =
          selectedDifficulty === "All" || question.difficulty === selectedDifficulty;
        const matchesPattern = selectedPattern === "All" || question.pattern === selectedPattern;
        const matchesLanguage =
          selectedLanguage === "All" ||
          getSupportedLanguages(question).includes(selectedLanguage);
        const matchesCompany =
          selectedCompany === "All" ||
          question.companies.includes(selectedCompany) ||
          (!hasDirectMatches &&
            selectedCompanyGroup?.companies.some((company) =>
              question.companies.includes(company),
            ));

        return matchesQuery && matchesDifficulty && matchesPattern && matchesLanguage && matchesCompany;
      })
      .sort((first, second) => {
        const firstRecommended = first.studyYears.includes(Number(studyYear)) ? 1 : 0;
        const secondRecommended = second.studyYears.includes(Number(studyYear)) ? 1 : 0;
        if (firstRecommended !== secondRecommended) return secondRecommended - firstRecommended;
        return seededScore(first.id, freshSeed) - seededScore(second.id, freshSeed);
      });
  }, [allQuestions, freshSeed, searchQuery, selectedCompany, selectedDifficulty, selectedLanguage, selectedPattern, studyYear]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <SideNav />

      <main className="flex-1 md:ml-64 p-6 pt-24 md:p-10 max-w-7xl mx-auto pb-28">
        <header className="mb-8 mt-12 md:mt-0">
          <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary-container/10 px-3 py-1.5 text-secondary mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                <span className="font-sans text-[10px] font-extrabold uppercase tracking-wider">
                  Adaptive for {path.label}
                </span>
              </div>
              <h1 className="font-display text-4xl font-extrabold text-primary mb-2">
                Coding Practice Lab
              </h1>
              <p className="font-sans text-sm text-on-surface-variant max-w-2xl leading-relaxed">
                Learn the concept, compare brute force with the optimized complexity, then practise in JavaScript, Python, Java, or C++ templates. Fresh mixes keep the queue moving across years, patterns, and company families.
              </p>
            </div>

            <div className="shrink-0 flex flex-col items-stretch sm:items-end gap-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => setFreshSeed((seed) => seed + 1)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-outline-variant bg-surface-container-lowest px-5 py-3 font-sans text-xs font-bold text-primary hover:border-primary transition-colors cursor-pointer"
                >
                  <RefreshCw className="h-4 w-4" />
                  Shuffle guided mix
                </button>
                <button
                  type="button"
                  onClick={createFreshChallenge}
                  disabled={isGenerating}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-sans text-xs font-bold text-on-primary hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-55"
                >
                  {isGenerating ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  {isGenerating ? "Building challenge..." : "Create fresh challenge"}
                </button>
              </div>
              {generationError && (
                <p className="font-sans text-[10px] font-bold text-error max-w-md text-right">{generationError}</p>
              )}
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.65fr] gap-6 mb-8">
          <div className="bento-card rounded-3xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-secondary-container/10" />
            <div className="relative">
              <p className="font-sans text-[10px] font-extrabold uppercase tracking-[0.2em] text-secondary-container mb-2">
                Your current track
              </p>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                <div>
                  <h2 className="font-display text-2xl font-bold text-primary mb-2">
                    {path.stage}
                  </h2>
                  <p className="font-sans text-xs text-on-surface-variant max-w-xl leading-relaxed mb-5">
                    {path.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {path.focus.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-outline-variant bg-surface-container-low px-3 py-1.5 font-sans text-[9px] font-bold text-primary"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl bg-primary p-5 text-on-primary shrink-0 md:w-48">
                  <BookOpen className="h-5 w-5 mb-5 text-secondary-container" />
                  <p className="font-sans text-[9px] font-bold uppercase tracking-wider text-on-primary/60 mb-1">
                    Weekly target · {allQuestions.length}+ drills
                  </p>
                  <p className="font-display text-lg font-bold leading-snug">{path.weeklyTarget}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bento-card rounded-2xl p-5 flex flex-col justify-between">
              <Code2 className="h-5 w-5 text-secondary-container" />
              <div>
                <p className="font-display text-3xl font-extrabold text-primary">{allQuestions.length}</p>
                <p className="font-sans text-[9px] font-bold uppercase tracking-wider text-on-surface-variant mt-1">
                  Ready + saved problems
                </p>
              </div>
            </div>
            <div className="bento-card rounded-2xl p-5 flex flex-col justify-between">
              <Building2 className="h-5 w-5 text-secondary-container" />
              <div>
                <p className="font-display text-3xl font-extrabold text-primary">{companyNames.length}</p>
                <p className="font-sans text-[9px] font-bold uppercase tracking-wider text-on-surface-variant mt-1">
                  Company patterns
                </p>
              </div>
            </div>
            <div className="bento-card rounded-2xl p-5 flex flex-col justify-between">
              <Layers3 className="h-5 w-5 text-secondary-container" />
              <div>
                <p className="font-display text-3xl font-extrabold text-primary">{codingPatterns.length}</p>
                <p className="font-sans text-[9px] font-bold uppercase tracking-wider text-on-surface-variant mt-1">
                  Core patterns
                </p>
              </div>
            </div>
            <div className="bento-card rounded-2xl p-5 flex flex-col justify-between">
              <Languages className="h-5 w-5 text-secondary-container" />
              <div>
                <p className="font-display text-3xl font-extrabold text-primary">4</p>
                <p className="font-sans text-[9px] font-bold uppercase tracking-wider text-on-surface-variant mt-1">
                  Coding languages
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bento-card rounded-2xl p-5 md:p-6 mb-7">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4 text-secondary-container" />
            <h2 className="font-display text-lg font-bold text-primary">Build your practice queue</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
            <label className="relative md:col-span-2 xl:col-span-1">
              <span className="sr-only">Search coding questions</span>
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search problem or company..."
                className="w-full rounded-xl border border-outline-variant bg-background py-3 pl-11 pr-4 font-sans text-xs font-bold text-primary outline-none focus:border-primary"
              />
            </label>
            <select
              aria-label="Filter by difficulty"
              value={selectedDifficulty}
              onChange={(event) => setSelectedDifficulty(event.target.value)}
              className="rounded-xl border border-outline-variant bg-background px-4 py-3 font-sans text-xs font-bold text-primary outline-none focus:border-primary"
            >
              {['All', 'Foundation', 'Easy', 'Medium', 'Hard'].map((item) => (
                <option key={item} value={item}>{item === 'All' ? 'All difficulties' : item}</option>
              ))}
            </select>
            <select
              aria-label="Filter by pattern"
              value={selectedPattern}
              onChange={(event) => setSelectedPattern(event.target.value)}
              className="rounded-xl border border-outline-variant bg-background px-4 py-3 font-sans text-xs font-bold text-primary outline-none focus:border-primary"
            >
              <option value="All">All patterns</option>
              {codingPatterns.map((pattern) => <option key={pattern} value={pattern}>{pattern}</option>)}
            </select>
            <select
              aria-label="Filter by language"
              value={selectedLanguage}
              onChange={(event) => setSelectedLanguage(event.target.value as "All" | CodingLanguage)}
              className="rounded-xl border border-outline-variant bg-background px-4 py-3 font-sans text-xs font-bold text-primary outline-none focus:border-primary"
            >
              <option value="All">All languages</option>
              {(Object.keys(codingLanguageMeta) as CodingLanguage[]).map((language) => (
                <option key={language} value={language}>{codingLanguageMeta[language].label}</option>
              ))}
            </select>
            <select
              aria-label="Filter by company"
              value={selectedCompany}
              onChange={(event) => setSelectedCompany(event.target.value)}
              className="rounded-xl border border-outline-variant bg-background px-4 py-3 font-sans text-xs font-bold text-primary outline-none focus:border-primary"
            >
              <option value="All">All companies</option>
              {companyNames.map((company) => <option key={company} value={company}>{company}</option>)}
            </select>
          </div>
        </section>

        <section>
          <div className="flex items-end justify-between gap-4 mb-5">
            <div>
              <p className="font-sans text-[10px] font-extrabold uppercase tracking-wider text-secondary-container mb-1">
                Recommended first
              </p>
              <h2 className="font-display text-2xl font-bold text-primary">Your fresh question queue</h2>
            </div>
            <p className="font-sans text-[10px] font-bold text-on-surface-variant">
              {visibleQuestions.length} problem{visibleQuestions.length === 1 ? "" : "s"}
            </p>
          </div>

          <div className="space-y-3">
            {visibleQuestions.map((question, index) => {
              const recommended = question.studyYears.includes(Number(studyYear));
              const supportedLanguages = getSupportedLanguages(question);
              const complexity = getComplexityGuide(question);

              return (
                <Link
                  key={question.id}
                  href={question.id.startsWith("custom-") ? `/coding/custom/${question.id}` : `/coding/${question.id}`}
                  className="bento-card rounded-2xl p-5 md:p-6 flex flex-col lg:flex-row lg:items-center gap-5 group"
                >
                  <div className="h-11 w-11 rounded-xl bg-surface-container-low flex items-center justify-center font-display text-sm font-extrabold text-primary shrink-0 border border-outline-variant">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`rounded-full border px-2.5 py-1 font-sans text-[9px] font-extrabold ${difficultyStyles[question.difficulty]}`}>
                        {question.difficulty}
                      </span>
                      <span className="rounded-full bg-surface-container px-2.5 py-1 font-sans text-[9px] font-bold text-on-surface-variant">
                        {question.pattern}
                      </span>
                      <span className="rounded-full bg-surface-container px-2.5 py-1 font-sans text-[9px] font-bold text-on-surface-variant flex items-center gap-1">
                        <Gauge className="h-3 w-3" /> {complexity.optimized.time}
                      </span>
                      {recommended && (
                        <span className="rounded-full bg-secondary-container/10 px-2.5 py-1 font-sans text-[9px] font-extrabold text-secondary">
                          Recommended for you
                        </span>
                      )}
                      {question.id.startsWith("custom-") && (
                        <span className="rounded-full bg-violet-50 px-2.5 py-1 font-sans text-[9px] font-extrabold text-violet-700">
                          Freshly generated
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-lg font-bold text-primary group-hover:text-secondary transition-colors mb-1">
                      {question.title}
                    </h3>
                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                      {question.summary}
                    </p>
                  </div>
                  <div className="lg:w-64 shrink-0">
                    <div className="flex flex-wrap lg:justify-end gap-1.5 mb-2">
                      {supportedLanguages.map((language) => (
                        <span key={language} className="rounded border border-outline-variant bg-background px-2 py-1 font-sans text-[8px] font-extrabold text-primary">
                          {codingLanguageMeta[language].shortLabel}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap lg:justify-end gap-1.5 mb-3">
                      {question.companies.slice(0, 3).map((company) => (
                        <span key={company} className="rounded bg-surface-container-low px-2 py-1 font-sans text-[8px] font-bold text-on-surface-variant">
                          {company}
                        </span>
                      ))}
                      {question.companies.length > 3 && (
                        <span className="rounded bg-surface-container-low px-2 py-1 font-sans text-[8px] font-bold text-on-surface-variant">
                          +{question.companies.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center lg:justify-end gap-4 font-sans text-[9px] font-bold text-on-surface-variant">
                      <span className="flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" />{question.durationMinutes} min</span>
                      <span>{question.acceptance > 0 ? `${question.acceptance}% solved` : "New challenge"}</span>
                      <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

function CodingPageFallback() {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <SideNav />
      <main className="md:ml-64 min-h-screen flex items-center justify-center p-8">
        <div className="flex items-center gap-3 font-sans text-xs font-bold text-on-surface-variant">
          <LoaderCircle className="h-5 w-5 animate-spin text-secondary-container" />
          Building your coding queue...
        </div>
      </main>
    </div>
  );
}

export default function CodingPracticePage() {
  return (
    <Suspense fallback={<CodingPageFallback />}>
      <CodingPracticeContent />
    </Suspense>
  );
}
