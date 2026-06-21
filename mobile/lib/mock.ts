import { colors } from "./theme";
import type {
  Badge,
  DonationDrive,
  IconName,
  LeaderboardEntry,
  Organization,
  TeamEntry,
  UserProfile,
} from "./types";

export const currentUser: UserProfile = {
  name: "Alex Lee",
  email: "alex.lee@company.com",
  team: "Product",
  initials: "AL",
  avatarColor: colors.brand600,
};

export const causeStyles: Record<string, { bg: string; fg: string; icon: IconName }> = {
  "Food Security": { bg: colors.amber100, fg: colors.amber500, icon: "fast-food" },
  Education: { bg: colors.blue100, fg: colors.blue700, icon: "school" },
  Environment: { bg: colors.green100, fg: colors.green700, icon: "leaf" },
  Health: { bg: colors.rose100, fg: colors.rose700, icon: "medkit" },
  Community: { bg: colors.violet100, fg: colors.violet700, icon: "people" },
};

export const organizations: Organization[] = [
  {
    id: "1",
    name: "Houston Food Access",
    city: "Houston, TX",
    cause: "Food Security",
    about:
      "We rescue surplus food and distribute fresh groceries to families across greater Houston. Volunteers help sort, pack, and hand out food boxes.",
    rating: 4.9,
    volunteersThisMonth: 128,
    sessions: [
      {
        id: "s1",
        organizationId: "1",
        title: "Morning Food Box Packing",
        date: "Sat, Jun 27",
        time: "9:00 AM – 12:00 PM",
        durationHours: 3,
        spotsTotal: 20,
        spotsTaken: 14,
      },
      {
        id: "s2",
        organizationId: "1",
        title: "Mobile Pantry Distribution",
        date: "Wed, Jul 1",
        time: "4:00 PM – 6:30 PM",
        durationHours: 2.5,
        spotsTotal: 12,
        spotsTaken: 11,
      },
    ],
  },
  {
    id: "2",
    name: "Austin Youth Mentors",
    city: "Austin, TX",
    cause: "Education",
    about:
      "Pairing professionals with local students for tutoring and career mentorship. Sessions run after school and on weekends.",
    rating: 4.8,
    volunteersThisMonth: 76,
    sessions: [
      {
        id: "s3",
        organizationId: "2",
        title: "After-School STEM Tutoring",
        date: "Tue, Jun 30",
        time: "3:30 PM – 5:00 PM",
        durationHours: 1.5,
        spotsTotal: 10,
        spotsTaken: 6,
      },
      {
        id: "s4",
        organizationId: "2",
        title: "Resume & Interview Workshop",
        date: "Sat, Jul 4",
        time: "10:00 AM – 1:00 PM",
        durationHours: 3,
        spotsTotal: 15,
        spotsTaken: 4,
      },
    ],
  },
  {
    id: "3",
    name: "Dallas Green Spaces",
    city: "Dallas, TX",
    cause: "Environment",
    about:
      "Restoring urban parks and planting native trees. Family-friendly outdoor work days with all tools provided.",
    rating: 4.7,
    volunteersThisMonth: 94,
    sessions: [
      {
        id: "s5",
        organizationId: "3",
        title: "Trinity River Cleanup",
        date: "Sun, Jun 28",
        time: "8:00 AM – 11:00 AM",
        durationHours: 3,
        spotsTotal: 30,
        spotsTaken: 22,
      },
      {
        id: "s6",
        organizationId: "3",
        title: "Native Tree Planting",
        date: "Sat, Jul 11",
        time: "9:00 AM – 12:00 PM",
        durationHours: 3,
        spotsTotal: 25,
        spotsTaken: 9,
      },
    ],
  },
  {
    id: "4",
    name: "San Antonio Senior Connect",
    city: "San Antonio, TX",
    cause: "Community",
    about:
      "Combating senior isolation through friendly visits, tech help, and community meals.",
    rating: 4.9,
    volunteersThisMonth: 41,
    sessions: [
      {
        id: "s7",
        organizationId: "4",
        title: "Tech Help Drop-In",
        date: "Thu, Jul 2",
        time: "1:00 PM – 3:00 PM",
        durationHours: 2,
        spotsTotal: 8,
        spotsTaken: 3,
      },
    ],
  },
  {
    id: "5",
    name: "Gulf Coast Free Clinic",
    city: "Galveston, TX",
    cause: "Health",
    about:
      "Volunteer-run clinic providing free check-ups and wellness screenings to the uninsured.",
    rating: 4.8,
    volunteersThisMonth: 33,
    sessions: [
      {
        id: "s8",
        organizationId: "5",
        title: "Wellness Screening Day",
        date: "Sat, Jul 18",
        time: "9:00 AM – 2:00 PM",
        durationHours: 5,
        spotsTotal: 18,
        spotsTaken: 7,
      },
    ],
  },
];

export const donationDrives: DonationDrive[] = [
  {
    id: "d1",
    title: "Winter Coat Drive",
    organization: "Houston Food Access",
    category: "Coats",
    icon: "snow",
    description:
      "Gently used or new coats for families facing a cold winter. All sizes needed, especially kids'.",
    goal: 500,
    collected: 312,
    unit: "coats",
    deadline: "Ends Jul 31",
  },
  {
    id: "d2",
    title: "Back-to-School Supply Drive",
    organization: "Austin Youth Mentors",
    category: "Books",
    icon: "book",
    description:
      "Backpacks, notebooks, and books to set local students up for a strong school year.",
    goal: 1000,
    collected: 640,
    unit: "items",
    deadline: "Ends Aug 15",
  },
  {
    id: "d3",
    title: "Community Food Pantry Restock",
    organization: "Gulf Coast Free Clinic",
    category: "Food",
    icon: "fast-food",
    description:
      "Non-perishable canned goods, rice, and pasta to keep the shared pantry stocked all summer.",
    goal: 2000,
    collected: 1480,
    unit: "lbs",
    deadline: "Ends Jul 20",
  },
  {
    id: "d4",
    title: "Professional Clothing Closet",
    organization: "Austin Youth Mentors",
    category: "Clothing",
    icon: "shirt",
    description:
      "Interview-ready clothing for graduating students entering the workforce. Suits, dresses, shoes.",
    goal: 300,
    collected: 95,
    unit: "items",
    deadline: "Ends Sep 1",
  },
  {
    id: "d5",
    title: "Holiday Toy Drive",
    organization: "San Antonio Senior Connect",
    category: "Toys",
    icon: "gift",
    description:
      "New, unwrapped toys for kids in shelters so every child has something to open this season.",
    goal: 800,
    collected: 120,
    unit: "toys",
    deadline: "Ends Dec 1",
  },
];

export const leaderboard: LeaderboardEntry[] = [
  { id: "u2", name: "Priya Nair", initials: "PN", avatarColor: colors.violet700, hours: 48, team: "Engineering" },
  { id: "u3", name: "Marcus Chen", initials: "MC", avatarColor: colors.green700, hours: 41, team: "Sales" },
  { id: "u4", name: "Sofia Reyes", initials: "SR", avatarColor: colors.rose700, hours: 37, team: "Design" },
  { id: "u1", name: "Alex Lee", initials: "AL", avatarColor: colors.brand600, hours: 32, team: "Product", isCurrentUser: true },
  { id: "u5", name: "Jordan Smith", initials: "JS", avatarColor: colors.blue700, hours: 29, team: "Product" },
  { id: "u6", name: "Hana Kim", initials: "HK", avatarColor: colors.amber500, hours: 26, team: "Engineering" },
  { id: "u7", name: "Diego Torres", initials: "DT", avatarColor: colors.brand700, hours: 21, team: "Marketing" },
  { id: "u8", name: "Lena Wolf", initials: "LW", avatarColor: colors.slate600, hours: 18, team: "Design" },
];

export const teams: TeamEntry[] = [
  { id: "t1", name: "Engineering", hours: 214, members: 32 },
  { id: "t2", name: "Sales", hours: 188, members: 41 },
  { id: "t3", name: "Product", hours: 142, members: 18 },
  { id: "t4", name: "Design", hours: 96, members: 12 },
  { id: "t5", name: "Marketing", hours: 74, members: 15 },
];

// Badges describe milestones; `earned` is recomputed in the store from live hours.
export const baseBadges: Badge[] = [
  {
    id: "b1",
    name: "First Hour",
    description: "Logged your very first volunteer hour.",
    icon: "footsteps",
    color: colors.brand600,
    earned: true,
    requirement: "1 hour",
  },
  {
    id: "b2",
    name: "Getting Started",
    description: "Reached 10 volunteer hours.",
    icon: "leaf",
    color: colors.green700,
    earned: true,
    requirement: "10 hours",
  },
  {
    id: "b3",
    name: "Changemaker",
    description: "Reached 25 volunteer hours.",
    icon: "flame",
    color: colors.amber500,
    earned: true,
    requirement: "25 hours",
  },
  {
    id: "b4",
    name: "Community Pillar",
    description: "Reached 50 volunteer hours.",
    icon: "ribbon",
    color: colors.violet700,
    earned: false,
    requirement: "50 hours",
  },
  {
    id: "b5",
    name: "Centurion",
    description: "Reached 100 volunteer hours.",
    icon: "trophy",
    color: colors.amber500,
    earned: false,
    requirement: "100 hours",
  },
  {
    id: "b6",
    name: "Generous Giver",
    description: "Contributed to 3 donation drives.",
    icon: "gift",
    color: colors.rose700,
    earned: false,
    requirement: "3 drives",
  },
];

export const HOUR_BADGE_THRESHOLDS: Record<string, number> = {
  b1: 1,
  b2: 10,
  b3: 25,
  b4: 50,
  b5: 100,
};

export function findOrganization(id: string): Organization | undefined {
  return organizations.find((o) => o.id === id);
}

export function findSession(orgId: string, sessionId: string) {
  return findOrganization(orgId)?.sessions.find((s) => s.id === sessionId);
}
