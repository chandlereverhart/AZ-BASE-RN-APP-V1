import React from "react";
import { View, Image } from "react-native";
import { Card } from "react-native-ui-lib";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { fDate } from "../../utils/DateFunctions";
import { useSelector } from "../../redux/store";
import { useNavigation } from "@react-navigation/core";
//redux
const LastJumpCard = () => {
  const logBook = useSelector((state) => state.logBook.logBookItems);
  const jump = logBook[1];
  const navigation = useNavigation();

  return (
    <>
      {jump && (
        <Card
          style={styles.card}
          onPress={() =>
            navigation.navigate("LogBookDetails", {
              jump: jump,
            })
          }
        >
          <Text style={styles.text}>Last Jump</Text>

          <View style={styles.headerView}>
            {jump.photoUrl !== "" ? (
              <View>
                <Image
                  source={{ uri: jump.photoUrl }}
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
                "{jump.exitName}"
              </Text>
              <Text style={styles.dateText}>
                {fDate(jump.createdAt.seconds * 1000)}
              </Text>
              <Text style={styles.numberText}>#{jump.jumpNumber}</Text>
            </View>
          </View>
        </Card>
      )}
    </>
  );
};

export default LastJumpCard;

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
    textAlign: "left",
  },
  headerView: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  numberText: {
    fontSize: 30,
    fontWeight: "300",
    opacity: 0.5,
    textAlign: "left",
  },
  exitNameText: {
    fontSize: 20,
    fontWeight: "600",
    fontWeight: "300",
    opacity: 0.8,
    textAlign: "center",
  },

  otherText: {
    fontSize: 18,
    fontWeight: "200",
    opacity: 0.8,
  },
});
