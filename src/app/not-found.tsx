import Link from "next/link";
import { ArrowRight, LayoutDashboard, SearchX } from "lucide-react";
import SideNav from "@/components/layout/SideNav";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <SideNav />

      <main className="min-h-screen md:ml-64 px-6 py-24 md:p-10 flex items-center justify-center">
        <section className="w-full max-w-3xl bento-card rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-[0.8fr_1.2fr]">
            <div className="bg-primary text-on-primary p-8 md:p-10 flex flex-col justify-between min-h-64">
              <div className="h-12 w-12 rounded-2xl bg-on-primary/10 flex items-center justify-center">
                <SearchX className="h-6 w-6" />
              </div>
              <div>
                <p className="font-sans text-[10px] font-extrabold uppercase tracking-[0.25em] text-on-primary/60 mb-2">
                  Error 404
                </p>
                <p className="font-display text-6xl font-extrabold leading-none">Lost?</p>
              </div>
            </div>

            <div className="p-8 md:p-12 flex flex-col justify-center">
              <p className="font-sans text-[10px] font-extrabold uppercase tracking-[0.2em] text-secondary-container mb-3">
                Page not found
              </p>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold text-primary mb-3">
                This route is not on your roadmap.
              </h1>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-8 max-w-md">
                The page may have moved, or the link may be incomplete. Head back to your dashboard and continue preparing.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/dashboard"
                  className="rounded-full bg-primary px-5 py-3 font-sans text-xs font-bold text-on-primary flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Go to dashboard
                </Link>
                <Link
                  href="/practice"
                  className="rounded-full border border-outline-variant bg-surface-container-lowest px-5 py-3 font-sans text-xs font-bold text-primary flex items-center justify-center gap-2 hover:border-primary transition-colors"
                >
                  Browse practice
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
