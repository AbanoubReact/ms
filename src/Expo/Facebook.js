/** @format */

import React, { Component } from "react";

const FBSDK = require("react-native-fbsdk");

const { LoginManager, AccessToken } = FBSDK;

export default class Facebook {
  static logInWithReadPermissionsAsync(logInID, options) {
    return LoginManager.logInWithReadPermissions(options.permissions).then(
      (result) => {
        if (result.isCancelled) {
          console.log(error);
          return;
        }
        return AccessToken.getCurrentAccessToken().then((data) => {
          return { type: "success", token: data.accessToken };
        });
      }
    );
  }
}
