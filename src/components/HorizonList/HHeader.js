/** @format */

import React from "react";
import { View, Text, TouchableOpacity, I18nManager } from "react-native";

import Icon from "react-native-vector-icons/Entypo";
import { Constants, Languages } from "@common";
import styles from "./styles";

export default class HHeader extends React.PureComponent {
  render() {
    const {
      showCategoriesScreen,
      config,
      viewAll,
      theme: {
        colors: { text },
      },
    } = this.props;

    return (
      <View style={styles.header}>

        <TouchableOpacity
          onPress={
            config.layout != Constants.Layout.circle
              ? viewAll
              : showCategoriesScreen
          }
          style={styles.headerRight}>
          <Icon
            style={styles.icon}
            color={text}
            size={20}
            name={
              I18nManager.isRTL ? "chevron-small-right": "chevron-small-left" 
            }
          />
          <Text style={[styles.headerRightText, { color: text }]}>
            {Languages.seeAll}
          </Text>
          
        </TouchableOpacity>
        <View style={styles.headerLeft}>
          <Text style={[styles.tagHeader, { color: text }]}>
            {Languages[config.name]}
          </Text>
        </View>
      </View>
    );
  }
}
