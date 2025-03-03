import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons"; // Icons

const VerificationMethodScreen = () => {
  const router = useRouter();

  const handleSelection = (method: string) => {
    // router.push("otp-verification?method=${method}"); // Pass method to next screen   
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      {/* Page Title */}
      <Text style={styles.title}>Choose verification method</Text>

      {/* OTP via Email */}
      <TouchableOpacity style={styles.option} onPress={() => handleSelection("email")}>
        <FontAwesome name="envelope" size={24} color="#007AFF" />
        <Text style={styles.optionText}>OTP via E-mail</Text>
      </TouchableOpacity>

      {/* OTP via WhatsApp */}
      <TouchableOpacity style={styles.option} onPress={() => handleSelection("whatsapp")}>
        <FontAwesome5 name="whatsapp" size={24} color="green" />
        <Text style={styles.optionText}>OTP via WhatsApp</Text>
      </TouchableOpacity>

      {/* OTP via SMS */}
      <TouchableOpacity style={styles.option} onPress={() => handleSelection("sms")}>
        <FontAwesome name="envelope-o" size={24} color="orange" />
        <Text style={styles.optionText}>OTP via SMS</Text>
      </TouchableOpacity>

      {/* Footer Branding */}
      {/* <Text style={styles.footerText}>
        from <Text style={styles.brandText}>goto</Text>
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
  },
  backButtonText: {
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 15,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 15,
  },
  footerText: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    fontSize: 14,
    color: "#666",
  },
  brandText: {
    color: "green",
    fontWeight: "bold",
  },
});

export default VerificationMethodScreen;
