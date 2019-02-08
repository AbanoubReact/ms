/** @format */

import { StyleSheet, Platform, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { Color, Config, Constants, Device, Theme } from "@common";
const isDark = Config.Theme.isDark

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    borderTopWidth: 10,
    borderColor: isDark ? "#101425" : "#F5F5F5",
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 13,
    color: "#4A4A4A",
    fontWeight: "600",
  },
});
