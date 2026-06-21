import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Card, Pill, Screen } from "@/components/ui";
import { causeStyles, organizations } from "@/lib/mock";
import { colors, font, radius, spacing } from "@/lib/theme";

const CAUSES = ["All", "Food Security", "Education", "Environment", "Health", "Community"] as const;

export default function OrganizationsScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [cause, setCause] = useState<(typeof CAUSES)[number]>("All");

  const filtered = useMemo(() => {
    return organizations.filter((o) => {
      const matchesCause = cause === "All" || o.cause === cause;
      const matchesQuery =
        query.trim() === "" ||
        o.name.toLowerCase().includes(query.toLowerCase()) ||
        o.city.toLowerCase().includes(query.toLowerCase());
      return matchesCause && matchesQuery;
    });
  }, [query, cause]);

  return (
    <Screen>
      <View style={{ gap: 4 }}>
        <Text style={styles.title}>Explore</Text>
        <Text style={styles.subtitle}>Find local organizations with open spots.</Text>
      </View>

      <View style={styles.searchWrap}>
        <Ionicons name="search" size={18} color={colors.slate400} />
        <TextInput
          style={styles.search}
          placeholder="Search by name or city"
          placeholderTextColor={colors.slate400}
          value={query}
          onChangeText={setQuery}
        />
        {query.length > 0 ? (
          <Pressable onPress={() => setQuery("")} hitSlop={8}>
            <Ionicons name="close-circle" size={18} color={colors.slate400} />
          </Pressable>
        ) : null}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
      >
        {CAUSES.map((c) => {
          const active = c === cause;
          return (
            <Pressable
              key={c}
              onPress={() => setCause(c)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{c}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={{ gap: spacing.md }}>
        {filtered.map((org) => {
          const cs = causeStyles[org.cause];
          const openSpots = org.sessions.reduce(
            (sum, s) => sum + (s.spotsTotal - s.spotsTaken),
            0
          );
          return (
            <Card key={org.id} onPress={() => router.push(`/organization/${org.id}`)}>
              <View style={styles.cardTop}>
                <View style={[styles.causeIcon, { backgroundColor: cs.bg }]}>
                  <Ionicons name={cs.icon} size={22} color={cs.fg} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.orgName}>{org.name}</Text>
                  <View style={styles.metaRow}>
                    <Ionicons name="location-outline" size={13} color={colors.slate400} />
                    <Text style={styles.metaText}>{org.city}</Text>
                    <Ionicons
                      name="star"
                      size={13}
                      color={colors.amber500}
                      style={{ marginLeft: 8 }}
                    />
                    <Text style={styles.metaText}>{org.rating.toFixed(1)}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.cardBottom}>
                <Pill label={org.cause} bg={cs.bg} fg={cs.fg} icon={cs.icon} />
                <Text style={styles.spots}>
                  {openSpots > 0 ? `${openSpots} spots open` : "Full"}
                </Text>
              </View>
            </Card>
          );
        })}
        {filtered.length === 0 ? (
          <Card>
            <Text style={styles.metaText}>No organizations match your search.</Text>
          </Card>
        ) : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: font.size.xxl, fontWeight: "800", color: colors.slate900 },
  subtitle: { fontSize: font.size.md, color: colors.slate500 },
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate200,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
  },
  search: { flex: 1, paddingVertical: 12, fontSize: font.size.md, color: colors.slate900 },
  chips: { gap: spacing.sm, paddingRight: spacing.lg },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 8,
    borderRadius: radius.full,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate200,
  },
  chipActive: { backgroundColor: colors.brand600, borderColor: colors.brand600 },
  chipText: { fontSize: font.size.sm, fontWeight: "600", color: colors.slate600 },
  chipTextActive: { color: colors.white },
  cardTop: { flexDirection: "row", gap: spacing.md, alignItems: "center" },
  causeIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  orgName: { fontSize: font.size.lg, fontWeight: "700", color: colors.slate900 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 3, marginTop: 3 },
  metaText: { fontSize: font.size.sm, color: colors.slate500 },
  cardBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.md,
  },
  spots: { fontSize: font.size.sm, fontWeight: "700", color: colors.brand600 },
});
