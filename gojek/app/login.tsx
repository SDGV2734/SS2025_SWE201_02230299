import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import LanguageSelector from "../components/LanguageSelector"; // Import LanguageSelector

const LoginScreen = () => {
  const router = useRouter(); // Use router for navigation
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleContinue = () => {
    if (phoneNumber.trim() === "") {
      Alert.alert("Input Required", "Please enter your phone number.");
      return;
    }
    // Proceed to next step
    router.push("/verify");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        {/* Import LanguageSelector */}
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onSelectLanguage={setSelectedLanguage}
        />
      </View>
      Login Form
      <Text style={styles.title}>Welcome to Gojek!</Text>
      <Text style={styles.subtitle}>
        Enter or create an account in a few easy steps.
      </Text>
      <Text style={styles.label}>Phone number*</Text>
      <TextInput
        style={styles.input}
        placeholder="+975 - "
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <Text style={styles.termsText}>
        I agree to Gojek’s <Text style={styles.link}>Terms of Service</Text> &{" "}
        <Text style={styles.link}>Privacy Policy</Text>.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#fff",
  },
  header: {
    position: "absolute",
    top: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    // position: "absolute",
    top: 20,
    left: 10,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
  },
  backButtonText: {
    fontSize: 16,
  },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center" },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  label: { fontSize: 14, fontWeight: "bold", marginBottom: 5, textAlign: "left" },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    fontSize: 18,
    paddingVertical: 8,
    marginBottom: 20,
    width: "100%",
  },
  continueButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  termsText: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
    marginTop: 15,
  },
  link: { color: "blue" },
});

export default LoginScreen;
