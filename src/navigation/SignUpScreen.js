/** @format */

import React, { Component } from "react";
import { SignUp } from "@containers";
import { Color, Languages, Styles } from "@common";
import { Back, EmptyView } from "./IconNav";

export default class SignUpScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: Languages.signup,
    headerLeft: Back(navigation),
    headerRight: EmptyView(),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.toolbar,
    headerTitleStyle: Styles.Common.headerTitleStyle,
  });

  render() {
    const { state, navigate } = this.props.navigation;
    return <SignUp params={state.params} onBackCart={() => navigate("Cart")} />;
  }
}
