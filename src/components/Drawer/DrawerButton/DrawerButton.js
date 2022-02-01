import React, { useState } from "react";
import Icon from "../../Icon/Icon";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { StyleSheet } from "react-native";

const DrawerButton = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.8}
      onPress={() => {
        if (drawerOpen) {
          setDrawerOpen(false);
          navigation.closeDrawer();
        } else {
          setDrawerOpen(true);
          navigation.openDrawer();
        }
      }}
    >
      <Icon name={"menu"} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default DrawerButton;

const styles = StyleSheet.create({
  button: {
    height: "100%",
    justifyContent: "center",
    display: "flex",
  },
  icon: {
    color: "#b7b7b7",
    fontSize: 30,
    paddingRight: 16,
  },
});
