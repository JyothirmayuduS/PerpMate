"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useStore, Doubt } from "@/store/useStore";
import SideNav from "@/components/layout/SideNav";
import { 
  ArrowLeft, 
  MessageSquare, 
  CheckCircle2, 
  Send, 
  ChevronUp, 
  ChevronDown, 
  AlertCircle,
  Share2,
  ChevronRight,
  Sparkles,
  Award
} from "lucide-react";
import Link from "next/link";

export default function DoubtDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const { user, doubts, addReply, upvoteDoubt } = useStore();

  const [doubt, setDoubt] = useState<Doubt | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [sortBy, setSortBy] = useState<"top" | "newest">("top");

  useEffect(() => {
    if (!user) {
      router.push("/auth");
      return;
    }

    const d = doubts.find((item) => item.id === id);
    if (d) {
      setDoubt(d);
    } else {
      router.push("/doubts");
    }
  }, [id, doubts, user, router]);

  if (!user || !doubt) return null;

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    if (replyContent.trim().length < 10) {
      setErrorMsg("Answer must be at least 10 characters long.");
      return;
    }

    setErrorMsg("");
    addReply(doubt.id, replyContent.trim());
    setReplyContent("");
  };

  const isUpvoted = doubt.upvotedBy.includes(user.id);

  // Sorting replies
  const sortedReplies = [...doubt.replies].sort((a, b) => {
    if (a.isSolution) return -1; // Solution always on top
    if (b.isSolution) return 1;
    if (sortBy === "top") {
      return b.upvotes - a.upvotes;
    }
    return 0; // standard order
  });

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <SideNav />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-6 md:p-10 max-w-4xl mx-auto pb-24">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-on-surface-variant mb-6 font-sans font-bold uppercase tracking-wider mt-12 md:mt-0">
          <Link className="hover:text-primary transition-colors" href="/doubts">Community</Link>
          <ChevronRight className="w-3.5 h-3.5 text-on-surface-variant/50" />
          <Link className="hover:text-primary transition-colors" href="/doubts">Doubts</Link>
          <ChevronRight className="w-3.5 h-3.5 text-on-surface-variant/50" />
          <span className="text-primary">{doubt.category}</span>
        </nav>

        {/* Original Post Article Card */}
        <article className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 md:p-8 mb-8 relative shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          {/* User metadata header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant flex items-center justify-center font-bold text-sm text-primary">
                {doubt.authorInitials}
              </div>
              <div>
                <div className="font-sans text-xs font-extrabold text-primary flex items-center gap-2">
                  {doubt.author}
                  <span className="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded text-[8px] uppercase font-bold tracking-wider">
                    OP
                  </span>
                </div>
                <div className="font-sans text-[10px] text-on-surface-variant font-medium mt-0.5">
                  Posted {doubt.createdAt}
                </div>
              </div>
            </div>
          </div>

          {/* Doubt Title */}
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-4 leading-snug">
            {doubt.title}
          </h2>

          {/* Doubt Description */}
          <div className="font-sans text-sm text-on-surface-variant leading-relaxed mb-6 whitespace-pre-line">
            {doubt.content}
          </div>

          {/* Code block if exists */}
          {doubt.codeBlock && (
            <div className="bg-inverse-surface text-inverse-on-surface rounded-xl p-5 mb-6 overflow-x-auto text-xs font-mono leading-relaxed shadow-inner">
              <pre><code>{doubt.codeBlock}</code></pre>
            </div>
          )}

          {/* Actions panel */}
          <div className="flex items-center gap-5 border-t border-outline-variant/40 pt-5">
            {/* Upvote widget */}
            <div className="flex items-center bg-surface-container-low rounded-full border border-outline-variant">
              <button 
                onClick={() => upvoteDoubt(doubt.id)}
                className={`p-2 hover:bg-surface-container-high transition-colors rounded-l-full flex items-center justify-center cursor-pointer ${
                  isUpvoted ? "text-secondary font-bold" : "text-on-surface-variant"
                }`}
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <span className="font-sans text-xs font-extrabold px-1 text-primary">
                {doubt.upvotes}
              </span>
              <button 
                className="p-2 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-r-full flex items-center justify-center cursor-pointer"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Tags */}
            <div className="hidden sm:flex gap-1.5 flex-wrap">
              {doubt.tags.map((tag) => (
                <span 
                  key={tag}
                  className="bg-surface-container-low border border-outline-variant/60 text-on-surface-variant px-2.5 py-0.5 rounded-md font-sans text-[10px] font-bold lowercase"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Share / Save */}
            <button className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors font-sans text-[10px] font-extrabold uppercase tracking-wider ml-auto">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </article>

        {/* Answers List Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-outline-variant/50 pb-3 mb-6">
            <h3 className="font-display text-xl font-bold text-primary flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              {doubt.replies.length} Answers
            </h3>
            
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "top" | "newest")}
              className="bg-surface-container-lowest border border-outline-variant rounded-lg px-2.5 py-1.5 font-sans text-xs font-bold text-primary focus:outline-none focus:border-primary"
            >
              <option value="top">Top Voted</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          <div className="flex flex-col gap-6">
            {sortedReplies.map((reply) => {
              const isSolution = reply.isSolution;
              const isExpert = reply.isExpert;
              
              let cardStyle = "bg-surface-container-lowest border-outline-variant";
              if (isSolution) {
                cardStyle = "bg-surface-container-lowest border-2 border-secondary-container/20 shadow-sm";
              }

              return (
                <div 
                  key={reply.id}
                  className={`bento-card rounded-2xl p-6 relative overflow-hidden ${cardStyle}`}
                >
                  {/* Left accent color for solution */}
                  {isSolution && (
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary-container" />
                  )}

                  {/* Solution Badge header */}
                  {isSolution && (
                    <div className="inline-flex items-center gap-1.5 bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full text-[10px] font-bold mb-4 border border-secondary/20 uppercase tracking-wide">
                      <CheckCircle2 className="w-3.5 h-3.5 text-secondary-container fill-white" />
                      <span>Marked as Solution by OP</span>
                    </div>
                  )}

                  {/* Reply User Meta */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {reply.avatarUrl ? (
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
                          <img src={reply.avatarUrl} alt={reply.author} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-surface-container-high text-primary flex items-center justify-center font-bold text-xs border border-outline-variant">
                          {reply.authorInitials}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-sans text-xs font-extrabold text-primary">
                            {reply.author}
                          </span>
                          {isExpert && (
                            <span className="inline-flex items-center gap-1 bg-tertiary-fixed-dim/20 text-on-tertiary-container px-2 py-0.5 rounded text-[8px] uppercase font-bold tracking-wider">
                              <Sparkles className="w-3 h-3 text-on-tertiary-container" />
                              Expert Verified
                            </span>
                          )}
                        </div>
                        <div className="font-sans text-[9px] text-on-surface-variant font-medium mt-0.5">
                          {reply.createdAt}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Reply Content */}
                  <div className="font-sans text-xs text-on-surface-variant leading-relaxed mb-6 whitespace-pre-wrap">
                    {reply.content}
                  </div>

                  {/* Reply voting */}
                  <div className="flex items-center gap-2 pt-4 border-t border-outline-variant/40">
                    <button className="flex items-center gap-1 px-3 py-1 rounded-lg border border-outline-variant hover:border-primary text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                      <ChevronUp className="w-3.5 h-3.5" />
                      <span className="font-sans text-[10px] font-bold">Upvote ({reply.upvotes})</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Answer Editor Panel */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm mt-8">
            <h4 className="font-display text-lg font-bold text-primary mb-3">
              Contribute an Answer
            </h4>

            {errorMsg && (
              <div className="mb-4 p-3 bg-error-container/30 border border-error/20 text-error rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <p className="text-xs font-semibold">{errorMsg}</p>
              </div>
            )}

            <form onSubmit={handleSubmitReply}>
              <textarea 
                rows={4}
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Share your explanation, stack trace diagnostics, code fixes, or diagram breakdowns..."
                className="w-full bg-background border border-outline-variant rounded-lg p-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans text-xs leading-relaxed font-semibold mb-4"
              />
              <button 
                type="submit"
                className="px-6 py-2.5 bg-primary text-on-primary rounded-xl font-sans text-[10px] font-extrabold uppercase hover:scale-98 transition-transform flex items-center gap-2 shadow-sm cursor-pointer ml-auto"
              >
                <span>Post Answer (+15 XP)</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

      </main>
    </div>
  );
}
