"use client";

import { useMemo, useState } from "react";

import { Protected } from "@/components/protected";
import { Avatar, Card, cn, ProgressBar } from "@/components/ui";
import { leaderboard, teams } from "@/lib/data";
import { useApp } from "@/lib/store";

type Tab = "people" | "teams";

const medal = ["bg-amber-400", "bg-slate-300", "bg-amber-600"];

export default function LeaderboardPage() {
  return (
    <Protected>
      <LeaderboardContent />
    </Protected>
  );
}

function LeaderboardContent() {
  const [tab, setTab] = useState<Tab>("people");
  const { totalHours, user } = useApp();

  const people = useMemo(
    () =>
      [...leaderboard]
        .map((e) => (e.isCurrentUser ? { ...e, hours: totalHours } : e))
        .sort((a, b) => b.hours - a.hours),
    [totalHours]
  );

  const sortedTeams = [...teams].sort((a, b) => b.hours - a.hours);
  const topTeamHours = Math.max(...sortedTeams.map((t) => t.hours), 1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Leaderboard</h1>
        <p className="text-slate-500">This quarter · resets in 3 weeks</p>
      </div>

      <div className="flex gap-1 rounded-xl bg-slate-100 p-1 sm:max-w-xs">
        <TabBtn label="People" active={tab === "people"} onClick={() => setTab("people")} />
        <TabBtn label="Teams" active={tab === "teams"} onClick={() => setTab("teams")} />
      </div>

      {tab === "people" ? (
        <>
          {/* Podium */}
          <div className="flex items-end justify-center gap-3 sm:gap-6">
            {[1, 0, 2].map((idx) => {
              const p = people[idx];
              if (!p) return <div key={idx} className="flex-1" />;
              const heights = ["h-20", "h-28", "h-16"];
              const order = idx === 0 ? 1 : idx === 1 ? 0 : 2;
              return (
                <div key={p.id} className="flex w-24 flex-col items-center gap-2">
                  <Avatar initials={p.initials} size={idx === 0 ? "lg" : "md"} />
                  <span className="truncate text-sm font-bold text-slate-700">
                    {p.name.split(" ")[0]}
                  </span>
                  <div
                    className={cn(
                      "flex w-full flex-col items-center justify-start rounded-t-xl pt-2 text-white",
                      medal[idx],
                      heights[order]
                    )}
                  >
                    <span className="text-lg font-extrabold">{idx + 1}</span>
                    <span className="text-xs font-bold opacity-90">{p.hours}h</span>
                  </div>
                </div>
              );
            })}
          </div>

          <Card className="divide-y divide-slate-100 p-0">
            {people.map((p, i) => (
              <div
                key={p.id}
                className={cn(
                  "flex items-center gap-3 px-4 py-3",
                  p.isCurrentUser && "bg-brand-50"
                )}
              >
                <span className="w-6 text-center text-sm font-extrabold text-slate-400">{i + 1}</span>
                <Avatar initials={p.initials} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-slate-900">
                    {p.name}
                    {p.isCurrentUser ? " (You)" : ""}
                  </p>
                  <p className="text-xs text-slate-500">{p.team}</p>
                </div>
                <span className="font-extrabold text-brand-600">{p.hours}h</span>
              </div>
            ))}
          </Card>
        </>
      ) : (
        <div className="space-y-3">
          {sortedTeams.map((t, i) => (
            <Card key={t.id} className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-sm font-extrabold text-brand-700">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className="font-bold text-slate-900">
                    {t.name}
                    {t.name === user.team ? " (Your team)" : ""}
                  </p>
                  <p className="text-xs text-slate-500">{t.members} members</p>
                </div>
                <span className="font-extrabold text-brand-600">{t.hours}h</span>
              </div>
              <ProgressBar value={t.hours} total={topTeamHours} />
            </Card>
          ))}
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
