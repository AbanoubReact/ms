/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Color, Styles } from "@common";
import { SafeAreaView } from "@components";
import { Detail } from "@containers";
import { Logo, Back, CartWishListIcons } from "./IconNav";

export default class DetailScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: Logo(),
    tabBarVisible: false,
    headerLeft: Back(navigation),
    headerRight: CartWishListIcons(navigation),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.toolbar,
    headerTitleStyle: Styles.Common.headerStyle,
  });

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  render() {
    const { state, navigate } = this.props.navigation;

    return (
      <SafeAreaView isSafeAreaBottom>
        <View style={{ flex: 1 }}>
          {typeof state.params !== "undefined" && (
            <Detail
              product={state.params.product}
              onViewCart={() => navigate("CartScreen")}
              onViewProductScreen={(product) =>{
                this.props.navigation.setParams(product)
                //navigate("DetailScreen", product)
              }}
              navigation={this.props.navigation}
              onLogin={() => navigate("LoginScreen")}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }
}
