import React from "react";
import { View, Button, Image } from "react-native";
import { Card } from "react-native-ui-lib";
import { auth, db } from "../../../../Firebase/firebase";
import { useNavigation } from "@react-navigation/core";
import { StyleSheet } from "react-native";
import { Divider, Text, withTheme } from "react-native-paper";

const LogBookDetails = (props) => {
  const jump = props.route?.params?.jump?.item ?? {};

  const navigation = useNavigation();

  const handleDelete = () => {
    _handleDelete();
  };

  const _handleDelete = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const jumpObj = db
          .collection("users")
          .doc(user.uid)
          .collection("logBook")
          .where("id", "==", jump.id);
        jumpObj.get().then(function (querySnapshot) {
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
            <Button title="Delete Jump" color="white" onPress={handleDelete} />
          </View>
          <View style={styles.editButton}>
            <Button
              title="Edit "
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
    backgroundColor: "rgba(255, 255, 255, 0.2)",
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
    marginTop: 50,
    opacity: 0.2,
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
  },
  otherText: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: "200",
  },
  buttonView: {
    paddingVertical: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 5,
    width: "50%",
  },
  deleteButton: {
    borderColor: "rgba(255, 255, 255, 0.95)",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 5,
    width: "50%",
  },
});
