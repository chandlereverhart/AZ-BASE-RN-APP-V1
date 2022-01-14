import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { Card } from "react-native-ui-lib";
import { auth, db } from "../../../../Firebase/firebase";
import { useNavigation } from "@react-navigation/core";

import { StyleSheet } from "react-native";

const LogBook = (props) => {
  const [loading, setLoading] = useState(true);
  const [logBook, setLogBook] = useState([]);

  useEffect(() => {
    _getLogBook();
  }, []);

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
    navigation.replace("LogBookForm");
  };
  const handleGoBack = () => {
    navigation.replace("MyTabs");
  };

  console.log("LOGBOOK", logBook);
  return (
    <>
      <View style={styles.bottomHalf}>
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
        <Button
          title="Go Back"
          accessibilityLabel="Learn more about this purple button"
          onPress={handleGoBack}
        />
        <View style={styles.totalView}>
          <Text style={styles.totalText}>Total Jumps: {logBook.length}</Text>
        </View>
        {logBook.map((option, index) => {
          if (option) {
            return (
              <Card
                style={styles.card}
                key={index}
                values={option}
                onPress={() =>
                  props.navigation.navigate("LogBookDetails", {
                    option,
                  })
                }
              >
                <Text style={styles.cardText}>Jump #{option.jumpNumber}</Text>
              </Card>
            );
          }
          return null;
        })}
      </View>
    </>
  );
};
export default LogBook;

const styles = StyleSheet.create({
  root: {},
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
  text: {
    marginVertical: 10,
    fontWeight: "600",
    fontSize: 16,
    fontWeight: "300",
  },
  logView: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  totalView: {
    marginTop: 50,
    alignItems: "center",
  },
  totalText: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: "600",
    fontWeight: "300",
  },
  input: {
    paddingHorizontal: 10,
    width: "100%",
    height: 30,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "lightgrey",
    marginBottom: 10,
  },
  detailsInput: {
    paddingHorizontal: 10,
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "lightgrey",
    marginBottom: 10,
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
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 20,
  },
  card: {
    width: "90%",
    height: 40,
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
