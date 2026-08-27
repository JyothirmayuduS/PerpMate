"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, LayoutDashboard, RotateCcw } from "lucide-react";
import SideNav from "@/components/layout/SideNav";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <SideNav />

      <main className="min-h-screen md:ml-64 px-6 py-24 md:p-10 flex items-center justify-center">
        <section className="w-full max-w-2xl bento-card rounded-3xl p-8 md:p-12 text-center">
          <div className="mx-auto mb-6 h-14 w-14 rounded-2xl bg-error-container text-error flex items-center justify-center">
            <AlertTriangle className="h-7 w-7" />
          </div>
          <p className="font-sans text-[10px] font-extrabold uppercase tracking-[0.2em] text-secondary-container mb-3">
            Temporary setback
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-primary mb-3">
            Something interrupted this page.
          </h1>
          <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-8 max-w-lg mx-auto">
            Your progress is safe. Try loading this section again, or return to the dashboard and continue from there.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              type="button"
              onClick={() => retry()}
              className="rounded-full bg-primary px-5 py-3 font-sans text-xs font-bold text-on-primary flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              Try again
            </button>
            <Link
              href="/dashboard"
              className="rounded-full border border-outline-variant bg-surface-container-lowest px-5 py-3 font-sans text-xs font-bold text-primary flex items-center justify-center gap-2 hover:border-primary transition-colors"
            >
              <LayoutDashboard className="h-4 w-4" />
              Go to dashboard
            </Link>
          </div>

          {error.digest && (
            <p className="mt-8 font-sans text-[9px] font-bold text-on-surface-variant">
              Reference: {error.digest}
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
