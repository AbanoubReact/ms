/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Color, Styles } from "@common";
import { Home } from "@containers";
import { Menu, NavBarLogo, HeaderHomeRight } from "./IconNav";

export default class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: NavBarLogo({ navigation }),
    headerLeft: Menu(),
    headerRight: HeaderHomeRight(navigation),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.toolbar,
    headerTitleStyle: Styles.Common.headerStyle,

    // use to fix the border bottom
    headerTransparent: true,
  });

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Home
        onShowAll={(config, index) =>
          navigate("ListAllScreen", { config, index })
        }
        showCategoriesScreen={() => navigate("CategoriesScreen")}
        onViewProductScreen={(item) => {
          this.props.navigation.tabBarVisible = false;
          navigate("DetailScreen", item);
        }}
      />
    );
  }
}
