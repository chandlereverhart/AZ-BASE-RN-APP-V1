import React from "react";
import Icon from "../../../Icon/Icon";
import { TouchableOpacity } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";

import styles from "./styles";

const DrawerButton = (props) => {
  const navigation = useNavigation();
  const drawerOpen = useIsDrawerOpen();
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.8}
      onPress={() => {
        navigation?.dispatch?.(DrawerActions.toggleDrawer());
      }}
    >
      <Icon name={drawerOpen ? "close" : "menu"} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default DrawerButton;
