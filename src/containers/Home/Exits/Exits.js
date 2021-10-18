import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Card } from "react-native-ui-lib";
import styles from "./styles";
import ExitDetails from "../ExitDetails/ExitDetails";

const Exits = (props) => {
  return (
    <View style={styles.pageContent}>
      <View style={styles.exitsView}>
        <Card style={styles.listCard}>
          <Text style={styles.text}>Saguaro</Text>
        </Card>
        <Card style={styles.listCard}>
          <Text style={styles.text}>Canyon Lake</Text>
        </Card>
        <Card style={styles.listCard}>
          <Text style={styles.text}>Courthouse</Text>
        </Card>
        <Card style={styles.listCard}>
          <Text style={styles.text}>The Ramp</Text>
        </Card>
        <Card style={styles.listCard}>
          <Text style={styles.text}>Camelback</Text>
        </Card>
        <Card style={styles.listCard}>
          <Text style={styles.text}>SuperChicken</Text>
        </Card>
        <Card style={styles.listCard}>
          <Text style={styles.text}>Afternoon Delight</Text>
        </Card>
      </View>
    </View>
  );
};
export default Exits;
