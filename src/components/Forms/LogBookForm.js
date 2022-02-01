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

const LogBookForm = (props) => {
  const jump = props.route?.params?.jump?.jump ?? {};
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  const handleSubmit = async (values) => {
    try {
      const user = auth.currentUser;
      const docId = values.id;
      if (values.id !== "") {
        const jumpObj = db
          .collection("users")
          .doc(user.uid)
          .collection("logBook")
          .where("id", "==", docId);
        jumpObj.get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.ref.update({
              ...values,
              jumpNumber: Number(values.jumpNumber),
            });
          });
        }),
          navigation.navigate("LogBook");
      } else if (user) {
        db
          .collection("users")
          .doc(user.uid)
          .collection("logBook")
          .add({
            ...values,
            jumpNumber: Number(values.jumpNumber),
            id: uuid(),
          }),
          navigation.navigate("LogBook");
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
          jumpNumber: jump?.jumpNumber?.toString() || "",
          exitName: jump?.exitName || "",
          otherDetails: jump?.otherDetails || "",
          id: jump?.id || "",
        }}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.logView}>
            <TextInput
              type="number"
              onChangeText={handleChange("jumpNumber")}
              onBlur={handleBlur("jumpNumber")}
              value={values.jumpNumber}
              type="number"
              placeholder="Jump #"
              style={styles.input}
            />

            <TextInput
              onChangeText={handleChange("exitName")}
              onBlur={handleBlur("exitName")}
              value={values.exitName}
              placeholder="Exit Name"
              style={styles.input}
            />
            <TextInput
              onChangeText={handleChange("otherDetails")}
              onBlur={handleBlur("otherDetails")}
              value={values.otherDetails}
              placeholder="Other Details..."
              style={styles.input}
            />
            <View style={styles.buttonView}>
              <View style={styles.deleteButton}>
                <Button
                  style={styles.deleteButton}
                  title="Submit"
                  color="white"
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
export default LogBookForm;

const styles = StyleSheet.create({
  logView: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  input: {
    paddingHorizontal: 10,
    width: "100%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "lightgrey",
    marginBottom: 10,
    marginTop: 10,
  },
  buttonView: {
    paddingHorizontal: 30,
  },
  saveBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 1,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
});
