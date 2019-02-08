/** @format */

import { StyleSheet, Platform, Dimensions } from "react-native";
import { Constants } from "@common";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  flatWrap: {
    flex: 1,
    paddingLeft: 0,
    marginTop: 0,
    marginBottom: 15,
  },
  flatlist: {
    flexDirection: "row",
  },
  flatVertical: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#FFF",
  },
  isListing: {
    marginTop: 60,
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
    height,
    paddingTop: 20,
  },
  navbar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 9999,
    backgroundColor: "transparent",
    // borderBottomColor: 'none',
    // borderBottomWidth: 1,
    height: 40,
    justifyContent: "center",
  },
  contentContainer: {
    paddingTop: 40,
  },
  title: {
    color: "#333333",
  },
  row: {
    height: 300,
    width: null,
    marginBottom: 1,
    padding: 16,
    backgroundColor: "transparent",
  },
  rowText: {
    color: "white",
    fontSize: 18,
  },
  transparentTop: {
    backgroundColor: "transparent",
  },
  // RenderHedearListView
  header: {
    flexDirection: "row",
    marginBottom: 12,
    marginTop: 18,
  },
  headerLeft: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 15,
    
  },
  headerRight: {
    flex: 1 / 3,
    justifyContent: "flex-start",
    alignItems: "center",
    marginRight: 0,
    flexDirection: "row",
  },
  headerRightText: {
    fontSize: 11,
    marginRight: 0,
    marginTop: 0,
    color: "#666",
    fontFamily: Constants.fontFamily,
    textAlign: 'left',
    

  },
  icon: {
    marginRight: 8,
    marginTop: 2,
    backgroundColor: "transparent",
  },
  tagHeader: {
    fontSize: 18,
    color: "red",
    // letterSpacing: 2,
    fontFamily: 'OpenSans',
    textAlign:'left',
    alignItems:'center',
    borderBottomColor: '#378bfb',
    borderBottomWidth: 2,
    paddingBottom: 3,
  },

  headerLogo: {
    marginLeft: 20,
    
    ...Platform.select({
      ios: {
        paddingTop: 60 
      },
      android: {
        paddingTop: 60 
      },
    }),
  },
  headerDate: {
    fontSize: 15,
    paddingTop: 5,
    marginBottom: 0,
    fontWeight: '400',
    opacity: 0.8,
    fontFamily: Constants.fontFamily,
  },
  headerStore: {
    color: '#333',
    fontSize: 30,
    marginBottom: 10,
    fontFamily: Constants.fontFamily,
  },
  logo: {
    height: 50,
    width: 120,
    resizeMode: "contain"
  },
});
