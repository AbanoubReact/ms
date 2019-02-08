/** @format */

import React, { Component } from "react";
import { FlatList, RefreshControl, Animated, View } from "react-native";
import { PostLayout, PostBanner } from "@components";
import { Constants, Layout, withTheme } from "@common";
import { connect } from "react-redux";
import styles from "./styles";

const HEADER_MIN_HEIGHT = 40;
const HEADER_SCROLL_DISTANCE =
  Constants.Window.headerHeight - HEADER_MIN_HEIGHT;

@withTheme
class PostList extends Component {
  state = { scrollY: new Animated.Value(0) };

  constructor(props) {
    super(props);
    this.page = 1;
    this.limit = Constants.pagingLimit;
    this.isProductList = props.type === undefined;
  }

  componentDidMount() {
    this.page === 1 && this.fetchData();
  }

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.list.length !== this.props.list.length ||
      nextProps.layoutHome !== this.props.layoutHome
    );
  }

  fetchData = (reload = false) => {
    if (reload) {
      this.page = 1;
    }
    if (this.isProductList) {
      this.props.initProduct();
      this.props.fetchProducts(this.limit, this.page);
    } else {
      this.props.initNews();
      this.props.fetchNews(this.limit, this.page);
    }
  };

  _handleLoadmore = () => {
    this.nextPosts();
  };

  onRowClickHandle = (item) => {
    if (this.isProductList) {
      this.props.onViewProductScreen({ product: item });
    } else {
      this.props.onViewNewsScreen({ post: item });
    }
  };

  renderItem = ({ item, index }) => {
    if (item == null) return <View />;

    let layout = this.props.parentLayout;

    if (typeof this.props.layoutHome !== "undefined") {
      layout = this.props.layoutHome;
    }

    // update layout for advance mod
    if (layout === Constants.Layout.advance || layout == null) {
      layout = Layout[index % Layout.length];
    }

    return (
      <PostLayout
        post={item}
        type={this.props.type}
        key={`key-${index}`}
        onViewPost={() => this.onRowClickHandle(item, this.props.type)}
        layout={layout}
      />
    );
  };

  nextPosts = () => {
    this.page += 1;

    if (this.isProductList) {
      this.props.fetchProducts(this.limit, this.page);
    } else {
      this.props.fetchNews(this.limit, this.page);
    }
  };

  headerComponent = () => {
    const { type } = this.props;

    const animateOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: "clamp",
    });

    const titleTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50, -150],
      extrapolate: "clamp",
    });

    return (
      <PostBanner
        onViewItem={this.onRowClickHandle}
        type={type}
        animateOpacity={animateOpacity}
        animate={titleTranslate}
      />
    );
  };

  render() {
    const { list, isFetching } = this.props;
    const {
      theme: {
        colors: { background },
      },
    } = this.props;

    return (
      <FlatList
        overScrollMode="never"
        contentContainerStyle={[
          styles.flatlist,
          { backgroundColor: background },
        ]}
        data={list}
        keyExtractor={(item, index) => `post_${item.id}_${index}`}
        renderItem={this.renderItem}
        scrollEventThrottle={1}
        refreshing={isFetching}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => this.fetchData(true)}
          />
        }
        ListHeaderComponent={this.headerComponent}
        onEndReachedThreshold={50}
        onEndReached={this._handleLoadmore}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: this.state.scrollY } } },
        ])}
      />
    );
  }
}

const mapStateToProps = ({ products, news, page }, ownProps) => {
  const list =
    typeof ownProps.type === "undefined" ? products.listAll : news.list;
  const isFetching = products.isFetching || news.isFetching;
  const layoutHome = products.layoutHome;
  return { list, isFetching, page, layoutHome };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const Product = require("@redux/ProductRedux");
  const News = require("@redux/NewsRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchProducts: (per_page, page) => {
      Product.actions.fetchAllProducts(dispatch, per_page, page);
    },
    fetchNews: (per_page, page) => {
      News.actions.fetchNews(dispatch, per_page, page);
    },
    initProduct: () => dispatch(Product.actions.initProduct()),
    initNews: () => dispatch(News.actions.initNews()),
  };
};

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(PostList);
