import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { Avatar, Button, Card, Pill, ProgressBar, Screen, SectionHeader } from "@/components/ui";
import { HOUR_BADGE_THRESHOLDS, leaderboard } from "@/lib/mock";
import { useApp } from "@/lib/store";
import { colors, font, radius, shadow, spacing } from "@/lib/theme";

export default function DashboardScreen() {
  const router = useRouter();
  const { user, totalHours, upcomingHours, streakWeeks, badges, signups } = useApp();

  const rank =
    leaderboard
      .slice()
      .sort((a, b) => b.hours - a.hours)
      .findIndex((e) => e.isCurrentUser) + 1;

  // Next milestone badge based on hours.
  const nextThreshold = Object.values(HOUR_BADGE_THRESHOLDS)
    .sort((a, b) => a - b)
    .find((t) => t > totalHours);
  const hoursToNext = nextThreshold ? nextThreshold - totalHours : 0;
  const prevThreshold = Object.values(HOUR_BADGE_THRESHOLDS)
    .sort((a, b) => b - a)
    .find((t) => t <= totalHours) ?? 0;

  const upcoming = signups.filter((s) => !s.completed);
  const earnedBadges = badges.filter((b) => b.earned).slice(-3).reverse();

  return (
    <Screen>
      <View style={styles.header}>
        <View>
          <Text style={styles.hello}>Good to see you,</Text>
          <Text style={styles.name}>{user.name.split(" ")[0]} 👋</Text>
        </View>
        <Avatar initials={user.initials} color={user.avatarColor} size={48} />
      </View>

      {/* Hero impact card */}
      <View style={styles.hero}>
        <View style={styles.heroTopRow}>
          <Text style={styles.heroLabel}>Your impact so far</Text>
          <Pill label={`Rank #${rank}`} bg="rgba(255,255,255,0.18)" fg={colors.white} icon="trophy" />
        </View>
        <View style={styles.heroStatsRow}>
          <HeroStat value={String(totalHours)} label="Total hours" />
          <View style={styles.heroDivider} />
          <HeroStat value={`${streakWeeks}wk`} label="Streak" />
          <View style={styles.heroDivider} />
          <HeroStat value={String(badges.filter((b) => b.earned).length)} label="Badges" />
        </View>

        {nextThreshold ? (
          <View style={styles.heroProgress}>
            <View style={styles.heroProgressLabel}>
              <Text style={styles.heroProgressText}>
                {hoursToNext}h to your next badge
              </Text>
              <Text style={styles.heroProgressText}>
                {totalHours}/{nextThreshold}h
              </Text>
            </View>
            <ProgressBar
              value={totalHours - prevThreshold}
              total={nextThreshold - prevThreshold}
              color={colors.white}
              track="rgba(255,255,255,0.25)"
            />
          </View>
        ) : null}
      </View>

      {/* Upcoming */}
      <View style={{ gap: spacing.md }}>
        <SectionHeader
          title="Upcoming sessions"
          action="View all"
          onAction={() => router.push("/(tabs)/profile")}
        />
        {upcoming.length === 0 ? (
          <Card>
            <Text style={styles.muted}>
              No upcoming sessions yet. Explore organizations to sign up.
            </Text>
          </Card>
        ) : (
          upcoming.map((s) => (
            <Card key={s.id} onPress={() => router.push(`/organization/${s.organizationId}`)}>
              <View style={styles.sessionRow}>
                <View style={styles.dateChip}>
                  <Text style={styles.dateChipDay}>{s.date.split(" ")[1]}</Text>
                  <Text style={styles.dateChipMon}>{s.date.split(" ")[0]}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.sessionTitle}>{s.title}</Text>
                  <Text style={styles.sessionMeta}>{s.organizationName}</Text>
                  <View style={styles.sessionTimeRow}>
                    <Ionicons name="time-outline" size={13} color={colors.slate400} />
                    <Text style={styles.sessionTime}>
                      {s.time} · {s.durationHours}h
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.slate300} />
              </View>
            </Card>
          ))
        )}
        {upcomingHours > 0 ? (
          <Text style={styles.muted}>
            {upcomingHours}h scheduled — keep it up!
          </Text>
        ) : null}
      </View>

      {/* Recent badges */}
      <View style={{ gap: spacing.md }}>
        <SectionHeader
          title="Recent badges"
          action="See all"
          onAction={() => router.push("/(tabs)/profile")}
        />
        <View style={styles.badgeRow}>
          {earnedBadges.map((b) => (
            <View key={b.id} style={styles.badgeChip}>
              <View style={[styles.badgeIcon, { backgroundColor: `${b.color}1A` }]}>
                <Ionicons name={b.icon} size={22} color={b.color} />
              </View>
              <Text style={styles.badgeName} numberOfLines={1}>
                {b.name}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <Button
        label="Find a new opportunity"
        icon="search"
        onPress={() => router.push("/(tabs)/organizations")}
      />
    </Screen>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.heroStat}>
      <Text style={styles.heroValue}>{value}</Text>
      <Text style={styles.heroStatLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  hello: { fontSize: font.size.md, color: colors.slate500 },
  name: { fontSize: font.size.xxl, fontWeight: "800", color: colors.slate900 },
  hero: {
    backgroundColor: colors.brand600,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.lg,
    ...shadow.card,
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroLabel: { color: colors.brand100, fontSize: font.size.sm, fontWeight: "600" },
  heroStatsRow: { flexDirection: "row", alignItems: "center" },
  heroStat: { flex: 1, alignItems: "center" },
  heroValue: { color: colors.white, fontSize: font.size.xxl, fontWeight: "800" },
  heroStatLabel: { color: colors.brand100, fontSize: font.size.xs, marginTop: 2 },
  heroDivider: { width: 1, height: 36, backgroundColor: "rgba(255,255,255,0.2)" },
  heroProgress: { gap: 6 },
  heroProgressLabel: { flexDirection: "row", justifyContent: "space-between" },
  heroProgressText: { color: colors.white, fontSize: font.size.xs, fontWeight: "600" },
  muted: { color: colors.slate500, fontSize: font.size.sm },
  sessionRow: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  dateChip: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.brand50,
    alignItems: "center",
    justifyContent: "center",
  },
  dateChipDay: { fontSize: font.size.lg, fontWeight: "800", color: colors.brand700 },
  dateChipMon: { fontSize: font.size.xs, fontWeight: "700", color: colors.brand600 },
  sessionTitle: { fontSize: font.size.md, fontWeight: "700", color: colors.slate900 },
  sessionMeta: { fontSize: font.size.sm, color: colors.slate500, marginTop: 1 },
  sessionTimeRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  sessionTime: { fontSize: font.size.xs, color: colors.slate400 },
  badgeRow: { flexDirection: "row", gap: spacing.md },
  badgeChip: { flex: 1, alignItems: "center", gap: 6 },
  badgeIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeName: { fontSize: font.size.xs, fontWeight: "600", color: colors.slate700 },
});
