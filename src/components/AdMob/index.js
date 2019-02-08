/** @format */

import React, { PureComponent } from "react";
import { View } from "react-native";
import { AdMobBanner } from "react-native-admob";

import { Config } from "@common";
import styles from "./styles";

export default class AdMob extends PureComponent {
  static defaultProps = {
    adSize: "banner",
  };

  render() {
    const { adSize, style } = this.props;

    if (!Config.showAdmobAds) {
      return <View />
    }

    return (
      <View style={[styles.body, style]}>
        <AdMobBanner
          ref={(component) => (this._root = component)}
          adSize={adSize}
          testDevices={
            __DEV__ ? [AdMobBanner.simulatorId] : [Config.AdMob.deviceID]
          }
          adUnitID={Config.AdMob.banner}
        />
      </View>
    );
  }
}
