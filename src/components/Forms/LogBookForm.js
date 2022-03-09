import React, { useState } from "react";
import { Formik } from "formik";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
// redux
import { useDispatch } from "react-redux";
import { addLogBook, getLogBook } from "../../redux/slices/logBook";
// icons
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// utils
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const LogBookForm = (props) => {
  const jump = props.route?.params?.jump?.jump ?? {};
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [date, setDate] = useState(
    jump?.createdAt?.seconds * 1000 || new Date()
  );
  const [image, setImage] = useState(jump?.photoUrl || null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setFile(result);
    }
  };
  const removeImage = async () => {
    setImage(null);
    setFile(null);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    await dispatch(
      addLogBook({
        ...values,
        file: file,
        photoUrl: jump?.photoUrl || null,
        createdAt: new Date(date),
      })
    );
    dispatch(getLogBook());
    setLoading(false);
    navigation.navigate("MyTabs");
  };

  return (
    <>
      <Formik
        initialValues={{
          jumpNumber: jump?.jumpNumber?.toString() || "",
          exitName: jump?.exitName || "",
          otherDetails: jump?.otherDetails || "",
          createdAt: jump?.createdAt?.seconds || date,
          id: jump?.id || "",
          photoUrl: jump?.photoUrl || "",
        }}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
        }) => (
          <View style={styles.logView}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
            >
              <View>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date(date)}
                  mode="date"
                  display="default"
                  themeVariant="dark"
                  onChange={onChange}
                  style={{
                    height: 40,
                    marginBottom: 10,
                    marginTop: 10,
                  }}
                />
              </View>
              <TextInput
                type="number"
                onChangeText={handleChange("jumpNumber")}
                onBlur={handleBlur("jumpNumber")}
                value={values.jumpNumber}
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

              {!image ? (
                <View style={styles.addPhotoView}>
                  <TouchableOpacity onPress={pickImage}>
                    <MaterialCommunityIcons
                      color="rgba(255, 255, 255, 0.8)"
                      name="image-plus"
                      size={40}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <View>
                    <View>
                      <Image
                        source={{ uri: image }}
                        style={{ width: 100, height: 100, borderRadius: 12 }}
                      />
                    </View>
                    <View style={styles.removeImageIcon}>
                      <TouchableOpacity onPress={removeImage}>
                        <MaterialCommunityIcons
                          color="black"
                          name="close"
                          size={30}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}

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
            </ScrollView>
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
  numberInput: {
    paddingHorizontal: 10,
    width: "66%",
    height: 40,
    color: "rgba(255, 255, 255, 0.95)",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
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
  row: {
    flexDirection: "row",
  },
  addPhotoView: {
    alignSelf: "center",
  },
  addPhotoText: {
    color: "rgba(255, 255, 255, 0.95)",
  },
  removeImageIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
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
    alignItems: "center",
    width: "50%",
  },
});
