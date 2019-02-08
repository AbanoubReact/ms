/** @format */

import React, { PureComponent } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import { Color, Styles } from "@common";
import { CustomPage } from "@containers";
import { Menu, NavBarLogo } from "./IconNav";

export default class CustomPageScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: NavBarLogo({ navigation }),
    headerLeft: Menu(),
    // headerRight: HeaderHomeRight(navigation),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.toolbar,
    headerTitleStyle: Styles.Common.headerStyle,

    // use to fix the border bottom
    headerTransparent: true,
  });

  render() {
    const { state } = this.props.navigation;
    if (typeof state.params === "undefined") {
      return <View />;
    }

    if (typeof state.params.url !== "undefined") {
      return (
        <View style={{ flex: 1 }}>
          {/* <AnimatedHeader /> */}
          <WebView startInLoadingState source={{ uri: state.params.url }} />
        </View>
      );
    }

    return (
      <View>
        {/* <AnimatedHeader /> */}
        <CustomPage id={state.params.id} />
      </View>
    );
  }
}
