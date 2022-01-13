import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { Card } from "react-native-ui-lib";
import { auth, db } from "../../../../Firebase/firebase";
import { useNavigation } from "@react-navigation/core";

import styles from "./styles";

const LogBook = () => {
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
          // .where("userId", "==", user.uid)
          .get();
        const response = snapshot.docs.map((doc) => doc.data());
        setLogBook(response);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  console.log("LOGBOOK", logBook);

  const navigation = useNavigation();

  const openForm = () => {
    navigation.replace("LogBookForm");
  };

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
        <View style={styles.totalView}>
          <Text style={styles.totalText}>Total Jumps: {logBook.length}</Text>
        </View>
        {logBook.map((option, index) => {
          if (option) {
            return (
              <Card style={styles.card}>
                <Text style={styles.cardText}>Jump #{index + 1}</Text>
                {/* <Text style={styles.cardText}>{option.values.exitName}</Text> */}
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
