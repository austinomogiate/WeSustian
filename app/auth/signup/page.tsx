"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Lock, Mail, Sparkles, User } from "lucide-react";

import { useApp } from "@/lib/store";
import { Button, Field, LeafLogo } from "@/components/ui";

export default function SignupPage() {
  const router = useRouter();
  const { signIn } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <h1 className="text-3xl font-extrabold text-slate-900">Create your account</h1>
        <p className="text-slate-500">Join your colleagues and start giving back.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <Field
          id="name"
          label="Full Name"
          type="text"
          value={name}
          onChange={setName}
          placeholder="Alex Lee"
          icon={<User className="h-4 w-4 text-slate-400" />}
        />
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
          placeholder="Create a password"
          icon={<Lock className="h-4 w-4 text-slate-400" />}
        />
        <Button type="submit" className="w-full">
          <Sparkles className="h-4 w-4" />
          Create account
        </Button>
      </form>

      <p className="text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link className="font-bold text-brand-600 hover:underline" href="/auth/login">
          Log in
        </Link>
      </p>
    </section>
  );
}
