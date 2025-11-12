import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/contexts/AuthContext";
import { transactionService } from "@/services/api.service";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CashOutScreen() {
  const [agentId, setAgentId] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleCashOut = async () => {
    if (!agentId || !amount || !pin) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (agentId.length !== 11) {
      Alert.alert("Error", "Agent mobile number must be 11 digits");
      return;
    }

    if (pin.length !== 4) {
      Alert.alert("Error", "PIN must be 4 digits");
      return;
    }

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }

    setLoading(true);
    try {
      const response = await transactionService.cashOut({
        receivedId: agentId,
        senderId: user?.userId || "",
        amount: amountValue,
        pin,
      });
      console.log("Cash out response:", response);

      Alert.alert("Success", response.message || "Cash out successful", [
        {
          text: "OK",
          onPress: () => {
            setAgentId("");
            setAmount("");
            setPin("");
          },
        },
      ]);
    } catch (error: any) {
      Alert.alert(
        "Transaction Failed",
        error.response?.data?.message || error.message || "Failed to cash out"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedView style={styles.header}>
          <Ionicons name="cash-outline" size={64} color="#16a34a" />
          <ThemedText style={styles.title}>Cash Out</ThemedText>
          <ThemedText style={styles.subtitle}>
            Withdraw cash from an authorized agent
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.form}>
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Agent Mobile Number</ThemedText>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="person-outline"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="01XXXXXXXXX"
                keyboardType="phone-pad"
                maxLength={11}
                value={agentId}
                onChangeText={setAgentId}
                editable={!loading}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Amount to Cash Out</ThemedText>
            <View style={styles.inputWrapper}>
              <ThemedText style={styles.currency}>৳</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={setAmount}
                editable={!loading}
              />
            </View>
            <ThemedText style={styles.hint}>Charge may apply</ThemedText>
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>PIN</ThemedText>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your 4-digit PIN"
                keyboardType="number-pad"
                secureTextEntry
                maxLength={4}
                value={pin}
                onChangeText={setPin}
                editable={!loading}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleCashOut}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="cash-outline" size={20} color="#fff" />
                <ThemedText style={styles.buttonText}>Cash Out</ThemedText>
              </>
            )}
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.infoCard}>
          <Ionicons
            name="information-circle-outline"
            size={24}
            color="#16a34a"
          />
          <ThemedText style={styles.infoText}>
            Visit an authorized agent and provide them with your mobile number
            and the amount you wish to cash out.
          </ThemedText>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 12,
    padding: 24
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 16,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
  form: {
    gap: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 24
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600"
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  currency: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#16a34a",
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: "#333",
  },
  hint: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  button: {
    backgroundColor: "#16a34a",
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 12,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: "#d1fae5",
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: "#065f46",
    lineHeight: 18,
  },
});