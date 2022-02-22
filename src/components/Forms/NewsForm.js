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

const NewsForm = (props) => {
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
        db.collection("news").add({
          ...values,
          id: uuid(),
        }),
          navigation.navigate("News");
      }
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
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
              placeholder="Title"
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
            <View style={styles.buttonView}>
              <View style={styles.saveBtn}>
                <Button
                  title="Submit"
                  color="black"
                  accessibilityLabel="Learn more about this purple button"
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </View>
        )}
      </Formik>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </>
  );
};
export default NewsForm;

const styles = StyleSheet.create({
  logView: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 50,
  },
  input: {
    paddingHorizontal: 10,
    width: "100%",
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "lightgrey",
    marginBottom: 10,
    marginTop: 10,
  },
  buttonView: {
    paddingHorizontal: 30,
    paddingVertical: 30,

    alignItems: "center",
  },
  saveBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
});
