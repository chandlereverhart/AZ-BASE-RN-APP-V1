import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  root: {},
  pageContent: {
    display: "flex",
    flex: 1,
    paddingHorizontal: "10%",
    paddingTop: "10%",
    paddingBottom: "10%",
    backgroundColor: "lightgrey",
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  text: {
    marginVertical: 10,
    fontWeight: "600",
    fontSize: 16,
    fontWeight: "300",
  },
  logView: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  totalView: {
    marginTop: 50,
    alignItems: "center",
  },
  totalText: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: "600",
    fontWeight: "300",
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
  },
  detailsInput: {
    paddingHorizontal: 10,
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "lightgrey",
    marginBottom: 10,
  },
  saveBtn: {
    backgroundColor: "grey",
    borderRadius: 5,
    width: "50%",
  },
  bottomHalf: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 20,
  },
  card: {
    width: "90%",
    height: 40,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderColor: "#b0b0b0",
    borderWidth: 1,
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    opacity: 0.9,
  },
});

export default styles;
