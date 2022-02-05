import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Button,
  RefreshControl,
} from "react-native";
import { Card } from "react-native-ui-lib";

import { auth, db } from "../../../../Firebase/firebase";
import { useNavigation } from "@react-navigation/core";
import { fDate } from "../../../utils/DateFunctions";

const LogBook = (props) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [logBook, setLogBook] = useState([]);

  useEffect(() => {
    setLoading(true);
    _getLogBook();
    setLoading(false);
  }, []);

  async function handleListRefresh() {
    setRefreshing(true);
    await _getLogBook();
    setRefreshing(false);
  }

  async function _getLogBook() {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        const snapshot = await db
          .collection("users")
          .doc(user.uid)
          .collection("logBook")
          .orderBy("jumpNumber", "desc")
          .get();
        const response = snapshot.docs.map((doc) => doc.data());
        setLogBook(response);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const navigation = useNavigation();

  const openForm = () => {
    navigation.navigate("LogBookForm");
  };

  const Item = ({ item, index }) => (
    <Card
      style={styles.card}
      key={index}
      values={item}
      onPress={() =>
        props.navigation.navigate("LogBookDetails", {
          jump: { item },
        })
      }
    >
      <View style={styles.cardTextView}>
        <Text style={styles.cardText}>Jump #{item.jumpNumber}</Text>
        <Text style={styles.dateText}>
          {item?.createdAt ? fDate(item.createdAt.seconds * 1000) : ""}
        </Text>
      </View>
    </Card>
  );
  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };

  // console.log("LOGBOOK", logBook);
  return (
    <>
      <View style={styles.bottomHalf}>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={logBook}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.flatList}
            contentContainerStyle={styles.flatlist}
            // onEndReached={handleEndReached}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleListRefresh}
              />
            }
          />
        </SafeAreaView>

        <View style={styles.buttons}>
          <View style={styles.saveBtn}>
            <Button
              title="Add a Jump"
              color="black"
              accessibilityLabel="Learn more about this purple button"
              onPress={openForm}
            />
          </View>
        </View>
      </View>
    </>
  );
};
export default LogBook;

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
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  flatList: {
    width: "100%",
    paddingHorizontal: 16,
  },
  saveBtn: {
    backgroundColor: "rgba(255, 255, 255, .8)",
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
    height: 40,
    minWidth: "100%",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderColor: "rgba(255, 255, 255, 0.15)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    marginBottom: 5,
  },
  cardTextView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  cardText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginHorizontal: 10,
  },
  dateText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginHorizontal: 10,
    justifyContent: "flex-end",
  },
});
