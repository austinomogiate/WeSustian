import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Avatar, Card, ProgressBar, Screen } from "@/components/ui";
import { leaderboard, teams } from "@/lib/mock";
import { useApp } from "@/lib/store";
import { colors, font, radius, spacing } from "@/lib/theme";

type Tab = "people" | "teams";

const medalColors = ["#facc15", "#cbd5e1", "#d97706"];

export default function LeaderboardScreen() {
  const [tab, setTab] = useState<Tab>("people");
  const { totalHours, user } = useApp();

  // Reflect the user's live hours in the standings.
  const people = useMemo(() => {
    return leaderboard
      .map((e) => (e.isCurrentUser ? { ...e, hours: totalHours } : e))
      .sort((a, b) => b.hours - a.hours);
  }, [totalHours]);

  const topHours = Math.max(...people.map((p) => p.hours), 1);
  const sortedTeams = [...teams].sort((a, b) => b.hours - a.hours);
  const topTeamHours = Math.max(...sortedTeams.map((t) => t.hours), 1);

  return (
    <Screen>
      <View style={{ gap: 4 }}>
        <Text style={styles.title}>Leaderboard</Text>
        <Text style={styles.subtitle}>This quarter · resets in 3 weeks</Text>
      </View>

      <View style={styles.segment}>
        <SegmentBtn label="People" active={tab === "people"} onPress={() => setTab("people")} />
        <SegmentBtn label="Teams" active={tab === "teams"} onPress={() => setTab("teams")} />
      </View>

      {tab === "people" ? (
        <>
          {/* Podium */}
          <View style={styles.podium}>
            {[1, 0, 2].map((idx) => {
              const p = people[idx];
              if (!p) return <View key={idx} style={{ flex: 1 }} />;
              const heights = [96, 120, 80];
              return (
                <View key={p.id} style={styles.podiumCol}>
                  <Avatar initials={p.initials} color={p.avatarColor} size={idx === 0 ? 56 : 46} />
                  <Text style={styles.podiumName} numberOfLines={1}>
                    {p.name.split(" ")[0]}
                  </Text>
                  <View
                    style={[
                      styles.podiumBar,
                      { height: heights[idx === 0 ? 1 : idx === 1 ? 0 : 2], backgroundColor: medalColors[idx] },
                    ]}
                  >
                    <Text style={styles.podiumRank}>{idx + 1}</Text>
                    <Text style={styles.podiumHours}>{p.hours}h</Text>
                  </View>
                </View>
              );
            })}
          </View>

          <Card style={{ gap: 0, paddingVertical: spacing.sm }}>
            {people.map((p, i) => (
              <View
                key={p.id}
                style={[
                  styles.row,
                  p.isCurrentUser && styles.rowCurrent,
                  i < people.length - 1 && styles.rowBorder,
                ]}
              >
                <Text style={styles.rank}>{i + 1}</Text>
                <Avatar initials={p.initials} color={p.avatarColor} size={38} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.rowName}>
                    {p.name}
                    {p.isCurrentUser ? "  (You)" : ""}
                  </Text>
                  <Text style={styles.rowTeam}>{p.team}</Text>
                </View>
                <Text style={styles.rowHours}>{p.hours}h</Text>
              </View>
            ))}
          </Card>
        </>
      ) : (
        <View style={{ gap: spacing.md }}>
          {sortedTeams.map((t, i) => (
            <Card key={t.id} style={{ gap: spacing.md }}>
              <View style={styles.teamHeader}>
                <View style={styles.teamRankBadge}>
                  <Text style={styles.teamRankText}>{i + 1}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.teamName}>
                    {t.name}
                    {t.name === user.team ? "  (Your team)" : ""}
                  </Text>
                  <Text style={styles.rowTeam}>{t.members} members</Text>
                </View>
                <Text style={styles.rowHours}>{t.hours}h</Text>
              </View>
              <ProgressBar value={t.hours} total={topTeamHours} />
            </Card>
          ))}
        </View>
      )}
    </Screen>
  );
}

function SegmentBtn({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.segmentBtn, active && styles.segmentBtnActive]}>
      <Text style={[styles.segmentText, active && styles.segmentTextActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: font.size.xxl, fontWeight: "800", color: colors.slate900 },
  subtitle: { fontSize: font.size.sm, color: colors.slate500 },
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
  podium: { flexDirection: "row", alignItems: "flex-end", gap: spacing.sm, marginTop: spacing.sm },
  podiumCol: { flex: 1, alignItems: "center", gap: 6 },
  podiumName: { fontSize: font.size.sm, fontWeight: "700", color: colors.slate700 },
  podiumBar: {
    width: "100%",
    borderTopLeftRadius: radius.md,
    borderTopRightRadius: radius.md,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: spacing.sm,
    gap: 2,
  },
  podiumRank: { fontSize: font.size.lg, fontWeight: "800", color: colors.white },
  podiumHours: { fontSize: font.size.xs, fontWeight: "700", color: "rgba(255,255,255,0.9)" },
  row: { flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: spacing.md },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.slate100 },
  rowCurrent: {
    backgroundColor: colors.brand50,
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
  },
  rank: { width: 22, textAlign: "center", fontSize: font.size.md, fontWeight: "800", color: colors.slate400 },
  rowName: { fontSize: font.size.md, fontWeight: "700", color: colors.slate900 },
  rowTeam: { fontSize: font.size.xs, color: colors.slate500, marginTop: 1 },
  rowHours: { fontSize: font.size.md, fontWeight: "800", color: colors.brand600 },
  teamHeader: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  teamRankBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.brand50,
    alignItems: "center",
    justifyContent: "center",
  },
  teamRankText: { fontSize: font.size.md, fontWeight: "800", color: colors.brand700 },
  teamName: { fontSize: font.size.md, fontWeight: "700", color: colors.slate900 },
});
