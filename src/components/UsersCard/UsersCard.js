import React, { useState, useEffect } from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "../../redux/store";
import { getLogBook } from "../../redux/slices/logBook";
import { getExits } from "../../redux/slices/exits";
import { useNavigation } from "@react-navigation/core";

const UsersCard = ({}) => {
  const logBook = useSelector((state) => state.logBook.logBookItems);
  //   console.log("USERS CARD", logBook);
  const exits = useSelector((state) => state.exits.exitsItems);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getExits());
    dispatch(getLogBook());
  }, []);

  return (
    <View style={styles.weatherContainer}>
      <Card style={styles.usersCard}>
        <Text style={styles.text}>You've Logged</Text>
        <View style={styles.body}>
          <TouchableOpacity
            style={styles.column}
            onPress={() => {
              navigation.navigate("LogBook");
            }}
          >
            <Text style={styles.numberText}>{logBook.length}</Text>
            <Text style={styles.subtitle}>Jumps</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.column}
            onPress={() => {
              navigation.navigate("Exits");
            }}
          >
            <Text style={styles.numberText}>{exits.length}</Text>
            <Text style={styles.subtitle}>Exits</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
};

export default UsersCard;

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
  },
  usersCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  body: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 50,
  },
  text: {
    fontSize: 24,
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "center",
  },
  numberText: {
    fontSize: 32,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.4)",
    textAlign: "center",
  },
});
