import type { Ionicons } from "@expo/vector-icons";

export type IconName = keyof typeof Ionicons.glyphMap;

export type CauseKey =
  | "Food Security"
  | "Education"
  | "Environment"
  | "Health"
  | "Community";

export type VolunteerSession = {
  id: string;
  organizationId: string;
  title: string;
  date: string; // human readable, e.g. "Sat, Jun 27"
  time: string; // e.g. "9:00 AM – 12:00 PM"
  durationHours: number;
  spotsTotal: number;
  spotsTaken: number;
};

export type Organization = {
  id: string;
  name: string;
  city: string;
  cause: CauseKey;
  about: string;
  rating: number;
  volunteersThisMonth: number;
  sessions: VolunteerSession[];
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: IconName;
  color: string;
  earned: boolean;
  requirement: string;
};

export type LeaderboardEntry = {
  id: string;
  name: string;
  avatarColor: string;
  initials: string;
  hours: number;
  team: string;
  isCurrentUser?: boolean;
};

export type TeamEntry = {
  id: string;
  name: string;
  hours: number;
  members: number;
};

export type DonationDrive = {
  id: string;
  title: string;
  organization: string;
  category: "Clothing" | "Food" | "Coats" | "Toys" | "Books";
  icon: IconName;
  description: string;
  goal: number;
  collected: number;
  unit: string; // e.g. "items", "lbs", "coats"
  deadline: string;
};

export type UserProfile = {
  name: string;
  email: string;
  team: string;
  initials: string;
  avatarColor: string;
};
