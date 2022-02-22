import React from "react";

import { View } from "react-native";
import SkeletonContent from "react-native-skeleton-content-nonexpo";

import styles from "./styles";

const EventsListItem = () => {
  return (
    <View style={styles.container}>
      <SkeletonContent
        boneColor="#c2c2c2"
        containerStyle={styles.root}
        isLoading={true}
        layout={[
          {
            width: "20%",
            flexDirection: "column",
            children: [
              {
                width: "70%",
                height: 15,
                borderRadius: 6,
                marginBottom: 10,
              },
              {
                width: "60%",
                height: 15,
                borderRadius: 6,
              },
            ],
          },
          {
            width: 80,
            height: 80,
          },
          {
            marginLeft: 16,
            width: "40%",
            flexDirection: "column",
            children: [
              {
                width: "100%",
                height: 15,
                borderRadius: 6,
                marginBottom: 10,
              },
              {
                width: "60%",
                height: 15,
                borderRadius: 6,
              },
            ],
          },
        ]}
      />
    </View>
  );
};

export default EventsListItem;
