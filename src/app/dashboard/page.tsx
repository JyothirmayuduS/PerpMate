"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import SideNav from "@/components/layout/SideNav";
import { Flame, CheckSquare, TrendingUp, Medal, ArrowRight, MoreHorizontal, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Dashboard() {
  const router = useRouter();
  const { user, tasks, toggleTask, practiceProgress } = useStore();

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  if (!user) return null;

  // Format current date
  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date().toLocaleDateString('en-US', options);
  };

  // Static list for other leaderboard users
  const topCompetitors = [
    { rank: 1, initials: "AK", name: "Arjun Kapoor", xp: 2450 },
    { rank: 2, initials: "PS", name: "Priya Sharma", xp: 2390 },
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <SideNav />

      {/* Main Canvas Area */}
      <main className="flex-1 ml-0 md:ml-64 p-6 md:p-10 max-w-7xl min-h-screen pb-24 md:pb-10">
        {/* Header Section */}
        <header className="mb-10 mt-12 md:mt-0">
          <h2 className="font-display text-4xl font-extrabold text-primary mb-2">
            Good evening, {user.name}
          </h2>
          <p className="font-sans text-sm text-on-surface-variant">
            {formatDate()} • You're on track for your placement goals.
          </p>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Row 1: Streak Card (Spans full width) */}
          <div className="col-span-1 md:col-span-12 bento-card rounded-2xl flex flex-col md:flex-row items-center justify-between p-6">
            <div className="flex items-center gap-6 mb-4 md:mb-0">
              <div className="w-16 h-16 rounded-full bg-error-container flex items-center justify-center text-secondary-container">
                <Flame className="w-10 h-10 text-secondary-container fill-secondary-container" />
              </div>
              <div>
                <p className="font-sans text-[10px] font-bold text-on-surface-variant uppercase mb-1">
                  Current Streak
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-5xl font-extrabold text-secondary-container leading-none">
                    {user.streak}
                  </span>
                  <span className="font-sans text-sm font-medium text-on-surface-variant">
                    Days
                  </span>
                </div>
                {/* Last 7 days checkoff */}
                <div className="flex gap-2 mt-3">
                  {user.streakHistory.map((done, idx) => (
                    <div 
                      key={idx} 
                      className={`w-2.5 h-2.5 rounded-full ${
                        done ? "bg-secondary-container" : "bg-surface-container-high border border-outline-variant"
                      }`} 
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="text-center md:text-right flex flex-col items-center md:items-end">
              <p className="font-sans text-sm font-bold text-primary mb-1">Keep the fire burning!</p>
              <p className="font-sans text-xs text-on-surface-variant max-w-sm">
                You are 3 days away from your next milestone badge. Practice today to keep your streak alive.
              </p>
            </div>
          </div>

          {/* Row 2: Today's Focus Checklist (8 Columns on desktop) */}
          <div className="col-span-1 md:col-span-8 bento-card rounded-2xl flex flex-col p-6">
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                TODAY'S FOCUS
              </h3>
              <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 flex-1">
              {tasks.map((task) => (
                <div 
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-background hover:bg-surface-container-low border border-transparent hover:border-outline-variant transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => {}} // handled by parent onClick
                      className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary focus:ring-offset-0 bg-transparent transition-all cursor-pointer"
                    />
                    <span className={`font-sans text-sm font-semibold transition-colors ${
                      task.completed ? "line-through text-on-surface-variant" : "text-primary"
                    }`}>
                      {task.taskName}
                    </span>
                  </div>
                  <span className={`font-sans text-[10px] font-bold px-2 py-1 rounded-full ${
                    task.completed 
                      ? "bg-surface-container-high text-on-surface-variant"
                      : "bg-error-container text-on-error-container"
                  }`}>
                    {task.completed ? "Done" : `+${task.points} pts`}
                  </span>
                </div>
              ))}
            </div>

            <Link 
              href="/practice" 
              className="mt-6 w-full md:w-auto self-start py-3 px-6 bg-primary text-on-primary rounded-xl font-sans text-xs font-bold flex items-center justify-center gap-2 hover:scale-98 transition-all"
            >
              Start Today's Session
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Row 2 Right: Rank Card (4 Columns on desktop) */}
          <div className="col-span-1 md:col-span-4 bento-card rounded-2xl flex flex-col items-center justify-center text-center p-6 relative overflow-hidden group">
            {/* Decorative background blob */}
            <div className="absolute -right-10 -top-10 w-28 h-28 bg-error-container/30 rounded-full blur-2xl group-hover:bg-error-container/50 transition-colors duration-500"></div>
            
            <h3 className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest w-full text-left mb-auto">
              RANK
            </h3>
            
            <div className="my-8 flex flex-col items-center">
              <span className="font-display text-6xl font-extrabold text-primary leading-none">
                #23
              </span>
              <p className="font-sans text-[10px] text-on-surface-variant mt-2 font-medium">
                180 XP to reach #22
              </p>
              <div className="w-36 h-1.5 bg-surface-container-high rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "60%" }} />
              </div>
              <span className="font-sans text-xs text-on-surface-variant mt-2">
                of 480 students
              </span>
            </div>

            <div className="mt-auto w-full flex items-center justify-center gap-1.5 text-on-tertiary-container bg-tertiary-fixed-dim/20 py-2 rounded-xl font-sans text-[10px] font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>▲ 4 this week</span>
            </div>
          </div>

          {/* Row 3 Left: Needs Attention progress (6 Columns) */}
          <div className="col-span-1 md:col-span-6 bento-card rounded-2xl p-6">
            <h3 className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-6">
              NEEDS ATTENTION
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-sans text-sm font-bold text-primary">Recursion</span>
                  <span className="font-sans text-xs font-bold text-secondary-container">
                    {practiceProgress.recursion || 0}%
                  </span>
                </div>
                <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-secondary-container rounded-full" 
                    style={{ width: `${practiceProgress.recursion || 0}%` }} 
                  />
                </div>
                <Link 
                  href="/practice" 
                  className="inline-flex items-center gap-1 mt-2.5 font-sans text-[10px] font-bold text-on-surface-variant hover:text-primary transition-colors"
                >
                  Practice <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-sans text-sm font-bold text-primary">Trees</span>
                  <span className="font-sans text-xs font-bold text-orange-400">
                    {practiceProgress.trees || 0}%
                  </span>
                </div>
                <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-orange-400 rounded-full" 
                    style={{ width: `${practiceProgress.trees || 0}%` }} 
                  />
                </div>
                <Link 
                  href="/practice" 
                  className="inline-flex items-center gap-1 mt-2.5 font-sans text-[10px] font-bold text-on-surface-variant hover:text-primary transition-colors"
                >
                  Practice <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Row 3 Right: College Leaderboard summary (6 Columns) */}
          <div className="col-span-1 md:col-span-6 bento-card rounded-2xl flex flex-col p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                COLLEGE LEADERBOARD
              </h3>
              <Medal className="w-4 h-4 text-on-surface-variant" />
            </div>

            <div className="flex-1 space-y-1.5">
              {topCompetitors.map((comp) => (
                <div 
                  key={comp.rank}
                  className="flex items-center justify-between p-2 rounded-xl bg-background hover:bg-surface-container-low transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-xs font-bold text-on-surface-variant w-4">
                      {comp.rank}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-surface-container-high text-primary flex items-center justify-center font-sans text-[10px] font-bold border border-outline-variant">
                      {comp.initials}
                    </div>
                    <span className="font-sans text-xs font-bold text-primary">
                      {comp.name}
                    </span>
                  </div>
                  <span className="font-sans text-xs font-bold text-primary">
                    {comp.xp}
                  </span>
                </div>
              ))}

              {/* Current user highlighted row */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-error-container/30 border border-error-container/50">
                <div className="flex items-center gap-3">
                  <span className="font-sans text-xs font-bold text-secondary-container w-4">
                    23
                  </span>
                  <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-sans text-[10px] font-bold border border-outline-variant">
                    {user.name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2)}
                  </div>
                  <span className="font-sans text-xs font-extrabold text-primary">
                    {user.name} (You)
                  </span>
                </div>
                <span className="font-sans text-xs font-extrabold text-primary">
                  {user.xp}
                </span>
              </div>
            </div>

            <Link 
              href="/leaderboard" 
              className="mt-5 text-center font-sans text-[10px] font-bold text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center gap-1 group"
            >
              View full leaderboard
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
