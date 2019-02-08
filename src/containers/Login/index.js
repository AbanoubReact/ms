/**
 * Created by InspireUI on 19/02/2017.
 *
 * @format
 */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Icons, Color, Languages, Styles, Config, withTheme, Theme } from "@common";
import { Icon, toast, warn, FacebookAPI } from "@app/Omni";
import { Spinner, ButtonIndex } from "@components";
import { WooWorker } from "api-ecommerce";
import WPUserAPI from "@services/WPUserAPI";
import styles from "./styles";
const isDark = Config.Theme.isDark

class LoginScreen extends PureComponent {
  static propTypes = {
    user: PropTypes.object,
    isLogout: PropTypes.bool,
    onViewCartScreen: PropTypes.func,
    onViewHomeScreen: PropTypes.func,
    onViewSignUp: PropTypes.func,
    logout: PropTypes.func,
    navigation: PropTypes.object,
    onBack: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLoading: false,
      logInFB: false,
    };

    this.onUsernameEditHandle = (username) => this.setState({ username });
    this.onPasswordEditHandle = (password) => this.setState({ password });

    this.focusPassword = () => this.password && this.password.focus();
  }

  componentDidMount() {
    const { user, isLogout } = this.props;

    // check case after logout
    if (user && isLogout) {
      this._handleLogout();
    }
  }

  // handle the logout screen and navigate to cart page if the new user login object exist
  componentWillReceiveProps(nextProps) {
    const { onViewCartScreen, user: oldUser, onViewHomeScreen } = this.props;

    const { user } = nextProps.user;
    const { params } = nextProps.navigation.state;

    // check case after logout
    if (user) {
      if (nextProps.isLogout) {
        this._handleLogout();
      } else if (!oldUser.user) {
        // check case after login
        this.setState({ isLoading: false });

        if (params && typeof params.onCart !== "undefined") {
          onViewCartScreen();
        } else {
          onViewHomeScreen();
        }

        const uName =
          user.last_name != null || user.first_name != null
            ? `${user.first_name} ${user.last_name}`
            : user.name;
        toast(`${Languages.welcomeBack} ${uName}.`);
        this.props.initAddresses(user)
      }
    }
  }

  _handleLogout = () => {
    const { logout, onViewHomeScreen } = this.props;
    logout();
    if (this.state.logInFB) {
      if (FacebookAPI.getAccessToken()) {
        FacebookAPI.logout();
      }
    }
    onViewHomeScreen();
  };

  _onBack = () => {
    const { onBack, goBack } = this.props;
    if (onBack) {
      onBack();
    } else {
      goBack();
    }
  };

  onLoginPressHandle = async () => {
    const { login, netInfo } = this.props;

    if (!netInfo.isConnected) {
      return toast(Languages.noConnection);
    }

    this.setState({ isLoading: true });

    const { username, password } = this.state;

    // login the customer via Wordpress API and get the access token
    const json = await WPUserAPI.login(username.trim(), password);

    if (json === undefined) {
      this.stopAndToast(Languages.GetDataError);
    } else if (json.error) {
      warn(json)
      this.stopAndToast(json.error);
    } else {
      let customers = await WooWorker.getCustomerById(json.user.id);
      customers = { ...customers, username, password };

      this._onBack();
      login(customers, json.cookie);
    }
  };

  onFBLoginPressHandle = () => {
    const { login } = this.props;
    this.setState({ isLoading: true });
    FacebookAPI.login()
      .then(async (token) => {
        if (token) {
          const json = await WPUserAPI.loginFacebook(token);
          warn(["json", json]);
          if (json === undefined) {
            this.stopAndToast(Languages.GetDataError);
          } else if (json.error) {
            this.stopAndToast(json.error);
          } else {
            let customers = await WooWorker.getCustomerById(json.wp_user_id);
            customers = { ...customers, token, picture: json.user.picture };
            this._onBack();
            login(customers, json.cookie);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  onSignUpHandle = () => {
    this.props.onViewSignUp();
  };

  checkConnection = () => {
    const { netInfo } = this.props;
    if (!netInfo.isConnected) toast(Languages.noConnection);
    return netInfo.isConnected;
  };

  stopAndToast = (msg) => {
    toast(msg);
    this.setState({ isLoading: false });
  };

  render() {
    const { username, password, isLoading } = this.state;
    const {
      theme:{
        colors:{
          background, text
        }
      }
    } = this.props

    return (
      <ScrollView style={{backgroundColor: background}} contentContainerStyle={styles.container}>
        <View style={styles.logoWrap}>
          <Image
            source={Config.LogoWithText}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.subContain}>
          <View style={styles.loginForm}>
            <View style={styles.inputWrap}>
              <Icon
                name={Icons.MaterialCommunityIcons.Email}
                size={Styles.IconSize.TextInput}
                color={text}
              />
              <TextInput
                {...commonInputProps}
                ref={(comp) => (this.username = comp)}
                placeholder={Languages.UserOrEmail}
                keyboardType="email-address"
                onChangeText={this.onUsernameEditHandle}
                onSubmitEditing={this.focusPassword}
                returnKeyType="next"
                value={username}
              />
            </View>
            <View style={styles.inputWrap}>
              <Icon
                name={Icons.MaterialCommunityIcons.Lock}
                size={Styles.IconSize.TextInput}
                color={text}
              />
              <TextInput
                {...commonInputProps}
                ref={(comp) => (this.password = comp)}
                placeholder={Languages.password}
                onChangeText={this.onPasswordEditHandle}
                secureTextEntry
                returnKeyType="go"
                value={password}
              />
            </View>
            <ButtonIndex
              text={Languages.Login.toUpperCase()}
              containerStyle={styles.loginButton}
              onPress={this.onLoginPressHandle}
            />
          </View>
          <View style={styles.separatorWrap}>
            <View style={styles.separator} />
            <Text style={styles.separatorText}>{Languages.Or}</Text>
            <View style={styles.separator} />
          </View>

          <ButtonIndex
            text={Languages.FacebookLogin.toUpperCase()}
            icon={Icons.MaterialCommunityIcons.Facebook}
            containerStyle={styles.fbButton}
            onPress={this.onFBLoginPressHandle}
          />
          <TouchableOpacity
            style={Styles.Common.ColumnCenter}
            onPress={this.onSignUpHandle}>
            <Text style={[styles.signUp, {color: text}]}>
              {Languages.DontHaveAccount}{" "}
              <Text style={styles.highlight}>{Languages.signup}</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {isLoading ? <Spinner mode="overlay" /> : null}
      </ScrollView>
    );
  }
}

const commonInputProps = {
  style: styles.input,
  underlineColorAndroid: "transparent",
  placeholderTextColor: isDark ? Theme.dark.colors.text : Theme.light.colors.text,
};

LoginScreen.propTypes = {
  netInfo: PropTypes.object,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = ({ netInfo, user }) => ({ netInfo, user });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("@redux/UserRedux");
  const AddressRedux = require("@redux/AddressRedux");
  const backAction = NavigationActions.back({
    key: null,
  });
  return {
    login: (user, token) => dispatch(actions.login(user, token)),
    logout: () => dispatch(actions.logout()),
    initAddresses: (customerInfo) => {
      AddressRedux.actions.initAddresses(dispatch, customerInfo)
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(LoginScreen));
