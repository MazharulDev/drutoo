import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useProfileQuery } from "../../../src/redux/api/userApi";
import { getUserInfo } from "../../../src/services/auth.service";
import Card from "../../../src/components/UI/Card";
import Button from "../../../src/components/UI/Button";

const sendMoneySchema = yup.object().shape({
  receiver: yup.string().required("Receiver mobile number is required"),
  amount: yup
    .number()
    .required("Amount is required")
    .positive("Amount must be positive")
    .min(1, "Minimum amount is 1"),
  pin: yup
    .string()
    .required("PIN is required")
    .length(4, "PIN must be 4 digits"),
});

interface ISendMoneyData {
  receiver: string;
  amount: number;
  pin: string;
}

export default function SendMoneyScreen() {
  const [userMobile, setUserMobile] = React.useState<string>("");

  const { data: userData, isLoading } = useProfileQuery(userMobile, {
    skip: !userMobile,
  });

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
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISendMoneyData>({
    resolver: yupResolver(sendMoneySchema),
    defaultValues: {
      receiver: "",
      amount: 0,
      pin: "",
    },
  });

  const onSubmit = async (data: ISendMoneyData) => {
    // TODO: Implement send money API
    console.log("Send Money Data:", data);
    Alert.alert("Success", "Money sent successfully!");
    reset();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Send Money</Text>
        {userData?.data && (
          <Text style={styles.balance}>
            Balance: ৳{userData.data.balance || 0}
          </Text>
        )}
      </View>

      <Card>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Receiver Mobile Number</Text>
          <Controller
            control={control}
            name="receiver"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.receiver && styles.inputError]}
                placeholder="01XXXXXXXXX"
                value={value}
                onChangeText={onChange}
                keyboardType="phone-pad"
                maxLength={14}
              />
            )}
          />
          {errors.receiver && (
            <Text style={styles.errorText}>{errors.receiver.message}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Amount</Text>
          <Controller
            control={control}
            name="amount"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.amount && styles.inputError]}
                placeholder="Enter amount"
                value={value ? value.toString() : ""}
                onChangeText={(text) => onChange(parseFloat(text) || 0)}
                keyboardType="numeric"
              />
            )}
          />
          {errors.amount && (
            <Text style={styles.errorText}>{errors.amount.message}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Enter PIN</Text>
          <Controller
            control={control}
            name="pin"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.pin && styles.inputError]}
                placeholder="4-digit PIN"
                value={value}
                onChangeText={onChange}
                keyboardType="number-pad"
                maxLength={4}
                secureTextEntry
              />
            )}
          />
          {errors.pin && (
            <Text style={styles.errorText}>{errors.pin.message}</Text>
          )}
        </View>

        <Button
          title="Send Money"
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
        />
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
  header: {
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  balance: {
    fontSize: 20,
    fontWeight: "600",
    color: "#007AFF",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#ff3b30",
  },
  errorText: {
    color: "#ff3b30",
    fontSize: 12,
    marginTop: 4,
  },
});
