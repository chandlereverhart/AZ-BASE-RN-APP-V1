import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";

const Exits = (props) => {
  return (
    <View style={styles.pageContent}>
      <View>
        <View style={styles.logoView}>
          {/* <Image
            style={styles.logo}
            source={require("../../assets/AZBASE-LOGO.png")}
          /> */}
        </View>
        <Text style={styles.title}>Exits</Text>
      </View>
      <View style={styles.exitsView}>
        <Text style={styles.text}>Saguaro</Text>
        <Text style={styles.text}>Canyon Lake </Text>
        <Text style={styles.text}>Afternoon Delight</Text>
        <Text style={styles.text}>Courthouse</Text>
      </View>
    </View>
  );
};
export default Exits;
