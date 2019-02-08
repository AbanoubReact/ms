/**
 * Created by InspireUI on 19/02/2017.
 *
 * @format
 */

import React from "react";
import PropTypes from "prop-types";
import { View, StatusBar, NetInfo } from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import { WooWorker } from "api-ecommerce";
import { AppConfig, Config, Device, Styles, withTheme, log } from "@common";
import { MyToast, MyNetInfo } from "@containers";
import { AppIntro, ModalReview } from "@components";
import Navigation from "@navigation";
import { connect } from "react-redux";

// import MenuSide from "@components/LeftMenu/MenuOverlay";
import MenuSide from "@components/LeftMenu/MenuScale";
// import MenuSide from '@components/LeftMenu/MenuSmall';
// import MenuSide from '@components/LeftMenu/MenuWide';

import { toast, closeDrawer } from "./Omni";

class Router extends React.PureComponent {
  state = {
    loading: true,
  };

  static propTypes = {
    introStatus: PropTypes.bool,
  };

  componentWillMount() {
    // init wooworker
    WooWorker.init({
      url: AppConfig.WooCommerce.url,
      consumerKey: AppConfig.WooCommerce.consumerKey,
      consumerSecret: AppConfig.WooCommerce.consumerSecret,
      wp_api: true,
      version: "wc/v2",
      queryStringAuth: true,
      language: this.props.language.lang,
    });

    NetInfo.getConnectionInfo().then((connectionInfo) => {
      this.props.updateConnectionStatus(connectionInfo.type != "none");
      this.setState({ loading: false });
    });
  }

  goToScreen = (routeName, params) => {
    if (!this.navigator) {
      return toast("Cannot navigate");
    }

    if (routeName === "CustomPage") {
      // reset when current route also "CustomPage" such as About Us and Contact Us
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName, params })],
      });
      this.navigator.dispatch(resetAction);
    } else {
      const navigateAction = NavigationActions.navigate({
        routeName,
        params,
      });
      this.navigator.dispatch(navigateAction);
    }
    closeDrawer();
  };

  render() {
    const {
      theme: {
        colors: { background },
      },
    } = this.props;

    if (!this.props.introStatus) {
      return <AppIntro />;
    }

    if (this.state.loading) {
      return <View />;
    }

    return (
      <MenuSide
        goToScreen={this.goToScreen}
        routes={
          <View style={[Styles.app, { backgroundColor: background }]}>
            <StatusBar
              barStyle={Config.Theme.isDark ? "light-content" : "dark-content"}
              animated
              hidden={Device.isIphoneX ? false : !Config.showStatusBar}
            />
            <MyToast />
            <Navigation ref={(comp) => (this.navigator = comp)} />
            <ModalReview />
            <MyNetInfo />
          </View>
        }
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("@redux/NetInfoRedux");

  return {
    updateConnectionStatus: (isConnected) =>
      dispatch(actions.updateConnectionStatus(isConnected)),
  };
};

const mapStateToProps = (state) => ({
  introStatus: state.user.finishIntro,
  userInfo: state.user.user,
  language: state.language,
  netInfo: state.netInfo,
});
export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Router)
);
