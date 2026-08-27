"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { 
  LayoutDashboard, 
  Code2, 
  HelpCircle, 
  Map, 
  Trophy, 
  Timer, 
  Settings, 
  LogOut,
  User as UserIcon,
  Compass,
  Search,
  Sparkles,
  PieChart
} from "lucide-react";

import { useState, useEffect } from "react";

export default function SideNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!user) return null;

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Search Results", href: "/search", icon: Search },
    { name: "Practice Hub", href: "/practice", icon: Code2 },
    { name: "Company Hub", href: "/companies", icon: Compass },
    { name: "Doubts Board", href: "/doubts", icon: HelpCircle },
    { name: "Roadmap", href: "/roadmap", icon: Map, badge: "AI" },
    { name: "Mock Tests", href: "/tests", icon: Timer },
    { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
    { name: "Report", href: "/report", icon: PieChart },
  ];

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  return (
    <>
      {/* Desktop Left SideNav */}
      <aside className="hidden md:flex flex-col justify-between py-8 px-4 bg-surface-container-lowest border-r border-outline-variant h-screen w-64 fixed left-0 top-0 z-40">
        <div>
          {/* Brand Header */}
          <div className="px-4 mb-8">
            <h1 className="font-display font-extrabold text-primary text-2xl tracking-tight">
              PrepMate
            </h1>
            <p className="font-sans text-[10px] text-on-surface-variant font-semibold mt-0.5 uppercase tracking-widest">
              Placement Ready
            </p>
          </div>

          {/* User Profile Card */}
          <div className="mx-2 mb-6 p-3 rounded-xl bg-background border border-outline-variant flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-sm">
              {user.name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2)}
            </div>
            <div className="overflow-hidden">
              <p className="font-sans text-xs text-primary font-bold truncate">
                {user.name}
              </p>
              <p className="font-sans text-[10px] text-on-surface-variant font-medium">
                Lvl {user.level} • {user.xp} XP
              </p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-full font-sans text-[14px] font-semibold transition-all duration-200 group ${
                    isActive
                      ? "bg-primary text-on-primary scale-95"
                      : "text-on-surface-variant hover:text-primary hover:bg-surface-container-high"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 duration-200 ${isActive ? "text-on-primary" : "text-on-surface-variant group-hover:text-primary"}`} />
                  <span className="flex-1">{link.name}</span>
                  {"badge" in link && link.badge && (
                    <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 ${
                      isActive 
                        ? "bg-on-primary/20 text-on-primary" 
                        : "bg-primary/10 text-primary"
                    }`}>
                      <Sparkles className="w-2 h-2" />
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 px-2">
            <Link
              href="/practice"
              className="block w-full py-3 px-4 bg-secondary-container text-on-secondary-container font-sans text-xs font-bold text-center uppercase tracking-wider rounded-full hover:scale-98 transition-transform duration-150 shadow-sm"
            >
              Start Practice
            </Link>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="space-y-1 border-t border-outline-variant pt-4">
          <Link
            href="/profile"
            className={`flex items-center gap-3 px-4 py-3 rounded-full font-sans text-[14px] font-semibold transition-all duration-200 ${
              pathname === "/profile"
                ? "bg-primary text-on-primary scale-95"
                : "text-on-surface-variant hover:text-primary hover:bg-surface-container-high"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Profile Settings</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-full font-sans text-[14px] font-semibold text-on-surface-variant hover:text-secondary hover:bg-error-container/30 transition-all duration-200 text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <div className="md:hidden fixed top-0 w-full h-16 bg-surface-container-lowest/80 backdrop-blur-md border-b border-outline-variant z-40 flex items-center justify-between px-4">
        <h1 className="font-display font-extrabold text-primary text-xl tracking-tight">
          PrepMate
        </h1>
        <Link
          href="/profile"
          className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs border border-outline-variant"
        >
          {user.name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2)}
        </Link>
      </div>

      {/* Mobile Bottom NavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 pb-safe md:hidden bg-surface-container-lowest/90 backdrop-blur-md border-t border-outline-variant shadow-lg rounded-t-xl py-2 h-16">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/");

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-secondary font-bold scale-105"
                  : "text-on-surface-variant"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="font-sans text-[9px] mt-0.5 tracking-tighter">
                {link.name.split(" ")[0]}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
