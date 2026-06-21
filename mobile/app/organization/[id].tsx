import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { Button, Card, Pill, ProgressBar, Screen } from "@/components/ui";
import { causeStyles, findOrganization } from "@/lib/mock";
import { useApp } from "@/lib/store";
import { colors, font, radius, spacing } from "@/lib/theme";
import type { VolunteerSession } from "@/lib/types";

export default function OrganizationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const org = findOrganization(id);
  const { isSignedUp, toggleSignup } = useApp();

  if (!org) {
    return (
      <Screen>
        <Text style={styles.title}>Organization not found</Text>
      </Screen>
    );
  }

  const cs = causeStyles[org.cause];

  return (
    <>
      <Stack.Screen options={{ title: org.name }} />
      <Screen>
        <View style={styles.headerRow}>
          <View style={[styles.causeIcon, { backgroundColor: cs.bg }]}>
            <Ionicons name={cs.icon} size={28} color={cs.fg} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{org.name}</Text>
            <View style={styles.metaRow}>
              <Ionicons name="location-outline" size={14} color={colors.slate400} />
              <Text style={styles.metaText}>{org.city}</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <Stat icon="star" tint={colors.amber500} value={org.rating.toFixed(1)} label="Rating" />
          <Stat
            icon="people"
            tint={colors.brand600}
            value={String(org.volunteersThisMonth)}
            label="This month"
          />
          <Stat
            icon="calendar"
            tint={colors.green700}
            value={String(org.sessions.length)}
            label="Open dates"
          />
        </View>

        <Pill label={org.cause} bg={cs.bg} fg={cs.fg} icon={cs.icon} />

        <Card>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.about}>{org.about}</Text>
        </Card>

        <Text style={styles.sectionTitle}>Upcoming sessions</Text>
        {org.sessions.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            signedUp={isSignedUp(session.id)}
            onToggle={() => toggleSignup(org.id, session)}
          />
        ))}
      </Screen>
    </>
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
    <Card style={{ gap: spacing.md }}>
      <View style={styles.sessionHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.sessionTitle}>{session.title}</Text>
          <View style={styles.sessionMetaRow}>
            <Ionicons name="calendar-outline" size={14} color={colors.slate400} />
            <Text style={styles.sessionMeta}>{session.date}</Text>
          </View>
          <View style={styles.sessionMetaRow}>
            <Ionicons name="time-outline" size={14} color={colors.slate400} />
            <Text style={styles.sessionMeta}>
              {session.time} · {session.durationHours}h
            </Text>
          </View>
        </View>
        {signedUp ? (
          <View style={styles.confirmedTag}>
            <Ionicons name="checkmark-circle" size={14} color={colors.green700} />
            <Text style={styles.confirmedText}>Going</Text>
          </View>
        ) : null}
      </View>

      <View style={{ gap: 6 }}>
        <View style={styles.spotsRow}>
          <Text style={styles.spotsLabel}>
            {spotsLeft > 0 ? `${spotsLeft} of ${session.spotsTotal} spots left` : "Session full"}
          </Text>
          {almostFull ? <Pill label="Almost full" bg={colors.rose100} fg={colors.rose700} /> : null}
        </View>
        <ProgressBar
          value={session.spotsTaken}
          total={session.spotsTotal}
          color={almostFull ? colors.rose700 : colors.brand500}
        />
      </View>

      <Button
        label={signedUp ? "Cancel sign-up" : spotsLeft > 0 ? "Sign up" : "Join waitlist"}
        variant={signedUp ? "danger" : "primary"}
        icon={signedUp ? "close-circle-outline" : "add-circle-outline"}
        onPress={onToggle}
      />
    </Card>
  );
}

function Stat({
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
    <View style={styles.stat}>
      <Ionicons name={icon} size={18} color={tint} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  causeIcon: {
    width: 60,
    height: 60,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: font.size.xl, fontWeight: "800", color: colors.slate900 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  metaText: { fontSize: font.size.sm, color: colors.slate500 },
  statsRow: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.slate100,
    paddingVertical: spacing.lg,
  },
  stat: { flex: 1, alignItems: "center", gap: 3 },
  statValue: { fontSize: font.size.lg, fontWeight: "800", color: colors.slate900 },
  statLabel: { fontSize: font.size.xs, color: colors.slate500 },
  sectionTitle: { fontSize: font.size.lg, fontWeight: "700", color: colors.slate900 },
  about: { fontSize: font.size.md, color: colors.slate600, lineHeight: 22, marginTop: spacing.sm },
  sessionHeader: { flexDirection: "row", alignItems: "flex-start" },
  sessionTitle: { fontSize: font.size.md, fontWeight: "700", color: colors.slate900 },
  sessionMetaRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 4 },
  sessionMeta: { fontSize: font.size.sm, color: colors.slate500 },
  confirmedTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.green100,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  confirmedText: { fontSize: font.size.xs, fontWeight: "700", color: colors.green700 },
  spotsRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  spotsLabel: { fontSize: font.size.sm, color: colors.slate600, fontWeight: "600" },
});
