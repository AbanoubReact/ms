import React, { StyleSheet, Dimensions } from "react-native";
import { Color, Constants, Styles, Config, Theme } from "@common";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container:{
    paddingVertical: 15,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent:'center',
    width: '100%'
  },
  text:{
    fontSize: 14,
    color: "#2e2e2e"
  },
  selected:{
    backgroundColor: Config.Theme.isDark ? Theme.dark.colors.background : Theme.light.colors.background
  },
  selectedText:{
    fontWeight: 'bold',
    color: Config.Theme.isDark ? Theme.dark.colors.text : Theme.light.colors.text
  }
});
