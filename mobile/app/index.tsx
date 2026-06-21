import { Redirect } from "expo-router";

import { useApp } from "@/lib/store";

export default function Index() {
  const { isAuthenticated } = useApp();
  return <Redirect href={isAuthenticated ? "/(tabs)" : "/(auth)/login"} />;
}
