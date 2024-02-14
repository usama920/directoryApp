import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const LoadingButton = () => {
  return (
    <View style={styles.buttonShadow}>
      <View style={styles.button}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonShadow: {
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  button: {
    backgroundColor: "#2ecc71", // A fresh color indicating progress/action
    width: 70, // Consistent size with play and pause button
    height: 70, // Consistent size with play and pause button
    borderRadius: 50, // Circular design
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    borderWidth: 1, // Subtle border to enhance design
    borderColor: "#2ecc71", // Match the background for a seamless look
    borderBottomColor: "#27ae60", // Slightly darker for depth
  },
});

export default LoadingButton;
