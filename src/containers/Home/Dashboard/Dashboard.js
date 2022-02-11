import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import WeatherWidget from "../../../components/WeatherWidget/WeatherWidget";
import UsersCard from "../../../components/UsersCard/UsersCard";
import LastJumpCard from "../../../components/LastJumpCard/LastJumpCard";

const Dashboard = (props) => {
  return (
    <>
      <View style={styles.bottomHalf}>
        <ScrollView style={styles.container}>
          <WeatherWidget />
          <View style={styles.divider} />
          <UsersCard />
          <View style={styles.divider} />
          <LastJumpCard />
          <View style={styles.marginBottom} />
        </ScrollView>
      </View>
    </>
  );
};
export default Dashboard;

const styles = StyleSheet.create({
  root: {},
  container: {
    flex: 1,
    marginVertical: 10,
    marginBottom: 10,
  },

  bottomHalf: {
    width: "100%",
    minHeight: "100%",
    alignItems: "center",
  },
  divider: {
    borderTopColor: "rgba(255, 255, 255, 0.3)",
    borderTopWidth: 1,
    marginVertical: 20,
  },
  marginBottom: {
    marginBottom: 100,
  },
});
