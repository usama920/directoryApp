import React, { useContext } from "react";
import { TouchableOpacity, Image, View } from "react-native";
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

import styles from "./screenheader.style";
import AppwriteContext from "../../../context/AppwriteContext";

const ScreenHeaderRightBtn = ({ iconUrl, dimension, handlePress }) => {
  const { isLoggedIn } = useContext(AppwriteContext);

  if (!isLoggedIn) {
    return (
      // <TouchableOpacity style={styles.btnContainer}>
      <MenuProvider style={{ flex: 1 }}>
        <View style={{ marginRight: 10 }}>
          <Menu style={{}}>
            <MenuTrigger
              // text="Select action"
              style={{
                backgroundColor: "blue",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                right: "-90%",
              }}
            >
              <Image
                source={iconUrl}
                resizeMode="cover"
                style={{ width: "100%", height: "100%" }}
              />
            </MenuTrigger>

            <MenuOptions>
              <MenuOption onSelect={() => alert(`Save`)} text="Save" />
              <MenuOption onSelect={() => alert(`Delete`)} text="Delete" />
            </MenuOptions>
          </Menu>
        </View>
      </MenuProvider>
      // </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image
        source={iconUrl}
        resizeMode="cover"
        style={styles.btnImg(dimension)}
      />
    </TouchableOpacity>
  );
};

export default ScreenHeaderRightBtn;
