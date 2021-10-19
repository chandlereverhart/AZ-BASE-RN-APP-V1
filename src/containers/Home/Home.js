import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";
//components
import Header from "../../components/Header/Header";
//screens
import Exits from "../Home/Exits/Exits";
import ExitDetails from "../Home/ExitDetails/ExitDetails";

import News from "../Home/News/News";
import Events from "../Home/Events/Events";
import LogBook from "../Home/LogBook/LogBook";
// navigation utils
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DrawerButton from "../../components/Navigation/Drawer/DrawerButton/DrawerButton";
import NavigationTitle from "../../components/Navigation/NavigationTitle/NavigationTitle";

const HomeStack = createNativeStackNavigator();

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
  const [initialRoute, setInitialRoute] = useState("MyTabs");

  return (
    <NavigationContainer>
      <HomeStack.Navigator
        initialRouteName={initialRoute}
        headerTitleAlign="center"
        screenOptions={(navigation) => ({
          headerTitleAlign: "center",
          // headerRight: () => <DrawerButton navigation={navigation} />,
          headerTitle: (
            <Image
              source={{ uri: "src/assets/AZBASE-LOGO.png" }}
              style={styles.image}
            />
          ),
          // headerBackImage: () => <NavigationBackImage />,
          headerBackTitle: null,
          headerTruncatedBackTitle: null,
          headerStyle: {
            height: 300,
          },
        })}
      >
        <HomeStack.Screen name="MyTabs" component={MyTabs} />
        <HomeStack.Screen name="Exits" component={Exits} />
        <HomeStack.Screen name="ExitDetails" component={ExitDetails} />
        <HomeStack.Screen name="LogBook" component={LogBook} />
        <HomeStack.Screen name="News" component={News} />
        <HomeStack.Screen name="Events" component={Events} />
        <HomeStack.Screen name="Header" component={Header} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};
export default Home;
