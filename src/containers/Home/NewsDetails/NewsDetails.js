import React, { useState, useEffect } from "react";
import { View, Button, Image, ScrollView } from "react-native";
import { Card } from "react-native-ui-lib";
import { auth, db } from "../../../../Firebase/firebase";
import { useNavigation } from "@react-navigation/core";
import { StyleSheet } from "react-native";
import { Divider, Text, withTheme } from "react-native-paper";

const NewsDetails = (props) => {
  const news = props.route?.params?.news?.item ?? {};
  const navigation = useNavigation();
  const [userId, setUserId] = useState(auth.currentUser.uid);
  const [user, setUser] = useState({});
  useEffect(() => {
    _getUsers();
  }, []);

  const handleDelete = () => {
    handleDeletenews();
  };
  async function _getUsers() {
    try {
      const snapShot = await db.collection("users").doc(userId).get();
      const response = snapShot.data();
      setUser(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeletenews = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const newsObj = db.collection("news").where("id", "==", news.id);
        newsObj.get().then(function (querySnapshot) {
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
          <ScrollView>
            <View style={styles.detailsView}>
              <View style={styles.dividerView}>
                <Divider>
                  <Text>Divider</Text>
                </Divider>
              </View>

              <Text style={styles.totalText}>{news.title}</Text>
              <View style={styles.dividerView}>
                <Divider>
                  <Text>Divider</Text>
                </Divider>
              </View>
              <Text style={styles.otherText}>{news.date}</Text>
              <Text style={styles.otherText}>{news.description}</Text>
            </View>
          </ScrollView>
          <View style={styles.logoView}>
            <Image
              style={{ width: 120, height: 150 }}
              source={require("../../../../src/assets/AZBASE-LOGO.png")}
            />
          </View>
        </Card>
        {user?.roles?.superAdmin && (
          <View style={styles.buttonView}>
            <View style={styles.deleteButton}>
              <Button
                title="Delete news"
                color="black"
                accessibilityLabel="Learn more about this purple button"
                onPress={handleDelete}
              />
            </View>
          </View>
        )}
      </View>
    </>
  );
};

export default withTheme(NewsDetails);

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
  detailsView: {
    marginTop: 50,
    alignItems: "center",
  },

  totalText: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: "600",
    fontWeight: "300",
  },
  logoView: {
    opacity: 0.1,
    position: "absolute",
    marginTop: 250,
  },

  otherText: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: "200",
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
    color: "black",
  },
});
