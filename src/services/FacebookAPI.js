/**
 * Created by InspireUI on 05/01/2017.
 *
 * @format
 */

import { toast, log } from "@app/Omni";

import { Platform } from "react-native";
import { Constants, Config } from "@common";
import { Facebook } from "@expo";

const LoginBehaviors = {
  native_with_fallback: "native",
  native_only: "native_only",
  web_only: "web_only",
};

class FacebookAPI {
  constructor() {
    // Expo.Facebook.setLoginBehavior(LoginBehaviors.native_with_fallback);
  }

  async login() {
    try {
      const ask = await Facebook.logInWithReadPermissionsAsync(
        Config.appFacebookId,
        {
          permissions: ["public_profile", "email", "user_friends"],
          behavior: Platform.OS === "ios" ? "web" : "browser",
        }
      );
      const { type } = ask;

      if (type === "cancel") return; // throw user_cancel;
      if (type === "success") {
        const { token } = ask;
        return token;
        const response = await fetch(
          `https://graph.facebook.com/me?fields=name,first_name,last_name,id,email,picture&access_token=${token}`
        );
        return response.json();
      }
    } catch (err) {
      // console.log("err:::", err);
      // if (err.framesToPop === 1 && err.code === 'EUNSPECIFIED') {
      //     if (Platform.OS === 'android') {
      //         Expo.Facebook.setLoginBehavior(LoginBehaviors.web_only);
      //     }
      // }
      //     return callback('Sorry, Can\'t get data from Facebook. Please try other login method', undefined);
      // }
      // callback(err, undefined);
    }
  }

  logout() {
    Facebook.logOut();
  }

  async getAccessToken() {
    return await Facebook.getCurrentFacebook();
  }

  async shareLink(link, desc) {
    const shareLinkContent = {
      contentType: "link",
      contentUrl: link,
      contentDescription: desc,
    };
    try {
      const canShow = await Facebook.canShow(shareLinkContent);
      if (canShow) {
        const result = await Facebook.show(shareLinkContent);
        if (!result.isCancelled) {
          toast("Post shared");
        }
      }
    } catch (error) {
      toast("An error occurred. Please try again later");
      error("Share post fail with error: " + error);
    }
  }
}

export default new FacebookAPI();
