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
import { useNavigation } from "@react-navigation/core";
import { useSelector, useDispatch } from "../../../redux/store";

import { getExits } from "../../../redux/slices/exits";
import EmptyList from "../../../components/EmptyList/EmptyList";

const Exits = (props) => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const exits = useSelector((state) => state.exits.exitsItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExits());
  }, []);

  async function handleListRefresh() {
    setRefreshing(true);
    await dispatch(getExits());
    setRefreshing(false);
  }

  const openForm = () => {
    navigation.navigate("ExitsForm");
  };

  const Item = ({ item, index }) => (
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
      <Text numberOfLines={1} style={styles.cardText}>
        "{item.exitName}"
      </Text>
    </Card>
  );
  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };

  return (
    <>
      <View style={styles.bottomHalf}>
        <SafeAreaView style={styles.container}>
          {exits.length === 0 ? (
            <EmptyList label={"exits"} />
          ) : (
            <FlatList
              data={exits}
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
          )}
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
    backgroundColor: "rgba(255, 255, 255, 0.8)",
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
  },
  card: {
    flex: 1,
    minWidth: "100%",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.15)",
    borderWidth: 1,
    marginBottom: 5,
  },
  cardText: {
    fontSize: 24,
    opacity: 0.95,
    color: "rgba(255, 255, 255, 0.8)",
  },
});
