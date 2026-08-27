"use client";

import { useEffect, useState, use, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { useStore, type Question } from "@/store/useStore";
import SideNav from "@/components/layout/SideNav";
import { 
  ArrowLeft, ArrowRight, Lock, Sparkles,
  Calculator, Brain, Book, Car, Timer, Percent, Coins, Landmark,
  LineChart, Scale, Hash, Dice5, ArrowRightLeft, Clock, PenTool, Code, Layout
} from "lucide-react";
import Link from "next/link";
import { aptitudeSections, AptitudeTopic } from "@/data/aptitudeData";

const emptySubscribe = () => () => {};

function loadGeneratedQuestions(topicId: string): Question[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(
      window.localStorage.getItem(`prepmate_generated_${topicId}`) || "[]",
    ) as Question[];
  } catch {
    return [];
  }
}

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
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>(() =>
    loadGeneratedQuestions(id),
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState("");

  useEffect(() => {
    if (mounted && !user) {
      router.push("/auth");
    }
  }, [user, router, mounted]);

  if (!mounted || !user) return null;

  // Find the topic inside aptitudeSections
  let foundTopic: AptitudeTopic | null = null;
  for (const section of aptitudeSections) {
    const t = section.topics.find(t => t.id === id);
    if (t) {
      foundTopic = t;
      break;
    }
  }

  if (!foundTopic) {
    router.push("/practice");
    return null;
  }

  const topic = foundTopic;
  const progress = practiceProgress[topic.id] || 0;
  const allQuestions = [...topic.questions, ...generatedQuestions];
  const solvedCount = Math.round((progress / 100) * allQuestions.length);
  const TopicIcon = iconMap[topic.icon] || Sparkles;

  const generateFreshQuestion = async () => {
    const difficultyByYear: Record<string, "Easy" | "Medium" | "Difficult" | "Hard"> = {
      "1": "Easy",
      "2": "Medium",
      "3": "Difficult",
      "4": "Hard",
    };
    const difficulty = difficultyByYear[user.studyYear] || "Medium";

    setIsGenerating(true);
    setGenerationError("");
    try {
      const response = await fetch("/api/questions/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.name,
          difficulty,
          companies:
            user.targetCompanies.length > 0
              ? user.targetCompanies.slice(0, 8)
              : topic.company_focus.slice(0, 8),
        }),
      });
      const payload = (await response.json()) as {
        error?: string;
        question?: Partial<Question> & { question?: string };
      };
      if (!response.ok || !payload.question) {
        throw new Error(payload.error || "Could not create a fresh question.");
      }

      const raw = payload.question;
      const text = raw.text || raw.question;
      if (!text || !raw.options || !raw.correctOption || !raw.explanation) {
        throw new Error("The generated question was incomplete. Please try again.");
      }

      const freshQuestion: Question = {
        id: `fresh-${topic.id}-${generatedQuestions.length + 1}-${text
          .slice(0, 28)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")}`,
        topic: raw.topic || topic.name,
        text,
        options: raw.options,
        correctOption: raw.correctOption,
        explanation: raw.explanation,
        difficulty: raw.difficulty || difficulty,
        difficulty_level: raw.difficulty_level,
        company_tag: raw.company_tag,
        prerequisites: raw.prerequisites,
        simple_explanation: raw.simple_explanation,
        formulas: raw.formulas,
        tips: raw.tips,
      };
      const nextQuestions = [...generatedQuestions, freshQuestion];
      setGeneratedQuestions(nextQuestions);
      window.localStorage.setItem(
        `prepmate_generated_${topic.id}`,
        JSON.stringify(nextQuestions),
      );
    } catch (error) {
      setGenerationError(error instanceof Error ? error.message : "Could not create a fresh question.");
    } finally {
      setIsGenerating(false);
    }
  };

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
              <span className="text-xs font-semibold text-on-surface-variant">{solvedCount} of {allQuestions.length} Solved</span>
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
          {allQuestions.map((q, i) => {
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

        <div className="mt-6 rounded-2xl border border-secondary-container/20 bg-secondary-container/10 p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-primary mb-1">
                Your practice stream does not end here
              </h3>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed max-w-xl">
                Create a fresh original {topic.name} question at the right level for your study year and target companies. It is saved on this device for your next session.
              </p>
              {generationError && (
                <p className="font-sans text-[10px] font-bold text-error mt-2">{generationError}</p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={generateFreshQuestion}
            disabled={isGenerating}
            className="rounded-full bg-primary px-5 py-3 font-sans text-[10px] font-extrabold uppercase tracking-wider text-on-primary flex items-center justify-center gap-2 shrink-0 disabled:opacity-50 cursor-pointer"
          >
            <Sparkles className={`h-3.5 w-3.5 ${isGenerating ? "animate-spin" : ""}`} />
            {isGenerating ? "Creating..." : "Create fresh question"}
          </button>
        </div>

        {progress < 40 && allQuestions.some(q => q.difficulty === "Hard" || q.difficulty === "Difficult") && (
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
