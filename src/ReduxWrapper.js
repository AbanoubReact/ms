/**
 * Created by InspireUI on 18/02/2017.
 *
 * @format
 */

import React, { Component } from "react";
import { I18nManager } from "react-native";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/es/integration/react";
import { Provider as PaperProvider } from "react-native-paper";
import OneSignal from "react-native-onesignal";
import { AdMobInterstitial } from "react-native-admob";
import { Languages, Config, Theme } from "@common";
import { getNotification } from "@app/Omni";
import store from "@store/configureStore";
import Router from "./Router";

export default class ReduxWrapper extends Component {
  constructor(props) {
    super(props);

    OneSignal.init(Config.OneSignal.appId);
  }

  componentWillMount() {
    if (Config.showAdmobAds) {
      AdMobInterstitial.setAdUnitID(Config.AdMob.interstitial);
      if (__DEV__) {
        AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
      }
      AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
    } 
  }

  async componentDidMount() {
    const notification = await getNotification();

    if (notification) {
      OneSignal.removeEventListener("opened", this.onOpened);
      OneSignal.addEventListener("received", this.onReceived);
      OneSignal.addEventListener("ids", this.onIds);
    }
    console.disableYellowBox = true;
    // console.ignoredYellowBox = ['Warning: View.propTypes', 'Warning: BackAndroid'];

    const language = store.getState().language;
    // set default Language for App
    Languages.setLanguage(language.lang);

    // Enable for mode RTL
    I18nManager.forceRTL(language.rtl);
  }

  async componentWillUnmount() {
    const notification = await getNotification();

    if (notification) {
      OneSignal.removeEventListener("opened", this.onOpened);
      OneSignal.removeEventListener("received", this.onReceived);
      OneSignal.removeEventListener("ids", this.onIds);
    }
  }

  onReceived = (notification) => {
    console.log("Notification received: ", notification);
  };

  onOpened = (openResult) => {
    console.log("Message: ", openResult.notification.payload.body);
    console.log("Data: ", openResult.notification.payload.additionalData);
    console.log("isActive: ", openResult.notification.isAppInFocus);
    console.log("openResult: ", openResult);
  };

  onIds = (device) => {
    console.log("Device info: ", device);
  };

  render() {
    const persistor = persistStore(store);

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <PaperProvider theme={Config.Theme.isDark ? Theme.dark : Theme.light}>
            <Router />
          </PaperProvider>
        </PersistGate>
      </Provider>
    );
  }
}
