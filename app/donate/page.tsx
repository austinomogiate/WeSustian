"use client";

import { useState } from "react";
import {
  BookOpen,
  Boxes,
  CheckCircle2,
  Clock,
  Gift,
  Shirt,
  Snowflake,
  Utensils,
  X,
} from "lucide-react";

import { Protected } from "@/components/protected";
import { Button, Card, cn, Pill, ProgressBar } from "@/components/ui";
import { type DonationDrive } from "@/lib/data";
import { useApp } from "@/lib/store";

const categoryStyle: Record<
  DonationDrive["category"],
  { bg: string; text: string; bar: string; Icon: typeof Gift }
> = {
  Coats: { bg: "bg-blue-100", text: "text-blue-700", bar: "bg-blue-600", Icon: Snowflake },
  Food: { bg: "bg-amber-100", text: "text-amber-700", bar: "bg-amber-500", Icon: Utensils },
  Clothing: { bg: "bg-violet-100", text: "text-violet-700", bar: "bg-violet-600", Icon: Shirt },
  Books: { bg: "bg-green-100", text: "text-green-700", bar: "bg-green-600", Icon: BookOpen },
  Toys: { bg: "bg-rose-100", text: "text-rose-700", bar: "bg-rose-600", Icon: Gift },
};

const PLEDGE_OPTIONS = [1, 3, 5, 10];

export default function DonatePage() {
  return (
    <Protected>
      <DonateContent />
    </Protected>
  );
}

function DonateContent() {
  const { drives, contribute } = useApp();
  const [active, setActive] = useState<DonationDrive | null>(null);
  const [amount, setAmount] = useState(3);
  const [confirmed, setConfirmed] = useState(false);

  const totalCollected = drives.reduce((s, d) => s + d.collected, 0);

  const open = (d: DonationDrive) => {
    setActive(d);
    setAmount(3);
    setConfirmed(false);
  };

  const submit = () => {
    if (active) {
      contribute(active.id, amount);
      setConfirmed(true);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Goods Drives</h1>
        <p className="max-w-2xl text-slate-500">
          Pledge physical items, not just hours. Drop-off points are at every office lobby.
        </p>
      </div>

      <div className="flex items-center gap-4 rounded-2xl bg-brand-700 p-5 text-white">
        <Boxes className="h-8 w-8" />
        <div>
          <p className="text-2xl font-extrabold">{totalCollected.toLocaleString()}</p>
          <p className="text-sm text-brand-100">items pledged company-wide</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {drives.map((d) => {
          const cat = categoryStyle[d.category];
          const pct = Math.round((d.collected / d.goal) * 100);
          return (
            <Card key={d.id} className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", cat.bg)}>
                  <cat.Icon className={cn("h-6 w-6", cat.text)} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-900">{d.title}</p>
                  <p className="truncate text-sm text-slate-500">{d.organization}</p>
                </div>
                <Pill className={cn(cat.bg, cat.text)}>{d.category}</Pill>
              </div>

              <p className="text-sm leading-relaxed text-slate-600">{d.description}</p>

              <div className="space-y-1.5">
                <ProgressBar value={d.collected} total={d.goal} barClassName={cat.bar} />
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600">
                    {d.collected.toLocaleString()} / {d.goal.toLocaleString()} {d.unit} ({pct}%)
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="h-3 w-3" /> {d.deadline}
                  </span>
                </div>
              </div>

              <Button onClick={() => open(d)} className="w-full">
                <Gift className="h-4 w-4" /> Pledge items
              </Button>
            </Card>
          );
        })}
      </div>

      {active ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-0 sm:items-center sm:p-4">
          <div className="w-full max-w-md rounded-t-3xl bg-white p-6 shadow-xl sm:rounded-3xl">
            {!confirmed ? (
              <>
                <div className="flex items-start justify-between">
                  <h2 className="text-xl font-extrabold text-slate-900">Pledge to {active.title}</h2>
                  <button onClick={() => setActive(null)} aria-label="Close">
                    <X className="h-5 w-5 text-slate-400" />
                  </button>
                </div>
                <p className="mt-1 text-slate-500">
                  How many {active.unit} can you bring to the drop-off point?
                </p>
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {PLEDGE_OPTIONS.map((n) => (
                    <button
                      key={n}
                      onClick={() => setAmount(n)}
                      className={cn(
                        "rounded-xl border py-4 text-xl font-extrabold transition",
                        amount === n
                          ? "border-brand-500 bg-brand-50 text-brand-700"
                          : "border-slate-200 text-slate-600 hover:border-brand-300"
                      )}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <div className="mt-5 space-y-2">
                  <Button onClick={submit} className="w-full">
                    <Gift className="h-4 w-4" /> Pledge {amount} {active.unit}
                  </Button>
                  <Button variant="ghost" onClick={() => setActive(null)} className="w-full">
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 py-4 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white">
                  <CheckCircle2 className="h-9 w-9" />
                </span>
                <h2 className="text-xl font-extrabold text-slate-900">Thank you!</h2>
                <p className="text-slate-500">
                  Your pledge of {amount} {active.unit} to {active.title} is logged. Bring items to
                  any office lobby drop-off box.
                </p>
                <Button onClick={() => setActive(null)} className="w-full">
                  Done
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
