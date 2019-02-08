/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Images } from "@common";
import { TabBarIcon } from "@components";
import { MyOrders } from "@containers";

export default class MyOrdersScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "My Orders",
    tabBarIcon: ({ tintColor }) => (
      <TabBarIcon
        orderIcon
        css={{ width: 18, height: 18 }}
        icon={Images.IconOrder}
        tintColor={tintColor}
      />
    ),
  });

  static propTypes = {
    navigation: PropTypes.object,
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <MyOrders
        navigate={this.props.navigation}
        onViewHomeScreen={() => navigate("Default")}
      />
    );
  }
}
