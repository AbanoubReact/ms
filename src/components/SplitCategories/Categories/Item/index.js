/** @format */

import React, { Component } from "react";
import { View, Image, TouchableOpacity, Dimensions, Text } from "react-native";
import { toast, warn } from "@app/Omni";
import { Color, Constants, Tools, Languages, Images, Config } from "@common";
import styles from "./styles";

class Item extends Component {
  static defaultProps = {
    selected: false
  }

  render() {
    const { item, selected, onPress} = this.props;

    return (
      <TouchableOpacity style={[styles.container, selected && styles.selected]} onPress={onPress}>
        <Text style={[styles.text, selected && styles.selectedText]}>{item.name}</Text>
      </TouchableOpacity>
    );
  }
}

export default Item
