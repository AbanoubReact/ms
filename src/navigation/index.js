/** @format */

import React from "react";
import { Color, Images, Config } from "@common";
import { TabBar, TabBarIcon } from "@components";
import { Dimensions, I18nManager, StyleSheet } from "react-native";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  NavigationActions,
} from "react-navigation";
// import { TabViewPagerPan } from "react-native-tab-view";
import HomeScreen from "./HomeScreen";
import NewsScreen from "./NewsScreen";
import NewsDetailScreen from "./NewsDetailScreen";
import CategoriesScreen from "./CategoriesScreen";
import CategoryScreen from "./CategoryScreen";
import DetailScreen from "./DetailScreen";
import CartScreen from "./CartScreen";
import MyOrdersScreen from "./MyOrdersScreen";
import WishListScreen from "./WishListScreen";
import SearchScreen from "./SearchScreen";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import CustomPageScreen from "./CustomPageScreen";
import ListAllScreen from "./ListAllScreen";
import SettingScreen from "./SettingScreen";
import UserProfileScreen from "./UserProfileScreen";
import FiltersScreen from "./FiltersScreen";
import AddressScreen from "./AddressScreen";
import AddAddressScreen from "./AddAddressScreen";
import AuthLoadingScreen from "./AuthLoadingScreen";

import TransitionConfig from "./TransitionConfig";

const { width } = Dimensions.get("window");

const NewsStack = createStackNavigator(
  {
    News: { screen: NewsScreen },
    CustomPage: { screen: CustomPageScreen },
    NewsDetailScreen: { screen: NewsDetailScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const CategoryStack = createStackNavigator(
  {
    CategoriesScreen: { screen: CategoriesScreen },
    CategoryScreen: { screen: CategoryScreen },
    CustomPage: { screen: CustomPageScreen },
    DetailScreen: {
      screen: DetailScreen,
      navigationOptions: { tabBarVisible: false },
    },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const CategoryDetailStack = createStackNavigator(
  {
    CategoryScreen: { screen: CategoryScreen },
    CustomPage: { screen: CustomPageScreen },
    DetailScreen: {
      screen: DetailScreen,
      navigationOptions: { tabBarVisible: false },
    },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const WishListStack = createStackNavigator(
  {
    WishListScreen: { screen: WishListScreen },
    CustomPage: { screen: CustomPageScreen },
    Detail: { screen: DetailScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const SearchStack = createStackNavigator(
  {
    Search: { screen: SearchScreen },
    CustomPage: { screen: CustomPageScreen },
    DetailScreen: { screen: DetailScreen },
    FiltersScreen: { screen: FiltersScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const HomeStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    CustomPage: { screen: CustomPageScreen },
    ListAllScreen: { screen: ListAllScreen },
    DetailScreen: { screen: DetailScreen },
  },
  {
    navigationOptions: {
      gestureResponseDistance: { horizontal: width / 2 },
      gesturesEnabled: true,
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const CartScreenStack = createStackNavigator(
  {
    Cart: { screen: CartScreen },
    Detail: { screen: DetailScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const UserProfileStack = createStackNavigator(
  {
    UserProfile: { screen: UserProfileScreen },
    Address: { screen: AddressScreen },
    AddAddress: { screen: AddAddressScreen },
    SettingScreen: { screen: SettingScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const LoginStack = createStackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    SignUpScreen: { screen: SignUpScreen },
  },
  {
    mode: "modal",
    header: null,
    transitionConfig: () => TransitionConfig,
  }
);

const AppNavigator = createBottomTabNavigator(
  {
    Default: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <TabBarIcon icon={Images.IconHome} tintColor={tintColor} />
        ),
      },
    },
    CategoriesScreen: {
      screen: CategoryStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <TabBarIcon
            css={{ width: 18, height: 18 }}
            icon={Images.IconCategory}
            tintColor={tintColor}
          />
        ),
      },
    },
    Search: {
      screen: SearchStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <TabBarIcon
            css={{ width: 18, height: 18 }}
            icon={Images.IconSearch}
            tintColor={tintColor}
          />
        ),
      },
    },
    ...(Config.HideCartAndCheckout
      ? {}
      : {
          CartScreen: {
            screen: CartScreenStack,
            navigationOptions: {
              tabBarIcon: ({ tintColor }) => (
                <TabBarIcon
                  cartIcon
                  css={{ width: 20, height: 20 }}
                  icon={Images.IconCart}
                  tintColor={tintColor}
                />
              ),
            },
          },
        }),
    WishListScreen: {
      screen: WishListStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <TabBarIcon
            wishlistIcon
            css={{ width: 18, height: 18 }}
            icon={Images.IconHeart}
            tintColor={tintColor}
          />
        ),
      },
    },
    UserProfileScreen: {
      screen: UserProfileStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <TabBarIcon
            wishlistIcon
            css={{ width: 18, height: 18 }}
            icon={Images.IconUser}
            tintColor={tintColor}
          />
        ),
      },
    },
    ...(Config.HideCartAndCheckout
      ? {}
      : {
          MyOrders: { screen: MyOrdersScreen },
        }),
    NewsScreen: { screen: NewsStack },
    LoginStack: { screen: LoginStack },
    Detail: {
      screen: DetailScreen,
      navigationOptions: {
        tabBarVisible: false,
        gestureDirection: I18nManager.isRTL ? "inverted" : "default",
      },
    },
    CategoryDetail: { screen: CategoryDetailStack },
  },
  {
    // initialRouteName: 'CategoriesScreen',
    tabBarComponent: TabBar,
    tabBarPosition: "bottom",
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      activeTintColor: Color.tabbarTint,
      inactiveTintColor: Color.tabbarColor,
    },
    lazy: true,
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    SignUpScreen: { screen: SignUpScreen },
  },
  {
    mode: "modal",
    header: null,
    transitionConfig: () => TransitionConfig,
  }
);

export default createAppContainer(
  Config.Login.RequiredLogin
    ? createSwitchNavigator(
        {
          AuthLoading: AuthLoadingScreen,
          App: AppNavigator,
          Auth: AuthNavigator,
        },
        {
          initialRouteName: "AuthLoading",
        }
      )
    : AppNavigator
);

/**
 * prevent duplicate screen
 */
const navigateOnce = (getStateForAction) => (action, state) => {
  const { type, routeName } = action;
  return state &&
    type === NavigationActions.NAVIGATE &&
    routeName === state.routes[state.routes.length - 1].routeName
    ? null
    : getStateForAction(action, state);
};

/**
 * Add AppNavigator to navigateOnce bug naivgate drawer category
 */
// AppNavigator.router.getStateForAction = navigateOnce(
//     AppNavigator.router.getStateForAction
// );
NewsStack.router.getStateForAction = navigateOnce(
  NewsStack.router.getStateForAction
);
CategoryStack.router.getStateForAction = navigateOnce(
  CategoryStack.router.getStateForAction
);
CategoryDetailStack.router.getStateForAction = navigateOnce(
  CategoryDetailStack.router.getStateForAction
);
WishListStack.router.getStateForAction = navigateOnce(
  WishListStack.router.getStateForAction
);
HomeStack.router.getStateForAction = navigateOnce(
  HomeStack.router.getStateForAction
);
SearchStack.router.getStateForAction = navigateOnce(
  SearchStack.router.getStateForAction
);
CartScreenStack.router.getStateForAction = navigateOnce(
  CartScreenStack.router.getStateForAction
);

/**
 * FIX RTL react-navigation tab do not show
 */
// TabViewPagerPan.prototype.render = function render() {
//   const { panX, offsetX, navigationState, layout, children } = this.props;
//   const { width } = layout;
//   const { routes } = navigationState;
//   const maxTranslate = width * (routes.length - 1);
//   let translateX;
//   if (I18nManager.isRTL) {
//     // <------- HACK ---------
//     translateX = Animated.multiply(Animated.add(panX, offsetX), -1).interpolate(
//       {
//         inputRange: [0, maxTranslate],
//         outputRange: [0, maxTranslate],
//         extrapolate: "clamp",
//       }
//     );
//     // ---------------------->
//   } else {
//     translateX = Animated.add(panX, offsetX).interpolate({
//       inputRange: [-maxTranslate, 0],
//       outputRange: [-maxTranslate, 0],
//       extrapolate: "clamp",
//     });
//   }

//   return (
//     <Animated.View
//       style={[
//         styles.sheet,
//         width
//           ? {
//               width: routes.length * width,
//               transform: [{ translateX }],
//             }
//           : null,
//       ]}
//       {...this._panResponder.panHandlers}>
//       {React.Children.map(children, (child, i) => (
//         <View
//           key={navigationState.routes[i].key}
//           testID={navigationState.routes[i].testID}
//           style={
//             width
//               ? { width }
//               : i === navigationState.index
//                 ? StyleSheet.absoluteFill
//                 : null
//           }>
//           {i === navigationState.index || width ? child : null}
//         </View>
//       ))}
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   sheet: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "stretch",
//   },
// });
