import React from "react";
import { View, Button } from "react-native";
import { Card } from "react-native-ui-lib";
import { auth, db } from "../../../../Firebase/firebase";
import { useNavigation } from "@react-navigation/core";
import { StyleSheet } from "react-native";
import { Divider, Text, withTheme } from "react-native-paper";

const ExitDetails = (props) => {
  const { colors } = props.theme;
  const exit = props.route?.params?.exit?.item ?? {};

  const navigation = useNavigation();

  const handleDelete = () => {
    handleDeleteExit();
  };

  const handleDeleteExit = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const exitObj = db
          .collection("users")
          .doc(user.uid)
          .collection("exits")
          .where("id", "==", exit.id);
        exitObj.get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.ref.delete();
          });
        });

        navigation.goBack();
      }
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };
  //   console.log("exit", exit);

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
