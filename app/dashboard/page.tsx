"use client";

import Link from "next/link";
import {
  Award,
  CalendarDays,
  ChevronRight,
  Clock,
  Flame,
  Search,
  Trophy,
} from "lucide-react";

import { Protected } from "@/components/protected";
import { Avatar, Button, Card, ProgressBar, SectionHeading } from "@/components/ui";
import {
  badges as allBadges,
  HOUR_BADGE_THRESHOLDS,
  leaderboard,
} from "@/lib/data";
import { useApp } from "@/lib/store";

export default function DashboardPage() {
  return (
    <Protected>
      <DashboardContent />
    </Protected>
  );
}

function DashboardContent() {
  const { user, totalHours, upcomingHours, streakWeeks, earnedBadgeIds, signups } = useApp();

  const rank =
    [...leaderboard]
      .map((e) => (e.isCurrentUser ? { ...e, hours: totalHours } : e))
      .sort((a, b) => b.hours - a.hours)
      .findIndex((e) => e.isCurrentUser) + 1;

  const thresholds = Object.values(HOUR_BADGE_THRESHOLDS).sort((a, b) => a - b);
  const nextThreshold = thresholds.find((t) => t > totalHours);
  const prevThreshold = [...thresholds].reverse().find((t) => t <= totalHours) ?? 0;
  const hoursToNext = nextThreshold ? nextThreshold - totalHours : 0;

  const upcoming = signups.filter((s) => !s.completed);
  const recentBadges = allBadges.filter((b) => earnedBadgeIds.includes(b.id)).slice(-3).reverse();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500">Good to see you,</p>
          <h1 className="text-2xl font-extrabold text-slate-900">{user.name.split(" ")[0]} 👋</h1>
        </div>
        <Avatar initials={user.initials} size="lg" />
      </div>

      {/* Hero impact card */}
      <div className="rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 p-6 text-white shadow-lg md:p-8">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-brand-100">Your impact so far</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
            <Trophy className="h-3.5 w-3.5" /> Rank #{rank}
          </span>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-4 text-center">
          <HeroStat value={String(totalHours)} label="Total hours" />
          <HeroStat value={`${streakWeeks}wk`} label="Streak" />
          <HeroStat value={String(earnedBadgeIds.length)} label="Badges" />
        </div>
        {nextThreshold ? (
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm text-brand-50">
              <span>{hoursToNext}h to your next badge</span>
              <span>
                {totalHours}/{nextThreshold}h
              </span>
            </div>
            <ProgressBar
              value={totalHours - prevThreshold}
              total={nextThreshold - prevThreshold}
              className="bg-white/25"
              barClassName="bg-white"
            />
          </div>
        ) : null}
      </div>

      {/* Upcoming */}
      <section className="space-y-3">
        <SectionHeading title="Upcoming sessions" action="View all" href="/impact" />
        {upcoming.length === 0 ? (
          <Card>
            <p className="text-sm text-slate-500">
              No upcoming sessions yet.{" "}
              <Link href="/organizations" className="font-bold text-brand-600 hover:underline">
                Explore organizations
              </Link>{" "}
              to sign up.
            </p>
          </Card>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {upcoming.map((s) => (
              <Card key={s.id} href={`/organizations/${s.organizationId}`}>
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-brand-50">
                    <span className="text-lg font-extrabold leading-none text-brand-700">
                      {s.date.split(" ")[2]}
                    </span>
                    <span className="text-xs font-bold text-brand-600">{s.date.split(" ")[1]}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-slate-900">{s.title}</p>
                    <p className="truncate text-sm text-slate-500">{s.organizationName}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="h-3 w-3" /> {s.time} · {s.durationHours}h
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 shrink-0 text-slate-300" />
                </div>
              </Card>
            ))}
          </div>
        )}
        {upcomingHours > 0 ? (
          <p className="text-sm text-slate-500">{upcomingHours}h scheduled — keep it up!</p>
        ) : null}
      </section>

      {/* Recent badges */}
      <section className="space-y-3">
        <SectionHeading title="Recent badges" action="See all" href="/impact" />
        <div className="grid grid-cols-3 gap-3">
          {recentBadges.map((b) => (
            <Card key={b.id} className="flex flex-col items-center gap-2 text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <Award className="h-6 w-6" />
              </span>
              <span className="text-sm font-bold text-slate-800">{b.name}</span>
            </Card>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href="/organizations">
          <Button>
            <Search className="h-4 w-4" /> Find an opportunity
          </Button>
        </Link>
        <Link href="/donate">
          <Button variant="outline">
            <CalendarDays className="h-4 w-4" /> Browse goods drives
          </Button>
        </Link>
        <Link href="/leaderboard">
          <Button variant="outline">
            <Flame className="h-4 w-4" /> See leaderboard
          </Button>
        </Link>
      </div>
    </div>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-2xl font-extrabold">{value}</p>
      <p className="text-xs text-brand-100">{label}</p>
    </div>
  );
}
