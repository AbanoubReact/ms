/**
 * Created by InspireUI on 20/12/2016.
 *
 * @format
 */

import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const Constants = {
  RTL: true, // default to set redux. Only use first time
  useReactotron: true,
  Language: "ar", // ar, rng. Default to set redux. Only use first time
  fontFamily: "OpenSans",
  fontHeader: "Baloo",
  fontHeaderAndroid: "Baloo",
  WordPress: {
    defaultDateFormat: "YYYY-MM-DD HH:mm:ss",
    checkout: "mstore-checkout",
  },
  SplashScreen: {
    Duration: 2000,
  },
  AsyncCode: {
    Intro: "async.intro",
  },
  EmitCode: {
    SideMenuOpen: "OPEN_SIDE_MENU",
    SideMenuClose: "CLOSE_SIDE_MENU",
    SideMenuToggle: "TOGGLE_SIDE_MENU",
    Toast: "toast",
    MenuReload: "menu.reload",
  },
  Dimension: {
    ScreenWidth(percent = 1) {
      return Dimensions.get("window").width * percent;
    },
    ScreenHeight(percent = 1) {
      return Dimensions.get("window").height * percent;
    },
  },
  LimitAddToCart: 10,
  TagIdForProductsInMainCategory: 263,
  Window: {
    width,
    height,
    headerHeight: (65 * height) / 100,
    headerBannerAndroid: (55 * height) / 100,
    profileHeight: (45 * height) / 100,
  },

  PostImage: {
    small: "small",
    medium: "medium",
    medium_large: "medium_large",
    large: "large",
  },
  tagIdBanner: 273, // cat ID for Sticky Products
  stickyPost: true, // default is true (else false)
  PostList: {
    // Custom get All Products in Home Screen
    order: "desc", // or asc - default is "desc" column
    orderby: "date", // date, id, title and slug - default is "date" column
  },
  Layout: {
    card: 1,
    twoColumn: 2,
    simple: 3,
    list: 4,
    advance: 5,
    threeColumn: 6,
    horizon: 7,
    twoColumnHigh: 8,
    BannerLarge: 9,
    Banner: 10,
    circle: 11,
    BannerHigh: 12
  },
  pagingLimit: 10,

  fontText: {
    size: 16,
  },
  productAttributeColor: "color",
};

export default Constants;
