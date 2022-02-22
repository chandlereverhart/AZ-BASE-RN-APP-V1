import React from "react";
import { View, Image, TouchableOpacity, Linking } from "react-native";
import { Card } from "react-native-ui-lib";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
// utils
import { fDate } from "../../utils/DateFunctions";
// redux
import { useSelector } from "../../redux/store";
// navigation
import { useNavigation } from "@react-navigation/core";

const LastExitCard = () => {
  const exits = useSelector((state) => state.exits.exitsItems);
  const exit = exits[0];
  const navigation = useNavigation();

  // maps url
  const scheme = Platform.select({ ios: "maps:0,0?q=", android: "geo:0,0?q=" });
  const latLng = exit ? `${exit.coordinates}` : "";
  const label = "Custom Label";
  const url = Platform.select({
    ios: `https://www.google.com/maps/search/?api=1&query=${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });

  return (
    <>
      {exit && (
        <Card style={styles.card} onPress={() => navigation.navigate("Exits")}>
          <Text style={styles.text}>Latest Exit</Text>

          <View style={styles.headerView}>
            {exit.photoUrl !== "" ? (
              <View>
                <Image
                  source={{ uri: exit.photoUrl }}
                  style={{ width: 75, height: 75, borderRadius: 12 }}
                />
              </View>
            ) : (
              <View style={styles.logoView}>
                <Image
                  style={{ width: 64, height: 75, opacity: 0.8 }}
                  source={require("../../../src/assets/AZBASE-LOGO.png")}
                />
              </View>
            )}

            <View>
              <Text numberOfLines={3} style={styles.exitNameText}>
                "{exit.exitName}"
              </Text>
              <TouchableOpacity onPress={() => Linking.openURL(url)}>
                <Text style={styles.numberText}>{exit.coordinates}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      )}
    </>
  );
};

export default LastExitCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 24,
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "center",
  },
  dateText: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "center",
  },
  headerView: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  numberText: {
    marginTop: 20,
    fontSize: 12,
    fontWeight: "300",
    opacity: 0.5,
  },
  exitNameText: {
    fontSize: 20,
    fontWeight: "600",
    fontWeight: "300",
    opacity: 0.8,
  },

  otherText: {
    fontSize: 18,
    fontWeight: "200",
    opacity: 0.8,
  },
});
