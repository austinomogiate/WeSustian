import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BrandLogo, Button } from "@/components/ui";
import { useApp } from "@/lib/store";
import { colors, font, radius, spacing } from "@/lib/theme";

export default function LoginScreen() {
  const { signIn } = useApp();
  const router = useRouter();
  const [email, setEmail] = useState("alex.lee@company.com");
  const [password, setPassword] = useState("password");

  const handleLogin = () => {
    signIn(email);
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <BrandLogo size={44} />

          <View style={styles.hero}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>
              Sign in to track your impact, find opportunities, and climb the leaderboard.
            </Text>
          </View>

          <View style={styles.form}>
            <Field
              label="Company Email"
              value={email}
              onChangeText={setEmail}
              placeholder="name@company.com"
              keyboardType="email-address"
              icon="mail-outline"
            />
            <Field
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry
              icon="lock-closed-outline"
            />
            <Button label="Sign in" icon="log-in-outline" onPress={handleLogin} />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>New here? </Text>
            <Link href="/(auth)/signup" asChild>
              <Pressable hitSlop={8}>
                <Text style={styles.footerLink}>Create an account</Text>
              </Pressable>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export function Field({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  icon,
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address";
  icon?: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrap}>
        {icon ? (
          <Ionicons name={icon} size={18} color={colors.slate400} style={{ marginRight: 8 }} />
        ) : null}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.slate400}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  content: {
    padding: spacing.xl,
    paddingTop: spacing.xxl,
    gap: spacing.xl,
    flexGrow: 1,
  },
  hero: { gap: spacing.sm, marginTop: spacing.md },
  title: { fontSize: font.size.display, fontWeight: "800", color: colors.slate900 },
  subtitle: { fontSize: font.size.md, color: colors.slate500, lineHeight: 22 },
  form: { gap: spacing.lg },
  field: { gap: 6 },
  label: { fontSize: font.size.sm, fontWeight: "700", color: colors.slate700 },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.slate50,
    borderWidth: 1,
    borderColor: colors.slate200,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
  },
  input: { flex: 1, paddingVertical: 13, fontSize: font.size.md, color: colors.slate900 },
  footer: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
  footerText: { color: colors.slate500, fontSize: font.size.sm },
  footerLink: { color: colors.brand600, fontSize: font.size.sm, fontWeight: "700" },
});
