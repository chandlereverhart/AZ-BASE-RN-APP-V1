import React from "react";
import { View, Button, Image } from "react-native";
import { Card } from "react-native-ui-lib";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { StyleSheet } from "react-native";
import { Divider, Text, withTheme } from "react-native-paper";
import { fDate } from "../../../utils/DateFunctions";
//redux

import { deleteLogBook } from "../../../redux/slices/logBook";

const LogBookDetails = (props) => {
  const jump = props.route?.params?.jump?.item ?? {};
  const createdAt = jump?.createdAt ? fDate(jump.createdAt.seconds * 1000) : "";
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const _handleDelete = async () => {
    await dispatch(deleteLogBook(jump));
    navigation.navigate("MyTabs");
  };

  return (
    <>
      <View style={styles.pageContent}>
        <Card style={styles.card}>
          <View style={styles.jumpView}>
            <Text style={styles.jumpText}>#{jump.jumpNumber}</Text>
          </View>
          <View style={styles.detailsView}>
            <View style={styles.dividerView}>
              <Divider>
                <Text>Divider</Text>
              </Divider>
            </View>

            <Text style={styles.totalText}>"{jump.exitName}"</Text>
            <View style={styles.dividerView}>
              <Divider>
                <Text>Divider</Text>
              </Divider>
            </View>

            <Text style={styles.otherText}>{jump.otherDetails}</Text>
            <Text style={styles.otherText}>{createdAt}</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: jump.photoUrl }}
              style={{ width: 200, height: 200 }}
            />
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
              title="Delete Jump"
              color="rgba(255, 255, 255, 0.8)"
              onPress={_handleDelete}
            />
          </View>
          <View style={styles.editButton}>
            <Button
              title="Edit"
              color="black"
              onPress={() =>
                props.navigation.navigate("LogBookForm", {
                  jump: { jump },
                })
              }
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default withTheme(LogBookDetails);

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
  dividerView: {
    width: 200,
  },
  logoView: {
    opacity: 0.1,
    position: "absolute",
    marginTop: 250,
  },

  detailsView: {
    marginTop: 50,
    alignItems: "center",
  },
  jumpText: {
    fontSize: 30,
    fontWeight: "300",
    opacity: 0.5,
  },
  totalText: {
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 5,
    width: "50%",
  },
  deleteButton: {
    borderColor: "rgba(255, 255, 255, 0.8)",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 5,
    width: "50%",
  },
});
