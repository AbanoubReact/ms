/** @format */

import { Dimensions, StyleSheet, I18nManager } from "react-native";
import { Color, Styles, Config, Theme } from "@common";

const { width, height } = Dimensions.get("window");
const isDark = Config.Theme.isDark

export default StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: Color.background,
  },
  logoWrap: {
    ...Styles.Common.ColumnCenter,
    flexGrow: 1,
  },
  logo: {
    width: Styles.width * 0.8,
    height: (Styles.width * 0.8) / 2,
  },
  subContain: {
    paddingHorizontal: Styles.width * 0.1,
    paddingBottom: 50,
  },
  loginForm: {},
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: Color.blackDivide,
    borderBottomWidth: 1,
  },
  input: {
    color: isDark ? Theme.dark.colors.text : Theme.light.colors.text,
    borderColor: "#9B9B9B",
    height: 40,
    marginTop: 10,
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingTop: 0,
    paddingBottom: 8,
    flex: 1,
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: Color.primary,
    borderRadius: 5,
    elevation: 1,
  },
  separatorWrap: {
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  separator: {
    borderBottomWidth: 1,
    flexGrow: 1,
    borderColor: Color.blackTextDisable,
  },
  separatorText: {
    color: Color.blackTextDisable,
    paddingHorizontal: 10,
  },
  fbButton: {
    backgroundColor: Color.login.facebook,
    borderRadius: 5,
    elevation: 1,
  },
  // ggButton: {
  //     marginVertical: 10,
  //     backgroundColor: Color.google,
  //     borderRadius: 5,
  // },
  signUp: {
    color: Color.blackTextSecondary,
    marginTop: 20,
  },
  highlight: {
    fontWeight: "bold",
    color: Color.primary,
  },
  overlayLoading: {
    ...StyleSheet.absoluteFillObject,
    width,
    height,
  },
});
