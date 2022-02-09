import React from "react";
import { View, Button, Image } from "react-native";
import { Card } from "react-native-ui-lib";
import { useDispatch } from "react-redux";

import { auth, db } from "../../../../Firebase/firebase";
import { useNavigation } from "@react-navigation/core";
import { StyleSheet } from "react-native";
import { Divider, Text, withTheme } from "react-native-paper";
import { deleteExit } from "../../../redux/slices/exits";

const ExitDetails = (props) => {
  const exit = props.route?.params?.exit?.item ?? {};

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deleteExit(exit));
    navigation.navigate("MyTabs");
  };

  return (
    <>
      <View style={styles.pageContent}>
        <Card style={styles.card}>
          <View style={styles.detailsView}>
            <View style={styles.dividerView}>
              <Divider>
                <Text>Divider</Text>
              </Divider>
            </View>

            <Text style={styles.titleText}>"{exit.exitName}"</Text>
            <View style={styles.dividerView}>
              <Divider>
                <Text>Divider</Text>
              </Divider>
            </View>
            <Text style={styles.otherText}>{exit.impactHeight} to impact</Text>
            <Text style={styles.otherText}>{exit.overallHeight} overall</Text>
            <Text style={styles.otherText}>{exit.coordinates}</Text>
            <Text style={styles.otherText}>{exit.description}</Text>
          </View>
          <View style={styles.logoView}>
            <Image
              style={{ width: 120, height: 150 }}
              source={require("../../../../src/assets/AZBASE-LOGO.png")}
            />
          </View>
        </Card>
        <View style={styles.buttonView}>
          <View style={styles.deleteButton}>
            <Button
              title="Delete Exit"
              color="black"
              accessibilityLabel="Learn more about this purple button"
              onPress={handleDelete}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default withTheme(ExitDetails);

const styles = StyleSheet.create({
  pageContent: {
    display: "flex",
    flex: 1,
    paddingHorizontal: "10%",
    width: "100%",
    height: "100%",
    alignItems: "center",
    paddingTop: "10%",
    paddingBottom: "10%",
  },
  dividerView: {
    width: 200,
  },
  detailsView: {
    marginTop: 50,
    alignItems: "center",
  },
  logoView: {
    opacity: 0.1,
    position: "absolute",
    marginTop: 250,
  },

  titleText: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: "600",
    fontWeight: "300",
    opacity: 0.8,
  },
  otherText: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: "200",
    opacity: 0.8,
  },
  buttonView: {
    paddingVertical: 30,
  },
  deleteButton: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 5,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    paddingTop: "10%",
    paddingBottom: "10%",
    paddingHorizontal: "10%",
  },
});
