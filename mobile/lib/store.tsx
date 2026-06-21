import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

import {
  baseBadges,
  currentUser,
  donationDrives as seedDrives,
  findOrganization,
  HOUR_BADGE_THRESHOLDS,
  organizations,
} from "./mock";
import type { Badge, DonationDrive, UserProfile, VolunteerSession } from "./types";

export type Signup = {
  id: string; // signup id
  sessionId: string;
  organizationId: string;
  organizationName: string;
  title: string;
  date: string;
  time: string;
  durationHours: number;
  completed: boolean;
};

// Hours the user banked before any signups currently tracked in the app.
// Added to the duration of every "completed" signup to get total hours.
const BASELINE_HOURS = 23;

type AppState = {
  user: UserProfile;
  isAuthenticated: boolean;
  signups: Signup[];
  drives: DonationDrive[];
  completedHours: number;
  upcomingHours: number;
  totalHours: number;
  badges: Badge[];
  drivesContributed: number;
  streakWeeks: number;
  signIn: (email?: string) => void;
  signOut: () => void;
  isSignedUp: (sessionId: string) => boolean;
  toggleSignup: (orgId: string, session: VolunteerSession) => void;
  completeSignup: (signupId: string) => void;
  contribute: (driveId: string, amount: number) => void;
};

const AppContext = createContext<AppState | null>(null);

let idCounter = 0;
const nextId = () => `local-${Date.now()}-${idCounter++}`;

function seedSignups(): Signup[] {
  // Pre-populate one completed and one upcoming commitment for a lived-in feel.
  const org = findOrganization("3");
  const completedSession = org?.sessions[0];
  const org2 = findOrganization("2");
  const upcomingSession = org2?.sessions[0];
  const result: Signup[] = [];
  if (org && completedSession) {
    result.push({
      id: nextId(),
      sessionId: "seed-completed",
      organizationId: org.id,
      organizationName: org.name,
      title: completedSession.title,
      date: "Sat, Jun 13",
      time: completedSession.time,
      durationHours: completedSession.durationHours,
      completed: true,
    });
  }
  if (org2 && upcomingSession) {
    result.push({
      id: nextId(),
      sessionId: upcomingSession.id,
      organizationId: org2.id,
      organizationName: org2.name,
      title: upcomingSession.title,
      date: upcomingSession.date,
      time: upcomingSession.time,
      durationHours: upcomingSession.durationHours,
      completed: false,
    });
  }
  return result;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user] = useState<UserProfile>(currentUser);
  const [signups, setSignups] = useState<Signup[]>(seedSignups);
  const [drives, setDrives] = useState<DonationDrive[]>(seedDrives);
  const [seededDriveContributions, setSeededDriveContributions] = useState(2);

  const completedHours = useMemo(
    () =>
      BASELINE_HOURS +
      signups.filter((s) => s.completed).reduce((sum, s) => sum + s.durationHours, 0),
    [signups]
  );

  const upcomingHours = useMemo(
    () => signups.filter((s) => !s.completed).reduce((sum, s) => sum + s.durationHours, 0),
    [signups]
  );

  const totalHours = completedHours;

  const drivesContributed = seededDriveContributions;

  const badges = useMemo<Badge[]>(
    () =>
      baseBadges.map((b) => {
        const threshold = HOUR_BADGE_THRESHOLDS[b.id];
        if (threshold !== undefined) {
          return { ...b, earned: totalHours >= threshold };
        }
        if (b.id === "b6") {
          return { ...b, earned: drivesContributed >= 3 };
        }
        return b;
      }),
    [totalHours, drivesContributed]
  );

  const signIn = useCallback(() => setIsAuthenticated(true), []);
  const signOut = useCallback(() => setIsAuthenticated(false), []);

  const isSignedUp = useCallback(
    (sessionId: string) => signups.some((s) => s.sessionId === sessionId && !s.completed),
    [signups]
  );

  const toggleSignup = useCallback((orgId: string, session: VolunteerSession) => {
    setSignups((prev) => {
      const existing = prev.find((s) => s.sessionId === session.id && !s.completed);
      if (existing) {
        return prev.filter((s) => s.id !== existing.id);
      }
      const org = organizations.find((o) => o.id === orgId);
      return [
        ...prev,
        {
          id: nextId(),
          sessionId: session.id,
          organizationId: orgId,
          organizationName: org?.name ?? "Organization",
          title: session.title,
          date: session.date,
          time: session.time,
          durationHours: session.durationHours,
          completed: false,
        },
      ];
    });
  }, []);

  const completeSignup = useCallback((signupId: string) => {
    setSignups((prev) =>
      prev.map((s) => (s.id === signupId ? { ...s, completed: true } : s))
    );
  }, []);

  const contribute = useCallback((driveId: string, amount: number) => {
    if (!amount || amount <= 0) return;
    setDrives((prev) =>
      prev.map((d) =>
        d.id === driveId
          ? { ...d, collected: Math.min(d.goal, d.collected + amount) }
          : d
      )
    );
    setSeededDriveContributions((n) => n + 1);
  }, []);

  const value: AppState = {
    user,
    isAuthenticated,
    signups,
    drives,
    completedHours,
    upcomingHours,
    totalHours,
    badges,
    drivesContributed,
    streakWeeks: 4,
    signIn,
    signOut,
    isSignedUp,
    toggleSignup,
    completeSignup,
    contribute,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return ctx;
}
