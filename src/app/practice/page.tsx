"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import SideNav from "@/components/layout/SideNav";
import { 
  Sparkles, ChevronRight, Building2,
  Calculator, Brain, Book, Car, Timer, Percent, Coins, Landmark,
  LineChart, Scale, Hash, Dice5, ArrowRightLeft, Clock, PenTool, Code, Layout
} from "lucide-react";
import Link from "next/link";
import { aptitudeSections, getTotalQuestions } from "@/data/aptitudeData";
import { codingQuestions } from "@/data/codingQuestions";
import { companyNames } from "@/data/companyCatalog";

const iconMap: Record<string, React.ElementType> = {
  "calculator": Calculator,
  "brain": Brain,
  "book": Book,
  "car": Car,
  "timer": Timer,
  "percent": Percent,
  "coins": Coins,
  "landmark": Landmark,
  "line-chart": LineChart,
  "scale": Scale,
  "hash": Hash,
  "dice": Dice5,
  "arrow-right-left": ArrowRightLeft,
  "clock": Clock,
  "pen-tool": PenTool,
  "code": Code,
  "layout": Layout
};

export default function PracticeHub() {
  const router = useRouter();
  const { user, practiceProgress } = useStore();
  const [activeTab, setActiveTab] = useState("quant");

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  if (!user) return null;

  const currentSection = aptitudeSections.find(s => s.id === activeTab) || aptitudeSections[0];

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <SideNav />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-6 pt-24 md:p-10 max-w-7xl mx-auto pb-24">
        
        {/* Header */}
        <header className="mb-10 mt-12 md:mt-0">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary">
              Placement Practice Hub
            </h2>
          </div>
          <p className="font-sans text-sm text-on-surface-variant max-w-2xl leading-relaxed">
            Build placement strength across service, consulting, product, fintech, startup, and global company patterns. Learn prerequisites first, move through progressive difficulty, and create fresh questions whenever a topic queue ends.
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bento-card rounded-2xl p-5">
            <p className="font-display text-3xl font-extrabold text-primary">{getTotalQuestions()}+</p>
            <p className="font-sans text-[9px] font-bold uppercase tracking-wider text-on-surface-variant mt-1">Aptitude questions ready</p>
          </div>
          <div className="bento-card rounded-2xl p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-display text-3xl font-extrabold text-primary">{companyNames.length}</p>
                <p className="font-sans text-[9px] font-bold uppercase tracking-wider text-on-surface-variant mt-1">Company patterns</p>
              </div>
              <Building2 className="h-5 w-5 text-secondary-container" />
            </div>
          </div>
          <Link href="/coding" className="rounded-2xl bg-primary p-5 text-on-primary group flex items-center justify-between gap-4">
            <div>
              <p className="font-display text-xl font-bold">Coding Lab</p>
              <p className="font-sans text-[9px] font-bold text-on-primary/60 mt-1">{codingQuestions.length} guided editor problems</p>
            </div>
            <ChevronRight className="h-5 w-5 text-secondary-container transition-transform group-hover:translate-x-1" />
          </Link>
        </section>

        <div className="rounded-2xl border border-secondary-container/20 bg-secondary-container/10 px-5 py-4 mb-8 flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-secondary shrink-0" />
          <p className="font-sans text-xs text-primary leading-relaxed">
            <strong>Replenishable practice:</strong> finish any topic bank, then use “Create fresh question” to add a new year- and company-matched problem to your stream.
          </p>
        </div>

        {/* Top Filter Tabs */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-8 custom-scrollbar">
          {aptitudeSections.map((section) => {
            const IconComponent = iconMap[section.icon] || Sparkles;
            return (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-sans text-sm font-bold whitespace-nowrap cursor-pointer transition-all border ${
                  activeTab === section.id 
                    ? `${section.color} ${section.textColor} ${section.borderColor} shadow-sm ring-1 ring-black/5` 
                    : "bg-surface-container-lowest border-outline-variant hover:bg-surface-container-low text-on-surface-variant"
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {section.name}
              </button>
            );
          })}
        </div>

        {/* Section Header */}
        <div className="mb-8">
          <h3 className={`font-display text-2xl font-bold mb-2 flex items-center gap-2 ${currentSection.textColor}`}>
            {(() => {
              const SectionIcon = iconMap[currentSection.icon] || Sparkles;
              return <SectionIcon className="w-6 h-6" />;
            })()} 
            {currentSection.name}
          </h3>
          <p className="font-sans text-sm text-on-surface-variant">
            {currentSection.desc}
          </p>
        </div>

        {/* Topics List - Accordion Style */}
        <div className="space-y-4">
          {currentSection.topics.map((topic) => {
            const progress = practiceProgress[topic.id] || 0;
            const solvedCount = Math.round((progress / 100) * topic.questions.length);

            return (
              <Link 
                key={topic.id}
                href={`/practice/topic/${topic.id}`}
                className="bg-surface-container-lowest border rounded-2xl overflow-hidden transition-all duration-300 border-outline-variant hover:border-primary/50 group block hover:shadow-md"
              >
                <div className="p-5 md:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                      {(() => {
                        const TopicIcon = iconMap[topic.icon] || Sparkles;
                        return <TopicIcon className="w-6 h-6 text-primary" />;
                      })()}
                    </div>
                    <div>
                      <h4 className="font-display text-lg font-bold text-primary mb-1">
                        {topic.name}
                      </h4>
                      <p className="font-sans text-xs text-on-surface-variant line-clamp-1">
                        {topic.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                    {/* Companies */}
                    <div className="hidden md:flex flex-wrap gap-1 w-48 justify-end">
                      {topic.company_focus.map(c => (
                        <span key={c} className="text-[9px] font-bold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">
                          {c}
                        </span>
                      ))}
                    </div>

                    {/* Progress */}
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-sans text-xs font-bold text-primary">{progress}%</p>
                        <p className="font-sans text-[10px] text-on-surface-variant">{solvedCount}/{topic.questions.length}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-on-surface-variant transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </main>
    </div>
  );
}
