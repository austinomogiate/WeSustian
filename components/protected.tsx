"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useApp } from "@/lib/store";

export function Protected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { ready, isAuthenticated } = useApp();

  useEffect(() => {
    if (ready && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [ready, isAuthenticated, router]);

  if (!ready || !isAuthenticated) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-brand-600" />
      </div>
    );
  }

  return <>{children}</>;
}
