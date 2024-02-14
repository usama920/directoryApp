import { View, TouchableOpacity, Linking, StyleSheet } from "react-native";

import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
const SocialIcons = ({ facebookURL, instagramURL }) => {
  const openURL = async (url) => {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      {facebookURL && (
        <TouchableOpacity
          onPress={() => openURL(facebookURL)}
          style={styles.fbButton}
        >
          <FontAwesome name="facebook" size={24} color="white" />
        </TouchableOpacity>
      )}
      {instagramURL && (
        <TouchableOpacity
          onPress={() => openURL(instagramURL)}
          style={styles.InstButton}
        >
          <FontAwesome5 name="instagram" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: 20,
    marginHorizontal: 20,
  },
  fbButton: {
    backgroundColor: "#0866FF",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  InstButton: {
    backgroundColor: "#D504D8",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});

export default SocialIcons;
