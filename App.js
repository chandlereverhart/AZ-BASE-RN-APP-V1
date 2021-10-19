import { StatusBar } from "expo-status-bar";
import * as React from "react";

import { StyleSheet, Text, View } from "react-native";
//containers
import Home from "./src/containers/Home/Home";

import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Home />
    </>
  );
}
