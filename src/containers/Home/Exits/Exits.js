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
  const [exits, setExits] = useState([]);

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.navigate("Login");
    });
  };

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
          <FlatList
            data={exits}
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
              title="Add an Exit"
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
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderWidth: 1,
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
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  card: {
    height: 40,
    minWidth: "100%",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderWidth: 1,
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    opacity: 0.95,
    color: "black",
  },
});
