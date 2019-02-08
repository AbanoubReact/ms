/** @format */

import { StyleSheet, Dimensions } from "react-native";
import { Constants } from "@common";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  flatlist: {
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingBottom: 20,
  },
  more: {
    width,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  spinView: {
    width,
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 20,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    overflow: "hidden",
    height: Constants.Window.headerHeight,
  },
});
