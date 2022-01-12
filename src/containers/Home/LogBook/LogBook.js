import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-ui-lib";
import { auth } from "../../../../Firebase/firebase";
import { useNavigation } from "@react-navigation/core";

import styles from "./styles";

const LogBook = (props) => {
  const [jumpNumber, setJumpNumber] = useState("");
  const [exitNumber, setExitNumber] = useState("");
  const [exitName, setExitName] = useState("");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");

  const handleChange = (value) => {};
  const handleSave = (values) => {
    alert("Your Jump has been logged!");
  };
  const navigation = useNavigation();
  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  return (
    <>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
      <View style={styles.pageContent}>
        <View style={styles.logView}>
          <TextInput
            style={styles.input}
            value={jumpNumber}
            placeholder="Jump #"
            label="Jump #"
            onChange={(value) => {
              setJumpNumber(value);
            }}
          />
          <TextInput
            style={styles.input}
            value={exitNumber}
            placeholder="Exit #"
            onChange={(value) => {
              setExitNumber(value);
            }}
          />
          <TextInput
            style={styles.input}
            value={exitName}
            placeholder="Exit Name"
            onChange={(value) => {
              setExitName(value);
            }}
          />
          <TextInput
            style={styles.input}
            value={location}
            placeholder="Location"
            onChange={(value) => {
              setLocation(value);
            }}
          />
          <TextInput
            style={styles.detailsInput}
            value={details}
            placeholder="Other Details..."
            onChange={(value) => {
              setDetails(value);
            }}
          />
        </View>
        <View style={styles.saveBtn}>
          <Button
            title="Log Jump"
            color="white"
            accessibilityLabel="Learn more about this purple button"
            onPress={handleSave}
          />
        </View>
      </View>

      <View style={styles.bottomHalf}>
        <View style={styles.totalView}>
          <Text style={styles.totalText}>Total Jumps: 100</Text>
        </View>
        <Card style={styles.card}>
          <Text style={styles.cardText}>Jump #100</Text>
        </Card>
        <Card style={styles.card}>
          <Text style={styles.cardText}>Jump #99</Text>
        </Card>
        <Card style={styles.card}>
          <Text style={styles.cardText}>Jump #98</Text>
        </Card>
        <Card style={styles.card}>
          <Text style={styles.cardText}>Jump #97</Text>
        </Card>
      </View>
    </>
  );
};
export default LogBook;
