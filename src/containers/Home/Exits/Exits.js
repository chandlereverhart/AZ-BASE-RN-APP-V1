import React from "react";
import { View, Text, Button } from "react-native";
import { StyleSheet } from "react-native";
import { Card } from "react-native-ui-lib";
import { auth } from "../../../../Firebase/firebase";
import { useNavigation } from "@react-navigation/core";

const Exits = (props) => {
  const navigation = useNavigation();
  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  const EXIT_OPTIONS = [
    { name: "Saguaro", icon: "", label: "saguaro" },
    { name: "Canyon Lake", icon: "", label: "saguaro" },
    { name: "Courthouse", icon: "", label: "saguaro" },
    { name: "The Ramp", icon: "", label: "saguaro" },
    { name: "Camelback", icon: "", label: "saguaro" },
    { name: "SuperChicken", icon: "", label: "saguaro" },
  ];

  return (
    <>
      <View style={styles.pageContent}>
        <Button
          title="Sign Out"
          accessibilityLabel="Learn more about this purple button"
          onPress={handleSignOut}
        />
        <View style={styles.exitsView}>
          {EXIT_OPTIONS.map((option, index) => {
            if (option) {
              return (
                <Card
                  style={styles.listCard}
                  onPress={() => props.navigation.navigate("ExitDetails")}
                >
                  <Text style={styles.text}>{option.name}</Text>
                </Card>
              );
            }
            return null;
          })}
        </View>
      </View>
    </>
  );
};
export default Exits;

const styles = StyleSheet.create({
  root: {},
  pageContent: {
    display: "flex",
    flex: 1,
    paddingHorizontal: "3%",
    paddingTop: "10%",
    paddingBottom: "10%",
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 100,
  },
  logoView: {
    marginTop: 0,
  },
  title: {
    marginBottom: 0,
    fontWeight: "600",
    fontSize: 30,
  },
  text: {
    marginVertical: 10,
    fontWeight: "600",
    fontSize: 16,
    fontWeight: "300",
  },
  exitsView: {
    alignItems: "center",
    width: "100%",
  },
  listCard: {
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: "100%",
    borderColor: "#b0b0b0",
    borderWidth: 1,
  },
});
