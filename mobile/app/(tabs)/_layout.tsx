import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform, type ColorValue } from "react-native";

import { colors } from "@/lib/theme";
import type { IconName } from "@/lib/types";

function icon(name: IconName) {
  return ({ color, size }: { color: ColorValue; size: number }) => (
    <Ionicons name={name} size={size} color={color as string} />
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.brand600,
        tabBarInactiveTintColor: colors.slate400,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.slate100,
          height: Platform.OS === "ios" ? 88 : 64,
          paddingTop: 6,
          paddingBottom: Platform.OS === "ios" ? 28 : 8,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Home", tabBarIcon: icon("home") }}
      />
      <Tabs.Screen
        name="organizations"
        options={{ title: "Explore", tabBarIcon: icon("search") }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{ title: "Leaders", tabBarIcon: icon("trophy") }}
      />
      <Tabs.Screen
        name="donate"
        options={{ title: "Donate", tabBarIcon: icon("gift") }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Impact", tabBarIcon: icon("person-circle") }}
      />
    </Tabs>
  );
}
