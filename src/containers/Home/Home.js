import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
//components
import Header from "../../components/Header/Header";
//screens
import Exits from "../Exits/Exits";
import News from "../News/News";
import Events from "../Events/Events";
import LogBook from "../LogBook/LogBook";
import ExitDetails from "../ExitDetails/ExitDetails";
// import VideoBlog from "../VideoBlog/VideoBlog";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

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

const Home = (props) => {
  return (
    <View style={styles.root}>
      <Header />
      <MyTabs />
    </View>
  );
};
export default Home;
