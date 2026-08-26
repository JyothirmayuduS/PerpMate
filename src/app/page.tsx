"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";

export default function Home() {
  const router = useRouter();
  const { user } = useStore();

  useEffect(() => {
    if (user) {
      if (user.onboarded) {
        router.push("/dashboard");
      } else {
        router.push("/onboarding");
      }
    } else {
      router.push("/auth");
    }
  }, [user, router]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background min-h-screen">
      <div className="animate-pulse flex flex-col items-center">
        <h1 className="font-display font-extrabold text-3xl text-primary mb-2">PrepMate</h1>
        <p className="font-sans text-xs text-on-surface-variant font-bold uppercase tracking-widest">Loading Platform...</p>
      </div>
    </div>
  );
}
