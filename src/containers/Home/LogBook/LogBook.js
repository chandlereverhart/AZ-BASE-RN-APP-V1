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
import { useNavigation } from "@react-navigation/core";
import { fDate } from "../../../utils/DateFunctions";
import { useSelector, useDispatch } from "../../../redux/store";
import { getLogBook } from "../../../redux/slices/logBook";
import EmptyList from "../../../components/EmptyList/EmptyList";

const LogBook = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const logBook = useSelector((state) => state.logBook.logBookItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLogBook());
  }, [dispatch]);

  function handleListRefresh() {
    setRefreshing(true);
    dispatch(getLogBook());
    setRefreshing(false);
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
        <View style={styles.numberView}>
          <Text style={styles.numberText}>#{item.jumpNumber}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.nameText}>"{item.exitName}"</Text>
          <Text style={styles.dateText}>
            {item?.createdAt ? fDate(item.createdAt.seconds * 1000) : ""}
          </Text>
        </View>
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
          {logBook.length === 0 ? (
            <EmptyList label={"jumps"} />
          ) : (
            <FlatList
              data={logBook}
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
    flex: 1,
    justifyContent: "space-between",
    minWidth: "100%",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderColor: "rgba(255, 255, 255, 0.15)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    marginBottom: 3,
  },
  numberView: {
    width: "25%",
    alignSelf: "center",
  },
  column: {
    flexDirection: "column",
  },
  cardTextView: {
    flexDirection: "row",
    marginLeft: 10,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.8)",
  },
  nameText: {
    fontSize: 24,
    color: "rgba(255, 255, 255, 0.8)",
  },
  numberText: {
    fontSize: 24,
    color: "rgba(255, 255, 255, 0.8)",
    marginRight: 20,
    alignSelf: "center",
  },

  icon: {
    fontSize: 24,
    color: "rgba(255, 255, 255, 0.8)",
  },
});
