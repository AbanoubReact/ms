/** @format */

import React, { PureComponent } from "react";
import { Menu, Back, EmptyView } from "./IconNav";

import { Images, Config, Constants, Color, Styles, Languages } from "@common";
import { Filters } from "@containers";

export default class FiltersScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: Back(navigation, Images.icons.backs),
    headerStyle: Styles.Common.toolbarFloat,
    headerTransparent: true
  });

  render() {
    const { navigation } = this.props;

    return (
      <Filters navigation={navigation} onBack={() => navigation.goBack()}/>
    );
  }
}
