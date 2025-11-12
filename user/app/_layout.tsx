import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider as CustomThemeProvider, useTheme } from "@/contexts/ThemeContext";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";


export const unstable_settings = {
  anchor: "(tabs)",
};

function RootLayoutNav() {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inTabsGroup = segments[0] === "(tabs)";
    const inLogin = segments[0] === "login";

    if (!isAuthenticated && !inLogin) {
      router.replace("/login");
    } else if (isAuthenticated && !inTabsGroup) {
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, isLoading, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="login" />
      <Stack.Screen
        name="modal"
        options={{ presentation: "modal", title: "Modal" }}
      />
    </Stack>
  );
}

function ThemedRootLayout() {
  const { theme } = useTheme();

  return (
    <AuthProvider>
      <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
        <RootLayoutNav />
        <StatusBar style={theme === "dark" ? "light" : "dark"} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default function RootLayout() {
  return (
    <CustomThemeProvider>
      <ThemedRootLayout />
    </CustomThemeProvider>
  );
}