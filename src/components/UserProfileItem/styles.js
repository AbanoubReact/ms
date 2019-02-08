/** @format */

import { StyleSheet, Platform, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { Color, Config, Constants, Device, Styles, Theme } from "@common";
const isDark = Config.Theme.isDark

export default StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: isDark ? "#101425" : "#F5F5F5",
    paddingHorizontal: 20,
    height: 60,
  },
  leftText: {
    fontSize: 16,
    color: "#9B9B9B",
  },
  rightText: {
    fontSize: 16,
    color: isDark ? Theme.dark.colors.text : Theme.light.colors.text,
    fontWeight: "300",
    alignSelf: "flex-start",
  },
  rightContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
});
