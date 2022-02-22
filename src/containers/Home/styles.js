import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flex: 1,
    // alignItems: "center",
  },
  header: {
    marginTop: 20,
  },
  pageContent: {
    paddingHorizontal: "5%",
    paddingVertical: "10%",
    backgroundColor: "lightgrey",
    alignItems: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 30,
  },
  text: {
    marginVertical: 20,
    fontWeight: "600",
    fontSize: 16,
    fontWeight: "200",
  },
});

export default styles;
