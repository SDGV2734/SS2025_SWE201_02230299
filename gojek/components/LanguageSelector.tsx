import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";

interface LanguageSelectorProps {
    selectedLanguage: string;
    onSelectLanguage: (language: string) => void;
  }
  

// Define available languages
const languages = ["English", "རྫོང་ཁ།"];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onSelectLanguage }) => {
    const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      {/* Language Selection Button */}
      <TouchableOpacity
        style={styles.languageButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.languageText}>{selectedLanguage}</Text>
      </TouchableOpacity>

      {/* Language Selection Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <FlatList
              data={languages}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.languageOption}
                  onPress={() => {
                    onSelectLanguage(item); // Pass selected language to parent
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.languageOptionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  languageButton: {
    position: "absolute",
    top: 0,
    right: 0,
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
});

export default LanguageSelector;
