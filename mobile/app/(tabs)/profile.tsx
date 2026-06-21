import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Avatar, Button, Card, Screen } from "@/components/ui";
import { useApp } from "@/lib/store";
import { colors, font, radius, spacing } from "@/lib/theme";

type Tab = "activity" | "badges";

export default function ProfileScreen() {
  const router = useRouter();
  const {
    user,
    totalHours,
    upcomingHours,
    drivesContributed,
    badges,
    signups,
    completeSignup,
    signOut,
  } = useApp();
  const [tab, setTab] = useState<Tab>("activity");

  const upcoming = signups.filter((s) => !s.completed);
  const completed = signups.filter((s) => s.completed);
  const earnedCount = badges.filter((b) => b.earned).length;

  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/login");
  };

  return (
    <Screen>
      {/* Profile header */}
      <View style={styles.profileHeader}>
        <Avatar initials={user.initials} color={user.avatarColor} size={64} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <View style={styles.teamPill}>
            <Ionicons name="people" size={12} color={colors.brand700} />
            <Text style={styles.teamPillText}>{user.team} team</Text>
          </View>
        </View>
      </View>

      {/* Impact stats */}
      <View style={styles.statGrid}>
        <StatTile icon="time" tint={colors.brand600} value={`${totalHours}h`} label="Total hours" />
        <StatTile icon="calendar" tint={colors.green700} value={`${upcomingHours}h`} label="Upcoming" />
        <StatTile icon="ribbon" tint={colors.violet700} value={String(earnedCount)} label="Badges" />
        <StatTile icon="gift" tint={colors.rose700} value={String(drivesContributed)} label="Drives" />
      </View>

      {/* Tabs */}
      <View style={styles.segment}>
        <Pressable
          onPress={() => setTab("activity")}
          style={[styles.segmentBtn, tab === "activity" && styles.segmentBtnActive]}
        >
          <Text style={[styles.segmentText, tab === "activity" && styles.segmentTextActive]}>
            My Activity
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setTab("badges")}
          style={[styles.segmentBtn, tab === "badges" && styles.segmentBtnActive]}
        >
          <Text style={[styles.segmentText, tab === "badges" && styles.segmentTextActive]}>
            Badges
          </Text>
        </Pressable>
      </View>

      {tab === "activity" ? (
        <View style={{ gap: spacing.md }}>
          <Text style={styles.groupLabel}>Upcoming ({upcoming.length})</Text>
          {upcoming.length === 0 ? (
            <Card>
              <Text style={styles.muted}>Nothing scheduled. Explore to sign up for a session.</Text>
            </Card>
          ) : (
            upcoming.map((s) => (
              <Card key={s.id} style={{ gap: spacing.md }}>
                <View style={styles.activityRow}>
                  <View style={[styles.activityIcon, { backgroundColor: colors.brand50 }]}>
                    <Ionicons name="calendar" size={20} color={colors.brand600} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.activityTitle}>{s.title}</Text>
                    <Text style={styles.activityMeta}>
                      {s.organizationName} · {s.date}
                    </Text>
                    <Text style={styles.activityTime}>
                      {s.time} · {s.durationHours}h
                    </Text>
                  </View>
                </View>
                <Button
                  label="Mark as completed"
                  variant="outline"
                  icon="checkmark-done-outline"
                  onPress={() => completeSignup(s.id)}
                />
              </Card>
            ))
          )}

          <Text style={styles.groupLabel}>Completed ({completed.length})</Text>
          {completed.length === 0 ? (
            <Card>
              <Text style={styles.muted}>Completed sessions will show here.</Text>
            </Card>
          ) : (
            completed.map((s) => (
              <Card key={s.id}>
                <View style={styles.activityRow}>
                  <View style={[styles.activityIcon, { backgroundColor: colors.green100 }]}>
                    <Ionicons name="checkmark-circle" size={20} color={colors.green700} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.activityTitle}>{s.title}</Text>
                    <Text style={styles.activityMeta}>
                      {s.organizationName} · {s.date}
                    </Text>
                  </View>
                  <Text style={styles.hoursTag}>+{s.durationHours}h</Text>
                </View>
              </Card>
            ))
          )}
        </View>
      ) : (
        <View style={styles.badgeGrid}>
          {badges.map((b) => (
            <View key={b.id} style={[styles.badgeCard, !b.earned && styles.badgeLocked]}>
              <View
                style={[
                  styles.badgeIcon,
                  { backgroundColor: b.earned ? `${b.color}1A` : colors.slate100 },
                ]}
              >
                <Ionicons
                  name={b.earned ? b.icon : "lock-closed"}
                  size={26}
                  color={b.earned ? b.color : colors.slate400}
                />
              </View>
              <Text style={[styles.badgeName, !b.earned && { color: colors.slate400 }]}>
                {b.name}
              </Text>
              <Text style={styles.badgeReq}>{b.earned ? "Earned" : b.requirement}</Text>
            </View>
          ))}
        </View>
      )}

      <Button label="Sign out" variant="ghost" icon="log-out-outline" onPress={handleSignOut} />
    </Screen>
  );
}

function StatTile({
  icon,
  tint,
  value,
  label,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  tint: string;
  value: string;
  label: string;
}) {
  return (
    <View style={styles.statTile}>
      <View style={[styles.statIcon, { backgroundColor: `${tint}1A` }]}>
        <Ionicons name={icon} size={18} color={tint} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  profileHeader: { flexDirection: "row", alignItems: "center", gap: spacing.lg },
  name: { fontSize: font.size.xl, fontWeight: "800", color: colors.slate900 },
  email: { fontSize: font.size.sm, color: colors.slate500, marginTop: 1 },
  teamPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.brand50,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
    alignSelf: "flex-start",
    marginTop: 6,
  },
  teamPillText: { fontSize: font.size.xs, fontWeight: "700", color: colors.brand700 },
  statGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md },
  statTile: {
    width: "47%",
    flexGrow: 1,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.slate100,
    padding: spacing.lg,
    gap: 6,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  statValue: { fontSize: font.size.xl, fontWeight: "800", color: colors.slate900 },
  statLabel: { fontSize: font.size.sm, color: colors.slate500 },
  segment: {
    flexDirection: "row",
    backgroundColor: colors.slate100,
    borderRadius: radius.md,
    padding: 4,
  },
  segmentBtn: { flex: 1, paddingVertical: 9, alignItems: "center", borderRadius: radius.sm },
  segmentBtnActive: { backgroundColor: colors.white },
  segmentText: { fontSize: font.size.sm, fontWeight: "700", color: colors.slate500 },
  segmentTextActive: { color: colors.brand700 },
  groupLabel: { fontSize: font.size.sm, fontWeight: "700", color: colors.slate500, textTransform: "uppercase", letterSpacing: 0.5 },
  muted: { color: colors.slate500, fontSize: font.size.sm },
  activityRow: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  activityIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  activityTitle: { fontSize: font.size.md, fontWeight: "700", color: colors.slate900 },
  activityMeta: { fontSize: font.size.sm, color: colors.slate500, marginTop: 1 },
  activityTime: { fontSize: font.size.xs, color: colors.slate400, marginTop: 2 },
  hoursTag: { fontSize: font.size.md, fontWeight: "800", color: colors.green700 },
  badgeGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md },
  badgeCard: {
    width: "47%",
    flexGrow: 1,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.slate100,
    padding: spacing.lg,
    alignItems: "center",
    gap: 6,
  },
  badgeLocked: { backgroundColor: colors.slate50 },
  badgeIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeName: { fontSize: font.size.md, fontWeight: "700", color: colors.slate900, textAlign: "center" },
  badgeReq: { fontSize: font.size.xs, color: colors.slate400 },
});
