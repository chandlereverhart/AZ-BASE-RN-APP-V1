import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from "react-native";
import { StyleSheet } from "react-native";
import { Card } from "react-native-ui-lib";
import { auth, db } from "../../../../Firebase/firebase";
import { useNavigation } from "@react-navigation/core";

const News = (props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [news, setNews] = useState([]);
  const [userId, setUserId] = useState(auth.currentUser.uid);
  const [user, setUser] = useState({});

  useEffect(() => {
    setLoading(true);
    _getNews();
    setLoading(false);
  }, []);

  useEffect(() => {
    _getUsers();
  }, []);

  async function handleListRefresh() {
    setRefreshing(true);
    await _getNews();
    setRefreshing(false);
  }

  async function _getNews() {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        const snapshot = await db
          .collection("news")
          .orderBy("date", "asc")
          .get();
        const response = snapshot.docs.map((doc) => doc.data());
        setNews(response);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  async function _getUsers() {
    setLoading(true);
    try {
      const snapShot = await db.collection("users").doc(userId).get();
      const response = snapShot.data();
      setUser(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const openForm = () => {
    navigation.navigate("NewsForm");
  };

  const Item = ({ item, index }) => (
    <Card
      style={styles.card}
      key={index}
      values={item}
      onPress={() =>
        props.navigation.navigate("NewsDetails", {
          news: { item },
        })
      }
    >
      <View style={styles.cardTextView}>
        <Text style={styles.cardTextGrey}>{item.date}</Text>
        <Text style={styles.cardText}>{item.title}</Text>
      </View>
    </Card>
  );
  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };

  return (
    <>
      <View style={styles.bottomHalf}>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={news}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.flatList}
            contentContainerStyle={styles.flatlist}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleListRefresh}
              />
            }
          />
        </SafeAreaView>
        {user?.roles?.superAdmin && (
          <View style={styles.buttons}>
            <View style={styles.saveBtn}>
              <Button
                title="Add News Item"
                color="black"
                accessibilityLabel="Learn more about this purple button"
                onPress={openForm}
              />
            </View>
          </View>
        )}
      </View>
    </>
  );
};
export default News;

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
    // backgroundColor: "lightgrey",
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
  totalText: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: "600",
    fontWeight: "300",
  },
  saveBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
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
    paddingBottom: 70,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    height: 60,
    minWidth: "100%",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    borderColor: "rgba(255, 255, 255, 0.15)",
    borderWidth: 1,
    marginBottom: 5,
  },
  cardTextView: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardText: {
    fontSize: 24,
    marginHorizontal: 8,
    color: "rgba(255, 255, 255, 0.8)",
  },
  cardTextGrey: {
    fontSize: 16,
    marginHorizontal: 8,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
  },
});
