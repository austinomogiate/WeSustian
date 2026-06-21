"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  badges as baseBadges,
  currentUser,
  donationDrives as seedDrives,
  findOrganization,
  HOUR_BADGE_THRESHOLDS,
  organizations,
  type DonationDrive,
  type UserProfile,
  type VolunteerSession,
} from "./data";

export type Signup = {
  id: string;
  sessionId: string;
  organizationId: string;
  organizationName: string;
  title: string;
  date: string;
  time: string;
  durationHours: number;
  completed: boolean;
};

const BASELINE_HOURS = 23;

type PersistedState = {
  isAuthenticated: boolean;
  signups: Signup[];
  drives: DonationDrive[];
  driveContributions: number;
};

type AppState = {
  ready: boolean;
  user: UserProfile;
  isAuthenticated: boolean;
  signups: Signup[];
  drives: DonationDrive[];
  completedHours: number;
  upcomingHours: number;
  totalHours: number;
  earnedBadgeIds: string[];
  drivesContributed: number;
  streakWeeks: number;
  signIn: () => void;
  signOut: () => void;
  isSignedUp: (sessionId: string) => boolean;
  toggleSignup: (orgId: string, session: VolunteerSession) => void;
  completeSignup: (signupId: string) => void;
  contribute: (driveId: string, amount: number) => void;
};

const AppContext = createContext<AppState | null>(null);
const STORAGE_KEY = "we-sustain-state-v1";

let idCounter = 0;
const nextId = () => `local-${Date.now()}-${idCounter++}`;

function seedSignups(): Signup[] {
  const org = findOrganization("3");
  const org2 = findOrganization("2");
  const result: Signup[] = [];
  if (org) {
    const s = org.sessions[0];
    result.push({
      id: nextId(),
      sessionId: "seed-completed",
      organizationId: org.id,
      organizationName: org.name,
      title: s.title,
      date: "Sat, Jun 13",
      time: s.time,
      durationHours: s.durationHours,
      completed: true,
    });
  }
  if (org2) {
    const s = org2.sessions[0];
    result.push({
      id: nextId(),
      sessionId: s.id,
      organizationId: org2.id,
      organizationName: org2.name,
      title: s.title,
      date: s.date,
      time: s.time,
      durationHours: s.durationHours,
      completed: false,
    });
  }
  return result;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [signups, setSignups] = useState<Signup[]>([]);
  const [drives, setDrives] = useState<DonationDrive[]>(seedDrives);
  const [driveContributions, setDriveContributions] = useState(2);
  const user = currentUser;

  // Hydrate from localStorage on first mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PersistedState;
        setIsAuthenticated(parsed.isAuthenticated ?? false);
        setSignups(parsed.signups ?? seedSignups());
        setDrives(parsed.drives ?? seedDrives);
        setDriveContributions(parsed.driveContributions ?? 2);
      } else {
        setSignups(seedSignups());
      }
    } catch {
      setSignups(seedSignups());
    }
    setReady(true);
  }, []);

  // Persist on change.
  useEffect(() => {
    if (!ready) return;
    const toSave: PersistedState = { isAuthenticated, signups, drives, driveContributions };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch {
      /* ignore quota errors */
    }
  }, [ready, isAuthenticated, signups, drives, driveContributions]);

  const completedHours = useMemo(
    () => BASELINE_HOURS + signups.filter((s) => s.completed).reduce((sum, s) => sum + s.durationHours, 0),
    [signups]
  );
  const upcomingHours = useMemo(
    () => signups.filter((s) => !s.completed).reduce((sum, s) => sum + s.durationHours, 0),
    [signups]
  );
  const totalHours = completedHours;

  const earnedBadgeIds = useMemo(() => {
    const ids: string[] = [];
    for (const b of baseBadges) {
      const threshold = HOUR_BADGE_THRESHOLDS[b.id];
      if (threshold !== undefined) {
        if (totalHours >= threshold) ids.push(b.id);
      } else if (b.id === "b6" && driveContributions >= 3) {
        ids.push(b.id);
      }
    }
    return ids;
  }, [totalHours, driveContributions]);

  const signIn = useCallback(() => setIsAuthenticated(true), []);
  const signOut = useCallback(() => setIsAuthenticated(false), []);

  const isSignedUp = useCallback(
    (sessionId: string) => signups.some((s) => s.sessionId === sessionId && !s.completed),
    [signups]
  );

  const toggleSignup = useCallback((orgId: string, session: VolunteerSession) => {
    setSignups((prev) => {
      const existing = prev.find((s) => s.sessionId === session.id && !s.completed);
      if (existing) return prev.filter((s) => s.id !== existing.id);
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
    setSignups((prev) => prev.map((s) => (s.id === signupId ? { ...s, completed: true } : s)));
  }, []);

  const contribute = useCallback((driveId: string, amount: number) => {
    if (!amount || amount <= 0) return;
    setDrives((prev) =>
      prev.map((d) => (d.id === driveId ? { ...d, collected: Math.min(d.goal, d.collected + amount) } : d))
    );
    setDriveContributions((n) => n + 1);
  }, []);

  const value: AppState = {
    ready,
    user,
    isAuthenticated,
    signups,
    drives,
    completedHours,
    upcomingHours,
    totalHours,
    earnedBadgeIds,
    drivesContributed: driveContributions,
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
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
