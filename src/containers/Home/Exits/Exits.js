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

const Exits = (props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [logBook, setLogBook] = useState([]);

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

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
          .collection("exits")
          .orderBy("exitName", "asc")
          .get();
        const response = snapshot.docs.map((doc) => doc.data());
        setLogBook(response);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const openForm = () => {
    navigation.replace("ExitsForm");
  };
  const handleGoBack = () => {
    navigation.replace("MyTabs");
  };
  const Item = ({ item, index }) => (
    console.log("ITEM", item),
    (
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
    )
  );
  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };

  const EXIT_OPTIONS = [
    { name: "Camelback", icon: "", label: "camelback" },
    { name: "Saguaro", icon: "", label: "saguaro" },
    { name: "Superbowl", icon: "", label: "superbowl" },
    { name: "SuperChicken", icon: "", label: "superChicken" },
    { name: "The North Exit", icon: "", label: "northExit" },
  ];

  return (
    <>
      <View style={styles.bottomHalf}>
        <Button
          title="Go Back"
          accessibilityLabel="Learn more about this purple button"
          onPress={handleGoBack}
        />
        <View style={styles.totalView}>
          <Text style={styles.totalText}>Total Jumps: {logBook.length}</Text>
        </View>
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
              color="white"
              accessibilityLabel="Learn more about this purple button"
              onPress={openForm}
            />
          </View>
        </View>
      </View>
    </>
  );
};
export default Exits;

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
  totalText: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: "600",
    fontWeight: "300",
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
  card: {
    height: 40,
    minWidth: "100%",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderColor: "#b0b0b0",
    borderWidth: 1,
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    opacity: 0.9,
  },
});
