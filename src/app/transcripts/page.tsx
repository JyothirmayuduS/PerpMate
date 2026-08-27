"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  Clock3,
  FileText,
  Search,
} from "lucide-react";
import SideNav from "@/components/layout/SideNav";
import {
  interviewTranscripts,
  type InterviewFocus,
} from "@/data/interviewTranscripts";
import { useStore } from "@/store/useStore";

const companyFilters = ["All", "Google", "Meta", "Amazon", "Microsoft", "TCS", "Infosys"] as const;
const focusFilters: Array<"All" | InterviewFocus> = [
  "All",
  "Coding",
  "System Design",
  "Aptitude",
  "Behavioral",
];

export default function InterviewTranscriptsPage() {
  const router = useRouter();
  const { user } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<(typeof companyFilters)[number]>("All");
  const [selectedFocus, setSelectedFocus] = useState<"All" | InterviewFocus>("All");

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [router, user]);

  const filteredTranscripts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return interviewTranscripts.filter((transcript) => {
      const matchesQuery =
        !normalizedQuery ||
        transcript.name.toLowerCase().includes(normalizedQuery) ||
        transcript.company.toLowerCase().includes(normalizedQuery) ||
        transcript.title.toLowerCase().includes(normalizedQuery) ||
        transcript.heading.toLowerCase().includes(normalizedQuery) ||
        transcript.desc.toLowerCase().includes(normalizedQuery);
      const matchesCompany =
        selectedCompany === "All" || transcript.company === selectedCompany;
      const matchesFocus =
        selectedFocus === "All" || transcript.focus === selectedFocus;

      return matchesQuery && matchesCompany && matchesFocus;
    });
  }, [searchQuery, selectedCompany, selectedFocus]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <SideNav />

      <main className="flex-1 md:ml-64 p-6 md:p-10 max-w-7xl mx-auto pb-24">
        <header className="mb-10 mt-12 md:mt-0">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 mb-5 font-sans text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to search
          </Link>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-sans text-[10px] font-extrabold uppercase tracking-[0.2em] text-secondary-container mb-2">
                Candidate experiences
              </p>
              <h2 className="font-display text-4xl font-extrabold text-primary mb-2">
                Interview Transcripts
              </h2>
              <p className="font-sans text-sm text-on-surface-variant max-w-2xl leading-relaxed">
                Explore concise round-by-round notes, problem-solving approaches, and practical takeaways from recent placement interviews.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 shrink-0">
              <div className="bento-card rounded-2xl px-5 py-4 min-w-32">
                <p className="font-display text-2xl font-extrabold text-primary leading-none">
                  {interviewTranscripts.length}
                </p>
                <p className="font-sans text-[9px] font-extrabold uppercase tracking-wider text-on-surface-variant mt-1.5">
                  Experiences
                </p>
              </div>
              <div className="bento-card rounded-2xl px-5 py-4 min-w-32">
                <p className="font-display text-2xl font-extrabold text-secondary-container leading-none">
                  {new Set(interviewTranscripts.map((item) => item.company)).size}
                </p>
                <p className="font-sans text-[9px] font-extrabold uppercase tracking-wider text-on-surface-variant mt-1.5">
                  Companies
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="bento-card rounded-2xl p-5 md:p-6 mb-8">
          <div className="flex flex-col xl:flex-row gap-5 xl:items-center xl:justify-between">
            <div className="relative w-full xl:max-w-md">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search company, role, or topic..."
                aria-label="Search interview transcripts"
                className="w-full rounded-full border border-outline-variant bg-background py-3 pl-11 pr-5 font-sans text-xs font-bold text-primary outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
              {focusFilters.map((focus) => (
                <button
                  key={focus}
                  type="button"
                  onClick={() => setSelectedFocus(focus)}
                  className={`shrink-0 rounded-full border px-4 py-2 font-sans text-[10px] font-bold transition-all cursor-pointer ${
                    selectedFocus === focus
                      ? "border-primary bg-primary text-on-primary"
                      : "border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:border-primary hover:text-primary"
                  }`}
                >
                  {focus}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-outline-variant flex gap-2 overflow-x-auto hide-scrollbar">
            {companyFilters.map((company) => (
              <button
                key={company}
                type="button"
                onClick={() => setSelectedCompany(company)}
                className={`shrink-0 rounded-full px-4 py-2 font-sans text-[10px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedCompany === company
                    ? "bg-secondary-container text-on-secondary-container"
                    : "bg-surface-container-low text-on-surface-variant hover:text-primary"
                }`}
              >
                {company}
              </button>
            ))}
          </div>
        </section>

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-secondary-container" />
            <h3 className="font-display text-lg font-bold text-primary">
              All experiences
            </h3>
          </div>
          <p className="font-sans text-[10px] font-bold text-on-surface-variant">
            {filteredTranscripts.length} result{filteredTranscripts.length === 1 ? "" : "s"}
          </p>
        </div>

        {filteredTranscripts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTranscripts.map((transcript) => (
              <article
                key={transcript.id}
                className="bento-card rounded-2xl p-6 flex flex-col min-h-[330px]"
              >
                <div className="flex items-start gap-3 mb-5">
                  {transcript.avatar ? (
                    <div
                      role="img"
                      aria-label={transcript.name}
                      className="h-11 w-11 rounded-full overflow-hidden border border-outline-variant shrink-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${transcript.avatar})` }}
                    />
                  ) : (
                    <div className="h-11 w-11 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-sans text-xs font-extrabold shrink-0">
                      {transcript.initials}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h4 className="font-sans text-xs font-extrabold text-primary truncate">
                      {transcript.name}
                    </h4>
                    <p className="font-sans text-[9px] text-on-surface-variant font-bold mt-1 leading-snug">
                      {transcript.title}
                    </p>
                  </div>
                  <span className="ml-auto shrink-0 rounded-full bg-surface-container-low px-2.5 py-1 font-sans text-[8px] font-extrabold uppercase tracking-wider text-primary">
                    {transcript.company}
                  </span>
                </div>

                <div className="mb-5">
                  <span className="inline-block rounded bg-secondary-container/10 px-2.5 py-1 font-sans text-[9px] font-extrabold uppercase tracking-wider text-secondary">
                    {transcript.focus}
                  </span>
                  <h5 className="font-display text-lg font-bold text-primary mt-3 mb-2 leading-snug">
                    {transcript.heading}
                  </h5>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                    {transcript.desc}
                  </p>
                </div>

                <div className="mt-auto border-t border-outline-variant pt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-[9px] font-bold text-on-surface-variant">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5" />
                    {transcript.rounds} rounds
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5" />
                    {transcript.readTime}
                  </span>
                  <span className="flex items-center gap-1.5 text-on-tertiary-container">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    {transcript.badge}
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bento-card rounded-2xl px-6 py-16 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-surface-container-low flex items-center justify-center">
              <Search className="h-5 w-5 text-on-surface-variant" />
            </div>
            <h3 className="font-display text-xl font-bold text-primary mb-2">
              No transcripts found
            </h3>
            <p className="font-sans text-xs text-on-surface-variant mb-5">
              Try a different keyword or clear one of the filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCompany("All");
                setSelectedFocus("All");
              }}
              className="rounded-full bg-primary px-5 py-2.5 font-sans text-[10px] font-extrabold uppercase tracking-wider text-on-primary cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
