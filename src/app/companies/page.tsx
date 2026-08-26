"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import SideNav from "@/components/layout/SideNav";
import { Search, ArrowRight, Star, Building2 } from "lucide-react";
import Link from "next/link";

interface CompanyModule {
  name: string;
  category: "FAANG" | "Product" | "Service";
  desc: string;
  mostAsked: string;
  experiences: string;
  questions: number;
  logo: string;
}

export default function CompanyHub() {
  const router = useRouter();
  const { user } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"All" | "FAANG" | "Product" | "Service">("All");

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  if (!user) return null;

  const companyModules: CompanyModule[] = [
    {
      name: "Google",
      category: "FAANG",
      desc: "Focus heavily on Graphs, Dynamic Programming, and System Design for L4+ SDE roles.",
      mostAsked: "Graphs, DP",
      experiences: "124+",
      questions: 350,
      logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcva37vndDv0c5QFGk1_vR1HChqO0e_fSrsX84kuNcYcjCRbHk3IA6P8NH1vFIO_RqhffmqsODmj8Tu2F9zlgL8w4h_xRrVK3PEu68HQSjlgN5nbuZTE3fLjDEz2zfyjB_oWH7a2YTmX55SMmjlzxNyHWImF242dNUcdGD5weRBejgye5Pd8YtewPs2Kjx_59rJ9j7x4DFaUmGKKbNz5l_cPRqazkx06mlZqs4sTSR05HMUG8Ip4tt"
    },
    {
      name: "Amazon",
      category: "FAANG",
      desc: "Leadership Principles are critical. High emphasis on Trees, Heaps, and Object-Oriented Design.",
      mostAsked: "Trees, Arrays",
      experiences: "210+",
      questions: 420,
      logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5leiU_YTawID9Pe-INhkq4UpGa8GbIfgyP7oYWrY1TSkKeNFDf6tM32JKMU61tmMl1kej6meGi1qpzDBBweGDVzk_7WTNnjGftz2t42aG3tq2dOpaa_tScdDmK3hwPfrQsC0XlOuwx0uy1zPva4KadJRQ4UmtjR705gqfLlOVROE0M3u5GK8kAHHJnNcBUvpLspvlQ8A0JNte0oJbHtpPf-Vl0IlrV_yftuWTt3mep7EJcVVwjzMO"
    },
    {
      name: "Microsoft",
      category: "Product",
      desc: "Strong focus on Linked Lists, Strings, and System Design fundamentals.",
      mostAsked: "Strings, LinkedList",
      experiences: "185+",
      questions: 280,
      logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaAL5g52hVNwX74ziDeaFEfI8CrwnfS9O5xfGG7tLjPNUmxYe2SOJLOTbY_UHGkWoIhKzr15YFjfzZyhNEQX2ww3B_yy5FKGcroiJodup9F7qr3Ta8K7e9T7F0sRIcOR7L48apY4DL4uNUfhl4JIttdk7K4gdTUSlBE8oq4WTSskU48Jqn4ZdxufU88EEGLVmLiTQJAi-v_SITB-TDyyzLAKjf8cn9sYE2rFJxQhVlSOIdoHwjk-bM"
    },
    {
      name: "TCS",
      category: "Service",
      desc: "Emphasis on quantitative aptitude, logical reasoning, and basic coding syntax.",
      mostAsked: "Aptitude, Strings",
      experiences: "450+",
      questions: 120,
      logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAejhuGFFg8qwYu3k5iqsg9pm1y8qKo7TA07f8MAAWRApJAiFUy49PowErQh_IYXJaC_rPQvZv5L5iH-GU5lyxakGPbjNqd4yrTabdxNqKuN6mCgnt2XlTQ-D6otDTDf4fUDu7r32Ar9bdXfoV-tW2fT8HsTIvKvsy1KvMQI_J1769tj1FcyH1iATfUc2tVFEklnfbZHaNNX7YaaXb2rUliGyKFahvx8RDyhEC3GfhTToVnNrzC0iYt"
    },
    {
      name: "Infosys",
      category: "Service",
      desc: "Structured rounds on logical puzzles, SQL, and database management essentials.",
      mostAsked: "DBMS, SQL",
      experiences: "380+",
      questions: 150,
      logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDt6DcVKiG7olC6DXHIQ55flvpoa2YwFan0Ag1bZgPqgCdRZWn19BCQH4Hq4Y4iUh7OxWzrqhKH9qlGmeL_bHKuj-Nwc39Ie-xwh0WltLr4brOSsOApVwqWhUtPgukjB4iBdscVB176C11Qsj68xNjPeMlb3lrEw4xwz7E1AB1nnijPV6rEfsTwSLmVjv1zNfq5uCkBRGXUdp37t5D3v9uDqeGm4qM38xMJieg05c_LC_k-m_G6BUEA"
    },
    {
      name: "Wipro",
      category: "Service",
      desc: "Focuses on Java/C++ basics, verbal ability, and basic data structures.",
      mostAsked: "Arrays, OOPs",
      experiences: "310+",
      questions: 90,
      logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXAW1R9dW8kdoROD9lUPPgKAE1EggrPVp5H_voHlbNey-igq1lo12Om0heUDps8HOTRu1rgtkBVH8WJwaTed1bSBjIJ5WPfXgnxNg4oOTUZIFwDXrYpZl7PPre6bhjAT_AUG9Rz2FiIT80Cm5Go0tdtryQqQNBvojOY0fjTYkM9ioz1PVpMD4rHBFfQDkYpL8-9FkjClyCfAdHbO-veSjxhzUoFp2t7WFJOHL5LpovxA2XG_GIWAvQ"
    }
  ];

  const filteredCompanies = companyModules.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "All" || c.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <SideNav />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-6 md:p-10 max-w-7xl mx-auto pb-24">
        
        {/* Page Header */}
        <header className="mb-10 mt-12 md:mt-0">
          <h2 className="font-display text-4xl font-extrabold text-primary mb-2">
            Company Hub
          </h2>
          <p className="font-sans text-sm text-on-surface-variant max-w-2xl leading-relaxed">
            Company-Specific Modules tailored for top tech interviews. Master the specific patterns and frequently asked questions for your target roles.
          </p>
        </header>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row gap-6 mb-10 items-center justify-between">
          <div className="relative flex-grow w-full max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search target companies..."
              className="w-full pl-12 pr-6 py-3 rounded-full border border-outline-variant bg-surface-container-lowest shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans text-xs font-bold text-primary"
            />
          </div>

          <div className="flex gap-2.5 overflow-x-auto pb-2 md:pb-0 shrink-0 w-full md:w-auto font-sans text-xs font-bold">
            {(["All", "FAANG", "Product", "Service"] as const).map((filterVal) => (
              <button
                key={filterVal}
                onClick={() => setSelectedFilter(filterVal)}
                className={`px-5 py-2.5 rounded-full border transition-all cursor-pointer ${
                  selectedFilter === filterVal
                    ? "bg-primary text-on-primary border-primary shadow-sm"
                    : "bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:border-primary hover:text-primary"
                }`}
              >
                {filterVal === "Product" ? "Product-Based" : filterVal === "Service" ? "Service-Based" : filterVal}
              </button>
            ))}
          </div>
        </div>

        {/* Company Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCompanies.map((c) => (
            <div 
              key={c.name}
              className="bento-card flex flex-col group rounded-2xl border border-outline-variant p-6 relative overflow-hidden bg-surface-container-lowest hover:scale-98 transition-transform shadow-[0_2px_12px_rgba(0,0,0,0.02)] min-h-[380px] justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center p-3 border border-outline-variant shadow-sm shrink-0">
                    <img className="w-full h-full object-contain" src={c.logo} alt={c.name} />
                  </div>
                  <span className="px-4 py-1.5 bg-surface-container text-on-surface-variant font-sans text-[9px] font-extrabold rounded-full uppercase tracking-wider">
                    {c.category === "Product" ? "Product" : c.category === "Service" ? "Service" : "FAANG"}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-primary mb-2">
                  {c.name}
                </h3>
                
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed line-clamp-3 mb-6">
                  {c.desc}
                </p>
              </div>

              <div>
                {/* Stats Table */}
                <div className="flex flex-col gap-3 py-4 border-y border-outline-variant/30 font-sans text-xs mb-5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Most Asked</span>
                    <span className="font-semibold text-primary">{c.mostAsked}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Experiences</span>
                    <span className="font-semibold text-primary">{c.experiences}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Questions</span>
                    <span className="font-semibold text-primary">{c.questions}</span>
                  </div>
                </div>

                <Link
                  href="/practice"
                  className="text-secondary-container font-sans text-[10px] font-extrabold uppercase tracking-widest flex items-center justify-center gap-1 group-hover:opacity-80 transition-opacity"
                >
                  <span>View Module</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
