import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { auth } from "../../../../Firebase/firebase";
import { useNavigation } from "@react-navigation/core";
const Events = (props) => {
  const navigation = useNavigation();
  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };
  return (
    <>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
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

        <View>
          <Text style={styles.title2}>Past Events</Text>
        </View>
        <View style={styles.exitsView}>
          <Text style={styles.text}>Event 1</Text>
          <Text style={styles.text}>Event 2</Text>
        </View>
      </View>
    </>
  );
};
export default Events;
