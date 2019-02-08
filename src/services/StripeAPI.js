/** @format */

import { Constants } from "@common";

const StripeAPI = {
  processPayment: (token, price, callback) => {
    const body = {
      token: token.tokenId,
      amount: price * 100,
    };
    const fetchOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    console.log("tokenid", token.tokenId, "fetchOptions", fetchOptions);

    fetch(`${Constants.Stripe.serverURL}/payment`, fetchOptions)
      .then((response) => response.json())
      .then((json) => {
        console.log("response server", json);
        callback({ success: true, message: json.message });
      })
      .catch((error) => console.log("error", error));
  },
};
export default StripeAPI;
