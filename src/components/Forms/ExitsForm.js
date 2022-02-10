import React, { useEffect, useState } from "react";
import "react-native-get-random-values";
import { useDispatch } from "react-redux";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Formik } from "formik";
import { addExit, getExits } from "../../redux/slices/exits";
//icons
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Location from "expo-location";

const ExitsForm = (props) => {
  const exit = props.route?.params?.exit?.exit ?? {};
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [position, setPosition] = useState("");

  const handleSubmit = async (values) => {
    await dispatch(addExit(values));
    dispatch(getExits());
    navigation.navigate("MyTabs");
  };

  useEffect(() => {
    getMapUrl();
  }, []);

  const getMapUrl = () => {
    Location.installWebGeolocationPolyfill();
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position),
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
    });
  };

  const scheme = Platform.select({ ios: "maps:0,0?q=", android: "geo:0,0?q=" });
  const latLng = `${position.lat}, ${position.lng}`;
  const label = "Custom Label";
  const url = Platform.select({
    ios: `https://www.google.com/maps/search/?api=1&center=${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });

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
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
            >
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
                placeholder="Coordinates (lat,lng)"
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
              <View style={styles.addPhotoView}>
                <TouchableOpacity onPress={() => Linking.openURL(url)}>
                  <MaterialCommunityIcons
                    color="rgba(255, 255, 255, 0.8)"
                    name="map-marker-multiple"
                    size={40}
                  />
                </TouchableOpacity>
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
            </ScrollView>
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
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
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
