import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/contexts/AuthContext";
import { UserProfile, userService } from "@/services/api.service";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [balanceVisible, setBalanceVisible] = useState(false);

  const fetchProfile = async () => {
    if (!user?.userId) return;
    try {
      const data = await userService.getProfile(user.userId);
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProfile();
  };

  const toggleBalance = () => {
    setBalanceVisible(true);
    setTimeout(() => setBalanceVisible(false), 3000);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#16a34a" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <ThemedView style={styles.header}>
        <View>
          <ThemedText style={styles.greeting}>Hello,</ThemedText>
          <ThemedText style={styles.name}>
            {profile?.name?.firstName} {profile?.name?.lastName}
          </ThemedText>
        </View>
        <TouchableOpacity onPress={logout}>
          <Ionicons name="log-out-outline" size={24} color="#dc2626" />
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.balanceCard}>
        <View style={styles.balanceHeader}>
          <Ionicons name="wallet" size={32} color="#16a34a" />
          <TouchableOpacity onPress={toggleBalance}>
            <Ionicons
              name={balanceVisible ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        </View>
        <ThemedText style={styles.balanceLabel}>Available Balance</ThemedText>
        <ThemedText style={styles.balanceAmount}>
          ৳ {balanceVisible ? profile?.balance?.toFixed(2) || "0.00" : "••••••"}
        </ThemedText>
        <View
          style={[
            styles.statusBadge,
            profile?.status === "active" && styles.statusActive,
          ]}
        >
          <ThemedText style={styles.statusText}>Account {profile?.status}</ThemedText>
        </View>
      </ThemedView>

      <ThemedView style={styles.quickActions}>
        <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/send-money")}
            style={styles.actionCard}
          >
            <Ionicons name="send" size={32} color="#16a34a" />
            <ThemedText style={styles.actionText}>Send Money</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/cash-out")}
            style={styles.actionCard}
          >
            <Ionicons name="cash-outline" size={32} color="#16a34a" />
            <ThemedText style={styles.actionText}>Cash Out</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>

      <ThemedView style={styles.transactionsSection}>
        <ThemedText style={styles.sectionTitle}>Recent Transactions</ThemedText>
        {profile?.transactions && profile.transactions.length > 0 ? (
          profile.transactions.slice(0, 5).map((transaction) => (
            <ThemedView key={transaction._id} style={styles.transactionCard}>
              <View style={styles.transactionIcon}>
                <Ionicons
                  name={
                    profile.mobile === transaction.senderId
                      ? "arrow-up-circle"
                      : "arrow-down-circle"
                  }
                  size={24}
                  color={
                    profile.mobile === transaction.senderId
                      ? "#dc2626"
                      : "#16a34a"
                  }
                />
              </View>
              <View style={styles.transactionDetails}>
                <ThemedText style={styles.transactionType}>
                  {profile.mobile === transaction.senderId
                    ? "Sent to"
                    : "Received from"}{" "}
                  {profile.mobile === transaction.senderId
                    ? transaction.receivedId
                    : transaction.senderId}
                </ThemedText>
                <ThemedText style={styles.transactionId}>
                  {transaction.transactionId}
                </ThemedText>
              </View>
              <ThemedText
                style={[
                  styles.transactionAmount,
                  profile.mobile === transaction.senderId && styles.sentAmount,
                ]}
              >
                {profile.mobile === transaction.senderId ? "-" : "+"}৳
                {transaction.amount.toFixed(2)}
              </ThemedText>
            </ThemedView>
          ))
        ) : (
          <ThemedText style={styles.noTransactions}>No transactions yet</ThemedText>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
//     backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  greeting: {
    fontSize: 14
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  balanceCard: {
    margin: 20,
    padding: 24,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  balanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  balanceLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#16a34a",
    marginBottom: 12
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#fef3c7",
  },
  statusActive: {
    backgroundColor: "#d1fae5",
  },
  statusText: {
    fontSize: 12,
    color: "#059669",
    textTransform: "capitalize",
  },
  quickActions: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: "row",
    gap: 16,
  },
  actionCard: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    gap: 8,
  },
  actionText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  transactionsSection: {
    padding: 20,
  },
  transactionCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  transactionDetails: {
    flex: 1,
  },
  transactionType: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    marginBottom: 4,
  },
  transactionId: {
    fontSize: 12,
    color: "#999",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#16a34a",
  },
  sentAmount: {
    color: "#dc2626",
  },
  noTransactions: {
    textAlign: "center",
    color: "#999",
    paddingVertical: 20,
  },
});