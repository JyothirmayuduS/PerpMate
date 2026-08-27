"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { ArrowRight, ArrowLeft, Building2, Check, Sparkles, GraduationCap, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { companyGroups } from "@/data/companyCatalog";

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
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>(() => user?.targetCompanies || []);
  const [selectedRole, setSelectedRole] = useState(() => user?.targetRole || "");
  const [selectedLevel, setSelectedLevel] = useState(() => user?.targetLevel || "");
  const [selectedYear, setSelectedYear] = useState(() => user?.studyYear || "");
  const [companySearch, setCompanySearch] = useState("");

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
                  Select any mix of service, consulting, fintech, product, enterprise, or global companies. Your practice queue will use the matching patterns.
                </p>
              </div>
              <div className="relative max-w-xl mx-auto mb-6 text-left">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant" />
                <input
                  type="search"
                  value={companySearch}
                  onChange={(event) => setCompanySearch(event.target.value)}
                  placeholder="Search all supported companies..."
                  className="w-full rounded-full border border-outline-variant bg-surface-container-lowest py-3 pl-11 pr-4 font-sans text-xs font-bold text-primary outline-none focus:border-primary"
                />
              </div>
              {selectedCompanies.length > 0 && (
                <p className="font-sans text-[10px] font-extrabold uppercase tracking-wider text-secondary mb-5">
                  {selectedCompanies.length} selected
                </p>
              )}
              <div className="space-y-7 max-h-[48vh] overflow-y-auto pr-2 custom-scrollbar text-left">
                {companyGroups.map((group) => {
                  const matchingCompanies = group.companies.filter((company) =>
                    company.toLowerCase().includes(companySearch.trim().toLowerCase()),
                  );
                  if (matchingCompanies.length === 0) return null;

                  return (
                    <section key={group.id}>
                      <div className="flex items-center gap-2 mb-3">
                        <Building2 className="h-4 w-4 text-secondary-container" />
                        <h2 className="font-display text-sm font-bold text-primary">{group.name}</h2>
                        <span className="font-sans text-[9px] font-bold text-on-surface-variant">{matchingCompanies.length}</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {matchingCompanies.map((company) => {
                          const isSelected = selectedCompanies.includes(company);
                          return (
                            <button
                              key={company}
                              type="button"
                              onClick={() => handleToggleCompany(company)}
                              className={`relative rounded-xl border p-4 min-h-20 text-left cursor-pointer transition-all ${
                                isSelected
                                  ? "border-primary bg-primary/5 shadow-sm"
                                  : "border-outline-variant bg-surface-container-lowest hover:border-primary/50"
                              }`}
                            >
                              <span className="font-sans text-xs font-bold text-primary leading-snug">{company}</span>
                              {isSelected && (
                                <span className="absolute top-2.5 right-2.5 bg-primary rounded-full p-0.5">
                                  <Check className="w-2.5 h-2.5 text-on-primary" />
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </section>
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
