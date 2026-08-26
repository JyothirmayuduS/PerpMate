"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { ArrowRight, ArrowLeft, Check, Sparkles, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const companiesList = [
  { name: "TCS", logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9ZaNGzatGKUXkm9G_p0Shv-QQYAA1JqfcH7Z35J2DgiUe6UPw8jmHsnfr1oRFGnoo4ryjrIUwa1d-deEuONVGoIaC9EQ661N1pmi4b737gW4MPYoMp4tGOPPQiQv3_aswYQ5D1jxUgcSZKJoMt61YKL2dpWNHIqmEvMX06nthML8P7QMEPPWuR5IJHqbAQRlb3UFTu2IGMrw9Rb5bKTp1LykEwZuELOIXoKX7brjarHhnk09KMnZx" },
  { name: "Google", logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkOD41ygS2bct23E4M_otJcrxdZzUbgMbyRrrlLijmkxgJmV9gkY-ybPrmHbkxF4bEq_5AgpOiJRQVjuxCfjvLWRania_xguEf1zLnAQZkP-IhuEb99ZX0u9UXJN-ZcoEdCeZNtLlad0uwJp4BoYuTCrcQTVi29vioFLbpxzP3qvGTdQjPK-kLokv3E1Y0OsD7-Qq-KQVoKq7MZYuILpJQrPkqkLxI7J9oLUUI1tjxQlJA9qhickfC" },
  { name: "Infosys", logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAD3tZLt-9ogz_NIhvn7suTW0uwO6N3aeePGzY1nFIQzfOQdK4oyjZaHCApD4SYRnFqiEcZXFbjRVGwFR34r7m_WZRec307pY5TUXQxDw12llpdpEL0ePONi0DEzBsiw2ASeA5A9-nt592qlZr0ul6Ooy16465pxIZtMsizaNXdIwMhKYB1MjwJWSTTDHfVLj5LwXmKQzL19cTu38J4Q69ng_Dis6aK_ht9HrVtb9mbKk_jiTg8kUyz" },
  { name: "Wipro", logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAt-OIXXnJRx0BEjsvUik4tuz3Hc-EkJ4XkHQB4pFVH5Cscxg6v8kesjSVeBBg7gWMZJZz8FgHQ38BAA_FuTLIypO9BqgvkDuTq9kkpun_c6aif-3J2DVJKLaO9xEwNh9MIT1tXUFS1oOrCz0eFZ4WFWHo9bNJbNN0iDqcDvrEe_BuK6VVvyzAOzZalUEoMJeZ8nyGMuYD1q6rJoHqey0UxGClM0_HiGpS9e6FQEgbfgeJZnscVoCB" },
  { name: "Amazon", logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEqQWYaTXWAswgTK22OwvMfu_nxv7R0XyEMCqO8Ln4HaLBFvlJQwcUrh-JGFvnsCsegb8yoLfecb4gLLmL8rE5wwDVCGObQMd3lcl6F3kU6BYgvj0hVE04qWeAfrpjoqtLx1lFlIfww0bySpP4OBkuEQHlcUGZU4iRvxTltGU12WSzgoagwEQaRcKyJX1_ShLGyNvy7yPEdovRYEvp178CNf_11gvA50DVUDWNoTBIX00DPl97-hiT" },
  { name: "Microsoft", logo: "" }
];

const rolesList = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Data Scientist",
  "Product Manager",
  "Fullstack Engineer"
];

const levelsList = [
  { name: "Beginner", desc: "No coding history, focusing on basics" },
  { name: "Intermediate", desc: "Know variables & arrays, practicing structures" },
  { name: "Advanced", desc: "Solving graphs & DP, focusing on system speed" }
];

const yearsList = [
  { 
    year: "1", 
    label: "1st Year", 
    subtitle: "Just started college",
    emoji: "🌱",
    timeLeft: "3+ years",
    tip: "You have time — master fundamentals first"
  },
  { 
    year: "2", 
    label: "2nd Year",
    subtitle: "Building your foundation",
    emoji: "📚",
    timeLeft: "2+ years",
    tip: "Start DSA now alongside academics"
  },
  { 
    year: "3", 
    label: "3rd Year",
    subtitle: "Internship season approaching",
    emoji: "⚡",
    timeLeft: "~1 year",
    tip: "Balance DSA + projects + interviews"
  },
  { 
    year: "4", 
    label: "Final Year",
    subtitle: "Placement season is here!",
    emoji: "🚀",
    timeLeft: "Urgent",
    tip: "Intensive prep — every week counts"
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user, saveOnboarding } = useStore();
  const [step, setStep] = useState(1);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  if (!user) {
    if (typeof window !== "undefined") router.push("/auth");
    return null;
  }

  const handleToggleCompany = (companyName: string) => {
    if (selectedCompanies.includes(companyName)) {
      setSelectedCompanies(selectedCompanies.filter((c) => c !== companyName));
    } else {
      setSelectedCompanies([...selectedCompanies, companyName]);
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      saveOnboarding(selectedCompanies, selectedRole, selectedLevel, selectedYear);
      router.push("/roadmap");
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepValid = () => {
    if (step === 1) return selectedCompanies.length > 0;
    if (step === 2) return selectedRole !== "";
    if (step === 3) return selectedLevel !== "";
    if (step === 4) return selectedYear !== "";
    return false;
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-sans">
      {/* Progress Header */}
      <header className="w-full px-6 md:px-10 py-6 flex justify-between items-center bg-surface-container-lowest border-b border-outline-variant sticky top-0 z-10">
        <div className="font-display font-extrabold text-2xl text-primary">PrepMate</div>
        <div className="flex items-center gap-4">
          <span className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
            Step {step} of 4
          </span>
          <div className="flex gap-1.5">
            {[1,2,3,4].map((s) => (
              <div key={s} className={`h-1 w-8 rounded-full transition-colors duration-300 ${step >= s ? "bg-primary" : "bg-outline-variant"}`} />
            ))}
          </div>
        </div>
        <button 
          onClick={() => { saveOnboarding(selectedCompanies, selectedRole, selectedLevel, selectedYear || "3"); router.push("/dashboard"); }} 
          className="text-on-surface-variant hover:text-primary transition-colors text-xs font-bold tracking-wider"
        >
          SKIP
        </button>
      </header>

      {/* Main Wizard */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12 max-w-4xl mx-auto w-full">
        <AnimatePresence mode="wait">

          {/* Step 1: Companies */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="text-center w-full"
            >
              <div className="max-w-xl mx-auto mb-10">
                <h1 className="font-display font-extrabold text-4xl text-primary mb-3">
                  Target Companies
                </h1>
                <p className="font-sans text-sm text-on-surface-variant">
                  Select companies you wish to prepare for. We will tailor tests and roadmaps to their patterns.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 w-full">
                {companiesList.map((company) => {
                  const isSelected = selectedCompanies.includes(company.name);
                  return (
                    <button
                      key={company.name}
                      onClick={() => handleToggleCompany(company.name)}
                      className={`bento-card rounded-2xl p-6 flex flex-col items-center justify-center gap-3 aspect-square cursor-pointer transition-all ${
                        isSelected ? "border-primary border-2 bg-surface" : ""
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center overflow-hidden border border-outline-variant">
                        {company.logo ? (
                          <img src={company.logo} alt={company.name} className="w-8 h-8 object-contain" />
                        ) : (
                          <Sparkles className="w-6 h-6 text-on-surface-variant" />
                        )}
                      </div>
                      <span className="font-sans text-xs font-bold text-primary">{company.name}</span>
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-primary rounded-full p-0.5">
                          <Check className="w-2.5 h-2.5 text-on-primary" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 2: Role */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="text-center w-full"
            >
              <div className="max-w-xl mx-auto mb-10">
                <h1 className="font-display font-extrabold text-4xl text-primary mb-3">Desired Role</h1>
                <p className="font-sans text-sm text-on-surface-variant">
                  What track matches your goals? This controls types of DSA, Aptitude, or System Design pools you study.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {rolesList.map((role) => {
                  const isSelected = selectedRole === role;
                  return (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className={`bento-card rounded-2xl p-6 text-center cursor-pointer transition-all ${
                        isSelected ? "border-primary border-2 bg-surface font-bold" : ""
                      }`}
                    >
                      <span className="font-sans text-sm font-semibold text-primary">{role}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 3: Level */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="text-center w-full"
            >
              <div className="max-w-xl mx-auto mb-10">
                <h1 className="font-display font-extrabold text-4xl text-primary mb-3">Expertise Level</h1>
                <p className="font-sans text-sm text-on-surface-variant">
                  Select your current coding proficiency so we can set the initial roadmap milestones.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {levelsList.map((level) => {
                  const isSelected = selectedLevel === level.name;
                  return (
                    <button
                      key={level.name}
                      onClick={() => setSelectedLevel(level.name)}
                      className={`bento-card rounded-2xl p-6 text-left cursor-pointer transition-all flex flex-col justify-between h-40 ${
                        isSelected ? "border-primary border-2 bg-surface" : ""
                      }`}
                    >
                      <div>
                        <h3 className="font-display text-lg font-bold text-primary mb-2">{level.name}</h3>
                        <p className="font-sans text-xs text-on-surface-variant leading-relaxed">{level.desc}</p>
                      </div>
                      {isSelected && (
                        <div className="self-end bg-primary text-on-primary rounded-full p-1">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 4: Study Year — NEW AI-powered step */}
          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="text-center w-full"
            >
              <div className="max-w-xl mx-auto mb-10">
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary rounded-full px-4 py-1.5 mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="font-sans text-[10px] font-extrabold uppercase tracking-wider">AI-Powered</span>
                </div>
                <h1 className="font-display font-extrabold text-4xl text-primary mb-3">
                  Your Study Year
                </h1>
                <p className="font-sans text-sm text-on-surface-variant">
                  Our Gemini AI will generate a <strong>personalized placement roadmap</strong> based on how much time you have before placements. This is the most important step.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
                {yearsList.map((item) => {
                  const isSelected = selectedYear === item.year;
                  return (
                    <button
                      key={item.year}
                      onClick={() => setSelectedYear(item.year)}
                      className={`bento-card rounded-2xl p-6 text-left cursor-pointer transition-all relative overflow-hidden group ${
                        isSelected 
                          ? "border-primary border-2 bg-surface shadow-lg scale-[1.02]" 
                          : "hover:scale-[1.01]"
                      }`}
                    >
                      {/* Urgency indicator */}
                      <div className={`absolute top-4 right-4 text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        item.year === "4" 
                          ? "bg-red-100 text-red-700 border border-red-200" 
                          : item.year === "3"
                          ? "bg-amber-100 text-amber-700 border border-amber-200"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}>
                        {item.timeLeft}
                      </div>

                      <div className="text-4xl mb-3">{item.emoji}</div>
                      <h3 className="font-display text-xl font-extrabold text-primary mb-1">
                        {item.label}
                      </h3>
                      <p className="font-sans text-xs text-on-surface-variant mb-3 font-semibold">
                        {item.subtitle}
                      </p>
                      <p className={`font-sans text-[10px] font-bold italic ${
                        isSelected ? "text-primary" : "text-on-surface-variant/70"
                      }`}>
                        💡 {item.tip}
                      </p>

                      {isSelected && (
                        <motion.div 
                          initial={{ scale: 0 }} 
                          animate={{ scale: 1 }}
                          className="absolute bottom-4 right-4 bg-primary text-on-primary rounded-full p-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </motion.div>
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedYear && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-2xl max-w-md mx-auto"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    <span className="font-sans text-xs font-extrabold text-primary uppercase tracking-wider">
                      AI will generate your roadmap
                    </span>
                  </div>
                  <p className="font-sans text-[10px] text-on-surface-variant font-semibold leading-relaxed">
                    Based on your <strong>{yearsList.find(y => y.year === selectedYear)?.label}</strong> status, target companies ({selectedCompanies.join(", ") || "top tech"}) and {selectedLevel} level — Gemini AI will build a custom week-by-week preparation plan.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Navigation Buttons */}
      <footer className="w-full px-6 md:px-10 py-8 flex justify-between items-center bg-surface-container-lowest border-t border-outline-variant sticky bottom-0">
        <button
          onClick={handlePrev}
          disabled={step === 1}
          className={`flex items-center gap-2 px-6 py-3.5 rounded-full font-sans text-xs font-bold border border-outline-variant hover:bg-background transition-colors ${
            step === 1 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          BACK
        </button>

        <button
          onClick={handleNext}
          disabled={!isStepValid()}
          className={`bg-primary text-on-primary rounded-full px-8 py-3.5 font-sans text-xs font-bold tracking-widest hover:scale-95 transition-transform flex items-center gap-2 shadow-sm ${
            !isStepValid() ? "opacity-55 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {step === 4 ? (
            <>
              <Sparkles className="w-4 h-4" />
              GENERATE MY ROADMAP
            </>
          ) : (
            <>
              CONTINUE
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </footer>
    </div>
  );
}
