import * as React from "react";
import { useNavigation } from "@react-navigation/core";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import { StyleSheet, Image } from "react-native";
//containers
import LoginScreen from "./src/Auth/LoginScreen";
import Exits from "./src/containers/Home/Exits/Exits";
import ExitDetails from "./src/containers/Home/ExitDetails/ExitDetails";
import LogBook from "./src/containers/Home/LogBook";
import LogBookDetails from "./src/containers/Home/LogBookDetails";
import LogBookForm from "./src/components/Forms/LogBookForm";
import News from "./src/containers/Home/News";
import Events from "./src/containers/Home/Events";
import EventDetails from "./src/containers/Home/EventDetails/EventDetails";

import Header from "./src/components/Header/Header";
// navigation utils
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// icons
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ExitsForm from "./src/components/Forms/ExitsForm";
import EventsForm from "./src/components/Forms/EventsForm";

const Stack = createNativeStackNavigator();

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
function LogoTitle() {
  return (
    <Image
      style={{ width: 30, height: 30 }}
      source={require("./src/assets/AZBASE-LOGO.png")}
    />
  );
}

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#f1c40f",
    secondary: "#3498db",
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={(navigation) => ({
            headerTitleAlign: "center",
            headerBackTitle: "Back",
            headerTruncatedBackTitle: null,
            headerStyle: { color: "black" },
          })}
        >
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />

          <Stack.Screen
            name="MyTabs"
            component={MyTabs}
            options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          />
          <Stack.Screen
            name="Exits"
            component={Exits}
            options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          />
          <Stack.Screen
            name="ExitsForm"
            component={ExitsForm}
            options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          />
          <Stack.Screen
            name="ExitDetails"
            component={ExitDetails}
            options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          />
          <Stack.Screen
            name="LogBook"
            component={LogBook}
            options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          />
          <Stack.Screen
            name="LogBookDetails"
            component={LogBookDetails}
            options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          />
          <Stack.Screen
            name="LogBookForm"
            component={LogBookForm}
            options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          />
          <Stack.Screen
            name="News"
            component={News}
            options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          />
          <Stack.Screen
            name="Events"
            component={Events}
            options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          />
          <Stack.Screen
            name="EventsForm"
            component={EventsForm}
            options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          />
          <Stack.Screen
            name="EventDetails"
            component={EventDetails}
            options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          />
          <Stack.Screen
            name="Header"
            component={Header}
            options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
});
