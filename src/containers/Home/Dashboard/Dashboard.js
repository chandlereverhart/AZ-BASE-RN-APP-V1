import React, { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { Card } from "react-native-paper";

import WeatherWidget from "../../../components/WeatherWidget/WeatherWidget";

// components

const Dashboard = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setLoading(false);
  }, []);

  return (
    <>
      <View style={styles.bottomHalf}>
        <SafeAreaView style={styles.container}>
          <WeatherWidget />
        </SafeAreaView>
      </View>
    </>
  );
};
export default Dashboard;

const styles = StyleSheet.create({
  root: {},
  container: {
    flex: 1,
    paddingVertical: 10,
  },

  bottomHalf: {
    width: "100%",
    minHeight: "100%",
    alignItems: "center",
    // backgroundColor: "white",
    paddingBottom: 70,
  },
});
