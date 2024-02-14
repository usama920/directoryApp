import React, { useContext, useState } from "react";
import { TouchableOpacity, Image, View, Text } from "react-native";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";

import styles from "./screenheader.style";
import AppwriteContext from "../../../context/AppwriteContext";

const NewScreenHeaderRightBtn = ({ iconUrl, dimension, handlePress }) => {
  const { isLoggedIn, setIsLoggedIn, appwrite } = useContext(AppwriteContext);
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);
  const logoutHandle = () => {
    setVisible(false);
    setIsLoggedIn(false);
    appwrite.logout();
  };

  if (isLoggedIn) {
    return (
      <View
        style={{
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Menu
          style={{ top: 40 }}
          visible={visible}
          anchor={
            <TouchableOpacity onPress={showMenu}>
              <Image
                source={iconUrl}
                resizeMode="cover"
                style={{ width: 40, height: 40 }}
              />
            </TouchableOpacity>
          }
          onRequestClose={hideMenu}
        >
          <MenuItem
            onPress={logoutHandle}
            textStyle={{ fontWeight: "bold", fontSize: 16 }}
          >
            Logout
          </MenuItem>
        </Menu>
      </View>
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

export default NewScreenHeaderRightBtn;
