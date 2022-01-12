import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { auth } from "../../../../Firebase/firebase";
import { useNavigation } from "@react-navigation/core";

const News = (props) => {
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
          <Text style={styles.title}>Important Information</Text>
        </View>
        <View style={styles.exitsView}>
          <Text style={styles.text}>
            Lots of imprtant Information here, please be sure to read all of
            this important Information :)
          </Text>
        </View>
      </View>
    </>
  );
};
export default News;
