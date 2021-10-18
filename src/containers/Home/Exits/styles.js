import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  root: {},
  pageContent: {
    display: "flex",
    flex: 1,
    paddingHorizontal: "3%",
    paddingTop: "10%",
    paddingBottom: "10%",

    backgroundColor: "lightgrey",
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 100,
  },
  logoView: {
    marginTop: 0,
  },
  title: {
    marginBottom: 0,
    fontWeight: "600",
    fontSize: 30,
  },
  text: {
    marginVertical: 10,
    fontWeight: "600",
    fontSize: 16,
    fontWeight: "300",
  },
  exitsView: {
    alignItems: "center",
    width: "100%",
  },
  listCard: {
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: "100%",
  },
});

export default styles;
