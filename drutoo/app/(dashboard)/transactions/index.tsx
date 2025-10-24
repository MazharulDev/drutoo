import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { getUserInfo } from "../../../src/services/auth.service";
import Card from "../../../src/components/UI/Card";

export default function TransactionsScreen() {
  const [userMobile, setUserMobile] = React.useState<string>("");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    try {
      const user = await getUserInfo();
      if (user?.userId) {
        setUserMobile(user.userId);
      }
    } catch (error) {
      console.error("Error loading user info:", error);
    } finally {
      setLoading(false);
    }
  };

  // TODO: Fetch transactions from API
  const transactions = [];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading transactions...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transaction History</Text>
      </View>

      {transactions.length === 0 ? (
        <Card>
          <Text style={styles.emptyText}>No transactions found</Text>
        </Card>
      ) : (
        transactions.map((transaction: any, index: number) => (
          <Card key={index} style={styles.transactionCard}>
            <View style={styles.transactionRow}>
              <Text style={styles.transactionLabel}>Type:</Text>
              <Text style={styles.transactionValue}>{transaction.type}</Text>
            </View>
            <View style={styles.transactionRow}>
              <Text style={styles.transactionLabel}>Amount:</Text>
              <Text style={styles.transactionAmount}>
                ৳{transaction.amount}
              </Text>
            </View>
            <View style={styles.transactionRow}>
              <Text style={styles.transactionLabel}>Date:</Text>
              <Text style={styles.transactionValue}>{transaction.date}</Text>
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
  transactionCard: {
    marginBottom: 12,
  },
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  transactionLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  transactionValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  transactionAmount: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "bold",
  },
});
