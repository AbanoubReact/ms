/** @format */

import React, { Component } from "react";
import { Color, Styles } from "@common";
import { News } from "@containers";
import { Menu, Logo, EmptyView } from "./IconNav";

export default class NewsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: Logo(),
    headerLeft: Menu(),
    headerRight: EmptyView(),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.toolbar,
    headerTitleStyle: Styles.Common.headerStyle,
  });

  render() {
    const { navigate } = this.props.navigation;
    return (
      <News onViewNewsScreen={(post) => navigate("NewsDetailScreen", post)} />
    );
  }
}
