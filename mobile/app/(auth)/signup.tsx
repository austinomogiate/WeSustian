import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BrandLogo, Button } from "@/components/ui";
import { useApp } from "@/lib/store";
import { colors, font, spacing } from "@/lib/theme";
import { Field } from "./login";

export default function SignupScreen() {
  const { signIn } = useApp();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
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
            <Text style={styles.title}>Create your account</Text>
            <Text style={styles.subtitle}>
              Join your colleagues and start turning a few hours into real community impact.
            </Text>
          </View>

          <View style={styles.form}>
            <Field
              label="Full Name"
              value={name}
              onChangeText={setName}
              placeholder="Alex Lee"
              icon="person-outline"
            />
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
              placeholder="Create a password"
              secureTextEntry
              icon="lock-closed-outline"
            />
            <Button label="Create account" icon="sparkles-outline" onPress={handleSignup} />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Link href="/(auth)/login" asChild>
              <Pressable hitSlop={8}>
                <Text style={styles.footerLink}>Log in</Text>
              </Pressable>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
  footer: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
  footerText: { color: colors.slate500, fontSize: font.size.sm },
  footerLink: { color: colors.brand600, fontSize: font.size.sm, fontWeight: "700" },
});
