/** @format */

import React, { PureComponent } from "react";
import { Back, EmptyView } from "./IconNav";

import { Images, Config, Constants, Color, Styles, Languages } from "@common";
import { AddAddress } from "@containers";

export default class AddressScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    //title: Languages.Address,
    headerLeft: Back(navigation),
    headerRight: EmptyView(),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.toolbar,
  });

  render() {
    const { navigation } = this.props;

    return (
      <AddAddress onBack={()=>navigation.goBack()}/>
    );
  }
}
