import React, { useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { Card } from "react-native-ui-lib";
import { auth, db } from "../../../../Firebase/firebase";
import { useNavigation } from "@react-navigation/core";

import styles from "./styles";

const LogBook = (props) => {
  useEffect(() => {
    _getLogBook();
  }, []);
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [label, setLabel] = useState([]);
  const [logBook, setLogBook] = useState([]);
  // Redux

  useEffect(() => {}, [tab]);

  useEffect(() => {
    _getLogBook();
  }, []);

  async function _getLogBook() {
    setLoading(true);
    try {
      const response = await db
        .collection("users")
        .where("uid", "==", "rdrz9DnQWwUpg9iXgn0HOBmbSxA2")
        .get();

      console.log("HERE", response);

      setLogBook(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const navigation = useNavigation();

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  const openForm = () => {
    auth.signOut().then(() => {
      navigation.replace("LogBookForm");
    });
  };

  return (
    <>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
      <View style={styles.pageContent}>
        <View style={styles.saveBtn}>
          <Button
            title="Add a Jump"
            color="white"
            accessibilityLabel="Learn more about this purple button"
            onPress={openForm}
          />
        </View>
      </View>

      <View style={styles.bottomHalf}>
        <View style={styles.totalView}>
          <Text style={styles.totalText}>Total Jumps: {}</Text>
        </View>
        <Card style={styles.card}>
          <Text style={styles.cardText}>Jump #{}</Text>
        </Card>
      </View>
    </>
  );
};
export default LogBook;
