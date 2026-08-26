"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import SideNav from "@/components/layout/SideNav";
import { 
  Trophy, 
  Flame, 
  Search, 
  ChevronUp, 
  ChevronDown, 
  Minus,
  Sparkles,
  Award,
  ChevronRight,
  TrendingUp,
  User as UserIcon,
  X
} from "lucide-react";

interface Student {
  name: string;
  college: string;
  pts: number;
  rank: number;
  acc: string;
  q: number;
  streak: number;
  img: string | null;
  trend: number;
  isSelf?: boolean;
}

export default function LeaderboardPage() {
  const router = useRouter();
  const { user } = useStore();

  const [timeFilter, setTimeFilter] = useState<"week" | "month" | "all">("week");
  const [scopeFilter, setScopeFilter] = useState<"global" | "college" | "friends">("global");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<Student | null>(null);

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  if (!user) return null;

  // Classmate rankings list
  const students: Student[] = [
    { name: "Priya Sharma", college: "IIT Bombay", pts: 3450, rank: 1, acc: "96%", q: 1340, streak: 22, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxVaR5HpxbYyfrXU4QMW_ovJOYhFKERlOTQzbzIcnUrN9m36Qx9HTobtAFPaK11TuQcznNkVSQ3Jhy_NpyUP5K5JmMPArQNjuUsIuAz23yiWrdnrpFxPmwYqPQw1mn9ygL1TUl8M7YYuu52kWHfJLGAIEXA3w--Na5daUzrreelgbC2EN6-DUnzNVCUBuEocwsHq1zrk_-hPBEyfmm8XN9yOudg7llfu-6SGTr7uf1VAFpky28wjWF", trend: 0 },
    { name: "Arjun Kapoor", college: "IIT Madras", pts: 3120, rank: 2, acc: "92%", q: 1210, streak: 15, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKWOdORJO2YP-vwYWa-tCF5AAdFHyiKPBCNCSiAlmJ3qsQmLhFGteBPRUF-8he7QqfBmdaRAEWYGSWr5848E5_vX6wqVCc6_N_eetWMh0JKrRk3XDRgq7VvzJFkqbsZPBXl4fmGactR6JKzNhOdkUdGbstukyBc8Y6Hyh5gFsBqYEZpSuQin8aApk5GDiiqi1t8K4JXJFoB1aszJ9Xo_jRzWIiK933eeq8TGa797JIgrX4AgGHQaYb", trend: 1 },
    { name: "Amit Kumar", college: "BITS Pilani", pts: 2980, rank: 3, acc: "90%", q: 1100, streak: 12, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXAW1R9dW8kdoROD9lUPPgKAE1EggrPVp5H_voHlbNey-igq1lo12Om0heUDps8HOTRu1rgtkBVH8WJwaTed1bSBjIJ5WPfXgnxNg4oOTUZIFwDXrYpZl7PPre6bhjAT_AUG9Rz2FiIT80Cm5Go0tdtryQqQNBvojOY0fjTYkM9ioz1PVpMD4rHBFfQDkYpL8-9FkjClyCfAdHbO-veSjxhzUoFp2t7WFJOHL5LpovxA2XG_GIWAvQ", trend: 3 },
    { name: "Arjun Mehta", college: "IIT Bombay", pts: 2850, rank: 4, acc: "91%", q: 1240, streak: 18, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5K0Cpf9L6x0Dm193pzSUM5jbv_Maz4gXIr-ynFiVXLuPPrdydQHghcv6JO6ub-bENFqFyFIn3F_Ciy3VQD0bjtUYESnltYUF70AExNmgRaOz7I5v_GJWrqh8UzPMBYDQzYfigEQ9_sUphZ9gU22RDOaLSWUfcPJ52xqceBgdd7Mi2-9jvhjmhsZV8PoNClj0rSkQ9B7fLlow33VkVHBicRt3lTltvNWNZhFJiYWdkf062rEBkPmS4", trend: 2 },
    { name: "Sana Khan", college: "NIT Trichy", pts: 2790, rank: 5, acc: "88%", q: 1150, streak: 14, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDt6DcVKiG7olC6DXHIQ55flvpoa2YwFan0Ag1bZgPqgCdRZWn19BCQH4Hq4Y4iUh7OxWzrqhKH9qlGmeL_bHKuj-Nwc39Ie-xwh0WltLr4brOSsOApVwqWhUtPgukjB4iBdscVB176C11Qsj68xNjPeMlb3lrEw4xwz7E1AB1nnijPV6rEfsTwSLmVjv1zNfq5uCkBRGXUdp37t5D3v9uDqeGm4qM38xMJieg05c_LC_k-m_G6BUEA", trend: -1 },
    { name: "Vikram Malhotra", college: "BITS Pilani", pts: 2650, rank: 6, acc: "94%", q: 980, streak: 5, img: null, trend: 0 },
    { name: "Neha Sharma", college: "Delhi University", pts: 2510, rank: 7, acc: "89%", q: 1020, streak: 10, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSaCY5dNy5ptEKS7AADRMsm0immScbXkWg2Rnyvev_eqZMwVGS1kuCzDgXaQb6fenO20p5oXXqxWGcPtyI4jGBLL5iYLM2iPNgTCUQkdB0x3U2buKk6bu1vr666PTZipJPlG3_mLKkWiMUf0yauab6EgAMHxKZ-ztQzJXZUdmdpNsmIecUFhAca2Phb3RCOr7h_Ho8shSY45Yhvm3NO4S00kS9pZspwYmsi4vdSu9OiPTAePace_2R", trend: 4 },
    { name: "Kunal Sen", college: "NIT Trichy", pts: 2390, rank: 8, acc: "85%", q: 920, streak: 8, img: null, trend: -2 },
    { name: "Rahul (You)", college: "IIT Bombay", pts: user.xp, rank: 245, acc: "82%", q: 850, streak: user.streak, img: null, trend: 18, isSelf: true }
  ].sort((a, b) => b.pts - a.pts);

  // Recalculate ranks dynamically after sorting
  const sortedStudents = students.map((s, idx) => {
    // Keep self at rank 245 or dynamically adjust if points rise
    const actualRank = s.isSelf ? Math.max(10, 245 - Math.floor((user.xp - 1850) / 10)) : idx + 1;
    return {
      ...s,
      rank: s.isSelf ? actualRank : idx < 8 ? idx + 1 : idx + 237 // offset other ranks below top list
    };
  }).sort((a, b) => a.rank - b.rank);

  const podium = sortedStudents.filter(s => s.rank <= 3);
  const remaining = sortedStudents.filter(s => s.rank > 3);

  // Filter logic
  const filteredStudents = remaining.filter((s) => {
    // Query filter
    const matchesQuery = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         s.college.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Scope filter
    if (scopeFilter === "college") {
      return matchesQuery && s.college === "IIT Bombay";
    }
    return matchesQuery;
  });

  const selfStudent = sortedStudents.find((s) => s.isSelf) || {
    rank: 245,
    pts: user.xp,
    trend: 18
  };

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <SideNav />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-6 pt-24 md:p-10 max-w-7xl mx-auto pb-24">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 mt-12 md:mt-0">
          <div>
            <h2 className="font-display text-4xl font-extrabold text-primary mb-2">
              Leaderboard
            </h2>
            <p className="font-sans text-sm text-on-surface-variant">
              Compete. Improve. Get ahead.
            </p>
          </div>

          {/* Time range switcher */}
          <div className="flex items-center bg-surface-container border border-outline-variant rounded-xl p-1 shadow-sm font-sans text-xs font-bold">
            {(["week", "month", "all"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setTimeFilter(mode)}
                className={`px-4 py-2 rounded-lg transition-all capitalize cursor-pointer ${
                  timeFilter === mode 
                    ? "bg-white text-primary shadow-sm" 
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {mode === "all" ? "All Time" : `This ${mode}`}
              </button>
            ))}
          </div>
        </header>

        {/* Personal Rank Card (Unified primary dark banner) */}
        <section className="bg-primary text-on-primary rounded-2xl p-6 mb-8 relative overflow-hidden flex flex-col lg:flex-row gap-6 shadow-md border border-outline-variant/10">
          {/* Rank circle left */}
          <div className="flex items-center gap-6 w-full lg:w-1/2 relative z-10">
            <div className="w-20 h-20 shrink-0 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-lg font-display text-xl font-black">
              #{selfStudent.rank}
            </div>
            
            <div>
              <h3 className="font-display text-lg font-bold mb-1">Your Rank</h3>
              <div className="flex flex-wrap items-center gap-3 text-xs text-on-primary/70">
                <span>Total Points: <strong className="text-white font-extrabold text-sm">{selfStudent.pts}</strong></span>
                <span className="px-2 py-0.5 bg-[#1A4231] text-[#4edea3] rounded font-bold flex items-center gap-0.5">
                  <ChevronUp className="w-3 h-3 text-[#4edea3]" />
                  {selfStudent.trend} this week
                </span>
                <span className="px-2 py-0.5 bg-surface-tint/30 text-white rounded font-bold">
                  TOP 12%
                </span>
              </div>
            </div>
          </div>

          {/* Detailed stats right */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center gap-4 relative z-10 font-sans border-t lg:border-t-0 lg:border-l border-on-primary/10 pt-4 lg:pt-0 lg:pl-6">
            <div className="flex justify-between items-center text-center">
              <div>
                <p className="text-[9px] text-on-primary/60 uppercase font-extrabold tracking-wider mb-1">Streak</p>
                <p className="font-extrabold text-white flex items-center justify-center gap-1">
                  <Flame className="w-4 h-4 text-secondary-container fill-secondary-container" />
                  {user.streak} Days
                </p>
              </div>
              <div className="w-px h-8 bg-on-primary/10" />
              <div>
                <p className="text-[9px] text-on-primary/60 uppercase font-extrabold tracking-wider mb-1">Weekly Pts</p>
                <p className="font-extrabold text-[#4edea3]">+240</p>
              </div>
              <div className="w-px h-8 bg-on-primary/10" />
              <div>
                <p className="text-[9px] text-on-primary/60 uppercase font-extrabold tracking-wider mb-1">Solved</p>
                <p className="font-extrabold text-white">42</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-on-primary/75">Next Milestone: #200</span>
                <span className="font-bold text-white">80 pts to go</span>
              </div>
              <div className="w-full h-2.5 bg-on-primary/10 rounded-full overflow-hidden relative">
                <div 
                  className="h-full bg-secondary-container rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: "84%" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Podium & List Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Podium (Top 3 Performance columns) - Spans 5 columns */}
          <section className="lg:col-span-5 bento-card rounded-2xl p-6 flex flex-col items-center justify-end min-h-[450px] relative">
            <h3 className="font-display text-lg font-bold absolute top-6 left-6 text-primary flex items-center gap-1.5">
              <Trophy className="w-5 h-5 text-amber-500 fill-amber-300" />
              Top 3
            </h3>

            <div className="flex items-end justify-center gap-2.5 w-full h-[350px] pb-4">
              
              {/* Rank 2 Podium */}
              {podium[1] && (
                <div className="flex flex-col items-center w-1/3 group">
                  <div className="relative mb-3 transition-transform group-hover:-translate-y-1.5 duration-300">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-[3px] border-[#E2E8F0] shadow-md bg-surface-container-high">
                      {podium[1].img ? (
                        <img alt={podium[1].name} className="w-full h-full object-cover" src={podium[1].img} />
                      ) : (
                        <span className="w-full h-full flex items-center justify-center font-bold text-xs">{podium[1].name.substring(0, 2).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5.5 h-5.5 bg-[#E2E8F0] text-[#475569] rounded-full flex items-center justify-center font-extrabold text-[10px] border-2 border-white shadow-sm">
                      2
                    </div>
                  </div>
                  <div className="text-center w-full px-1 mb-3">
                    <p className="font-bold text-xs text-primary truncate">{podium[1].name.split(" ")[0]}</p>
                    <p className="text-[9px] text-on-surface-variant truncate mb-1">{podium[1].college}</p>
                    <p className="text-[10px] font-extrabold text-primary">{podium[1].pts} pts</p>
                  </div>
                  <div className="w-full bg-surface-container border border-outline-variant/30 h-24 rounded-t-lg flex items-center justify-center">
                    <span className="text-outline font-display font-black text-3xl opacity-30">2</span>
                  </div>
                </div>
              )}

              {/* Rank 1 Podium */}
              {podium[0] && (
                <div className="flex flex-col items-center w-[38%] group z-10">
                  <div className="relative mb-3 transition-transform group-hover:-translate-y-1.5 duration-300">
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                      <Sparkles className="w-5 h-5 text-amber-500 fill-amber-300 animate-pulse" />
                    </div>
                    <div className="w-18 h-18 rounded-full overflow-hidden border-4 border-secondary-container shadow-lg bg-surface-container-high">
                      {podium[0].img ? (
                        <img alt={podium[0].name} className="w-full h-full object-cover" src={podium[0].img} />
                      ) : (
                        <span className="w-full h-full flex items-center justify-center font-bold text-xs">{podium[0].name.substring(0, 2).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6.5 h-6.5 bg-secondary-container text-white rounded-full flex items-center justify-center font-extrabold text-xs border-2 border-white shadow-md">
                      1
                    </div>
                  </div>
                  <div className="text-center w-full px-1 mb-3">
                    <p className="font-bold text-xs text-primary truncate">{podium[0].name.split(" ")[0]}</p>
                    <p className="text-[9px] text-on-surface-variant truncate mb-1">{podium[0].college}</p>
                    <p className="text-[10px] font-extrabold text-secondary-container">{podium[0].pts} pts</p>
                  </div>
                  <div className="w-full bg-secondary-fixed border border-secondary-fixed shadow-inner h-36 rounded-t-lg flex items-center justify-center">
                    <span className="text-secondary-container font-display font-black text-4xl opacity-30">1</span>
                  </div>
                </div>
              )}

              {/* Rank 3 Podium */}
              {podium[2] && (
                <div className="flex flex-col items-center w-1/3 group">
                  <div className="relative mb-3 transition-transform group-hover:-translate-y-1.5 duration-300">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-[3px] border-[#FDE68A] shadow-md bg-surface-container-high">
                      {podium[2].img ? (
                        <img alt={podium[2].name} className="w-full h-full object-cover" src={podium[2].img} />
                      ) : (
                        <span className="w-full h-full flex items-center justify-center font-bold text-xs">{podium[2].name.substring(0, 2).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5.5 h-5.5 bg-[#FDE68A] text-[#92400E] rounded-full flex items-center justify-center font-extrabold text-[10px] border-2 border-white shadow-sm">
                      3
                    </div>
                  </div>
                  <div className="text-center w-full px-1 mb-3">
                    <p className="font-bold text-xs text-primary truncate">{podium[2].name.split(" ")[0]}</p>
                    <p className="text-[9px] text-on-surface-variant truncate mb-1">{podium[2].college}</p>
                    <p className="text-[10px] font-extrabold text-primary">{podium[2].pts} pts</p>
                  </div>
                  <div className="w-full bg-surface-container border border-outline-variant/30 h-20 rounded-t-lg flex items-center justify-center">
                    <span className="text-outline font-display font-black text-2xl opacity-30">3</span>
                  </div>
                </div>
              )}

            </div>
          </section>

          {/* List and Search Panel - Spans 7 columns */}
          <section className="lg:col-span-7 bento-card rounded-2xl flex flex-col h-[600px] overflow-hidden relative">
            
            {/* Headers & Filters */}
            <div className="p-5 border-b border-outline-variant bg-white z-20 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                  GLOBAL RANKINGS
                </h3>
                
                {/* Search query input */}
                <div className="relative w-full sm:w-56">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search peers or college..."
                    className="w-full bg-background border border-outline-variant rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-secondary-container focus:ring-1 focus:ring-secondary-container font-sans text-xs font-semibold"
                  />
                </div>
              </div>

              {/* Scopes filters list */}
              <div className="flex gap-2">
                {(["global", "college", "friends"] as const).map((scope) => (
                  <button
                    key={scope}
                    onClick={() => setScopeFilter(scope)}
                    className={`px-4 py-1.5 rounded-full font-sans text-xs font-bold border transition-colors whitespace-nowrap cursor-pointer ${
                      scopeFilter === scope 
                        ? "bg-primary text-on-primary border-primary" 
                        : "bg-white text-on-surface-variant border-outline-variant hover:border-primary hover:text-primary"
                    }`}
                  >
                    {scope === "global" ? "Global" : scope === "college" ? "My College" : "Friends"}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Rankings List */}
            <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-1 custom-scrollbar bg-white">
              
              {/* Sticky Pinned Position of current User */}
              {searchQuery === "" && (
                <div className="mb-4 sticky top-0 z-10 bg-white pt-1">
                  <div className="mb-1">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">Your Position</span>
                  </div>
                  <div className="flex items-center p-3 bg-secondary-fixed/20 border border-secondary-container/40 rounded-xl shadow-sm">
                    <div className="w-12 text-center shrink-0">
                      <div className="font-display font-black text-primary text-base">#{selfStudent.rank}</div>
                      <div className="text-[9px] text-[#009668] font-bold flex items-center justify-center gap-0.5 mt-0.5">
                        <ChevronUp className="w-2.5 h-2.5" />
                        {selfStudent.trend}
                      </div>
                    </div>
                    
                    <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs ml-2 mr-4 border border-primary">
                      You
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-sans text-xs font-extrabold text-primary truncate">Rahul (You)</h4>
                      <p className="text-[10px] text-on-surface-variant font-medium truncate">IIT Bombay</p>
                    </div>
                    
                    <div className="text-right shrink-0">
                      <div className="font-sans text-sm font-extrabold text-primary">{selfStudent.pts}</div>
                      <div className="text-[9px] text-on-surface-variant uppercase font-bold tracking-wider">Points</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Table Header */}
              {filteredStudents.length > 0 && (
                <div className="px-3 py-1 mb-1 border-b border-outline-variant/30 flex text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">
                  <div className="w-12 text-center">Rank</div>
                  <div className="w-14"></div>
                  <div className="flex-1">Student</div>
                  <div className="text-right w-16">Score</div>
                </div>
              )}

              {/* List Items */}
              <div className="flex flex-col gap-1">
                {filteredStudents.length === 0 ? (
                  <div className="py-12 flex flex-col items-center justify-center text-center px-4">
                    <X className="w-10 h-10 text-on-surface-variant/40 mb-2" />
                    <h4 className="font-display text-sm font-bold text-primary">No learners found</h4>
                    <p className="font-sans text-xs text-on-surface-variant mt-1 mb-4">Try another name, college, or rank.</p>
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="px-4 py-2 border border-outline-variant rounded-lg font-sans text-xs font-bold hover:bg-surface-container transition-colors cursor-pointer"
                    >
                      Clear search
                    </button>
                  </div>
                ) : (
                  filteredStudents.map((student) => (
                    <button
                      key={student.name}
                      onClick={() => setSelectedProfile(student)}
                      className="w-full flex items-center text-left p-3 hover:bg-surface-container-low rounded-xl transition-all group bg-white border border-transparent border-b-outline-variant/30 mb-1 min-h-[56px] cursor-pointer"
                    >
                      <div className="w-12 text-center flex flex-col items-center justify-center shrink-0">
                        <span className="font-sans text-xs font-bold text-on-surface-variant group-hover:text-primary transition-colors">
                          {student.rank}
                        </span>
                        {student.trend > 0 ? (
                          <span className="text-[8px] text-[#009668] font-bold flex items-center">
                            <ChevronUp className="w-2.5 h-2.5" />
                            {student.trend}
                          </span>
                        ) : student.trend < 0 ? (
                          <span className="text-[8px] text-error font-bold flex items-center">
                            <ChevronDown className="w-2.5 h-2.5" />
                            {Math.abs(student.trend)}
                          </span>
                        ) : (
                          <span className="text-[8px] text-on-surface-variant/40 font-bold flex items-center">
                            <Minus className="w-2 h-2" />
                          </span>
                        )}
                      </div>

                      {student.img ? (
                        <img 
                          alt={student.name} 
                          src={student.img} 
                          className="w-9 h-9 rounded-full object-cover ml-2 mr-4 border border-outline-variant/50 shadow-sm shrink-0" 
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-surface-container-highest ml-2 mr-4 flex items-center justify-center font-bold text-primary border border-outline-variant text-[10px] shrink-0">
                          {student.name.substring(0, 2).toUpperCase()}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <h4 className="font-sans text-xs font-bold text-primary truncate group-hover:text-primary transition-colors">
                          {student.name}
                        </h4>
                        <p className="text-[10px] text-on-surface-variant font-medium truncate">{student.college}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-sans text-sm font-extrabold text-primary">{student.pts}</div>
                        <div className="text-[9px] text-on-surface-variant uppercase font-bold tracking-wider">Pts</div>
                      </div>
                    </button>
                  ))
                )}
              </div>

            </div>
          </section>

        </div>

      </main>

      {/* User profile drawer overlay */}
      {selectedProfile && (
        <div className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-50 flex justify-end animate-fade-in">
          <div className="w-full max-w-md bg-white h-full p-8 shadow-xl flex flex-col justify-between border-l border-outline-variant font-sans">
            <div>
              <div className="flex justify-between items-center mb-8 border-b border-outline-variant/40 pb-4">
                <h3 className="font-display text-lg font-bold text-primary">Student Profile</h3>
                <button 
                  onClick={() => setSelectedProfile(null)}
                  className="p-1.5 rounded-full hover:bg-surface-container-high cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center mb-8">
                {selectedProfile.img ? (
                  <img src={selectedProfile.img} alt={selectedProfile.name} className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-outline-variant shadow-md" />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-surface-container-high flex items-center justify-center font-display text-2xl font-black text-primary mx-auto mb-4 border border-outline-variant">
                    {selectedProfile.name.substring(0, 2).toUpperCase()}
                  </div>
                )}
                <h4 className="font-display text-xl font-bold text-primary">{selectedProfile.name}</h4>
                <p className="text-xs text-on-surface-variant mt-1 font-bold">{selectedProfile.college}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-surface-container-low/60 rounded-xl p-4 border border-outline-variant/40 text-center">
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider block mb-1">XP Points</span>
                  <span className="font-display text-lg font-black text-primary">{selectedProfile.pts}</span>
                </div>
                <div className="bg-surface-container-low/60 rounded-xl p-4 border border-outline-variant/40 text-center">
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider block mb-1">Daily Streak</span>
                  <span className="font-display text-lg font-black text-primary flex items-center justify-center gap-1">
                    <Flame className="w-4 h-4 text-secondary-container fill-secondary-container" />
                    {selectedProfile.streak} days
                  </span>
                </div>
                <div className="bg-surface-container-low/60 rounded-xl p-4 border border-outline-variant/40 text-center">
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider block mb-1">Accuracy</span>
                  <span className="font-display text-lg font-black text-primary">{selectedProfile.acc}</span>
                </div>
                <div className="bg-surface-container-low/60 rounded-xl p-4 border border-outline-variant/40 text-center">
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider block mb-1">Solved Qs</span>
                  <span className="font-display text-lg font-black text-primary">{selectedProfile.q}</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setSelectedProfile(null)}
              className="w-full py-3 bg-primary text-on-primary rounded-xl font-sans text-xs font-bold uppercase tracking-wider hover:scale-[0.98] transition-transform cursor-pointer"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
