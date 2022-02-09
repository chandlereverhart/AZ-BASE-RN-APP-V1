import React from "react";
import "react-native-get-random-values";
import { useDispatch } from "react-redux";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Formik } from "formik";
import { addExit, getExits } from "../../redux/slices/exits";

const ExitsForm = (props) => {
  const exit = props.route?.params?.exit?.exit ?? {};
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    await dispatch(addExit(values));
    dispatch(getExits());
    navigation.navigate("MyTabs");
  };

  return (
    <>
      <Formik
        initialValues={{
          exitName: exit?.exitName || "",
          impactHeight: exit?.impactHeight || "",
          overallHeight: exit?.overallHeight || "",
          coordinates: exit?.coordinates || "",
          description: exit?.description || "",
          id: exit?.id || "",
        }}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.logView}>
            <TextInput
              onChangeText={handleChange("exitName")}
              onBlur={handleBlur("exitName")}
              value={values.exitName}
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              placeholder="Exit Name"
              style={styles.input}
            />
            <TextInput
              onChangeText={handleChange("impactHeight")}
              onBlur={handleBlur("impactHeight")}
              value={values.impactHeight}
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              placeholder="Height to Impact"
              style={styles.input}
            />
            <TextInput
              onChangeText={handleChange("overallHeight")}
              onBlur={handleBlur("overallHeight")}
              value={values.overallHeight}
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              placeholder="Overall Height"
              style={styles.input}
            />
            <TextInput
              onChangeText={handleChange("coordinates")}
              onBlur={handleBlur("coordinates")}
              value={values.coordinates}
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              placeholder="Location"
              style={styles.input}
            />
            <TextInput
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
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
    paddingHorizontal: 10,
    paddingVertical: 50,
  },
  input: {
    paddingHorizontal: 10,
    width: "100%",
    height: 40,
    color: "rgba(255, 255, 255, 0.95)",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
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
