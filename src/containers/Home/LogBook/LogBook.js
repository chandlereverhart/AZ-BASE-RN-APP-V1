import React, { useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { Card } from "react-native-ui-lib";
import { auth, db } from "../../../../Firebase/firebase";
import { useNavigation } from "@react-navigation/core";

import styles from "./styles";

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

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  const openForm = () => {
    navigation.replace("LogBookForm");
  };

  return (
    <>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
      <View style={styles.saveBtn}>
        <Button
          title="Add a Jump"
          color="white"
          accessibilityLabel="Learn more about this purple button"
          onPress={openForm}
        />
      </View>

      <View style={styles.bottomHalf}>
        <View style={styles.totalView}>
          <Text style={styles.totalText}>Total Jumps: {logBook.length}</Text>
        </View>
        {logBook.map((option, index) => {
          if (option) {
            return (
              <Card style={styles.card}>
                <Text style={styles.cardText}>Jump #{index + 1}</Text>
                {/* <Text style={styles.cardText}>{option.values.exitName}</Text> */}
                {/* <Text style={styles.cardText}>{option.values.exitNumber}</Text> */}
                {/* <Text style={styles.cardText}>
                  {option.values.otherDetails}
                </Text> */}
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
