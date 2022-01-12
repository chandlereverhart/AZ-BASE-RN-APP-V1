import { useNavigation } from "@react-navigation/core";

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth } from "../../Firebase/firebase";

const HomeScreen = (props) => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  const handleEnterApp = () => {
    navigation.replace("Home");
  };

  function MyTabs() {
    return (
      <Tab.Navigator
        initialRouteName="Exits"
        screenOptions={{
          tabBarActiveTintColor: "#2e2e2e",
        }}
      >
        <Tab.Screen
          name="Exits"
          component={Exits}
          options={{
            tabBarLabel: "Exits",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="map-marker-multiple"
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Tab.Screen
          name="News"
          component={News}
          options={{
            tabBarLabel: "News",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="newspaper-variant"
                color={color}
                size={size}
              />
            ),
            tabBarBadge: 1,
          }}
        />
        <Tab.Screen
          name="Events"
          component={Events}
          options={{
            tabBarLabel: "Events",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="calendar-edit"
                color={color}
                size={size}
              />
            ),
            // tabBarBadge: 3,
          }}
        />
        <Tab.Screen
          name="Log Book"
          component={LogBook}
          options={{
            tabBarLabel: "Log Book",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="lead-pencil"
                color={color}
                size={size}
              />
            ),
            // tabBarBadge: 3,
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <View style={styles.container}>
      <Text>EMAIL: {auth.currentUser?.email}</Text>
      <TouchableOpacity onPress={handleEnterApp} style={styles.button}>
        <Text style={styles.buttonText}>Enter the App!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
