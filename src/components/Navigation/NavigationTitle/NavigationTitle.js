import React from "react";
import { TouchableWithoutFeedback, Image } from "react-native";
import { Text } from "react-native-ui-lib";
import { useNavigation } from "@react-navigation/native";
// import defaultLogo from '../../../assets/GK-Logo-Dark.png';
import styles from "./styles";

const NavigationTitle = () => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      style={styles.root}
      onPress={() => {
        if (navigation.canGoBack()) {
          navigation.popToTop();
        }
      }}
    >
      {/* <Image source={{uri: client.logoUrl}} style={styles.image} /> */}
    </TouchableWithoutFeedback>
  );
};

export default NavigationTitle;
