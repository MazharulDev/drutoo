import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";
import { useCreateAccountMutation } from "../../../src/redux/api/authApi";
import { signupSchema } from "../../../src/schema/signupSchema";
import { storeUserInfo } from "../../../src/services/auth.service";
import Button from "../../../src/components/UI/Button";
import Card from "../../../src/components/UI/Card";
import { ISignupData } from "../../../src/types";

export default function SignupScreen() {
  const router = useRouter();
  const [createAccount, { isLoading }] = useCreateAccountMutation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ISignupData>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      name: { firstName: "", lastName: "" },
      mobile: "",
      email: "",
      pin: "",
      nid: "",
      dateOfBirth: "",
      gender: "male",
      bloodGroup: "A+",
      role: "user",
      address: {
        division: "",
        district: "",
        upazila: "",
        union: "",
      },
    },
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== "granted") {
      Alert.alert("Permission needed", "Please grant photo library access");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
      setValue("profilePicture", {
        uri: result.assets[0].uri,
        type: "image/jpeg",
        name: "profile.jpg",
      });
    }
  };

  const onSubmit = async (data: ISignupData) => {
    try {
      const res: any = await createAccount(data).unwrap();
      
      if (res?.data?.accessToken) {
        await storeUserInfo(res.data.accessToken);
        Alert.alert("Success", "Account created successfully!");
        router.replace("/(dashboard)/home");
      }
    } catch (error: any) {
      Alert.alert(
        "Signup Failed",
        error?.message || "Failed to create account. Please try again."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join Drutoo today</Text>

        <Card style={styles.formCard}>
          {/* Profile Picture */}
          <View style={styles.imageSection}>
            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
              {selectedImage ? (
                <Image source={{ uri: selectedImage }} style={styles.image} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.imagePlaceholderText}>+</Text>
                  <Text style={styles.imageLabel}>Add Photo</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Name Fields */}
          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>First Name</Text>
              <Controller
                control={control}
                name="name.firstName"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      errors.name?.firstName && styles.inputError,
                    ]}
                    placeholder="First name"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.name?.firstName && (
                <Text style={styles.errorText}>
                  {errors.name.firstName.message}
                </Text>
              )}
            </View>

            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Last Name</Text>
              <Controller
                control={control}
                name="name.lastName"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      errors.name?.lastName && styles.inputError,
                    ]}
                    placeholder="Last name"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.name?.lastName && (
                <Text style={styles.errorText}>
                  {errors.name.lastName.message}
                </Text>
              )}
            </View>
          </View>

          {/* Mobile */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mobile Number</Text>
            <Controller
              control={control}
              name="mobile"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, errors.mobile && styles.inputError]}
                  placeholder="01XXXXXXXXX"
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

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  placeholder="email@example.com"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
          </View>

          {/* NID */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>National ID</Text>
            <Controller
              control={control}
              name="nid"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, errors.nid && styles.inputError]}
                  placeholder="Enter NID number"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="number-pad"
                />
              )}
            />
            {errors.nid && (
              <Text style={styles.errorText}>{errors.nid.message}</Text>
            )}
          </View>

          {/* Date of Birth */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date of Birth</Text>
            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[
                    styles.input,
                    errors.dateOfBirth && styles.inputError,
                  ]}
                  placeholder="YYYY-MM-DD"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.dateOfBirth && (
              <Text style={styles.errorText}>
                {errors.dateOfBirth.message}
              </Text>
            )}
          </View>

          {/* Address Section */}
          <Text style={styles.sectionTitle}>Address</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Division</Text>
            <Controller
              control={control}
              name="address.division"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[
                    styles.input,
                    errors.address?.division && styles.inputError,
                  ]}
                  placeholder="e.g., Dhaka"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.address?.division && (
              <Text style={styles.errorText}>
                {errors.address.division.message}
              </Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>District</Text>
            <Controller
              control={control}
              name="address.district"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[
                    styles.input,
                    errors.address?.district && styles.inputError,
                  ]}
                  placeholder="e.g., Dhaka"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.address?.district && (
              <Text style={styles.errorText}>
                {errors.address.district.message}
              </Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Upazila</Text>
            <Controller
              control={control}
              name="address.upazila"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[
                    styles.input,
                    errors.address?.upazila && styles.inputError,
                  ]}
                  placeholder="e.g., Savar"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.address?.upazila && (
              <Text style={styles.errorText}>
                {errors.address.upazila.message}
              </Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Union</Text>
            <Controller
              control={control}
              name="address.union"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[
                    styles.input,
                    errors.address?.union && styles.inputError,
                  ]}
                  placeholder="e.g., Shimulia"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.address?.union && (
              <Text style={styles.errorText}>
                {errors.address.union.message}
              </Text>
            )}
          </View>

          {/* PIN */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>PIN (4 digits)</Text>
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
            title="Create Account"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            style={styles.signupButton}
          />

          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.loginLink}
          >
            <Text style={styles.loginText}>
              Already have an account?{" "}
              <Text style={styles.loginTextBold}>Login</Text>
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
    padding: 20,
    paddingTop: 40,
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
    marginBottom: 24,
    textAlign: "center",
  },
  formCard: {
    marginTop: 10,
  },
  imageSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  imagePicker: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholderText: {
    fontSize: 40,
    color: "#999",
  },
  imageLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
    marginBottom: 12,
  },
  inputGroup: {
    marginBottom: 16,
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
  signupButton: {
    marginTop: 10,
  },
  loginLink: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  loginText: {
    fontSize: 14,
    color: "#666",
  },
  loginTextBold: {
    color: "#007AFF",
    fontWeight: "600",
  },
});
