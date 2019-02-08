/** @format */

import React from "react";
import { View } from "react-native";
import LanguagePicker from "./LanguagePicker";
import styles from "./styles";
import {Languages} from '@common'
import { AnimatedHeader } from "@components";

const Setting = () => {
  return (
    <View style={styles.settingContainer}>
      <LanguagePicker />
    </View>
  );
};
export default Setting;
