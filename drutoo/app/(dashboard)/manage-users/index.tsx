import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Card from "../../../src/components/UI/Card";

export default function ManageUsersScreen() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // TODO: Fetch users from API
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // TODO: Fetch users from API
  const users = [];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading users...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Manage Users</Text>
      </View>

      {users.length === 0 ? (
        <Card>
          <Text style={styles.emptyText}>No users found</Text>
        </Card>
      ) : (
        users.map((user: any, index: number) => (
          <Card key={index} style={styles.userCard}>
            <View style={styles.userRow}>
              <Text style={styles.userLabel}>Name:</Text>
              <Text style={styles.userValue}>{user.name}</Text>
            </View>
            <View style={styles.userRow}>
              <Text style={styles.userLabel}>Mobile:</Text>
              <Text style={styles.userValue}>{user.mobile}</Text>
            </View>
            <View style={styles.userRow}>
              <Text style={styles.userLabel}>Balance:</Text>
              <Text style={styles.userBalance}>৳{user.balance}</Text>
            </View>
            <View style={styles.userRow}>
              <Text style={styles.userLabel}>Status:</Text>
              <Text
                style={[
                  styles.statusBadge,
                  user.status === "active"
                    ? styles.activeStatus
                    : styles.inactiveStatus,
                ]}
              >
                {user.status?.toUpperCase()}
              </Text>
            </View>
          </Card>
        ))
      )}
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
  header: {
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    padding: 20,
  },
  userCard: {
    marginBottom: 12,
  },
  userRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    alignItems: "center",
  },
  userLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  userValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  userBalance: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "bold",
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
