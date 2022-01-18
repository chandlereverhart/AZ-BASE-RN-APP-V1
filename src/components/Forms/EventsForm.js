import React from "react";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { auth, db } from "../../../Firebase/firebase";
import { useNavigation } from "@react-navigation/core";
import { Formik } from "formik";

const EventsForm = (props) => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  const handleSubmit = async (values) => {
    try {
      const user = auth.currentUser;
      if (user) {
        db.collection("events").add({
          ...values,
          id: uuid(),
        }),
          navigation.navigate("Events");
      }
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };
  const handleGoBack = () => {
    navigation.navigate("Events");
  };

  return (
    <>
      <Formik
        initialValues={{
          title: "",
          date: "",
          description: "",
          id: "",
        }}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.logView}>
            <TextInput
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              value={values.title}
              placeholder="Event Name"
              style={styles.input}
            />
            <TextInput
              onChangeText={handleChange("date")}
              onBlur={handleBlur("date")}
              type="date"
              value={values.date}
              placeholder="DD/MM/YYYY"
              style={styles.input}
            />
            <TextInput
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
              placeholder="Description"
              style={styles.input}
            />
            <Button
              onPress={handleSubmit}
              title="Submit"
              style={styles.saveBtn}
            />
            <Button
              onPress={handleGoBack}
              title="Go Back"
              style={styles.saveBtn}
            />
          </View>
        )}
      </Formik>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </>
  );
};
export default EventsForm;

const styles = StyleSheet.create({
  logView: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
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
    marginTop: 10,
  },
  saveBtn: {
    backgroundColor: "grey",
    borderRadius: 5,
    width: "50%",
  },
});
