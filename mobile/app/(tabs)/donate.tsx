import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Button, Card, Pill, ProgressBar, Screen } from "@/components/ui";
import { useApp } from "@/lib/store";
import { colors, font, radius, spacing } from "@/lib/theme";
import type { DonationDrive } from "@/lib/types";

const categoryStyle: Record<string, { bg: string; fg: string }> = {
  Coats: { bg: colors.blue100, fg: colors.blue700 },
  Food: { bg: colors.amber100, fg: colors.amber500 },
  Clothing: { bg: colors.violet100, fg: colors.violet700 },
  Books: { bg: colors.green100, fg: colors.green700 },
  Toys: { bg: colors.rose100, fg: colors.rose700 },
};

const PLEDGE_OPTIONS = [1, 3, 5, 10];

export default function DonateScreen() {
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
    <Screen>
      <View style={{ gap: 4 }}>
        <Text style={styles.title}>Goods Drives</Text>
        <Text style={styles.subtitle}>
          Pledge physical items, not just hours. Drop-off points are at every office lobby.
        </Text>
      </View>

      <View style={styles.summary}>
        <Ionicons name="cube" size={26} color={colors.white} />
        <View>
          <Text style={styles.summaryValue}>{totalCollected.toLocaleString()}</Text>
          <Text style={styles.summaryLabel}>items pledged company-wide</Text>
        </View>
      </View>

      <View style={{ gap: spacing.md }}>
        {drives.map((d) => {
          const cat = categoryStyle[d.category];
          const pct = Math.round((d.collected / d.goal) * 100);
          return (
            <Card key={d.id} style={{ gap: spacing.md }}>
              <View style={styles.driveTop}>
                <View style={[styles.driveIcon, { backgroundColor: cat.bg }]}>
                  <Ionicons name={d.icon} size={24} color={cat.fg} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.driveTitle}>{d.title}</Text>
                  <Text style={styles.driveOrg}>{d.organization}</Text>
                </View>
                <Pill label={d.category} bg={cat.bg} fg={cat.fg} />
              </View>

              <Text style={styles.driveDesc}>{d.description}</Text>

              <View style={{ gap: 6 }}>
                <ProgressBar value={d.collected} total={d.goal} color={cat.fg} />
                <View style={styles.driveStatsRow}>
                  <Text style={styles.driveProgress}>
                    {d.collected.toLocaleString()} / {d.goal.toLocaleString()} {d.unit} ({pct}%)
                  </Text>
                  <View style={styles.deadlineRow}>
                    <Ionicons name="time-outline" size={13} color={colors.slate400} />
                    <Text style={styles.deadline}>{d.deadline}</Text>
                  </View>
                </View>
              </View>

              <Button label="Pledge items" icon="add-circle-outline" onPress={() => open(d)} />
            </Card>
          );
        })}
      </View>

      <Modal visible={!!active} transparent animationType="slide" onRequestClose={() => setActive(null)}>
        <Pressable style={styles.backdrop} onPress={() => setActive(null)} />
        <View style={styles.sheet}>
          <View style={styles.sheetHandle} />
          {active && !confirmed ? (
            <>
              <Text style={styles.sheetTitle}>Pledge to {active.title}</Text>
              <Text style={styles.sheetSubtitle}>
                How many {active.unit} can you bring to the drop-off point?
              </Text>
              <View style={styles.pledgeRow}>
                {PLEDGE_OPTIONS.map((n) => (
                  <Pressable
                    key={n}
                    onPress={() => setAmount(n)}
                    style={[styles.pledgeChip, amount === n && styles.pledgeChipActive]}
                  >
                    <Text style={[styles.pledgeChipText, amount === n && styles.pledgeChipTextActive]}>
                      {n}
                    </Text>
                  </Pressable>
                ))}
              </View>
              <Button label={`Pledge ${amount} ${active.unit}`} icon="gift-outline" onPress={submit} />
              <Button label="Cancel" variant="ghost" onPress={() => setActive(null)} />
            </>
          ) : null}

          {active && confirmed ? (
            <View style={styles.confirmWrap}>
              <View style={styles.confirmIcon}>
                <Ionicons name="checkmark" size={36} color={colors.white} />
              </View>
              <Text style={styles.sheetTitle}>Thank you!</Text>
              <Text style={styles.sheetSubtitle}>
                Your pledge of {amount} {active.unit} to {active.title} is logged. Bring items to any
                office lobby drop-off box.
              </Text>
              <Button label="Done" onPress={() => setActive(null)} />
            </View>
          ) : null}
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: font.size.xxl, fontWeight: "800", color: colors.slate900 },
  subtitle: { fontSize: font.size.md, color: colors.slate500, lineHeight: 21 },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
    backgroundColor: colors.brand700,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  summaryValue: { color: colors.white, fontSize: font.size.xxl, fontWeight: "800" },
  summaryLabel: { color: colors.brand100, fontSize: font.size.sm },
  driveTop: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  driveIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  driveTitle: { fontSize: font.size.md, fontWeight: "700", color: colors.slate900 },
  driveOrg: { fontSize: font.size.sm, color: colors.slate500, marginTop: 1 },
  driveDesc: { fontSize: font.size.sm, color: colors.slate600, lineHeight: 20 },
  driveStatsRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  driveProgress: { fontSize: font.size.xs, fontWeight: "600", color: colors.slate600 },
  deadlineRow: { flexDirection: "row", alignItems: "center", gap: 3 },
  deadline: { fontSize: font.size.xs, color: colors.slate400 },
  backdrop: { flex: 1, backgroundColor: "rgba(15,23,42,0.45)" },
  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.xl,
    paddingBottom: spacing.xxl + spacing.lg,
    gap: spacing.md,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.slate200,
    alignSelf: "center",
    marginBottom: spacing.sm,
  },
  sheetTitle: { fontSize: font.size.xl, fontWeight: "800", color: colors.slate900 },
  sheetSubtitle: { fontSize: font.size.md, color: colors.slate500, lineHeight: 21 },
  pledgeRow: { flexDirection: "row", gap: spacing.md, marginVertical: spacing.sm },
  pledgeChip: {
    flex: 1,
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.slate200,
    alignItems: "center",
  },
  pledgeChipActive: { backgroundColor: colors.brand50, borderColor: colors.brand500 },
  pledgeChipText: { fontSize: font.size.xl, fontWeight: "800", color: colors.slate600 },
  pledgeChipTextActive: { color: colors.brand700 },
  confirmWrap: { alignItems: "center", gap: spacing.md, paddingTop: spacing.sm },
  confirmIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.green700,
    alignItems: "center",
    justifyContent: "center",
  },
});
