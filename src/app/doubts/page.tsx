"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore, Doubt } from "@/store/useStore";
import SideNav from "@/components/layout/SideNav";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Search, 
  ChevronUp, 
  ChevronDown, 
  MessageSquare, 
  CheckCircle2, 
  Plus, 
  X,
  Tag,
  AlertCircle,
  HelpCircle
} from "lucide-react";
import Link from "next/link";

const doubtSchema = z.object({
  title: z.string().min(10, { message: "Title must be at least 10 characters" }),
  content: z.string().min(20, { message: "Please describe your issue in at least 20 characters" }),
  tagsString: z.string().min(2, { message: "Please enter at least one tag (comma-separated)" }),
});

type DoubtFormData = z.infer<typeof doubtSchema>;

export default function DoubtsFeed() {
  const router = useRouter();
  const { user, doubts, addDoubt, upvoteDoubt } = useStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("ALL"); // ALL, UNSOLVED, MY_DOUBTS
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"newest" | "upvotes">("newest");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DoubtFormData>({
    resolver: zodResolver(doubtSchema),
    defaultValues: {
      title: "",
      content: "",
      tagsString: "",
    },
  });

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  if (!user) return null;

  // Handle doubt posting
  const onSubmitDoubt = (data: DoubtFormData) => {
    const tagsArray = data.tagsString
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    addDoubt(data.title, data.content, tagsArray);
    setIsModalOpen(false);
    reset();
  };

  // Filter & Sort Doubts
  const filteredDoubts = doubts
    .filter((doubt) => {
      // Search matches
      const matchesSearch = 
        doubt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doubt.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doubt.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      // Filter matches
      let matchesFilter = true;
      if (selectedFilter === "UNSOLVED") matchesFilter = !doubt.solved;
      if (selectedFilter === "MY_DOUBTS") matchesFilter = doubt.author === user.name;

      // Tag matches
      const matchesTag = selectedTag ? doubt.tags.includes(selectedTag) : true;

      return matchesSearch && matchesFilter && matchesTag;
    })
    .sort((a, b) => {
      if (sortBy === "upvotes") {
        return b.upvotes - a.upvotes;
      }
      // fallback to newest (standard order)
      return 0; // doubts are seeded in reverse chronological order
    });

  // Extract all unique tags for filter chips
  const allTags = Array.from(
    new Set(doubts.flatMap((d) => d.tags))
  );

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <SideNav />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-6 md:p-10 max-w-5xl mx-auto pb-24">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 mt-12 md:mt-0">
          <div>
            <h2 className="font-display text-4xl font-extrabold text-primary mb-2">
              Community Doubts
            </h2>
            <p className="font-sans text-sm text-on-surface-variant">
              Help peers or get your questions answered by the college community.
            </p>
          </div>
          
          {/* Search bar */}
          <div className="w-full md:w-80 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search doubts..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-full py-2.5 pl-11 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans text-xs font-semibold"
            />
          </div>
        </div>

        {/* Filter Controls & Sort Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-outline-variant pb-4">
          <div className="flex flex-wrap gap-2.5">
            <button 
              onClick={() => { setSelectedFilter("ALL"); setSelectedTag(null); }}
              className={`px-4 py-2 rounded-full font-sans text-[10px] font-extrabold uppercase transition-all tracking-wider cursor-pointer border ${
                selectedFilter === "ALL" && !selectedTag
                  ? "bg-primary text-on-primary border-primary" 
                  : "bg-surface-container-lowest border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
              }`}
            >
              All Doubts
            </button>
            <button 
              onClick={() => { setSelectedFilter("UNSOLVED"); setSelectedTag(null); }}
              className={`px-4 py-2 rounded-full font-sans text-[10px] font-extrabold uppercase transition-all tracking-wider cursor-pointer border ${
                selectedFilter === "UNSOLVED"
                  ? "bg-primary text-on-primary border-primary" 
                  : "bg-surface-container-lowest border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
              }`}
            >
              Unsolved
            </button>
            <button 
              onClick={() => { setSelectedFilter("MY_DOUBTS"); setSelectedTag(null); }}
              className={`px-4 py-2 rounded-full font-sans text-[10px] font-extrabold uppercase transition-all tracking-wider cursor-pointer border ${
                selectedFilter === "MY_DOUBTS"
                  ? "bg-primary text-on-primary border-primary" 
                  : "bg-surface-container-lowest border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
              }`}
            >
              My Doubts
            </button>

            {/* Render unique tags */}
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-4 py-2 rounded-full font-sans text-[10px] font-extrabold uppercase transition-all tracking-wider cursor-pointer border ${
                  selectedTag === tag
                    ? "bg-secondary-container text-on-secondary-container border-secondary-container"
                    : "bg-surface-container-lowest border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* Sort selection */}
          <div className="flex items-center gap-2">
            <span className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "newest" | "upvotes")}
              className="bg-surface-container-lowest border border-outline-variant rounded-lg px-2.5 py-1.5 font-sans text-xs font-semibold focus:outline-none focus:border-primary"
            >
              <option value="newest">Newest</option>
              <option value="upvotes">Most Upvoted</option>
            </select>
          </div>
        </div>

        {/* Doubts Feed */}
        <div className="space-y-4">
          {filteredDoubts.length === 0 ? (
            <div className="text-center py-16 bg-surface-container-lowest border border-outline-variant rounded-2xl">
              <HelpCircle className="w-12 h-12 mx-auto text-on-surface-variant mb-3 opacity-55" />
              <h3 className="font-display text-lg font-bold text-primary mb-1">No doubts found</h3>
              <p className="font-sans text-xs text-on-surface-variant">Be the first to post a question or refine your search query!</p>
            </div>
          ) : (
            filteredDoubts.map((doubt) => {
              const isUpvoted = doubt.upvotedBy.includes(user.id);
              
              return (
                <div 
                  key={doubt.id}
                  className="bento-card rounded-2xl p-6 relative flex gap-5 group"
                >
                  {/* Upvoting widget */}
                  <div className="flex flex-col items-center gap-1.5">
                    <button 
                      onClick={() => upvoteDoubt(doubt.id)}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        isUpvoted 
                          ? "bg-secondary-container border-secondary-container text-on-secondary-container" 
                          : "border-outline-variant hover:border-primary hover:bg-surface-container-high text-on-surface-variant hover:text-primary"
                      }`}
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <span className="font-sans text-xs font-extrabold text-primary">
                      {doubt.upvotes}
                    </span>
                  </div>

                  {/* Doubt Meta & Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2.5">
                      <Link href={`/doubts/${doubt.id}`} className="hover:text-secondary-container transition-colors">
                        <h3 className="font-display text-lg font-bold text-primary leading-snug truncate pr-2 group-hover:underline">
                          {doubt.title}
                        </h3>
                      </Link>
                      
                      {doubt.solved && (
                        <span className="shrink-0 flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 border border-emerald-200 rounded-md font-sans text-[9px] font-extrabold uppercase tracking-wider">
                          <CheckCircle2 className="w-3 h-3" />
                          Solved
                        </span>
                      )}
                    </div>

                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed line-clamp-2 mb-4">
                      {doubt.content}
                    </p>

                    {/* Footer Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-outline-variant/40">
                      {/* Tags */}
                      <div className="flex gap-1.5 flex-wrap">
                        {doubt.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="bg-surface-container-low border border-outline-variant/60 text-on-surface-variant px-2.5 py-0.5 rounded-md font-sans text-[10px] font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Author & Reply Stats */}
                      <div className="flex items-center gap-3.5 text-on-surface-variant font-sans text-[10px] font-bold">
                        <Link 
                          href={`/doubts/${doubt.id}`} 
                          className="flex items-center gap-1.5 hover:text-primary transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{doubt.replies.length} replies</span>
                        </Link>
                        <span>•</span>
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-primary-fixed-dim text-primary flex items-center justify-center font-bold text-[8px] border border-outline-variant">
                            {doubt.authorInitials}
                          </div>
                          <span>by @{doubt.author}</span>
                        </div>
                        <span>•</span>
                        <span>{doubt.createdAt}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Floating Action Button (Ask Doubt) */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-24 md:bottom-8 right-6 md:right-8 bg-primary text-on-primary px-5 py-3.5 rounded-full shadow-lg hover:shadow-xl flex items-center gap-2 hover:scale-[1.03] active:scale-95 transition-all z-40 group cursor-pointer"
        >
          <Plus className="w-5 h-5 transition-transform group-hover:rotate-90 duration-200" />
          <span className="font-sans text-[10px] font-extrabold uppercase tracking-widest">
            Ask a Doubt
          </span>
        </button>

        {/* Ask Doubt Modal overlay */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-primary/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl w-full max-w-lg shadow-xl overflow-hidden flex flex-col p-6 animate-fade-in-up">
              
              {/* Modal Header */}
              <div className="flex justify-between items-center border-b border-outline-variant pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-secondary-container" />
                  <h3 className="font-display text-xl font-bold text-primary">Post a Doubt</h3>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-full hover:bg-surface-container-high transition-colors cursor-pointer text-on-surface-variant hover:text-primary"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form body */}
              <form onSubmit={handleSubmit(onSubmitDoubt)} className="space-y-4">
                <div>
                  <label className="block font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Doubt Title
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Memory leak in Custom Unique Pointer implementation" 
                    className={`w-full bg-background border rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans text-xs font-semibold ${
                      errors.title ? "border-error" : "border-outline-variant"
                    }`}
                    {...register("title")}
                  />
                  {errors.title && (
                    <p className="mt-1 text-[10px] text-error font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Description & Context
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="Explain the logic error, compiler parameters, input cases you tried, or runtime limits you encountered..." 
                    className={`w-full bg-background border rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans text-xs leading-relaxed font-semibold ${
                      errors.content ? "border-error" : "border-outline-variant"
                    }`}
                    {...register("content")}
                  />
                  {errors.content && (
                    <p className="mt-1 text-[10px] text-error font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.content.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Tags (comma-separated)
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. cpp, smart-pointers, memory" 
                    className={`w-full bg-background border rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans text-xs font-semibold ${
                      errors.tagsString ? "border-error" : "border-outline-variant"
                    }`}
                    {...register("tagsString")}
                  />
                  {errors.tagsString && (
                    <p className="mt-1 text-[10px] text-error font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.tagsString.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 border border-outline-variant rounded-lg font-sans text-[10px] font-extrabold uppercase hover:bg-background transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-primary text-on-primary rounded-lg font-sans text-[10px] font-extrabold uppercase hover:scale-98 transition-transform shadow-sm cursor-pointer"
                  >
                    {isSubmitting ? "Posting..." : "Post Doubt (+20 XP)"}
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}
