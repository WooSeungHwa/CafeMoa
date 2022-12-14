import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  timeArea: {
    width: 80,
    height: 40,
    justifyContent: "center",
    backgroundColor: "#001D44",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  timeText: {
    fontSize: 18,
    fontWeight: "400",
    color: "white",
  },
  numContainer: {
    width: "100%",
    height: 80,
    backgroundColor: "white",
    flexDirection: "row",
    paddingLeft: 5,
    marginBottom: 10,
  },
  setNumBox: {
    width: 70,
    height: 70,
    margin: 5,
    borderWidth: 1,
    borderColor: "#001D44",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
