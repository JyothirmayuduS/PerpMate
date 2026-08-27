"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import SideNav from "@/components/layout/SideNav";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie
} from "recharts";
import { Clock, Target, AlertTriangle, TrendingUp } from "lucide-react";

export default function ReportDashboard() {
  const router = useRouter();
  const { user, practiceAttempts } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  const analyticsData = useMemo(() => {
    const topicStats: Record<string, { totalTime: number; correct: number; total: number }> = {};
    
    practiceAttempts.forEach((attempt) => {
      if (!topicStats[attempt.topicId]) {
        topicStats[attempt.topicId] = { totalTime: 0, correct: 0, total: 0 };
      }
      topicStats[attempt.topicId].totalTime += attempt.timeSpentSeconds;
      topicStats[attempt.topicId].total += 1;
      if (attempt.isCorrect) {
        topicStats[attempt.topicId].correct += 1;
      }
    });

    const formattedData = Object.keys(topicStats).map((topic) => {
      const stats = topicStats[topic];
      const accuracy = Math.round((stats.correct / stats.total) * 100) || 0;
      const avgTime = Math.round(stats.totalTime / stats.total) || 0;
      
      return {
        name: topic,
        timeSpent: stats.totalTime,
        avgTime,
        accuracy,
        total: stats.total
      };
    }).sort((a, b) => b.timeSpent - a.timeSpent); // Sort by time spent

    return formattedData;
  }, [practiceAttempts]);

  const weaknesses = useMemo(() => {
    return analyticsData.filter(d => d.accuracy < 60 || d.avgTime > 120);
  }, [analyticsData]);

  const totalTimeSpentAll = analyticsData.reduce((acc, curr) => acc + curr.timeSpent, 0);
  const overallAccuracy = analyticsData.length > 0 
    ? Math.round(analyticsData.reduce((acc, curr) => acc + curr.accuracy, 0) / analyticsData.length) 
    : 0;

  if (!mounted || !user) return null;

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <SideNav />

      <main className="flex-1 ml-0 md:ml-64 p-6 pt-24 md:p-10 max-w-7xl min-h-screen pb-24 md:pb-10">
        <header className="mb-10 mt-12 md:mt-0">
          <h2 className="font-display text-4xl font-extrabold text-primary mb-2">
            Performance Report
          </h2>
          <p className="font-sans text-sm text-on-surface-variant">
            Analyze your practice patterns, pinpoint weaknesses, and optimize your prep.
          </p>
        </header>

        {practiceAttempts.length === 0 ? (
          <div className="bento-card rounded-2xl p-10 text-center flex flex-col items-center justify-center">
            <Target className="w-16 h-16 text-outline-variant mb-4" />
            <h3 className="font-sans text-xl font-bold text-primary mb-2">No Data Yet</h3>
            <p className="font-sans text-sm text-on-surface-variant max-w-md">
              Start practicing questions to generate your personalized analytics report. We track time spent, accuracy, and difficulty automatically.
            </p>
            <button 
              onClick={() => router.push('/practice')}
              className="mt-6 py-3 px-6 bg-primary text-on-primary rounded-xl font-sans text-sm font-bold hover:scale-95 transition-all"
            >
              Start Practicing
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Overview Cards */}
            <div className="col-span-1 md:col-span-4 bento-card rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary-container">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="font-sans text-[10px] font-bold text-on-surface-variant uppercase">Total Time Practicing</p>
                <p className="font-display text-3xl font-bold text-primary">
                  {Math.floor(totalTimeSpentAll / 60)}m {totalTimeSpentAll % 60}s
                </p>
              </div>
            </div>

            <div className="col-span-1 md:col-span-4 bento-card rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-tertiary-fixed-dim/20 flex items-center justify-center text-on-tertiary-container">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <p className="font-sans text-[10px] font-bold text-on-surface-variant uppercase">Overall Accuracy</p>
                <p className="font-display text-3xl font-bold text-primary">{overallAccuracy}%</p>
              </div>
            </div>

            <div className="col-span-1 md:col-span-4 bento-card rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-error-container/20 flex items-center justify-center text-error">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="font-sans text-[10px] font-bold text-on-surface-variant uppercase">Questions Attempted</p>
                <p className="font-display text-3xl font-bold text-primary">{practiceAttempts.length}</p>
              </div>
            </div>

            {/* Time Distribution Chart */}
            <div className="col-span-1 md:col-span-8 bento-card rounded-2xl p-6 h-[400px] flex flex-col">
              <h3 className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-6">
                Time Spent Per Topic (Seconds)
              </h3>
              <div className="flex-1 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="currentColor" 
                      className="text-xs font-sans text-on-surface-variant" 
                      tick={{ fill: 'currentColor' }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis 
                      stroke="currentColor" 
                      className="text-xs font-sans text-on-surface-variant" 
                      tick={{ fill: 'currentColor' }}
                    />
                    <Tooltip 
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                      contentStyle={{ backgroundColor: '#1E1E2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff', fontSize: '12px' }}
                      labelStyle={{ color: '#9CA3AF', fontSize: '12px', marginBottom: '4px' }}
                    />
                    <Bar dataKey="timeSpent" radius={[4, 4, 0, 0]}>
                      {analyticsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#7C3AED" : "#C084FC"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Weaknesses Panel */}
            <div className="col-span-1 md:col-span-4 bento-card rounded-2xl p-6 flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <AlertTriangle className="w-4 h-4 text-error" />
                <h3 className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                  Needs Attention
                </h3>
              </div>
              
              <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                {weaknesses.length === 0 ? (
                  <div className="text-center text-sm text-on-surface-variant mt-10">
                    You're doing great! No immediate weaknesses detected.
                  </div>
                ) : (
                  weaknesses.map((w) => (
                    <div key={w.name} className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30">
                      <p className="font-sans text-sm font-bold text-primary mb-2">{w.name}</p>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-on-surface-variant block mb-1">Accuracy</span>
                          <span className={`font-bold ${w.accuracy < 60 ? 'text-error' : 'text-primary'}`}>
                            {w.accuracy}%
                          </span>
                        </div>
                        <div>
                          <span className="text-on-surface-variant block mb-1">Avg Time</span>
                          <span className={`font-bold ${w.avgTime > 120 ? 'text-orange-400' : 'text-primary'}`}>
                            {w.avgTime}s / q
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
