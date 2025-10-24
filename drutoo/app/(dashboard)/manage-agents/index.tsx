import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Card from "../../../src/components/UI/Card";

export default function ManageAgentsScreen() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // TODO: Fetch agents from API
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // TODO: Fetch agents from API
  const agents = [];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading agents...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Manage Agents</Text>
      </View>

      {agents.length === 0 ? (
        <Card>
          <Text style={styles.emptyText}>No agents found</Text>
        </Card>
      ) : (
        agents.map((agent: any, index: number) => (
          <Card key={index} style={styles.agentCard}>
            <View style={styles.agentRow}>
              <Text style={styles.agentLabel}>Name:</Text>
              <Text style={styles.agentValue}>{agent.name}</Text>
            </View>
            <View style={styles.agentRow}>
              <Text style={styles.agentLabel}>Mobile:</Text>
              <Text style={styles.agentValue}>{agent.mobile}</Text>
            </View>
            <View style={styles.agentRow}>
              <Text style={styles.agentLabel}>Balance:</Text>
              <Text style={styles.agentBalance}>৳{agent.balance}</Text>
            </View>
            <View style={styles.agentRow}>
              <Text style={styles.agentLabel}>Status:</Text>
              <Text
                style={[
                  styles.statusBadge,
                  agent.status === "active"
                    ? styles.activeStatus
                    : styles.inactiveStatus,
                ]}
              >
                {agent.status?.toUpperCase()}
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
  agentCard: {
    marginBottom: 12,
  },
  agentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    alignItems: "center",
  },
  agentLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  agentValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  agentBalance: {
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
