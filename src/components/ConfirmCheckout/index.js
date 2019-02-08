/** @format */

import React, { PureComponent } from "react";
import { Text, View } from "react-native";
import { Languages, withTheme, Tools } from "@common";
import styles from "./styles";

class ConfirmCheckout extends PureComponent {
  render() {
    const {
      discountType,
      couponAmount,
      shippingMethod,
      totalPrice,
    } = this.props;
    const shippingPrice = shippingMethod[0].total;
    const discount =
      discountType == "percent"
        ? this.getExistCoupon() * totalPrice
        : this.getExistCoupon();
    const total =
      parseFloat(totalPrice) +
      parseFloat(shippingPrice) -
      parseFloat(discount || 0);
    const {
      theme: {
        colors: { background, text },
      },
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>{Languages.Subtotal}</Text>
          <Text style={[styles.value, { color: text }]}>
            {Tools.getCurrecyFormatted(totalPrice)}
          </Text>
        </View>
        {couponAmount > 0 && (
          <View style={styles.row}>
            <Text style={styles.label}>{Languages.Discount}</Text>
            <Text style={[styles.value, { color: text }]}>
              {discountType == "percent"
                ? `${parseFloat(couponAmount)}%`
                : Tools.getCurrecyFormatted(couponAmount)}
            </Text>
          </View>
        )}
        <View style={styles.row}>
          <Text style={styles.label}>{Languages.Shipping}</Text>
          <Text style={[styles.value, { color: text }]}>
            {Tools.getCurrecyFormatted(shippingPrice)}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.label}>{Languages.Total}</Text>
          <Text style={[styles.value, { color: text }]}>
            {Tools.getCurrecyFormatted(total)}
          </Text>
        </View>
      </View>
    );
  }

  getExistCoupon = () => {
    const { couponAmount, discountType } = this.props;
    if (discountType == "percent") {
      return couponAmount / 100.0;
    }
    return couponAmount;
  };
}

export default withTheme(ConfirmCheckout);
