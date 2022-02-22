import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
//styles
import styles from "./styles";
const Header = (props) => {
  return (
    <View style={styles.pageContent}>
      <Image
        style={styles.logo}
        source={require("../../assets/AZBASE-LOGO.png")}
      />
    </View>
  );
};
export default Header;
