import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";

const Events = (props) => {
  return (
    <View style={styles.pageContent}>
      <View>
        <Text style={styles.title}>Upcoming Events</Text>
      </View>
      <View style={styles.exitsView}>
        <Text style={styles.text}>Event 1</Text>
        <Text style={styles.text}>Event 2</Text>
        <Text style={styles.text}>Event 3</Text>
        <Text style={styles.text}>Event 4</Text>
        <Text style={styles.text}>Event 5</Text>
      </View>
    </View>
  );
};
export default Events;
