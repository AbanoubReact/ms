/** @format */

import React, { PureComponent } from "react";
import { Login } from "@containers";
import { Color, Styles } from "@common";
import { Back, EmptyView, Logo } from "./IconNav";

export default class LoginScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: Back(navigation),
    headerRight: EmptyView(),
    headerTitle: Logo(),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.toolbar,
    headerTitleStyle: Styles.Common.headerStyle,
  });

  render() {
    const { navigate, state, goBack } = this.props.navigation;
    const isLogout = state.params ? state.params.isLogout : false;

    return (
      <Login
        statusBar
        navigation={this.props.navigation}
        onBack={goBack}
        isLogout={isLogout}
        onViewSignUp={(user) => navigate("SignUpScreen", user)}
        onViewCartScreen={() => navigate("CartScreen")}
        onViewHomeScreen={() => navigate("Default")}
      />
    );
  }
}
