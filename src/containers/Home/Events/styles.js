import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  root: {},
  pageContent: {
    display: "flex",
    flex: 1,
    paddingTop: "10%",
    paddingHorizontal: "5%",

    backgroundColor: "white",
    height: "100%",
    width: "100%",
    alignItems: "center",
  },

  title: {
    fontWeight: "600",
    fontSize: 30,
    opacity: 0.8,
  },
  title2: {
    opacity: 0.8,
    marginTop: 40,
    fontWeight: "600",
    fontSize: 20,
  },
  text: {
    marginVertical: 10,
    fontWeight: "600",
    fontSize: 16,
    fontWeight: "300",
  },
  exitsView: {
    alignItems: "center",
  },
});

export default styles;
