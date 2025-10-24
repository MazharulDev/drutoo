import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoginMutation } from "../../../src/redux/api/authApi";
import { loginSchema } from "../../../src/schema/loginSchema";
import { storeUserInfo } from "../../../src/services/auth.service";
import Button from "../../../src/components/UI/Button";
import Card from "../../../src/components/UI/Card";
import { ILoginData } from "../../../src/types";

export default function LoginScreen() {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      mobile: "",
      pin: "",
    },
  });

  const onSubmit = async (data: ILoginData) => {
    try {
      const res: any = await login(data).unwrap();
      
      if (res?.data?.accessToken) {
        await storeUserInfo(res.data.accessToken);
        Alert.alert("Success", "Login successful!");
        router.replace("/(dashboard)/home");
      }
    } catch (error: any) {
      Alert.alert(
        "Login Failed",
        error?.message || "Invalid credentials. Please try again."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to your Drutoo account</Text>

        <Card style={styles.formCard}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mobile Number</Text>
            <Controller
              control={control}
              name="mobile"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, errors.mobile && styles.inputError]}
                  placeholder="Enter mobile number"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="phone-pad"
                  maxLength={14}
                />
              )}
            />
            {errors.mobile && (
              <Text style={styles.errorText}>{errors.mobile.message}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>PIN</Text>
            <Controller
              control={control}
              name="pin"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, errors.pin && styles.inputError]}
                  placeholder="Enter 4-digit PIN"
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
            title="Login"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            style={styles.loginButton}
          />

          <TouchableOpacity
            onPress={() => router.push("/(auth)/signup")}
            style={styles.signupLink}
          >
            <Text style={styles.signupText}>
              Don't have an account?{" "}
              <Text style={styles.signupTextBold}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 32,
    textAlign: "center",
  },
  formCard: {
    marginTop: 20,
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
  loginButton: {
    marginTop: 10,
  },
  signupLink: {
    marginTop: 20,
    alignItems: "center",
  },
  signupText: {
    fontSize: 14,
    color: "#666",
  },
  signupTextBold: {
    color: "#007AFF",
    fontWeight: "600",
  },
});
