import { StyleSheet, Text, View } from "react-native";
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

const UserMenu = () => {
  return (
    <MenuProvider style={styles.container}>
      <Menu>
        <MenuTrigger
          text="Click for Option menu"
          customStyles={{
            triggerWrapper: {
              top: -20,
            },
          }}
        />
        <MenuOptions>
          <MenuOption onSelect={() => alert(`Save`)} text="Save" />
          <MenuOption onSelect={() => alert(`Delete`)} text="Delete" />
        </MenuOptions>
      </Menu>
    </MenuProvider>
  );
};

export default UserMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    flexDirection: "column",
  },
});
