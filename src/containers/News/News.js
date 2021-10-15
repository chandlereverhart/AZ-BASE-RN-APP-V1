import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";

const News = (props) => {
  return (
    <View style={styles.pageContent}>
      <View>
        <Text style={styles.title}>Important Information</Text>
      </View>
      <View style={styles.exitsView}>
        <Text style={styles.text}>
          Lots of imprtant Information here, please be sure to read all of this
          important Information :)
        </Text>
      </View>
    </View>
  );
};
export default News;
