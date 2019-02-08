/** @format */

import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import { Images, Styles, Tools } from "@common";
import { ImageCache, WishListIcon, TouchableScale } from "@components";
import { getProductImage } from "@app/Omni";
import { LinearGradient } from "@expo";
import css from "./style";

export default class BannerLarge extends PureComponent {
  render() {
    const { viewPost, title, product } = this.props;
    const imageURI =
      typeof product.images[0] !== "undefined"
        ? getProductImage(product.images[0].src, Styles.width - 42)
        : Images.PlaceHolderURL;
    const productPrice = `${Tools.getPriceIncluedTaxAmount(product)} `;
    const productPriceSale = product.on_sale
      ? `${Tools.getCurrecyFormatted(product.regular_price)} `
      : null;

    return (
      <TouchableScale onPress={viewPost} style={css.bannerViewShadow}>
        <View activeOpacity={1} style={css.bannerView}>
          <ImageCache uri={imageURI} style={css.bannerImage} />

          <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0, 0.3)"]}
            style={css.bannerOverlay}>
            <Text style={css.bannerTitle}>{title}</Text>
            <View style={css.priceView}>
              <Text style={[css.price]}>{productPrice}</Text>
              <Text style={[css.price, product.on_sale && css.sale_price]}>
                {productPriceSale}
              </Text>
            </View>
          </LinearGradient>

          <WishListIcon product={product} />
        </View>
      </TouchableScale>
    );
  }
}
