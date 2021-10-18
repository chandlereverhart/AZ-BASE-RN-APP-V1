import { StatusBar } from "expo-status-bar";
import * as React from "react";

import { StyleSheet, Text, View } from "react-native";
//containers
import Home from "./src/containers/Home/Home";

import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Home />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
