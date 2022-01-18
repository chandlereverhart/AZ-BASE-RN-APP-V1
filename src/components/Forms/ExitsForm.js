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

const ExitsForm = (props) => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  const handleSubmit = async (values) => {
    try {
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        db
          .collection("users")
          .doc(user.uid)
          .collection("exits")
          .add({
            ...values,
            id: uuid(),
          }),
          navigation.navigate("Exits");
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
          exitName: "",
          impactHeight: "",
          overallHeight: "",
          coordinates: "",
          description: "",
          id: "",
        }}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.logView}>
            <TextInput
              onChangeText={handleChange("exitName")}
              onBlur={handleBlur("exitName")}
              value={values.exitName}
              placeholder="Exit Name"
              style={styles.input}
            />
            <TextInput
              onChangeText={handleChange("impactHeight")}
              onBlur={handleBlur("impactHeight")}
              value={values.impactHeight}
              placeholder="Height to Impact"
              style={styles.input}
            />
            <TextInput
              onChangeText={handleChange("overallHeight")}
              onBlur={handleBlur("overallHeight")}
              value={values.overallHeight}
              placeholder="Overall Height"
              style={styles.input}
            />
            <TextInput
              onChangeText={handleChange("coordinates")}
              onBlur={handleBlur("coordinates")}
              value={values.coordinates}
              placeholder="Latitude Longitude"
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
          </View>
        )}
      </Formik>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </>
  );
};
export default ExitsForm;

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
