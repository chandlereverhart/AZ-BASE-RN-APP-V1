import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import WeatherWidget from "../../../components/WeatherWidget/WeatherWidget";
import UsersCard from "../../../components/UsersCard/UsersCard";

const Dashboard = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setLoading(false);
  }, []);

  return (
    <>
      <View style={styles.bottomHalf}>
        <ScrollView style={styles.container}>
          <WeatherWidget />
          <View style={styles.divider} />
          <UsersCard />
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
