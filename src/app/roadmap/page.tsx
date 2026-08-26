"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import SideNav from "@/components/layout/SideNav";
import { 
  Sparkles, RefreshCw, ChevronDown, ChevronUp, CheckCircle2, 
  Clock, BookOpen, Brain, Code2, MessageSquare, Briefcase,
  Flame, Target, Calendar, AlertTriangle, GraduationCap, Zap,
  Trophy, Star
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RoadmapTopic {
  id: string;
  name: string;
  type: "dsa" | "system" | "aptitude" | "behavioural" | "project";
  difficulty: "Easy" | "Medium" | "Hard";
  hours: number;
  resources: string[];
  done: boolean;
}

interface RoadmapPhase {
  id: string;
  title: string;
  emoji: string;
  duration: string;
  description: string;
  status: "completed" | "active" | "upcoming";
  topics: RoadmapTopic[];
  milestone: string;
  weeklyGoal: string;
}

interface RoadmapSummary {
  totalWeeks: number;
  totalHours: number;
  focusAreas: string[];
  urgencyLevel: "Low" | "Medium" | "High" | "Critical";
  aiTip: string;
}

interface Roadmap {
  phases: RoadmapPhase[];
  summary: RoadmapSummary;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const topicTypeConfig: Record<string, { color: string; icon: React.ElementType; label: string }> = {
  dsa:        { color: "bg-blue-100 text-blue-700 border-blue-200",         icon: Code2,        label: "DSA" },
  system:     { color: "bg-purple-100 text-purple-700 border-purple-200",   icon: Brain,        label: "System Design" },
  aptitude:   { color: "bg-amber-100 text-amber-700 border-amber-200",      icon: BookOpen,     label: "Aptitude" },
  behavioural:{ color: "bg-emerald-100 text-emerald-700 border-emerald-200",icon: MessageSquare,label: "Behavioural" },
  project:    { color: "bg-rose-100 text-rose-700 border-rose-200",         icon: Briefcase,    label: "Projects" },
};

const difficultyColor: Record<string, string> = {
  Easy:   "text-emerald-600 bg-emerald-50 border-emerald-200",
  Medium: "text-amber-600 bg-amber-50 border-amber-200",
  Hard:   "text-red-600 bg-red-50 border-red-200",
};

const urgencyConfig = {
  Low:      { color: "text-emerald-700 bg-emerald-50 border-emerald-200", icon: "🌱" },
  Medium:   { color: "text-amber-700 bg-amber-50 border-amber-200",       icon: "⚡" },
  High:     { color: "text-orange-700 bg-orange-50 border-orange-200",    icon: "🔥" },
  Critical: { color: "text-red-700 bg-red-50 border-red-200",             icon: "🚨" },
};

const yearLabel: Record<string, string> = {
  "1": "1st Year",
  "2": "2nd Year",
  "3": "3rd Year",
  "4": "Final Year",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function RoadmapPage() {
  const router = useRouter();
  const { user } = useStore();

  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set(["phase-1", "phase-2"]));
  const [checkedTopics, setCheckedTopics] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);
  const [dots, setDots] = useState(".");

  useEffect(() => { setMounted(true); }, []);

  // Animated loading dots
  useEffect(() => {
    if (!loading) return;
    const t = setInterval(() => setDots(d => d.length >= 3 ? "." : d + "."), 500);
    return () => clearInterval(t);
  }, [loading]);

  const generateRoadmap = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError("");
    setRoadmap(null);

    try {
      const res = await fetch("/api/roadmap/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studyYear: user.studyYear || "3",
          targetCompanies: user.targetCompanies,
          targetRole: user.targetRole,
          targetLevel: user.targetLevel,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to generate roadmap");
      }

      setRoadmap(data.roadmap);
      // Auto-expand active phase
      const activePhase = data.roadmap.phases.find((p: RoadmapPhase) => p.status === "active");
      if (activePhase) {
        setExpandedPhases(new Set([activePhase.id]));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!mounted) return;
    if (!user) { router.push("/auth"); return; }
    generateRoadmap();
  }, [mounted, user, router, generateRoadmap]);

  const togglePhase = (phaseId: string) => {
    setExpandedPhases(prev => {
      const next = new Set(prev);
      if (next.has(phaseId)) next.delete(phaseId);
      else next.add(phaseId);
      return next;
    });
  };

  const toggleTopic = (topicId: string) => {
    setCheckedTopics(prev => {
      const next = new Set(prev);
      if (next.has(topicId)) next.delete(topicId);
      else next.add(topicId);
      return next;
    });
  };

  if (!mounted || !user) return null;

  const totalTopics = roadmap?.phases.flatMap(p => p.topics).length ?? 0;
  const doneTopics = checkedTopics.size;
  const overallProgress = totalTopics > 0 ? Math.round((doneTopics / totalTopics) * 100) : 0;

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <SideNav />

      <main className="md:ml-64 p-6 md:p-10 pb-24 max-w-5xl mx-auto">

        {/* ── Header ── */}
        <header className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8 mt-12 md:mt-0">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-primary rounded-full px-3 py-1">
                <Sparkles className="w-3 h-3" />
                <span className="font-sans text-[9px] font-extrabold uppercase tracking-wider">AI-Powered by Gemini</span>
              </div>
              {user.studyYear && (
                <div className="inline-flex items-center gap-1.5 bg-surface-container border border-outline-variant rounded-full px-3 py-1">
                  <GraduationCap className="w-3 h-3 text-on-surface-variant" />
                  <span className="font-sans text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">
                    {yearLabel[user.studyYear] ?? "Student"}
                  </span>
                </div>
              )}
            </div>
            <h2 className="font-display text-4xl font-extrabold text-primary mb-1">
              Your Placement Roadmap
            </h2>
            <p className="font-sans text-xs text-on-surface-variant font-semibold">
              Personalised for <strong>{user.targetCompanies.join(", ") || "top tech companies"}</strong> · {user.targetRole || "Software Engineer"} · {user.targetLevel || "Intermediate"}
            </p>
          </div>

          <button
            onClick={generateRoadmap}
            disabled={loading}
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 border border-outline-variant bg-surface-container-lowest rounded-xl font-sans text-xs font-bold hover:border-primary hover:text-primary transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Regenerating…" : "Regenerate"}
          </button>
        </header>

        {/* ── Loading State ── */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-outline-variant/30 border-t-primary animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-primary animate-pulse" />
              </div>
            </div>
            <div className="text-center">
              <p className="font-display text-xl font-bold text-primary mb-1">
                Gemini is thinking{dots}
              </p>
              <p className="font-sans text-xs text-on-surface-variant">
                Analysing your year, targets & level to craft the perfect plan
              </p>
            </div>
            <div className="flex gap-3 flex-wrap justify-center max-w-sm">
              {["Scanning company patterns", "Calculating weekly hours", "Building phase structure", "Curating resources"].map((t, i) => (
                <div key={i} className="px-3 py-1.5 bg-surface-container border border-outline-variant rounded-full font-sans text-[10px] font-bold text-on-surface-variant animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
                  {t}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Error State ── */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <AlertTriangle className="w-12 h-12 text-amber-500" />
            <h3 className="font-display text-xl font-bold text-primary">Couldn't generate roadmap</h3>
            <p className="font-sans text-xs text-on-surface-variant max-w-sm">{error}</p>
            <button 
              onClick={generateRoadmap}
              className="mt-2 px-6 py-2.5 bg-primary text-on-primary rounded-xl font-sans text-xs font-bold cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}

        {/* ── Roadmap Content ── */}
        {roadmap && !loading && (
          <div className="space-y-6">

            {/* Summary Banner */}
            <section className="bg-primary text-on-primary rounded-2xl p-6 relative overflow-hidden shadow-md">
              {/* Decorative blobs */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-on-primary/5 rounded-full" />
              <div className="absolute -bottom-6 right-16 w-20 h-20 bg-on-primary/5 rounded-full" />

              <div className="relative z-10 flex flex-col md:flex-row gap-6">
                {/* AI Tip */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-4 h-4 text-secondary-container" />
                    <span className="font-sans text-[10px] font-extrabold uppercase tracking-wider text-on-primary/70">
                      Gemini's Personal Advice
                    </span>
                  </div>
                  <p className="font-sans text-sm leading-relaxed font-semibold text-on-primary">
                    "{roadmap.summary.aiTip}"
                  </p>
                </div>

                {/* Stats row */}
                <div className="flex flex-wrap gap-4 items-center shrink-0">
                  <div className="text-center">
                    <p className="font-display text-3xl font-black text-on-primary">{roadmap.summary.totalWeeks}</p>
                    <p className="font-sans text-[9px] font-bold text-on-primary/60 uppercase tracking-wider">Weeks</p>
                  </div>
                  <div className="w-px h-10 bg-on-primary/15" />
                  <div className="text-center">
                    <p className="font-display text-3xl font-black text-on-primary">{roadmap.summary.totalHours}</p>
                    <p className="font-sans text-[9px] font-bold text-on-primary/60 uppercase tracking-wider">Total Hrs</p>
                  </div>
                  <div className="w-px h-10 bg-on-primary/15" />
                  <div className="text-center">
                    <p className="font-display text-3xl font-black text-on-primary">{roadmap.phases.length}</p>
                    <p className="font-sans text-[9px] font-bold text-on-primary/60 uppercase tracking-wider">Phases</p>
                  </div>
                  <div className="w-px h-10 bg-on-primary/15" />
                  <div className="text-center">
                    <div className={`text-[10px] font-extrabold px-3 py-1.5 rounded-full border ${urgencyConfig[roadmap.summary.urgencyLevel]?.color}`}>
                      {urgencyConfig[roadmap.summary.urgencyLevel]?.icon} {roadmap.summary.urgencyLevel}
                    </div>
                    <p className="font-sans text-[9px] font-bold text-on-primary/60 uppercase tracking-wider mt-1">Urgency</p>
                  </div>
                </div>
              </div>

              {/* Focus Areas chips */}
              <div className="relative z-10 mt-4 flex flex-wrap gap-2">
                {roadmap.summary.focusAreas.map((area, i) => (
                  <span key={i} className="px-3 py-1 bg-on-primary/10 text-on-primary rounded-full font-sans text-[10px] font-bold border border-on-primary/15">
                    {area}
                  </span>
                ))}
              </div>
            </section>

            {/* Overall Progress Bar */}
            {totalTopics > 0 && (
              <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-secondary-container" />
                    <span className="font-sans text-xs font-extrabold text-primary uppercase tracking-wider">
                      Overall Progress
                    </span>
                  </div>
                  <span className="font-display text-lg font-black text-primary">{overallProgress}%</span>
                </div>
                <div className="w-full h-3 bg-outline-variant/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary-container rounded-full transition-all duration-700"
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
                <p className="font-sans text-[10px] text-on-surface-variant font-semibold mt-2">
                  {doneTopics} of {totalTopics} topics completed
                </p>
              </div>
            )}

            {/* Phases */}
            {roadmap.phases.map((phase, phaseIdx) => {
              const isExpanded = expandedPhases.has(phase.id);
              const phaseTopicsDone = phase.topics.filter(t => checkedTopics.has(t.id)).length;
              const phaseProgress = phase.topics.length > 0 ? Math.round((phaseTopicsDone / phase.topics.length) * 100) : 0;

              const statusConfig = {
                completed: { bar: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Completed" },
                active:    { bar: "bg-primary",     badge: "bg-primary/10 text-primary border-primary/30",       label: "In Progress" },
                upcoming:  { bar: "bg-outline-variant/40", badge: "bg-surface-container text-on-surface-variant border-outline-variant", label: "Upcoming" },
              }[phase.status];

              return (
                <div
                  key={phase.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    phase.status === "active" 
                      ? "border-primary/40 shadow-[0_0_0_2px_rgba(var(--primary-rgb),0.08)]" 
                      : "border-outline-variant"
                  } bg-surface-container-lowest`}
                >
                  {/* Phase Header */}
                  <button
                    onClick={() => togglePhase(phase.id)}
                    className="w-full p-5 flex items-center gap-4 text-left cursor-pointer hover:bg-surface-container-low/50 transition-colors"
                  >
                    {/* Phase number / emoji */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 font-bold ${
                      phase.status === "completed" 
                        ? "bg-emerald-100 text-emerald-700" 
                        : phase.status === "active" 
                        ? "bg-primary/10 text-primary"
                        : "bg-surface-container text-on-surface-variant"
                    }`}>
                      {phase.status === "completed" ? "✅" : phase.emoji}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="font-sans text-[9px] font-extrabold text-on-surface-variant uppercase tracking-wider">
                          Phase {phaseIdx + 1}
                        </span>
                        <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${statusConfig.badge}`}>
                          {statusConfig.label}
                        </span>
                        {phase.status === "active" && (
                          <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                            <Flame className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                            Current
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-base font-bold text-primary truncate">
                        {phase.title}
                      </h3>
                      <p className="font-sans text-[10px] text-on-surface-variant font-semibold mt-0.5">
                        {phase.description}
                      </p>
                    </div>

                    <div className="shrink-0 flex flex-col items-end gap-2">
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-sans text-[9px] font-extrabold text-on-surface-variant uppercase">Duration</p>
                          <p className="font-display text-sm font-bold text-primary">{phase.duration}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-sans text-[9px] font-extrabold text-on-surface-variant uppercase">Progress</p>
                          <p className="font-display text-sm font-bold text-primary">{phaseProgress}%</p>
                        </div>
                      </div>
                      <div className="w-24 h-1.5 bg-outline-variant/30 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${statusConfig.bar}`} style={{ width: `${phaseProgress}%` }} />
                      </div>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-on-surface-variant" /> : <ChevronDown className="w-4 h-4 text-on-surface-variant" />}
                    </div>
                  </button>

                  {/* Phase Body */}
                  {isExpanded && (
                    <div className="border-t border-outline-variant/40 p-5 space-y-4">
                      
                      {/* Phase meta info */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div className="bg-surface-container p-3 rounded-xl border border-outline-variant/40">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Target className="w-3 h-3 text-primary" />
                            <span className="font-sans text-[9px] font-extrabold text-on-surface-variant uppercase tracking-wider">Milestone</span>
                          </div>
                          <p className="font-sans text-[10px] font-semibold text-primary leading-relaxed">{phase.milestone}</p>
                        </div>
                        <div className="bg-surface-container p-3 rounded-xl border border-outline-variant/40">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Calendar className="w-3 h-3 text-primary" />
                            <span className="font-sans text-[9px] font-extrabold text-on-surface-variant uppercase tracking-wider">Weekly Goal</span>
                          </div>
                          <p className="font-sans text-[10px] font-semibold text-primary leading-relaxed">{phase.weeklyGoal}</p>
                        </div>
                        <div className="bg-surface-container p-3 rounded-xl border border-outline-variant/40">
                          <div className="flex items-center gap-1.5 mb-1">
                            <BookOpen className="w-3 h-3 text-primary" />
                            <span className="font-sans text-[9px] font-extrabold text-on-surface-variant uppercase tracking-wider">Topics</span>
                          </div>
                          <p className="font-sans text-[10px] font-semibold text-primary">{phaseTopicsDone}/{phase.topics.length} done</p>
                        </div>
                      </div>

                      {/* Topics List */}
                      <div className="space-y-2">
                        {phase.topics.map((topic) => {
                          const isDone = checkedTopics.has(topic.id);
                          const typeConf = topicTypeConfig[topic.type] || topicTypeConfig.dsa;
                          const TypeIcon = typeConf.icon;

                          return (
                            <div
                              key={topic.id}
                              onClick={() => toggleTopic(topic.id)}
                              className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all group ${
                                isDone 
                                  ? "bg-emerald-50 border-emerald-200 opacity-70" 
                                  : "bg-surface-container-lowest border-outline-variant/40 hover:border-primary/30 hover:bg-surface-container-low/40"
                              }`}
                            >
                              {/* Checkbox */}
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                                isDone ? "bg-emerald-500 border-emerald-500" : "border-outline-variant group-hover:border-primary"
                              }`}>
                                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-white fill-white" />}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center flex-wrap gap-2 mb-1">
                                  <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border flex items-center gap-1 ${typeConf.color}`}>
                                    <TypeIcon className="w-2.5 h-2.5" />
                                    {typeConf.label}
                                  </span>
                                  <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${difficultyColor[topic.difficulty]}`}>
                                    {topic.difficulty}
                                  </span>
                                  <span className="text-[9px] font-bold text-on-surface-variant flex items-center gap-1">
                                    <Clock className="w-2.5 h-2.5" />
                                    ~{topic.hours}h
                                  </span>
                                </div>
                                <p className={`font-sans text-xs font-bold transition-all ${isDone ? "line-through text-on-surface-variant/50" : "text-primary"}`}>
                                  {topic.name}
                                </p>
                                {topic.resources.length > 0 && (
                                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                                    {topic.resources.slice(0, 3).map((r, i) => (
                                      <span key={i} className="text-[9px] font-semibold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded border border-outline-variant/40">
                                        📎 {r}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>

                              {isDone && (
                                <Star className="w-4 h-4 text-emerald-500 fill-emerald-400 shrink-0 mt-0.5" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Regenerate CTA */}
            <div className="text-center pt-4">
              <p className="font-sans text-xs text-on-surface-variant font-semibold mb-3">
                Updated your targets or year? Generate a fresh plan.
              </p>
              <button
                onClick={generateRoadmap}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-sans text-xs font-extrabold hover:scale-[0.98] transition-transform cursor-pointer shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                Regenerate with Gemini AI
              </button>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
