import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";

const LogBook = (props) => {
  return (
    <View style={styles.pageContent}>
      <View>
        <View style={styles.logoView}>
          {/* <Image
            style={styles.logo}
            source={require("../../assets/AZBASE-LOGO.png")}
          /> */}
        </View>
      </View>
      <View style={styles.logView}>
        <Text style={styles.text}>Jump #:</Text>
        <Text style={styles.text}>Exit #:</Text>
        <Text style={styles.text}>Exit Name: </Text>
        <Text style={styles.text}>Location:</Text>
        <Text style={styles.text}>Gear Used:</Text>
        <Text style={styles.text}>Other Details:</Text>
      </View>
      <View style={styles.totalView}>
        <Text style={styles.totalText}>Total Jumps:</Text>
        <Text style={styles.totalText}>Total Exits: </Text>
      </View>
    </View>
  );
};
export default LogBook;
