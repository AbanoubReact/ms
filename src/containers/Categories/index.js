/** @format */

// @flow
/**
 * Created by InspireUI on 19/02/2017.
 */
import React from "react";
import {
  View,
  Text,
  Image,
  Animated,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { Images, Config, Languages, withTheme } from "@common";
import { toast, BlockTimer } from "@app/Omni";
import { Empty, LogoSpinner, SplitCategories, AdMob } from "@components";
import styles from "./styles";
import Icon from "@expo/vector-icons/FontAwesome";
import { TouchableScale } from "@components";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

class CategoriesScreen extends React.PureComponent {
  componentDidMount() {
    const { fetchCategories } = this.props;
    fetchCategories();
  }

  state = {
    scrollY: new Animated.Value(0),
  };

  changeLayout = () => this.props.setActiveLayout(!this.props.selectedLayout);

  componentWillReceiveProps(props) {
    const { error } = props.categories;
    if (error) toast(error);
  }

  renderLayoutButton = () => {
    const hitSlop = { top: 20, right: 20, left: 20, bottom: 20 };
    return (
      <TouchableOpacity
        style={styles.fab}
        onPress={this.changeLayout}
        activeOpacity={1}
        hitSlop={hitSlop}>
        <Icon.Button
          onPress={this.changeLayout}
          color="#fff"
          iconStyle={{ backgroundColor: "transparent", left: 5 }}
          borderRadius={50}
          backgroundColor="transparent"
          name="exchange"
          size={14}
        />
      </TouchableOpacity>
    );
  };

  onRowClickHandle = (category) => {
    const { setSelectedCategory, onViewCategory } = this.props;
    BlockTimer.execute(() => {
      setSelectedCategory({
        ...category,
        mainCategory: category,
      });
      onViewCategory({ mainCategory: category });
    }, 500);
  };

  render() {
    const { categories, selectedLayout, onViewProductScreen } = this.props;
    const {
      theme: {
        colors: { background },
      },
    } = this.props;

    if (categories.error) {
      return <Empty text={categories.error} />;
    }

    if (categories.isFetching) {
      return <LogoSpinner fullStretch />;
    }

    if (Config.CategoryListView != true) {
      return (
        <SplitCategories
          onViewPost={(product) => onViewProductScreen({ product })}
        />
      );
    }

    const mainCategories = categories.list.filter(
      (category) => category.parent === 0
    );

    return (
      <View style={{ flex: 1, backgroundColor: background }}>
        <AnimatedScrollView
          scrollEventThrottle={1}
          contentContainerStyle={styles.scrollView}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}>
          {typeof categories !== "undefined" &&
            mainCategories.map((category, index) => {
              const textStyle =
                index % 2 == 0
                  ? { marginRight: 30, textAlign: "right" }
                  : { marginLeft: 30, textAlign: "left" };

              const imageCategory =
                category.image !== null
                  ? { uri: category.image.src }
                  : Images.categoryPlaceholder;

              return (
                <View style={styles.containerStyle} key={index.toString()}>
                  <TouchableScale
                    style={styles.imageView}
                    key={`${index}img`}
                    onPress={() => this.onRowClickHandle(category)}>
                    <Image style={styles.image} source={imageCategory} />

                    <View
                      style={[
                        styles.overlay,
                        index % 2 == 0 && { alignItems: "flex-end" },
                        index % 2 != 0 && { alignItems: "flex-start" },
                      ]}>
                      <Text style={[styles.mainCategoryText, { ...textStyle }]}>
                        {category.name}
                      </Text>
                      <Text
                        style={[styles.numberOfProductsText, { ...textStyle }]}>
                        {`${category.count} products`}
                      </Text>
                    </View>
                  </TouchableScale>
                </View>
              );
            })}
          <AdMob />
        </AnimatedScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    netInfo: state.netInfo,
    user: state.user,
    selectedLayout: state.categories.selectedLayout,
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { netInfo } = stateProps;
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/CategoryRedux");

  return {
    ...ownProps,
    ...stateProps,
    fetchCategories: () => {
      if (!netInfo.isConnected) return toast(Languages.noConnection);
      actions.fetchCategories(dispatch);
    },
    setActiveLayout: (value) => dispatch(actions.setActiveLayout(value)),
    setSelectedCategory: (category) =>
      dispatch(actions.setSelectedCategory(category)),
  };
}

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(withTheme(CategoriesScreen));
