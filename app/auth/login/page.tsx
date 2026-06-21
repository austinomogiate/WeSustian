"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogIn, Mail, Lock } from "lucide-react";

import { useApp } from "@/lib/store";
import { Button, Field, LeafLogo } from "@/components/ui";

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useApp();
  const [email, setEmail] = useState("alex.lee@company.com");
  const [password, setPassword] = useState("password");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn();
    router.push("/dashboard");
  };

  return (
    <section className="mx-auto w-full max-w-md space-y-6 py-8">
      <div className="flex items-center gap-2">
        <LeafLogo className="h-11 w-11 rounded-xl" />
        <span className="text-2xl font-extrabold text-slate-900">We Sustain</span>
      </div>
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-slate-900">Welcome back</h1>
        <p className="text-slate-500">Sign in to track your impact and find opportunities.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <Field
          id="email"
          label="Company Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="name@company.com"
          icon={<Mail className="h-4 w-4 text-slate-400" />}
        />
        <Field
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
          icon={<Lock className="h-4 w-4 text-slate-400" />}
        />
        <Button type="submit" className="w-full">
          <LogIn className="h-4 w-4" />
          Sign in
        </Button>
      </form>

      <p className="text-center text-sm text-slate-600">
        New here?{" "}
        <Link className="font-bold text-brand-600 hover:underline" href="/auth/signup">
          Create an account
        </Link>
      </p>
    </section>
  );
}
