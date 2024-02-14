import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PlayButton = ({ handlePress }) => {
  return (
    <TouchableOpacity style={styles.playButtonShadow} onPress={handlePress}>
      <View style={styles.playButton}>
        <Ionicons name="play" size={34} color="#FFFFFF" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  playButtonShadow: {
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
  playButton: {
    backgroundColor: "#FF416C", // Vibrant button color
    width: 70, // Button size
    height: 70, // Button size
    borderRadius: 50, // Circular button
    justifyContent: "center", // Center icon vertically
    alignItems: "center", // Center icon horizontally
    borderWidth: 1, // Subtle border
    borderColor: "#FF416C", // Border color similar to background for depth
    // Gradient-like effect using border manipulation
    borderBottomColor: "#DB1550", // Slightly darker shade for a pseudo-3D effect
  },
});

export default PlayButton;
