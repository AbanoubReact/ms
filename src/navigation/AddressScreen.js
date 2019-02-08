/** @format */

import React, { PureComponent } from "react";
import { Back, RightIcon } from "./IconNav";

import { Images, Config, Constants, Color, Styles, Languages } from "@common";
import { Address } from "@containers";

export default class AddressScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    //title: Languages.Address,
    headerLeft: Back(navigation),
    headerRight: RightIcon(Images.IconAdd, ()=>navigation.navigate("AddAddress")),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.toolbar,
  });

  render() {
    const { navigation } = this.props;

    return (
      <Address />
    );
  }
}
