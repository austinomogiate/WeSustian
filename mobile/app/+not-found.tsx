import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { colors, font, spacing } from "@/lib/theme";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Not found" }} />
      <View style={styles.container}>
        <Ionicons name="compass-outline" size={48} color={colors.brand600} />
        <Text style={styles.title}>This screen doesn&apos;t exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
    gap: spacing.md,
    backgroundColor: colors.slate50,
  },
  title: { fontSize: font.size.lg, fontWeight: "700", color: colors.slate900 },
  link: { marginTop: spacing.sm },
  linkText: { fontSize: font.size.md, color: colors.brand600, fontWeight: "700" },
});
