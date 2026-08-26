"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import SideNav from "@/components/layout/SideNav";
import { 
  ArrowLeft, ArrowRight, Lock, Sparkles, CheckCircle2, ChevronRight,
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

export default function TopicPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const { user, practiceProgress } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user) {
      router.push("/auth");
    }
  }, [user, router, mounted]);

  if (!mounted || !user) return null;

  // Find the topic inside aptitudeSections
  let foundTopic: AptitudeTopic | null = null;
  let parentSection = null;
  for (const section of aptitudeSections) {
    const t = section.topics.find(t => t.id === id);
    if (t) {
      foundTopic = t;
      parentSection = section;
      break;
    }
  }

  if (!foundTopic) {
    router.push("/practice");
    return null;
  }

  const topic = foundTopic;
  const progress = practiceProgress[topic.id] || 0;
  const solvedCount = Math.round((progress / 100) * topic.questions.length);
  const TopicIcon = iconMap[topic.icon] || Sparkles;

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <SideNav />

      <main className="flex-1 md:ml-64 p-6 pt-24 md:p-10 max-w-5xl mx-auto pb-24">
        
        {/* Back Button */}
        <Link 
          href="/practice"
          className="inline-flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Practice Hub
        </Link>

        {/* Topic Header Card */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-[24px] p-6 md:p-8 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center shrink-0 border border-outline-variant/50">
                <TopicIcon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-primary mb-2">
                  {topic.name}
                </h1>
                <p className="font-sans text-sm text-on-surface-variant max-w-xl leading-relaxed">
                  {topic.desc}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2 bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 min-w-[180px]">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Your Progress</span>
              <div className="flex items-center gap-3 w-full">
                <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="font-display font-bold text-primary text-lg">{progress}%</span>
              </div>
              <span className="text-xs font-semibold text-on-surface-variant">{solvedCount} of {topic.questions.length} Solved</span>
            </div>
          </div>
          
          {/* Company Tags */}
          {topic.company_focus.length > 0 && (
            <div className="mt-6 pt-6 border-t border-outline-variant/50 flex flex-wrap gap-2 items-center">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mr-2">Top Companies</span>
              {topic.company_focus.map(c => (
                <span key={c} className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                  {c}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Questions Grid */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold text-primary">
            Practice Questions
          </h2>
          <div className="flex items-center gap-2 bg-surface-container-lowest px-3 py-1.5 rounded-full border border-outline-variant">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] font-bold text-on-surface-variant">Easy</span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 ml-2"></span>
              <span className="text-[10px] font-bold text-on-surface-variant">Med</span>
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 ml-2"></span>
              <span className="text-[10px] font-bold text-on-surface-variant">Hard</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topic.questions.map((q, i) => {
            const isHard = q.difficulty === "Hard" || q.difficulty === "Difficult";
            const isLocked = isHard && progress < 40;
            
            let diffColor = "bg-emerald-500";
            if (q.difficulty === "Medium") diffColor = "bg-amber-400";
            if (q.difficulty === "Difficult") diffColor = "bg-orange-500";
            if (q.difficulty === "Hard") diffColor = "bg-red-500";

            return (
              <Link
                key={q.id}
                href={isLocked ? "#" : `/practice/question/${q.id}`}
                className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${
                  isLocked 
                    ? "bg-surface-container border-outline-variant/30 opacity-70 cursor-not-allowed" 
                    : "bg-surface-container-lowest border-outline-variant hover:border-primary hover:shadow-md cursor-pointer group"
                }`}
              >
                <div className="flex items-start gap-4 pr-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                    isLocked ? "bg-surface-container-high text-on-surface-variant" : "bg-primary/10 text-primary"
                  }`}>
                    {i + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`w-2 h-2 rounded-full ${diffColor}`}></span>
                      <span className="font-sans text-[10px] font-bold text-on-surface-variant tracking-wide">{(q.difficulty || "Easy").toUpperCase()}</span>
                    </div>
                    <p className={`font-sans text-sm font-semibold line-clamp-2 leading-relaxed ${isLocked ? "text-on-surface-variant" : "text-primary group-hover:text-primary"}`}>
                      {q.text}
                    </p>
                  </div>
                </div>
                
                {isLocked ? (
                  <Lock className="w-5 h-5 text-on-surface-variant shrink-0" />
                ) : (
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-container group-hover:bg-primary group-hover:text-on-primary transition-colors shrink-0 text-on-surface-variant">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {progress < 40 && topic.questions.some(q => q.difficulty === "Hard" || q.difficulty === "Difficult") && (
          <div className="mt-8 p-4 bg-primary/5 rounded-2xl border border-primary/20 flex items-start gap-3">
            <Lock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="font-sans text-xs text-primary leading-relaxed">
              <strong>Gamified Progression Active:</strong> Higher difficulty questions are currently locked. Solve more Easy and Medium questions to build your foundation, reach 40% completion, and unlock the harder challenges!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
