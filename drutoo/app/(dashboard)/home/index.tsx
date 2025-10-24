import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useProfileQuery } from "../../../src/redux/api/userApi";
import { getUserInfo, removeUserInfo } from "../../../src/services/auth.service";
import Card from "../../../src/components/UI/Card";
import Button from "../../../src/components/UI/Button";

export default function HomeScreen() {
  const router = useRouter();
  const [userMobile, setUserMobile] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const { data, isLoading, error } = useProfileQuery(userMobile, {
    skip: !userMobile,
  });

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    try {
      const user = await getUserInfo();
      if (user?.userId) {
        setUserMobile(user.userId); // userId is the mobile number in the JWT
      } else {
        router.replace("/(auth)/login");
      }
    } catch (error) {
      router.replace("/(auth)/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await removeUserInfo();
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  if (loading || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load profile</Text>
        <Button title="Retry" onPress={loadUserInfo} />
      </View>
    );
  }

  const user = data?.data;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* User Info Card */}
      <Card style={styles.profileCard}>
        <Text style={styles.cardTitle}>Profile Information</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Name:</Text>
          <Text style={styles.infoValue}>
            {user?.name?.firstName} {user?.name?.lastName}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Mobile:</Text>
          <Text style={styles.infoValue}>{user?.mobile}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>{user?.email}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Role:</Text>
          <Text style={[styles.infoValue, styles.roleBadge]}>
            {user?.role?.toUpperCase()}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Status:</Text>
          <Text
            style={[
              styles.statusBadge,
              user?.status === "active" ? styles.activeStatus : styles.inactiveStatus,
            ]}
          >
            {user?.status?.toUpperCase()}
          </Text>
        </View>
      </Card>

      {/* Account Details Card */}
      <Card>
        <Text style={styles.cardTitle}>Account Details</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Balance:</Text>
          <Text style={styles.balanceText}>৳{user?.balance || 0}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>NID:</Text>
          <Text style={styles.infoValue}>{user?.nid}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Blood Group:</Text>
          <Text style={styles.infoValue}>{user?.bloodGroup}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Gender:</Text>
          <Text style={styles.infoValue}>
            {user?.gender?.charAt(0).toUpperCase() + user?.gender?.slice(1)}
          </Text>
        </View>
      </Card>

      {/* Address Card */}
      <Card>
        <Text style={styles.cardTitle}>Address</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Division:</Text>
          <Text style={styles.infoValue}>{user?.address?.division}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>District:</Text>
          <Text style={styles.infoValue}>{user?.address?.district}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Upazila:</Text>
          <Text style={styles.infoValue}>{user?.address?.upazila}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Union:</Text>
          <Text style={styles.infoValue}>{user?.address?.union}</Text>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  errorText: {
    fontSize: 16,
    color: "#ff3b30",
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  logoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#ff3b30",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  profileCard: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  balanceText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
  },
  roleBadge: {
    backgroundColor: "#007AFF",
    color: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: "600",
  },
  activeStatus: {
    backgroundColor: "#34C759",
    color: "#fff",
  },
  inactiveStatus: {
    backgroundColor: "#ff9500",
    color: "#fff",
  },
});
