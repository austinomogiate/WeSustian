"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Award,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  Clock,
  Gift,
  Lock,
  LogOut,
  Ribbon,
  Users,
} from "lucide-react";

import { Protected } from "@/components/protected";
import { Avatar, Button, Card, cn, StatTile } from "@/components/ui";
import { badges as allBadges } from "@/lib/data";
import { useApp } from "@/lib/store";

type Tab = "activity" | "badges";

export default function ImpactPage() {
  return (
    <Protected>
      <ImpactContent />
    </Protected>
  );
}

function ImpactContent() {
  const router = useRouter();
  const {
    user,
    totalHours,
    upcomingHours,
    drivesContributed,
    earnedBadgeIds,
    signups,
    completeSignup,
    signOut,
  } = useApp();
  const [tab, setTab] = useState<Tab>("activity");

  const upcoming = signups.filter((s) => !s.completed);
  const completed = signups.filter((s) => s.completed);

  const handleSignOut = () => {
    signOut();
    router.push("/auth/login");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <Avatar initials={user.initials} size="xl" />
        <div className="flex-1">
          <h1 className="text-2xl font-extrabold text-slate-900">{user.name}</h1>
          <p className="text-slate-500">{user.email}</p>
          <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
            <Users className="h-3 w-3" /> {user.team} team
          </span>
        </div>
        <Button variant="outline" onClick={handleSignOut}>
          <LogOut className="h-4 w-4" /> Sign out
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile icon={<Clock className="h-5 w-5" />} value={`${totalHours}h`} label="Total hours" />
        <StatTile
          icon={<CalendarDays className="h-5 w-5 text-green-700" />}
          iconClassName="bg-green-50 text-green-700"
          value={`${upcomingHours}h`}
          label="Upcoming"
        />
        <StatTile
          icon={<Ribbon className="h-5 w-5 text-violet-700" />}
          iconClassName="bg-violet-50 text-violet-700"
          value={String(earnedBadgeIds.length)}
          label="Badges"
        />
        <StatTile
          icon={<Gift className="h-5 w-5 text-rose-700" />}
          iconClassName="bg-rose-50 text-rose-700"
          value={String(drivesContributed)}
          label="Drives"
        />
      </div>

      <div className="flex gap-1 rounded-xl bg-slate-100 p-1 sm:max-w-xs">
        <TabBtn label="My Activity" active={tab === "activity"} onClick={() => setTab("activity")} />
        <TabBtn label="Badges" active={tab === "badges"} onClick={() => setTab("badges")} />
      </div>

      {tab === "activity" ? (
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Upcoming ({upcoming.length})
          </h2>
          {upcoming.length === 0 ? (
            <Card>
              <p className="text-sm text-slate-500">
                Nothing scheduled.{" "}
                <Link href="/organizations" className="font-bold text-brand-600 hover:underline">
                  Explore
                </Link>{" "}
                to sign up.
              </p>
            </Card>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {upcoming.map((s) => (
                <Card key={s.id} className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <CalendarDays className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-bold text-slate-900">{s.title}</p>
                      <p className="truncate text-sm text-slate-500">
                        {s.organizationName} · {s.date}
                      </p>
                      <p className="text-xs text-slate-400">
                        {s.time} · {s.durationHours}h
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => completeSignup(s.id)} className="w-full">
                    <CalendarCheck className="h-4 w-4" /> Mark as completed
                  </Button>
                </Card>
              ))}
            </div>
          )}

          <h2 className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Completed ({completed.length})
          </h2>
          {completed.length === 0 ? (
            <Card>
              <p className="text-sm text-slate-500">Completed sessions will show here.</p>
            </Card>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {completed.map((s) => (
                <Card key={s.id}>
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-bold text-slate-900">{s.title}</p>
                      <p className="truncate text-sm text-slate-500">
                        {s.organizationName} · {s.date}
                      </p>
                    </div>
                    <span className="font-extrabold text-green-700">+{s.durationHours}h</span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {allBadges.map((b) => {
            const earned = earnedBadgeIds.includes(b.id);
            return (
              <div
                key={b.id}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-2xl border p-5 text-center",
                  earned ? "border-slate-100 bg-white shadow-sm" : "border-slate-100 bg-slate-50"
                )}
              >
                <span
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-full",
                    earned ? "bg-brand-50 text-brand-600" : "bg-slate-100 text-slate-400"
                  )}
                >
                  {earned ? <Award className="h-7 w-7" /> : <Lock className="h-6 w-6" />}
                </span>
                <span className={cn("font-bold", earned ? "text-slate-900" : "text-slate-400")}>
                  {b.name}
                </span>
                <span className="text-xs text-slate-400">{earned ? "Earned" : b.requirement}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function TabBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 rounded-lg py-2 text-sm font-bold transition",
        active ? "bg-white text-brand-700 shadow-sm" : "text-slate-500"
      )}
    >
      {label}
    </button>
  );
}
