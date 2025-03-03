import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import LanguageSelector from "../components/LanguageSelector";

const width = Dimensions.get("window").width;

// Carousel data with images & text
const carouselData = [
  {
    image: require("/Users/sonamdorjighalley/Desktop/swe201/Practical /gojek/assets/images/Session 1 Image.png"),
    title: "Get going with us",
    description: "Use GoCar to get across town – from anywhere, at any time.",
  },
  {
    image: require("/Users/sonamdorjighalley/Desktop/swe201/Practical /gojek/assets/images/Screenshot 2568-03-03 at 5.06.00 PM.png"),
    title: "Faster and Safer Rides",
    description: "Our drivers are verified, and we ensure your safety at all times.",
  },
  {
    image: require("/Users/sonamdorjighalley/Desktop/swe201/Practical /gojek/assets/images/Screenshot 2568-03-03 at 5.06.20 PM.png"),
    title: "More Choices, More Convenience",
    description: "Choose from a variety of vehicle options to suit your needs.",
  },
];

// List of languages
const language = ["English", "རྫོང་ཁ།"];

const OnboardingScreen = () => {
  const router = useRouter();
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("English"); // Default language
  const [modalVisible, setModalVisible] = useState(false); // Controls dropdown visibility

  // Handles language selection
  const selectLanguage = (language: string) => {
    setSelectedLanguage(language);
    setModalVisible(false); // Close modal after selection
  };

  return (
    <View style={styles.container}>
      {/* Gojek Logo */}
      <Image
        source={require("/Users/sonamdorjighalley/Desktop/swe201/Practical /gojek/assets/images/Gojek Logo Transparent.png")}
        style={styles.logoImage}
      />

      {/* Language Dropdown Button */}
      <LanguageSelector 
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
      />
     
      {/* Carousel Component */}
      <Carousel
        ref={ref}
        width={width}
        height={width / 1.5}
        data={carouselData}
        onProgressChange={progress}
        onSnapToItem={(index) => setCurrentIndex(index)}
        loop
        renderItem={({ item }) => (
          <View style={styles.carouselItem}>
            <Image source={item.image} style={styles.carouselImage}/>
          </View>
        )}
      />

      {/* Pagination Dots */}
      <Pagination.Basic
        progress={progress}
        data={carouselData}
        dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
        containerStyle={{ gap: 5, marginTop: 10 }}
      />

      {/* Dynamic Text Content */}
      <Text style={styles.title}>{carouselData[currentIndex].title}</Text>
      <Text style={styles.subtitle}>{carouselData[currentIndex].description}</Text>

      {/* Login & Signup Buttons */}
      <TouchableOpacity style={styles.loginButton} onPress={() => router.push("/login")}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupButton} onPress={() => alert("Signup Pressed")}>
        <Text style={styles.signupText}>I'm new, sign me up</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footer}>
        By logging in or registering, you agree to our{" "}
        <Text style={styles.link}>Terms of Service</Text> and{" "}
        <Text style={styles.link}>Privacy Policy</Text>.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  logoImage: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  languageButton: {
    position: "absolute",
    top: 50,
    right: 20,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
  },
  languageText: {
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  languageOption: {
    padding: 10,
    width: "100%",
    alignItems: "center",
  },
  languageOptionText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "green",
    alignItems: "center",
    width: "100%",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  carouselItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselImage: {
    width: "90%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginVertical: 10,
  },
  loginButton: {
    backgroundColor: "green",
    width: "90%",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupButton: {
    width: "90%",
    padding: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "green",
    alignItems: "center",
    marginBottom: 20,
  },
  signupText: {
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
  },
  footer: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
    marginTop: 20,
  },
  link: {
    color: "blue",
  },
});

export default OnboardingScreen;
