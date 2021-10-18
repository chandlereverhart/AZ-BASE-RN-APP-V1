import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { Card } from "react-native-ui-lib";
import styles from "./styles";

const ExitDetails = (props) => {
  return (
    <View style={styles.pageContent}>
      <View style={styles.exitsView}>
        <Card style={styles.listCard}>
          <Text style={styles.text}>Saguaro</Text>
        </Card>
      </View>
    </View>
  );
};
export default ExitDetails;
