"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import SideNav from "@/components/layout/SideNav";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  User, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  History,
  Flame,
  Code,
  Lock,
  Share2,
  Edit,
  Sliders,
  Clock
} from "lucide-react";
import Link from "next/link";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  targetRole: z.string().min(2, { message: "Please specify a target role" }),
  targetLevel: z.string(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function StudentProfilePage() {
  const router = useRouter();
  const { user, saveOnboarding } = useStore();
  
  const [activeTab, setActiveTab] = useState<"portfolio" | "settings">("portfolio");
  const [successMsg, setSuccessMsg] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!user) {
      router.push("/auth");
      return;
    }

    setValue("name", user.name);
    setValue("targetRole", user.targetRole);
    setValue("targetLevel", user.targetLevel);
    setSelectedCompanies(user.targetCompanies);
  }, [user, setValue, router]);

  if (!mounted) return null;

  if (!user) return null;

  const handleToggleCompany = (companyName: string) => {
    if (selectedCompanies.includes(companyName)) {
      setSelectedCompanies(selectedCompanies.filter((c) => c !== companyName));
    } else {
      setSelectedCompanies([...selectedCompanies, companyName]);
    }
  };

  const onSubmitProfile = (data: ProfileFormData) => {
    saveOnboarding(selectedCompanies, data.targetRole, data.targetLevel);
    setSuccessMsg("Profile and target settings updated successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const companiesList = ["TCS", "Google", "Infosys", "Wipro", "Amazon", "Microsoft"];

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <SideNav />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-6 md:p-10 max-w-5xl mx-auto pb-24">
        
        {/* Tab Switcher Headers */}
        <div className="flex items-center justify-between border-b border-outline-variant/40 pb-4 mb-8 mt-12 md:mt-0">
          <div>
            <h2 className="font-display text-4xl font-extrabold text-primary mb-1">
              {activeTab === "portfolio" ? "Placement Portfolio" : "Profile Settings"}
            </h2>
            <p className="font-sans text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
              {activeTab === "portfolio" ? "Student Resume & Stats Insights" : "Update Account Parameters"}
            </p>
          </div>

          <div className="flex bg-surface-container border border-outline-variant rounded-xl p-1 shadow-sm font-sans text-xs font-bold shrink-0">
            <button
              onClick={() => setActiveTab("portfolio")}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "portfolio" 
                  ? "bg-white text-primary shadow-sm" 
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Resume & Stats</span>
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "settings" 
                  ? "bg-white text-primary shadow-sm" 
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Edit Settings</span>
            </button>
          </div>
        </div>

        {/* Tab Content 1: Placement Portfolio (Alex Mercer design) */}
        {activeTab === "portfolio" && (
          <div className="space-y-8 animate-fade-in-up">
            
            {/* Header profile block */}
            <section className="bento-card bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <div className="relative">
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-display text-4xl font-black border-4 border-white shadow-md">
                  {user.name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2)}
                </div>
                <div className="absolute bottom-1 right-1 bg-[#10B981] text-white rounded-full p-1.5 border-2 border-white shadow-sm flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-white fill-current" />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left flex flex-col justify-center">
                <h2 className="font-display text-2xl md:text-3xl font-extrabold text-primary mb-1">
                  {user.name}
                </h2>
                <p className="font-sans text-xs text-on-surface-variant mb-4 font-semibold uppercase tracking-wide">
                  {user.targetRole || "Software Engineer"}, Stanford University '25
                </p>
                
                <div className="bg-surface-container-low border border-outline-variant p-4 rounded-xl inline-block w-full md:w-auto font-sans">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mr-6">
                      Placement Readiness Score
                    </span>
                    <span className="font-display text-2xl font-black text-secondary-container">
                      85<span className="text-sm font-semibold text-on-surface-variant">/100</span>
                    </span>
                  </div>
                  <div className="w-full md:w-64 bg-outline-variant/40 h-2.5 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary-container rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>
              </div>

              <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto mt-4 md:mt-0 justify-center">
                <button 
                  onClick={() => setActiveTab("settings")}
                  className="flex-grow md:flex-grow-0 px-6 py-2.5 bg-primary text-on-primary font-sans text-xs font-bold rounded-lg hover:scale-[0.98] transition-transform border border-primary flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
                <button 
                  className="flex-grow md:flex-grow-0 px-6 py-2.5 bg-transparent text-primary font-sans text-xs font-bold rounded-lg hover:scale-[0.98] transition-transform border border-primary flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </section>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Performance Trend SVG Chart Card (Spans 8 columns) */}
              <section className="bento-card col-span-1 md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.02)] min-h-[350px]">
                <div className="flex justify-between items-center mb-6 border-b border-outline-variant/40 pb-4">
                  <h3 className="font-display text-lg font-bold text-primary flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-secondary-container" />
                    Performance Trends
                  </h3>
                  <select className="bg-surface border border-outline-variant text-[10px] font-sans font-bold rounded-lg px-2.5 py-1.5 text-on-surface-variant focus:outline-none focus:border-primary">
                    <option>Last 30 Days</option>
                    <option>Last 3 Months</option>
                    <option>All Time</option>
                  </select>
                </div>

                {/* SVG Line Chart Representation */}
                <div className="flex-grow min-h-[200px] relative w-full rounded-xl overflow-hidden border border-outline-variant/60 flex flex-col justify-end p-4 bg-gradient-to-tr from-surface-container-low to-surface-container-lowest">
                  
                  {/* Abstract Background Columns */}
                  <div className="absolute inset-0 flex items-end px-4 pb-4 gap-2 opacity-30">
                    <div className="w-1/12 bg-outline-variant rounded-t-sm h-[30%]" />
                    <div className="w-1/12 bg-outline-variant rounded-t-sm h-[45%]" />
                    <div className="w-1/12 bg-outline-variant rounded-t-sm h-[40%]" />
                    <div className="w-1/12 bg-outline-variant rounded-t-sm h-[60%]" />
                    <div className="w-1/12 bg-outline-variant rounded-t-sm h-[55%]" />
                    <div className="w-1/12 bg-outline-variant rounded-t-sm h-[75%]" />
                    <div className="w-1/12 bg-outline-variant rounded-t-sm h-[70%]" />
                    <div className="w-1/12 bg-outline-variant rounded-t-sm h-[85%]" />
                  </div>

                  {/* SVG overlay line */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <path 
                      d="M 0,70 L 12.5,55 L 25,60 L 37.5,40 L 50,45 L 62.5,25 L 75,30 L 87.5,15 L 100,20" 
                      fill="none" 
                      stroke="#ff5c36" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2.5"
                    />
                    <path 
                      d="M 0,70 L 12.5,55 L 25,60 L 37.5,40 L 50,45 L 62.5,25 L 75,30 L 87.5,15 L 100,20 L 100,100 L 0,100 Z" 
                      fill="url(#trend-gradient)" 
                      opacity="0.15"
                    />
                    <defs>
                      <linearGradient id="trend-gradient" x1="0%" x2="0%" y1="0%" y2="100%">
                        <stop offset="0%" stopColor="#ff5c36" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div className="z-10 relative self-end bg-white border border-outline-variant/60 p-3 rounded-lg shadow-sm font-sans text-right">
                    <p className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Current Accuracy</p>
                    <p className="font-display text-2xl font-black text-primary">78%</p>
                  </div>
                </div>
              </section>

              {/* Achievements & Badges (Spans 4 columns) */}
              <section className="bento-card col-span-1 md:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 flex flex-col shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                <div className="flex justify-between items-center mb-6 border-b border-outline-variant/40 pb-4">
                  <h3 className="font-display text-lg font-bold text-primary flex items-center gap-2">
                    <Award className="w-5 h-5 text-secondary-container" />
                    Achievements
                  </h3>
                </div>

                <div className="flex-grow flex flex-col gap-4 font-sans justify-center">
                  
                  {/* Badge 1 */}
                  <div className="flex items-center gap-3.5 p-3 rounded-xl border border-outline-variant/60 bg-surface-container-lowest hover:bg-surface-container-low transition-colors">
                    <div className="w-11 h-11 rounded-full bg-secondary-fixed flex items-center justify-center border border-secondary-container/20 shrink-0">
                      <Flame className="w-5 h-5 text-secondary-container fill-secondary-container" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-primary">Problem Solver</p>
                      <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">Solved 100+ Data Structure problems.</p>
                    </div>
                  </div>

                  {/* Badge 2 */}
                  <div className="flex items-center gap-3.5 p-3 rounded-xl border border-outline-variant/60 bg-surface-container-lowest hover:bg-surface-container-low transition-colors">
                    <div className="w-11 h-11 rounded-full bg-tertiary-fixed flex items-center justify-center border border-on-tertiary-container/20 shrink-0">
                      <Code className="w-5 h-5 text-on-tertiary-container" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-primary">Code Ninja</p>
                      <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">Top 5% in weekly algorithmic contests.</p>
                    </div>
                  </div>

                  {/* Badge 3 (Locked) */}
                  <div className="flex items-center gap-3.5 p-3 rounded-xl border border-dashed border-outline-variant bg-surface-container-low/60 opacity-60 shrink-0 select-none">
                    <div className="w-11 h-11 rounded-full bg-surface flex items-center justify-center border border-outline-variant shrink-0">
                      <Lock className="w-4.5 h-4.5 text-on-surface-variant" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-primary">Master Architect</p>
                      <p className="text-[10px] text-on-surface-variant/75 font-medium mt-0.5">Complete system design to unlock.</p>
                    </div>
                  </div>

                </div>
              </section>

              {/* Recent Activity List (Spans 12 columns) */}
              <section className="bento-card col-span-1 md:col-span-12 bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                <div className="flex justify-between items-center mb-6 border-b border-outline-variant/40 pb-4">
                  <h3 className="font-display text-lg font-bold text-primary flex items-center gap-2">
                    <History className="w-5 h-5 text-secondary-container" />
                    Recent Activity
                  </h3>
                  <Link href="/practice" className="font-sans text-[10px] font-extrabold uppercase text-secondary-container hover:underline">
                    View All
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
                  
                  {/* Activity Item 1 */}
                  <div className="p-4.5 rounded-xl border border-outline-variant hover:border-primary transition-colors cursor-pointer group flex flex-col gap-2.5">
                    <div className="flex justify-between items-start">
                      <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-[8px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                        Solved
                      </span>
                      <span className="text-[9px] text-on-surface-variant font-bold">2 hours ago</span>
                    </div>
                    <p className="text-xs font-bold text-primary group-hover:text-secondary-container transition-colors">
                      Merge K Sorted Lists
                    </p>
                    <p className="text-[10px] text-on-surface-variant font-semibold">Linked Lists • Hard</p>
                    <div className="mt-2 text-[10px] flex items-center gap-1 text-on-surface-variant font-bold">
                      <Clock className="w-3.5 h-3.5" /> 
                      <span>14m 32s</span>
                    </div>
                  </div>

                  {/* Activity Item 2 */}
                  <div className="p-4.5 rounded-xl border border-outline-variant hover:border-primary transition-colors cursor-pointer group flex flex-col gap-2.5">
                    <div className="flex justify-between items-start">
                      <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-[8px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                        Solved
                      </span>
                      <span className="text-[9px] text-on-surface-variant font-bold">Yesterday</span>
                    </div>
                    <p className="text-xs font-bold text-primary group-hover:text-secondary-container transition-colors">
                      LRU Cache Design
                    </p>
                    <p className="text-[10px] text-on-surface-variant font-semibold">System Design • Medium</p>
                    <div className="mt-2 text-[10px] flex items-center gap-1 text-on-surface-variant font-bold">
                      <Clock className="w-3.5 h-3.5" /> 
                      <span>22m 10s</span>
                    </div>
                  </div>

                  {/* Activity Item 3 */}
                  <div className="p-4.5 rounded-xl border border-outline-variant hover:border-primary transition-colors cursor-pointer group flex flex-col gap-2.5">
                    <div className="flex justify-between items-start">
                      <span className="bg-red-50 text-red-600 border border-red-200 text-[8px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                        Attempted
                      </span>
                      <span className="text-[9px] text-on-surface-variant font-bold">Yesterday</span>
                    </div>
                    <p className="text-xs font-bold text-primary group-hover:text-secondary-container transition-colors">
                      Trapping Rain Water
                    </p>
                    <p className="text-[10px] text-on-surface-variant font-semibold">Arrays • Hard</p>
                    <div className="mt-2 text-[10px] flex items-center gap-1 text-red-600 font-bold">
                      <Lock className="w-3.5 h-3.5 text-red-600" />
                      <span>Compilation Error</span>
                    </div>
                  </div>

                </div>
              </section>

            </div>

          </div>
        )}

        {/* Tab Content 2: Settings editable form */}
        {activeTab === "settings" && (
          <div className="space-y-6 animate-fade-in-up">
            
            {/* Success Alert */}
            {successMsg && (
              <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-500/20 rounded-xl flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <p className="text-xs font-semibold">{successMsg}</p>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Form panel */}
              <div className="lg:col-span-8 space-y-6">
                <div className="bento-card bg-surface-container-lowest border border-outline-variant rounded-2xl p-6">
                  <h3 className="font-display text-lg font-bold text-primary mb-5 border-b border-outline-variant/40 pb-3 flex items-center gap-2">
                    <User className="w-5 h-5 text-secondary-container" />
                    Personal Profile Details
                  </h3>

                  <form onSubmit={handleSubmit(onSubmitProfile)} className="space-y-4">
                    <div>
                      <label className="block font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                        Display Name
                      </label>
                      <input 
                        type="text" 
                        className={`w-full bg-background border rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans text-xs font-semibold ${
                          errors.name ? "border-error" : "border-outline-variant"
                        }`}
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="mt-1 text-[10px] text-error font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                        Target Role Track
                      </label>
                      <input 
                        type="text" 
                        placeholder="e.g. Software Engineer"
                        className={`w-full bg-background border rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans text-xs font-semibold ${
                          errors.targetRole ? "border-error" : "border-outline-variant"
                        }`}
                        {...register("targetRole")}
                      />
                      {errors.targetRole && (
                        <p className="mt-1 text-[10px] text-error font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.targetRole.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                        Practice Level
                      </label>
                      <select 
                        className="w-full bg-background border border-outline-variant rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans text-xs font-semibold"
                        {...register("targetLevel")}
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>

                    {/* Target companies checklist */}
                    <div className="pt-2">
                      <label className="block font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-3">
                        Target Companies
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {companiesList.map((company) => {
                          const isSelected = selectedCompanies.includes(company);
                          return (
                            <button
                              key={company}
                              type="button"
                              onClick={() => handleToggleCompany(company)}
                              className={`py-2.5 px-4 rounded-xl border text-center transition-all cursor-pointer font-sans text-xs font-bold ${
                                isSelected 
                                  ? "bg-primary text-on-primary border-primary" 
                                  : "bg-surface-container-lowest border-outline-variant hover:border-primary text-on-surface-variant hover:text-primary"
                              }`}
                            >
                              {company}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-outline-variant/40 mt-6 flex justify-end">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2.5 bg-primary text-on-primary rounded-lg font-sans text-[10px] font-extrabold uppercase hover:scale-98 transition-transform shadow-sm cursor-pointer"
                      >
                        {isSubmitting ? "Saving..." : "Save Settings"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Side levels stats */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bento-card bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 text-center">
                  <h3 className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-4 text-left">
                    CURRENT RATING
                  </h3>
                  
                  <div className="w-16 h-16 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-display text-2xl font-black mx-auto mb-3 shadow-sm">
                    {user.level}
                  </div>
                  <h4 className="font-display text-lg font-bold text-primary mb-1">
                    Level {user.level} Student
                  </h4>
                  <p className="font-sans text-[10px] font-bold text-on-surface-variant uppercase mb-4">
                    {user.xp} Total XP
                  </p>

                  <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden mb-2">
                    <div 
                      className="bg-primary h-full rounded-full transition-all duration-300"
                      style={{ width: `${((user.xp % 200) / 200) * 100}%` }}
                    />
                  </div>
                  <p className="font-sans text-[10px] text-on-surface-variant font-semibold">
                    {200 - (user.xp % 200)} XP to reach Level {user.level + 1}
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>
    </div>
  );
}
