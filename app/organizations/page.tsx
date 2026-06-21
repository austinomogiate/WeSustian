"use client";

import { useMemo, useState } from "react";
import { MapPin, Search, Star, X } from "lucide-react";

import { Protected } from "@/components/protected";
import { Card, cn, Pill } from "@/components/ui";
import { causeStyles, organizations, type CauseKey } from "@/lib/data";

const CAUSES: ("All" | CauseKey)[] = [
  "All",
  "Food Security",
  "Education",
  "Environment",
  "Health",
  "Community",
];

export default function OrganizationsPage() {
  return (
    <Protected>
      <OrganizationsContent />
    </Protected>
  );
}

function OrganizationsContent() {
  const [query, setQuery] = useState("");
  const [cause, setCause] = useState<(typeof CAUSES)[number]>("All");

  const filtered = useMemo(
    () =>
      organizations.filter((o) => {
        const matchesCause = cause === "All" || o.cause === cause;
        const q = query.trim().toLowerCase();
        const matchesQuery =
          q === "" || o.name.toLowerCase().includes(q) || o.city.toLowerCase().includes(q);
        return matchesCause && matchesQuery;
      }),
    [query, cause]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Explore</h1>
        <p className="text-slate-500">Find local organizations with open spots.</p>
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or city"
          className="w-full bg-transparent py-2.5 text-slate-900 outline-none placeholder:text-slate-400"
        />
        {query ? (
          <button onClick={() => setQuery("")} aria-label="Clear search">
            <X className="h-4 w-4 text-slate-400" />
          </button>
        ) : null}
      </div>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {CAUSES.map((c) => (
          <button
            key={c}
            onClick={() => setCause(c)}
            className={cn(
              "whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-semibold transition",
              c === cause
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-brand-300"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((org) => {
          const cs = causeStyles[org.cause];
          const openSpots = org.sessions.reduce((sum, s) => sum + (s.spotsTotal - s.spotsTaken), 0);
          return (
            <Card key={org.id} href={`/organizations/${org.id}`}>
              <div className="flex items-start gap-3">
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", cs.bg)}>
                  <Star className={cn("h-5 w-5", cs.text)} />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-lg font-bold text-slate-900">{org.name}</h2>
                  <p className="flex items-center gap-1 text-sm text-slate-500">
                    <MapPin className="h-3.5 w-3.5" /> {org.city}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Pill className={cn(cs.bg, cs.text)}>{org.cause}</Pill>
                <span className="text-sm font-bold text-brand-600">
                  {openSpots > 0 ? `${openSpots} spots open` : "Full"}
                </span>
              </div>
            </Card>
          );
        })}
      </div>
      {filtered.length === 0 ? (
        <Card>
          <p className="text-sm text-slate-500">No organizations match your search.</p>
        </Card>
      ) : null}
    </div>
  );
}
