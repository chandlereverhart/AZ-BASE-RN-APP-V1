import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

//styles
const EmptyList = ({ label }) => {
  return (
    <View style={styles.pageContent}>
      <Text style={styles.text}>
        Looks like you don't have any {label} logged...
      </Text>
      <Text style={styles.smallText}>
        Click the button below to get started!
      </Text>

      <Image
        style={styles.logo}
        source={require("../../assets/AZBASE-LOGO.png")}
      />
    </View>
  );
};
export default EmptyList;

const styles = StyleSheet.create({
  pageContent: {
    display: "flex",
    flex: 1,
    paddingHorizontal: "10%",
    paddingTop: "10%",
    paddingBottom: "10%",
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  text: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 30,
    marginVertical: 10,
    fontWeight: "600",
    fontWeight: "300",
    textAlign: "center",
  },
  smallText: {
    marginTop: 70,
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 20,
    marginVertical: 10,
    fontWeight: "600",
    fontWeight: "300",
    textAlign: "center",
  },
});
