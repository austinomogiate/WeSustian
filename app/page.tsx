import Link from "next/link";
import { Gift, Leaf, Trophy, Users } from "lucide-react";

import { LeafLogo } from "@/components/ui";

const features = [
  {
    icon: Trophy,
    title: "Gamified impact",
    body: "Earn milestone badges, build streaks, and climb individual and team leaderboards.",
  },
  {
    icon: Gift,
    title: "Goods drives",
    body: "Pledge coats, food, and clothing — not just hours — through first-class item drives.",
  },
  {
    icon: Users,
    title: "Real opportunities",
    body: "Browse vetted local organizations with live schedules and sign up in seconds.",
  },
  {
    icon: Leaf,
    title: "Track everything",
    body: "A personal dashboard for your hours, upcoming sessions, and growing impact.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16 py-6">
      <section className="grid items-center gap-10 md:grid-cols-2 md:py-10">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
            <LeafLogo className="h-5 w-5" />
            Employee volunteering, made personal
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Turn a few hours into real community impact.
          </h1>
          <p className="max-w-xl text-lg text-slate-600">
            We Sustain helps your whole team discover local volunteer opportunities, pledge
            donations, and see the difference they make — together.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/auth/signup"
              className="rounded-lg bg-brand-600 px-5 py-3 font-bold text-white hover:bg-brand-700"
            >
              Get started
            </Link>
            <Link
              href="/auth/login"
              className="rounded-lg border border-slate-300 px-5 py-3 font-bold text-slate-700 hover:border-brand-600 hover:text-brand-700"
            >
              Sign in
            </Link>
          </div>
          <p className="text-sm text-slate-500">No setup needed — jump straight into the demo.</p>
        </div>

        <div className="relative">
          <div className="rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 p-8 text-white shadow-xl">
            <p className="text-sm font-semibold text-brand-100">Your impact so far</p>
            <div className="mt-4 flex items-end gap-6">
              <div>
                <p className="text-5xl font-extrabold">26</p>
                <p className="text-brand-100">total hours</p>
              </div>
              <div>
                <p className="text-3xl font-bold">3</p>
                <p className="text-sm text-brand-100">badges</p>
              </div>
              <div>
                <p className="text-3xl font-bold">#4</p>
                <p className="text-sm text-brand-100">rank</p>
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm text-brand-100">
                <span>Next badge: Community Pillar</span>
                <span>26/50h</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/25">
                <div className="h-full rounded-full bg-white" style={{ width: "52%" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">Everything your team needs to give back</h2>
          <p className="mt-2 text-slate-600">Designed to be opened daily — not just at review time.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{f.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-slate-900 px-6 py-12 text-center text-white md:py-16">
        <h2 className="text-3xl font-extrabold">Ready to make an impact?</h2>
        <p className="mx-auto mt-2 max-w-lg text-slate-300">
          Join your colleagues and start turning small actions into something bigger.
        </p>
        <Link
          href="/auth/signup"
          className="mt-6 inline-block rounded-lg bg-brand-500 px-6 py-3 font-bold text-white hover:bg-brand-600"
        >
          Create your account
        </Link>
      </section>
    </div>
  );
}
