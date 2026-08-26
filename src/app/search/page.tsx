"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/store/useStore";
import SideNav from "@/components/layout/SideNav";
import { 
  Search as SearchIcon, 
  X, 
  Code, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Play, 
  ArrowRight,
  BookOpen,
  ArrowUp,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useStore();

  // Search input state
  const initialQuery = searchParams.get("q") || "Dynamic Programming";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveQuery(searchQuery.trim());
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  // Mock Modules Seed Data
  const modules = [
    {
      id: "mod-1",
      title: "DP Masterclass",
      info: "12 Chapters • 45 Questions",
      percent: 45,
      completedText: "45% Complete",
      hasStart: false
    },
    {
      id: "mod-2",
      title: "Top 50 DP Patterns",
      info: "Curated list by FAANG Engineers",
      percent: 0,
      completedText: "Not Started",
      hasStart: true
    }
  ];

  // Mock Transcripts Data
  const transcripts = [
    {
      id: "tr-1",
      name: "Sarah Jenkins",
      title: "L4 Software Engineer Interview",
      company: "Google",
      heading: '"The DP question that almost stumped me..."',
      desc: "I was asked a variation of the knapsack problem. Initially, I struggled with state definition, but working backwards from the recursive tree helped...",
      badge: "Offer Received",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWOqZMQvwcS6Y52VkUWGEIwvkof71aeZIN20jhxGEhigk6T1NIhn3l3ck7Gor8NNOYqSdORnRy3vJFsxegc7hmxHTLi9u3SS6milLtuvJAr1LnfRpTRUd4uKKfGF8taD4Mw3EX2_DNcFeu9KMlSnxN9wnI6_6-soGFdNoyjOlpH04g5ypfZxaLR2MZ4bfpHKVWyO8QHvvgjI1L0FdbEDNm8gimT7c-lAqpUVJMMA7WxI5NuetmIb1r"
    },
    {
      id: "tr-2",
      name: "David Chen",
      title: "E5 Senior Engineer Interview",
      company: "Meta",
      heading: '"Optimizing Space in 1D DP"',
      desc: "The interviewer explicitly asked to optimize the O(N) space complexity down to O(1) for a sequence alignment problem...",
      badge: "Offer Received",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2t2qWBxWZMN8h4gFwzZ2NmEUBd4aHuduph0lbE_FKxeF4a0Xvi_8q7pW7QW6O8NI7rVc5freXxfB4jKD6Xyvq5tLi3vBVJfns2WRq-I3xwi3TocmuaWcxHXovxEwZfUfm4adVz24muadMvvvx9MNbQHZgjKEKXpyN047Fq6wLbh7C_fpcTdd-Eo3sN3knQNdV4A93tC1EsrK5fsXzyX2ixWSbz_tQYizie_ODvn9s4vc_qMTSn8ck"
    }
  ];

  // Mock Community Doubts
  const communityDoubts = [
    {
      id: "doubt-memo",
      title: "How do you know when to use Memoization vs Tabulation?",
      desc: "I understand the concepts, but in an interview setting, I always freeze deciding whether to go top-down or bottom-up...",
      upvotes: 245,
      answers: 32
    },
    {
      id: "doubt-multi",
      title: "Struggling with Multi-dimensional DP states",
      desc: "When problems require tracking 3 or more variables (like stock buying with cooldown and transaction fees), my state transitions get extremely messy...",
      upvotes: 189,
      answers: 14
    }
  ];

  // Dynamic filter for practice questions
  const practiceQuestions = [
    { id: "q-2", name: "1143. Longest Common Subsequence", desc: "Given two strings text1 and text2, return the length of their longest common subsequence...", difficulty: "Medium", success: "58%" },
    { id: "q-3", name: "322. Coin Change", desc: "You are given an integer array coins representing coins of different denominations and an integer...", difficulty: "Hard", success: "42%" },
    { id: "q-4", name: "70. Climbing Stairs", desc: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either...", difficulty: "Easy", success: "85%" }
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <SideNav />

      {/* Main Canvas Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        
        {/* Top Header Search Bar */}
        <header className="fixed top-0 right-0 left-0 md:left-64 flex justify-between items-center px-6 py-4 z-40 bg-surface-container-lowest/80 border-b border-outline-variant backdrop-blur-md h-18">
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-2xl relative">
            <div className="relative flex items-center w-full">
              <SearchIcon className="absolute left-4 text-on-surface-variant w-4 h-4" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, questions..." 
                className="w-full bg-surface-container-low border border-outline-variant rounded-full py-2.5 pl-12 pr-10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans text-xs font-bold text-primary"
              />
              {searchQuery && (
                <button 
                  type="button" 
                  onClick={handleClear}
                  className="absolute right-4 text-on-surface-variant hover:text-primary cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>

          {/* User profile section */}
          <div className="flex items-center gap-4 ml-4">
            <Link 
              href="/profile"
              className="h-9 w-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs border border-outline-variant"
            >
              {user.name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2)}
            </Link>
          </div>
        </header>

        {/* Search Results Content */}
        <main className="flex-1 mt-20 p-6 md:p-10 max-w-7xl mx-auto w-full space-y-12 pb-24">
          <div className="mb-8">
            <h2 className="font-display text-4xl font-extrabold text-primary mb-2">
              Search Results
            </h2>
            <p className="font-sans text-sm text-on-surface-variant">
              Showing top results for "<strong>{activeQuery}</strong>"
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Practice Questions (Span 8) */}
            <section className="col-span-1 md:col-span-8 space-y-4">
              <div className="flex justify-between items-center border-b border-outline-variant pb-2.5">
                <h3 className="font-display text-lg font-bold text-primary flex items-center gap-2">
                  <Code className="w-5 h-5 text-secondary-container" />
                  Practice Questions
                </h3>
                <Link 
                  href="/practice" 
                  className="font-sans text-[10px] font-extrabold uppercase text-secondary-container hover:underline flex items-center gap-1"
                >
                  View All (42) <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {practiceQuestions.map((q) => (
                  <div 
                    key={q.id}
                    className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 bento-shadow bento-hover flex justify-between items-start"
                  >
                    <div>
                      <h4 className="font-sans text-sm font-bold text-primary mb-1">
                        {q.name}
                      </h4>
                      <p className="font-sans text-xs text-on-surface-variant mb-3 leading-relaxed">
                        {q.desc}
                      </p>
                      
                      <div className="flex items-center gap-3 font-sans">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          q.difficulty === "Easy"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                            : q.difficulty === "Medium"
                            ? "bg-blue-50 text-blue-600 border-blue-200"
                            : "bg-red-50 text-red-600 border-red-200"
                        }`}>
                          {q.difficulty}
                        </span>
                        <span className="text-[10px] text-on-surface-variant font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100" />
                          {q.success} Success
                        </span>
                      </div>
                    </div>

                    <Link 
                      href={`/practice/question/${q.id}`}
                      className="w-9 h-9 shrink-0 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary hover:bg-surface-container-high transition-colors cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            {/* Modules (Span 4) */}
            <section className="col-span-1 md:col-span-4 space-y-4">
              <div className="flex justify-between items-center border-b border-outline-variant pb-2.5">
                <h3 className="font-display text-lg font-bold text-primary flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-secondary-container" />
                  Modules
                </h3>
                <Link 
                  href="/roadmap"
                  className="font-sans text-[10px] font-extrabold uppercase text-secondary-container hover:underline"
                >
                  All (5)
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {modules.map((mod) => (
                  <div 
                    key={mod.id}
                    className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 bento-shadow bento-hover flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-10 w-10 rounded-xl bg-surface-container-low mb-3 flex items-center justify-center border border-outline-variant">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="font-display text-base font-bold text-primary mb-1">
                        {mod.title}
                      </h4>
                      <p className="font-sans text-[10px] text-on-surface-variant mb-4 font-bold">
                        {mod.info}
                      </p>
                    </div>

                    <div>
                      {mod.hasStart ? (
                        <button className="w-full py-2.5 border border-primary text-primary rounded-xl font-sans text-xs font-bold hover:bg-primary hover:text-on-primary transition-all active:scale-[0.98] cursor-pointer">
                          Start Module
                        </button>
                      ) : (
                        <div>
                          <div className="w-full bg-surface-container-high h-1.5 rounded-full mb-2 overflow-hidden">
                            <div className="bg-secondary-container h-full rounded-full" style={{ width: `${mod.percent}%` }} />
                          </div>
                          <p className="font-sans text-[10px] text-right text-on-surface-variant font-bold">
                            {mod.completedText}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Interview Transcripts (Span 6) */}
            <section className="col-span-1 md:col-span-6 space-y-4 mt-4">
              <div className="flex justify-between items-center border-b border-outline-variant pb-2.5">
                <h3 className="font-display text-lg font-bold text-primary flex items-center gap-2">
                  <FileText className="w-5 h-5 text-secondary-container" />
                  Interview Transcripts
                </h3>
                <Link 
                  href="#"
                  className="font-sans text-[10px] font-extrabold uppercase text-secondary-container hover:underline"
                >
                  View All (18)
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {transcripts.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 bento-shadow bento-hover"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-9 w-9 rounded-full overflow-hidden border border-outline-variant">
                        <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-sans text-xs font-extrabold text-primary leading-none">
                          {item.name}
                        </h4>
                        <p className="font-sans text-[9px] text-on-surface-variant font-bold mt-1">
                          {item.title}
                        </p>
                      </div>
                      <span className="ml-auto px-3 py-1 bg-surface-container-low border border-outline-variant rounded-full font-sans text-[9px] font-extrabold text-primary uppercase tracking-wider">
                        {item.company}
                      </span>
                    </div>

                    <h5 className="font-sans text-sm font-extrabold text-primary mb-2">
                      {item.heading}
                    </h5>
                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed line-clamp-2 mb-4">
                      {item.desc}
                    </p>
                    
                    <span className="inline-block bg-tertiary-fixed-dim/20 text-on-tertiary-container border border-tertiary-fixed-dim/20 px-2.5 py-0.5 rounded font-sans text-[9px] font-bold uppercase tracking-wider">
                      {item.badge}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Community Doubts (Span 6) */}
            <section className="col-span-1 md:col-span-6 space-y-4 mt-4">
              <div className="flex justify-between items-center border-b border-outline-variant pb-2.5">
                <h3 className="font-display text-lg font-bold text-primary flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-secondary-container" />
                  Community Doubts
                </h3>
                <Link 
                  href="/doubts"
                  className="font-sans text-[10px] font-extrabold uppercase text-secondary-container hover:underline"
                >
                  View All (120+)
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {communityDoubts.map((doubt) => (
                  <div 
                    key={doubt.id}
                    className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 bento-shadow bento-hover"
                  >
                    <h4 className="font-display text-sm font-bold text-primary mb-2 leading-snug">
                      {doubt.title}
                    </h4>
                    <p className="font-sans text-xs text-on-surface-variant line-clamp-2 mb-4">
                      {doubt.desc}
                    </p>
                    <div className="flex items-center gap-4 text-[10px] font-bold text-on-surface-variant border-t border-outline-variant/40 pt-3">
                      <span className="flex items-center gap-1">
                        <ArrowUp className="w-3.5 h-3.5 text-secondary-container" />
                        {doubt.upvotes} Upvotes
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5" />
                        {doubt.answers} Answers
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </main>

      </div>
    </div>
  );
}

// Default export wrapping SearchContent in Suspense to prevent build prerender bailouts
export default function SearchResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse font-sans text-xs font-bold text-on-surface-variant uppercase tracking-widest">
          Loading Search...
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
