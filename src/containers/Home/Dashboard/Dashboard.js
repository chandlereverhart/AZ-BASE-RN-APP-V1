import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  FlatList,
  RefreshControl,
  Image,
} from "react-native";
import { StyleSheet } from "react-native";
import { Card } from "react-native-ui-lib";
import { auth, db } from "../../../../Firebase/firebase";
import { useNavigation } from "@react-navigation/core";

// components

const Dashboard = (props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [exits, setExits] = useState([]);

  useEffect(() => {
    setLoading(true);
    _getExits();
    setLoading(false);
  }, []);

  async function handleListRefresh() {
    setRefreshing(true);
    await _getExits();
    setRefreshing(false);
  }

  async function _getExits() {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        const snapshot = await db
          .collection("users")
          .doc(user.uid)
          .collection("exits")
          .orderBy("exitName", "asc")
          .get();
        const response = snapshot.docs.map((doc) => doc.data());
        setExits(response);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const openForm = () => {
    navigation.navigate("ExitsForm");
  };

  const Item = ({ item, index }) => (
    // console.log("ITEM", item),
    <Card
      style={styles.card}
      key={index}
      values={item}
      onPress={() =>
        props.navigation.navigate("ExitDetails", {
          exit: { item },
        })
      }
    >
      <Text style={styles.cardText}>"{item.exitName}"</Text>
    </Card>
  );
  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };

  return (
    <>
      <View style={styles.bottomHalf}>
        <SafeAreaView style={styles.container}>
          <View>
            <Text style={styles.text}>HOME PAGE</Text>
          </View>
          <View style={styles.weatherView}>
            <View>
              <Image
                style={styles.image}
                source={require("../../../assets/card.png")}
              />
            </View>
          </View>
          <View style={styles.cardView}>
            <Card style={styles.card}>
              <Text>NEWS</Text>
              <View style={styles.newsImageView}>
                <Image
                  style={styles.newsImage}
                  source={require("../../../assets/azgame.png")}
                />
              </View>
            </Card>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};
export default Dashboard;

const styles = StyleSheet.create({
  root: {},
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  pageContent: {
    display: "flex",
    flex: 1,
    paddingHorizontal: "10%",
    paddingTop: "10%",
    paddingBottom: "10%",
    backgroundColor: "lightgrey",
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  flatList: {
    width: "100%",
    paddingHorizontal: 16,
  },
  totalView: {
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    marginVertical: 10,
    fontWeight: "500",
    textAlign: "center",
  },
  saveBtn: {
    backgroundColor: "black",
    borderRadius: 5,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomHalf: {
    width: "100%",
    minHeight: "100%",
    alignItems: "center",
    backgroundColor: "white",
    paddingBottom: 70,
  },
  weatherView: {
    marginHorizontal: 60,
    height: 300,
  },
  image: {
    width: 360,
    resizeMode: "contain",
  },
  cardView: {
    paddingHorizontal: 120,
    height: 200,
  },
  card: {
    height: 200,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderColor: "#b0b0b0",
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 20,
  },
  newsImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  cardText: {
    fontSize: 16,
    opacity: 0.9,
  },
});
