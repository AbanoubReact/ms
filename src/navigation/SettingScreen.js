/** @format */

import React, { Component } from "react";

import { Back } from "./IconNav";
import { Languages, Color, Styles} from "@common";
import { Setting } from "@containers";

export default class SettingScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: Languages.Settings,
    headerLeft: Back(navigation),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.toolbar,
    headerTitleStyle: Styles.Common.headerStyle,
  });
  render() {
    return <Setting />;
  }
}
