"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import SideNav from "@/components/layout/SideNav";
import { 
  ArrowRight, Sparkles, CheckCircle2, ChevronRight, Lock,
  Calculator, Brain, Book, Car, Timer, Percent, Coins, Landmark,
  LineChart, Scale, Hash, Dice5, ArrowRightLeft, Clock, PenTool, Code, Layout
} from "lucide-react";
import Link from "next/link";
import { aptitudeSections, AptitudeTopic } from "@/data/aptitudeData";

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
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

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
            <div className="px-3 py-1 bg-primary/10 text-primary rounded-full font-sans text-[10px] font-bold uppercase tracking-wider">
              IndiaBix Style
            </div>
          </div>
          <p className="font-sans text-sm text-on-surface-variant max-w-2xl leading-relaxed">
            Master the core concepts tested by top Indian IT companies. Our structured approach breaks down topics into essential prerequisites, formulas, and progressive difficulty levels.
          </p>
        </header>

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
            const isExpanded = expandedTopic === topic.id;
            const progress = practiceProgress[topic.id] || 0;
            const solvedCount = Math.round((progress / 100) * topic.questions.length);

            return (
              <div 
                key={topic.id}
                className={`bg-surface-container-lowest border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isExpanded ? "border-primary shadow-md" : "border-outline-variant hover:border-primary/50"
                }`}
              >
                {/* Topic Header (Clickable) */}
                <div 
                  onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}
                  className="p-5 md:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center shrink-0">
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
                      <ChevronRight className={`w-5 h-5 text-on-surface-variant transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`} />
                    </div>
                  </div>
                </div>

                {/* Expanded Content - Question List */}
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="p-5 md:p-6 pt-0 border-t border-outline-variant/50 bg-surface-container-lowest/50">
                      
                      <div className="flex items-center justify-between mb-4 mt-4">
                        <h5 className="font-sans text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                          Practice Questions ({topic.questions.length})
                        </h5>
                        <div className="flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                           <span className="text-[10px] text-on-surface-variant">Easy</span>
                           <span className="w-2 h-2 rounded-full bg-amber-400 ml-2"></span>
                           <span className="text-[10px] text-on-surface-variant">Medium</span>
                           <span className="w-2 h-2 rounded-full bg-orange-500 ml-2"></span>
                           <span className="text-[10px] text-on-surface-variant">Hard</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {topic.questions.map((q, i) => {
                          // Simple mock logic for gating hard questions based on progress
                          const isHard = q.difficulty === "Hard" || q.difficulty === "Difficult";
                          const isLocked = isHard && progress < 40; // Arbitrary lock logic
                          
                          let diffColor = "bg-emerald-500";
                          if (q.difficulty === "Medium") diffColor = "bg-amber-400";
                          if (q.difficulty === "Difficult") diffColor = "bg-orange-500";
                          if (q.difficulty === "Hard") diffColor = "bg-red-500";

                          return (
                            <Link
                              key={q.id}
                              href={isLocked ? "#" : `/practice/question/${q.id}`}
                              className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                                isLocked 
                                  ? "bg-surface-container border-outline-variant/30 opacity-70 cursor-not-allowed" 
                                  : "bg-surface border-outline-variant hover:border-primary/40 hover:shadow-sm cursor-pointer group"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                                  isLocked ? "bg-surface-container-high text-on-surface-variant" : "bg-surface-container text-primary"
                                }`}>
                                  {i + 1}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className={`w-1.5 h-1.5 rounded-full ${diffColor}`}></span>
                                    <span className="font-sans text-[10px] font-bold text-on-surface-variant">{q.difficulty}</span>
                                  </div>
                                  <p className={`font-sans text-sm font-medium line-clamp-1 ${isLocked ? "text-on-surface-variant" : "text-primary group-hover:text-primary"}`}>
                                    {q.text}
                                  </p>
                                </div>
                              </div>
                              
                              {isLocked ? (
                                <Lock className="w-4 h-4 text-on-surface-variant" />
                              ) : (
                                <div className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                  <span className="text-[10px] font-bold">Solve</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </div>
                              )}
                            </Link>
                          );
                        })}
                      </div>

                      {progress < 40 && topic.questions.some(q => q.difficulty === "Hard" || q.difficulty === "Difficult") && (
                        <div className="mt-4 p-3 bg-surface-container rounded-lg border border-outline-variant/50 flex items-start gap-2">
                          <Lock className="w-4 h-4 text-on-surface-variant shrink-0 mt-0.5" />
                          <p className="font-sans text-[10px] text-on-surface-variant leading-relaxed">
                            <strong>Gamified Progression:</strong> Hard and Difficult questions are locked. Solve Easy and Medium questions to build your foundation and unlock higher difficulties.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </main>
    </div>
  );
}
