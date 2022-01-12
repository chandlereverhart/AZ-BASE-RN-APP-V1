import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Card } from "react-native-ui-lib";
import styles from "./styles";
// import Video from "react-native-video";
// import VideoPlayer from "react-native-video-player";
import { auth } from "../../../../Firebase/firebase";
import { useNavigation } from "@react-navigation/core";
const ExitDetails = (props) => {
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
        <View style={styles.exitsView}>
          <Card style={styles.detailsCard}>
            <Text style={styles.title}>Saguaro</Text>
          </Card>
        </View>
      </View>
    </>
  );
};
export default ExitDetails;
