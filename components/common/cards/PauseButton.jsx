import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PauseButton = ({ handlePress }) => {
  return (
    <TouchableOpacity style={styles.pauseButtonShadow} onPress={handlePress}>
      <View style={styles.pauseButton}>
        <Ionicons name="pause" size={34} color="#FFFFFF" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pauseButtonShadow: {
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
  pauseButton: {
    backgroundColor: "#3498db", // Distinct color for pause
    width: 70, // Consistent size with play button
    height: 70, // Consistent size with play button
    borderRadius: 50, // Circular design
    justifyContent: "center", // Center icon vertically
    alignItems: "center", // Center icon horizontally
    borderWidth: 1, // Subtle border to enhance design
    borderColor: "#3498db", // Match the background for a seamless look
    borderBottomColor: "#2980b9", // Slightly darker for depth
  },
});

export default PauseButton;
