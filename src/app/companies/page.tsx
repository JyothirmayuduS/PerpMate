"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Building2, Code2, Search, Sparkles } from "lucide-react";
import SideNav from "@/components/layout/SideNav";
import { codingQuestions } from "@/data/codingQuestions";
import { companyGroups, companyNames } from "@/data/companyCatalog";
import { useStore } from "@/store/useStore";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

export default function CompanyHub() {
  const router = useRouter();
  const { user } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("all");

  useEffect(() => {
    if (!user) router.push("/auth");
  }, [router, user]);

  const filteredCompanies = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return companyGroups.flatMap((group) =>
      group.companies
        .filter((company) => {
          const matchesGroup = selectedGroup === "all" || group.id === selectedGroup;
          const matchesSearch =
            !query ||
            company.toLowerCase().includes(query) ||
            group.name.toLowerCase().includes(query) ||
            group.focus.some((item) => item.toLowerCase().includes(query));
          return matchesGroup && matchesSearch;
        })
        .map((company) => ({
          company,
          group,
          mappedQuestions: codingQuestions.filter((question) =>
            question.companies.includes(company),
          ),
        })),
    );
  }, [searchQuery, selectedGroup]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <SideNav />

      <main className="flex-1 md:ml-64 p-6 pt-24 md:p-10 max-w-7xl mx-auto pb-24">
        <header className="mb-9 mt-12 md:mt-0">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary-container/10 px-3 py-1.5 text-secondary mb-4">
            <Building2 className="h-3.5 w-3.5" />
            <span className="font-sans text-[10px] font-extrabold uppercase tracking-wider">
              Beyond a six-company shortlist
            </span>
          </div>
          <h1 className="font-display text-4xl font-extrabold text-primary mb-2">
            Company Pattern Hub
          </h1>
          <p className="font-sans text-sm text-on-surface-variant max-w-3xl leading-relaxed">
            Prepare across service firms, consulting, Indian product teams, fintech,
            enterprise software, hardware, and global product companies. Every module
            maps original practice to the skills commonly screened in that company family.
          </p>
        </header>

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bento-card rounded-2xl p-5">
            <p className="font-display text-3xl font-extrabold text-primary">{companyNames.length}</p>
            <p className="font-sans text-[9px] font-bold uppercase tracking-wider text-on-surface-variant mt-1">Companies covered</p>
          </div>
          <div className="bento-card rounded-2xl p-5">
            <p className="font-display text-3xl font-extrabold text-primary">{companyGroups.length}</p>
            <p className="font-sans text-[9px] font-bold uppercase tracking-wider text-on-surface-variant mt-1">Industry families</p>
          </div>
          <div className="bento-card rounded-2xl p-5">
            <p className="font-display text-3xl font-extrabold text-primary">4</p>
            <p className="font-sans text-[9px] font-bold uppercase tracking-wider text-on-surface-variant mt-1">Study-year tracks</p>
          </div>
          <Link href="/coding" className="rounded-2xl bg-primary p-5 text-on-primary group">
            <Code2 className="h-5 w-5 text-secondary-container mb-4" />
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="font-display text-lg font-bold">Open Coding Lab</p>
                <p className="font-sans text-[9px] font-bold text-on-primary/60 mt-1">Solve mapped patterns</p>
              </div>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </section>

        <section className="bento-card rounded-2xl p-5 md:p-6 mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search a company, family, or skill..."
              className="w-full pl-11 pr-5 py-3 rounded-xl border border-outline-variant bg-background focus:outline-none focus:border-primary font-sans text-xs font-bold text-primary"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1">
            {[{ id: "all", name: "All companies" }, ...companyGroups].map((group) => (
              <button
                key={group.id}
                type="button"
                onClick={() => setSelectedGroup(group.id)}
                className={`shrink-0 px-4 py-2.5 rounded-full border font-sans text-[10px] font-bold transition-colors cursor-pointer ${
                  selectedGroup === group.id
                    ? "bg-primary text-on-primary border-primary"
                    : "bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:border-primary"
                }`}
              >
                {group.name}
              </button>
            ))}
          </div>
        </section>

        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <p className="font-sans text-[10px] font-extrabold uppercase tracking-wider text-secondary-container mb-1">Broad placement coverage</p>
            <h2 className="font-display text-2xl font-bold text-primary">Explore company patterns</h2>
          </div>
          <p className="font-sans text-[10px] font-bold text-on-surface-variant">
            {filteredCompanies.length} result{filteredCompanies.length === 1 ? "" : "s"}
          </p>
        </div>

        {filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredCompanies.map(({ company, group, mappedQuestions }) => (
              <article key={company} className="bento-card rounded-2xl p-6 flex flex-col min-h-72 group">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="h-14 w-14 rounded-2xl bg-surface-container border border-outline-variant flex items-center justify-center font-display text-sm font-extrabold text-primary">
                    {initials(company)}
                  </div>
                  <span className="rounded-full bg-surface-container px-3 py-1.5 font-sans text-[8px] font-extrabold uppercase tracking-wider text-on-surface-variant text-right">
                    {group.name}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-primary mb-2">{company}</h3>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed mb-5">
                  {group.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {group.focus.slice(0, 4).map((focus) => (
                    <span key={focus} className="rounded bg-surface-container-low px-2 py-1 font-sans text-[8px] font-bold text-on-surface-variant">
                      {focus}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-outline-variant/40 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-sans text-[9px] font-extrabold uppercase tracking-wider text-on-surface-variant">Current direct matches</p>
                    <p className="font-display text-lg font-bold text-primary mt-0.5">
                      {mappedQuestions.length > 0 ? `${mappedQuestions.length} guided` : "Family mix"}
                    </p>
                  </div>
                  <Link
                    href={`/coding?company=${encodeURIComponent(company)}`}
                    className="h-10 w-10 rounded-full bg-primary text-on-primary flex items-center justify-center transition-transform group-hover:translate-x-1"
                    aria-label={`Practice ${company} patterns`}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bento-card rounded-2xl p-10 text-center">
            <Sparkles className="h-6 w-6 text-secondary-container mx-auto mb-3" />
            <h3 className="font-display text-xl font-bold text-primary mb-2">No company matches that search</h3>
            <p className="font-sans text-xs text-on-surface-variant mb-5">Try a skill such as SQL, arrays, core CS, or system design.</p>
            <button type="button" onClick={() => { setSearchQuery(""); setSelectedGroup("all"); }} className="rounded-full bg-primary px-5 py-2.5 font-sans text-[10px] font-extrabold text-on-primary cursor-pointer">
              Clear filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
