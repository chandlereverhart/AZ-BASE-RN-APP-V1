import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { Card } from "react-native-ui-lib";
import styles from "./styles";
// import Video from "react-native-video";
// import VideoPlayer from "react-native-video-player";

const ExitDetails = (props) => {
  return (
    <View style={styles.pageContent}>
      <View style={styles.exitsView}>
        <Card style={styles.detailsCard}>
          <Text style={styles.title}>Saguaro</Text>
        </Card>
      </View>
    </View>
  );
};
export default ExitDetails;
