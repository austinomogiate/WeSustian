"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  MapPin,
  Star,
  Users,
} from "lucide-react";

import { Protected } from "@/components/protected";
import { Button, Card, cn, Pill, ProgressBar } from "@/components/ui";
import { causeStyles, findOrganization, type VolunteerSession } from "@/lib/data";
import { useApp } from "@/lib/store";

export default function OrganizationDetailPage() {
  return (
    <Protected>
      <OrganizationDetailContent />
    </Protected>
  );
}

function OrganizationDetailContent() {
  const params = useParams<{ id: string }>();
  const org = findOrganization(params.id);
  const { isSignedUp, toggleSignup } = useApp();

  if (!org) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-extrabold text-slate-900">Organization not found</h1>
        <Link href="/organizations" className="font-bold text-brand-600 hover:underline">
          Back to Explore
        </Link>
      </div>
    );
  }

  const cs = causeStyles[org.cause];

  return (
    <div className="space-y-6">
      <Link
        href="/organizations"
        className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-brand-700"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Explore
      </Link>

      <div className="flex items-center gap-4">
        <div className={cn("flex h-16 w-16 items-center justify-center rounded-2xl", cs.bg)}>
          <Star className={cn("h-7 w-7", cs.text)} />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">{org.name}</h1>
          <p className="flex items-center gap-1 text-sm text-slate-500">
            <MapPin className="h-3.5 w-3.5" /> {org.city}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCell icon={<Star className="h-4 w-4 text-amber-500" />} value={org.rating.toFixed(1)} label="Rating" />
        <StatCell icon={<Users className="h-4 w-4 text-brand-600" />} value={String(org.volunteersThisMonth)} label="This month" />
        <StatCell icon={<CalendarDays className="h-4 w-4 text-green-700" />} value={String(org.sessions.length)} label="Open dates" />
      </div>

      <Pill className={cn(cs.bg, cs.text)}>{org.cause}</Pill>

      <Card>
        <h2 className="text-lg font-bold text-slate-900">About</h2>
        <p className="mt-2 leading-relaxed text-slate-600">{org.about}</p>
      </Card>

      <div className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900">Upcoming sessions</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {org.sessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              signedUp={isSignedUp(session.id)}
              onToggle={() => toggleSignup(org.id, session)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SessionCard({
  session,
  signedUp,
  onToggle,
}: {
  session: VolunteerSession;
  signedUp: boolean;
  onToggle: () => void;
}) {
  const spotsLeft = session.spotsTotal - session.spotsTaken;
  const almostFull = spotsLeft <= 3 && spotsLeft > 0;
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-bold text-slate-900">{session.title}</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
            <CalendarDays className="h-3.5 w-3.5" /> {session.date}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
            <Clock className="h-3.5 w-3.5" /> {session.time} · {session.durationHours}h
          </p>
        </div>
        {signedUp ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700">
            <CheckCircle2 className="h-3.5 w-3.5" /> Going
          </span>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-600">
            {spotsLeft > 0 ? `${spotsLeft} of ${session.spotsTotal} spots left` : "Session full"}
          </span>
          {almostFull ? (
            <Pill className="bg-rose-100 text-rose-700">Almost full</Pill>
          ) : null}
        </div>
        <ProgressBar
          value={session.spotsTaken}
          total={session.spotsTotal}
          barClassName={almostFull ? "bg-rose-500" : "bg-brand-500"}
        />
      </div>

      <Button variant={signedUp ? "danger" : "primary"} onClick={onToggle} className="w-full">
        {signedUp ? "Cancel sign-up" : spotsLeft > 0 ? "Sign up" : "Join waitlist"}
      </Button>
    </Card>
  );
}

function StatCell({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl border border-slate-100 bg-white py-4 shadow-sm">
      {icon}
      <span className="text-lg font-extrabold text-slate-900">{value}</span>
      <span className="text-xs text-slate-500">{label}</span>
    </div>
  );
}
