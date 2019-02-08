/** @format */

import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Button } from "@components";
import { Languages, Config, withTheme, Images } from "@common";
import * as Animatable from "react-native-animatable";
import styles from "./styles";

const Buttons = ({
  isAbsolute,
  onPrevious,
  isLoading,
  nextText,
  onNext,
  theme,
}) => {

  const {
    colors: { background, text, lineColor },
  } = theme;
  const isDark = Config.Theme.isDark;

  return (
    <View style={[styles.bottomView, isAbsolute && styles.floatView, isDark && {borderTopColor: lineColor} ]}>
      <Button
        text={Languages.Back}
        icon={Images.icons.backs}
        color={isDark ? text : "#999"}
        style={[styles.btnBack, isDark && {backgroundColor: lineColor} ]}
        textStyle={[styles.btnBackText, isDark && {color: text} ]}
        onPress={onPrevious}
      />
      {isLoading ? (
        <View style={styles.btnBuy}>
          <Animatable.Text
            style={[styles.btnBuyText, isDark && {color: text} ]}
            animation="pulse"
            iterationCount="infinite">
            {Languages.Loading}
          </Animatable.Text>
        </View>
      ) : (
        <Button
          text={nextText || Languages.NextStep}
          style={styles.btnBuy}
          textStyle={styles.btnBuyText}
          onPress={onNext}
        />
      )}
    </View>
  );
};

export default withTheme(Buttons);
