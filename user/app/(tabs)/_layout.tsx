import { HapticTab } from "@/components/haptic-tab";
import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#16a34a",
        tabBarInactiveTintColor: "#9ca3af",
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: theme === "dark" ? "#1f2937" : "#fff",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: "Drutoo",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="send-money"
        options={{
          title: "Send Money",
          tabBarIcon: ({ color }) => (
            <Ionicons name="send" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cash-out"
        options={{
          title: "Cash Out",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cash-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}