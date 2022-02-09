import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { addLogBook, getLogBook } from "../../redux/slices/logBook";

import * as ImagePicker from "expo-image-picker";

const LogBookForm = (props) => {
  const jump = props.route?.params?.jump?.jump ?? {};
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setFile(result);
    }
  };

  const handleSubmit = async (values) => {
    await dispatch(addLogBook({ ...values, photoUrl: file }));
    dispatch(getLogBook());
    navigation.navigate("MyTabs");
  };

  return (
    <>
      <Formik
        initialValues={{
          jumpNumber: jump?.jumpNumber?.toString() || "",
          exitName: jump?.exitName || "",
          otherDetails: jump?.otherDetails || "",
          createdAt: jump?.createdAt || new Date(),
          id: jump?.id || "",
          photoUrl: jump?.photoUrl || file,
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
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              placeholder="Jump #"
              style={styles.input}
            />
            <TextInput
              onChangeText={handleChange("exitName")}
              onBlur={handleBlur("exitName")}
              value={values.exitName}
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              placeholder="Exit Name"
              style={styles.input}
            />
            <TextInput
              onChangeText={handleChange("otherDetails")}
              onBlur={handleBlur("otherDetails")}
              value={values.otherDetails}
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              placeholder="Other Details..."
              style={styles.input}
            />
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                title="Pick an image from camera roll"
                onPress={pickImage}
              />
              <TouchableOpacity onPress={pickImage}></TouchableOpacity>
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            </View>
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
export default LogBookForm;

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
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 5,
    borderWidth: 1,
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
