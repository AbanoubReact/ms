/** @format */

import React, { PureComponent } from "react";
import { FlatList } from "react-native";
import { withTheme } from "@common";
import Item from "./Item";

class Categories extends PureComponent {
  static defaultProps = {
    categories: [],
    items: [],
  };

  render() {
    const { categories, items, type, onPress } = this.props;
    const mapping = {};
    categories.forEach((item) => {
      mapping[item.id] = item.name;
    });

    return (
      <FlatList
        keyExtractor={(item, index) => `${index}`}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={items}
        renderItem={({ item }) => (
          <Item item={item} type={type} label={mapping[item.category]} onPress={onPress} />
        )}
      />
    );
  }
}

export default withTheme(Categories);
