import * as React from "react";
import { useNavigation } from "@react-navigation/core";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
  TouchableRipple,
  Switch,
  View,
  Text,
  Drawer as PaperDrawer,
} from "react-native-paper";
import { APP_CONFIGURATION } from "./src/variables";

import { StyleSheet, Image, Linking } from "react-native";
//containers
import LoginScreen from "./src/Auth/LoginScreen";
import Dashboard from "./src/containers/Home/Dashboard/Dashboard";
import Exits from "./src/containers/Home/Exits/Exits";
import ExitDetails from "./src/containers/Home/ExitDetails/ExitDetails";
import LogBook from "./src/containers/Home/LogBook";
import LogBookDetails from "./src/containers/Home/LogBookDetails";
import LogBookForm from "./src/components/Forms/LogBookForm";
import News from "./src/containers/Home/News";
import NewsDetails from "./src/containers/Home/NewsDetails/NewsDetails";
import Events from "./src/containers/Home/Events";
import EventDetails from "./src/containers/Home/EventDetails/EventDetails";
// navigation utils
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  useTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import { auth } from "./Firebase/firebase";

import merge from "deepmerge";
import { PreferencesContext } from "./src/utils/preferencesContext";

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

// icons
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ExitsForm from "./src/components/Forms/ExitsForm";
import EventsForm from "./src/components/Forms/EventsForm";
import NewsForm from "./src/components/Forms/NewsForm";

const Stack = createNativeStackNavigator();
const RootStack = createStackNavigator();

const Tab = createBottomTabNavigator();

function MyTabs({ props }) {
  return (
    <Tab.Navigator
      screenOptions={{
        // headerShown: true,
        tabBarActiveTintColor: "rgba(255, 255, 255, 0.95)",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons color={color} name="home" size={24} />
            );
          },
        }}
      />

      <Tab.Screen
        name="News"
        component={News}
        options={{
          tabBarLabel: "News",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              color={color}
              name="newspaper-variant"
              size={24}
            />
          ),
          tabBarBadge: 1,
        }}
      />

      <Tab.Screen
        name="Exits"
        component={Exits}
        options={{
          tabBarLabel: "Exits",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              color={color}
              name="map-marker-multiple"
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Log Book"
        component={LogBook}
        options={{
          tabBarLabel: "Log Book",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              color={color}
              name="lead-pencil"
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MyStack({ props }) {
  const [isThemeDark, setIsThemeDark] = React.useState(false);

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );
  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={CombinedDarkTheme}>
        <Stack.Navigator
          initialRouteName={"MyTabs"}
          screenOptions={() => ({
            headerTitleAlign: "center",
            headerTintColor: "rgba(255, 255, 255, 0.95)",
            headerTitle: () => <LogoTitle />,
            headerBackTitle: null,
            headerTruncatedBackTitle: null,
            headerStyle: {
              height: 70,
            },
          })}
        >
          <Stack.Screen name="Login" component={LoginScreen} />

          <Stack.Screen name="MyTabs" component={MyTabs} />
          <Stack.Screen name="Exits" component={Exits} />
          <Stack.Screen name="ExitsForm" component={ExitsForm} />
          <Stack.Screen
            name="ExitDetails"
            component={ExitDetails}
            screenOptions={{ headerShown: true }}
          />
          <Stack.Screen name="LogBook" component={LogBook} />
          <Stack.Screen name="LogBookForm" component={LogBookForm} />
          <Stack.Screen name="LogBookDetails" component={LogBookDetails} />
          <Stack.Screen name="News" component={News} />
          <Stack.Screen name="NewsForm" component={NewsForm} />
          <Stack.Screen name="NewsDetails" component={NewsDetails} />
          <Stack.Screen name="Events" component={Events} />
          <Stack.Screen name="EventsForm" component={EventsForm} />
          <Stack.Screen name="EventDetails" component={EventDetails} />
        </Stack.Navigator>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const navigation = useNavigation();
  const theme = useTheme();
  const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);

  function handleLogout() {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
    props.navigation.closeDrawer();
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Home"
        onPress={() => {
          props.navigation.navigate("Home");
        }}
      />
      <DrawerItem label="Notifications" onPress={() => {}} />
      <DrawerItem label="Account" onPress={() => {}} />
      <DrawerItem
        label="Contact Us"
        onPress={() => {
          Linking.openURL(
            `mailto:${APP_CONFIGURATION.content.supportEmail}?subject=Support - ${APP_CONFIGURATION.app.displayName}&body=Device Info: Version: 1.0`
          );
        }}
      />
      {auth.currentUser ? (
        <DrawerItem label="Logout" onPress={handleLogout} />
      ) : (
        <DrawerItem
          label="Login"
          onPress={() => {
            props.navigation.navigate("Login");
          }}
        />
      )}

      <TouchableRipple onPress={() => toggleTheme()}>
        <>
          <Text>Dark Mode</Text>
          <Switch color={"red"} value={isThemeDark} />
        </>
      </TouchableRipple>
    </DrawerContentScrollView>
  );
}
function LogoTitle() {
  return (
    <Image
      style={{ width: 35, height: 40 }}
      source={require("./src/assets/AZBASE-white.png")}
    />
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerPosition="right"
      screenOptions={() => ({
        headerTitleAlign: "center",
        headerTintColor: "rgba(255, 255, 255, 0.95)",
        headerTitle: () => <LogoTitle />,
        headerBackTitle: "Back",
        headerTruncatedBackTitle: null,
        headerBackTitle: null,
        headerTruncatedBackTitle: null,
        headerStyle: {
          height: 70,
        },
      })}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={MyStack} />
    </Drawer.Navigator>
  );
}
export default function App(props) {
  return (
    <NavigationContainer theme={CombinedDarkTheme}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Main" component={MyDrawer} />
      </RootStack.Navigator>
    </NavigationContainer>
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
