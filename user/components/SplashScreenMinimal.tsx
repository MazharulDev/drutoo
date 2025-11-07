import React, { useEffect, useRef } from "react";
import { StyleSheet, Animated, Dimensions } from "react-native";
import { Image } from "expo-image";
import { useColorScheme } from "@/hooks/use-color-scheme";

const { width, height } = Dimensions.get("window");

interface SplashScreenMinimalProps {
  onFinish: () => void;
}

/**
 * Minimal Splash Screen - Just logo with simple animations
 * To use this version, replace the import in _layout.tsx:
 * import SplashScreen from "@/components/SplashScreenMinimal";
 */
export default function SplashScreenMinimal({
  onFinish,
}: SplashScreenMinimalProps) {
  const colorScheme = useColorScheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // Animate in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 40,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-hide after delay
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onFinish();
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, onFinish]);

  const backgroundColor = colorScheme === "dark" ? "#000000" : "#ffffff";

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor,
          opacity: fadeAnim,
        },
      ]}
    >
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
        }}
      >
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.logo}
          contentFit="contain"
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  logo: {
    width: 180,
    height: 180,
  },
});
