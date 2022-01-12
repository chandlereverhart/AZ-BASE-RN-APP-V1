import { StatusBar } from "expo-status-bar";
import * as React from "react";

import { StyleSheet, Text, View } from "react-native";
//containers
import LoginScreen from "./src/Auth/LoginScreen";
import HomeScreen from "./src/Auth/HomeScreen";

import Home from "./src/containers/Home/Home";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen name="Home Screen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
