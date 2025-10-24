import { Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { getUserInfo } from "../../src/services/auth.service";
import { USER_ROLE } from "../../src/constants/role";
import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

export default function DashboardLayout() {
  const [userRole, setUserRole] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserRole();
  }, []);

  const loadUserRole = async () => {
    try {
      const user = await getUserInfo();
      setUserRole(user?.role || USER_ROLE.USER);
    } catch (error) {
      setUserRole(USER_ROLE.USER);
    } finally {
      setLoading(false);
    }
  };

  type IconProps = ComponentProps<typeof Ionicons>;
  
  const TabBarIcon = ({ name, color }: { name: IconProps['name']; color: string }) => {
    return <Ionicons name={name} size={24} color={color} style={{ marginBottom: -3 }} />;
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // User Role Tabs
  if (userRole === USER_ROLE.USER) {
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "#8E8E93",
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#E5E5EA",
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="send-money"
          options={{
            title: "Send Money",
            tabBarIcon: ({ color }) => <TabBarIcon name="send" color={color} />,
          }}
        />
        <Tabs.Screen
          name="cashout"
          options={{
            title: "Cashout",
            tabBarIcon: ({ color }) => <TabBarIcon name="cash" color={color} />,
          }}
        />
        <Tabs.Screen
          name="transactions"
          options={{
            title: "Transactions",
            tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
          }}
        />
        {/* Hide other role screens */}
        <Tabs.Screen name="cashin" options={{ href: null }} />
        <Tabs.Screen name="manage-users" options={{ href: null }} />
        <Tabs.Screen name="manage-agents" options={{ href: null }} />
      </Tabs>
    );
  }

  // Agent Role Tabs
  if (userRole === USER_ROLE.AGENT) {
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "#8E8E93",
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#E5E5EA",
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="cashin"
          options={{
            title: "Cash In",
            tabBarIcon: ({ color }) => <TabBarIcon name="wallet" color={color} />,
          }}
        />
        <Tabs.Screen
          name="transactions"
          options={{
            title: "Transactions",
            tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
          }}
        />
        {/* Hide other role screens */}
        <Tabs.Screen name="send-money" options={{ href: null }} />
        <Tabs.Screen name="cashout" options={{ href: null }} />
        <Tabs.Screen name="manage-users" options={{ href: null }} />
        <Tabs.Screen name="manage-agents" options={{ href: null }} />
      </Tabs>
    );
  }

  // Admin Role Tabs
  if (userRole === USER_ROLE.ADMIN) {
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "#8E8E93",
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#E5E5EA",
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="manage-users"
          options={{
            title: "Users",
            tabBarIcon: ({ color }) => <TabBarIcon name="people" color={color} />,
          }}
        />
        <Tabs.Screen
          name="manage-agents"
          options={{
            title: "Agents",
            tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
          }}
        />
        {/* Hide other role screens */}
        <Tabs.Screen name="send-money" options={{ href: null }} />
        <Tabs.Screen name="cashout" options={{ href: null }} />
        <Tabs.Screen name="cashin" options={{ href: null }} />
        <Tabs.Screen name="transactions" options={{ href: null }} />
      </Tabs>
    );
  }

  // Default fallback
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" />
    </Tabs>
  );
}
