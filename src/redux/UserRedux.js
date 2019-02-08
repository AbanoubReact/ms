/**
 * Created by InspireUI on 14/02/2017.
 *
 * @format
 */

const types = {
  LOGOUT: "LOGOUT",
  LOGIN: "LOGIN_SUCCESS",
  FINISH_INTRO: "FINISH_INTRO",
};

export const actions = {
  login: (user, token) => {
    return { type: types.LOGIN, user, token };
  },
  logout() {
    return { type: types.LOGOUT };
  },
  finishIntro() {
    return { type: types.FINISH_INTRO };
  },
};

const initialState = {
  user: null,
  token: null,
  finishIntro: null,
};

export const reducer = (state = initialState, action) => {
  const { type, user, token } = action;

  switch (type) {
    case types.LOGOUT:
      return Object.assign({}, initialState);
    case types.LOGIN:
      return { ...state, user, token };
    case types.FINISH_INTRO:
      return { ...state, finishIntro: true };
    default:
      return state;
  }
};
