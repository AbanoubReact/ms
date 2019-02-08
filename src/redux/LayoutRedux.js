/**
 * Created by InspireUI on 06/03/2017.
 *
 * @format
 */

import { flatten } from "lodash";
import { HorizonLayouts, Languages, Constants, Config } from "@common";
// import { warn } from '@app/Omni'
import { WooWorker } from "api-ecommerce";

var layouts = [...HorizonLayouts]
layouts.splice(1, 0, {layout: Constants.Layout.circle, items: Config.HomeCategories});

const types = {
  LAYOUT_FETCH_SUCCESS: "LAYOUT_FETCH_SUCCESS",
  LAYOUT_FETCH_MORE: "LAYOUT_FETCH_MORE",
  LAYOUT_FETCHING: "LAYOUT_FETCHING",
  LAYOUT_ALL_FETCHING: "LAYOUT_ALL_FETCHING",
  LAYOUT_ALL_FETCH_SUCCESS: "LAYOUT_ALL_FETCH_SUCCESS",
};

export const actions = {
  fetchAllProductsLayout: async (dispatch, page = 1) => {
    dispatch({ type: types.LAYOUT_ALL_FETCHING });

    console.log(HorizonLayouts)


    const promises = [];
    layouts.map((layout, index) => {
      if (layout.layout != Constants.Layout.circle) {
        promises.push(
          dispatch(
            actions.fetchProductsLayout(
              dispatch,
              layout.category,
              layout.tag,
              page,
              index
            )
          )
        );
      }
    });
    Promise.all(promises).then((data) => {
      dispatch({ type: types.LAYOUT_ALL_FETCH_SUCCESS });
    });
  },
  fetchProductsLayout: (dispatch, categoryId = "", tagId = "", page, index) => {
    return (dispatch) => {
      dispatch({ type: types.LAYOUT_FETCHING, extra: { index } });

      return WooWorker.productsByCategoryTag(categoryId, tagId, 10, page).then(
        (json) => {
          if (json === undefined) {
            dispatch(actions.fetchProductsFailure(Languages.getDataError));
          } else if (json.code) {
            dispatch(actions.fetchProductsFailure(json.message));
          } else {
            dispatch({
              type:
                page > 1 ? types.LAYOUT_FETCH_MORE : types.LAYOUT_FETCH_SUCCESS,
              payload: json,
              extra: { index },
              finish: json.length === 0,
            });
          }
        }
      );
    };
  },
  fetchProductsLayoutTagId: async (
    dispatch,
    categoryId = "",
    tagId = "",
    page,
    index
  ) => {
    dispatch({ type: types.LAYOUT_FETCHING, extra: { index } });
    const json = await WooWorker.productsByCategoryTag(
      categoryId,
      tagId,
      10,
      page
    );

    if (json === undefined) {
      dispatch(actions.fetchProductsFailure(Languages.getDataError));
    } else if (json.code) {
      dispatch(actions.fetchProductsFailure(json.message));
    } else {
      dispatch({
        type: page > 1 ? types.LAYOUT_FETCH_MORE : types.LAYOUT_FETCH_SUCCESS,
        payload: json,
        extra: { index },
        finish: json.length === 0,
      });
    }
  },
  fetchProductsFailure: (error) => ({
    type: types.FETCH_PRODUCTS_FAILURE,
    error,
  }),
};

const initialState = {
  layout: layouts,
  isFetching: false,
};

export const reducer = (state = initialState, action) => {
  const { extra, type, payload, finish } = action;

  switch (type) {
    case types.LAYOUT_ALL_FETCHING: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case types.LAYOUT_ALL_FETCH_SUCCESS: {
      return {
        ...state,
        isFetching: false,
      };
    }

    case types.LAYOUT_FETCH_SUCCESS: {
      const layout = [];
      state.layout.map((item, index) => {
        if (index === extra.index) {
          layout.push({
            ...item,
            list: flatten(payload),
            isFetching: false,
          });
        } else {
          layout.push(item);
        }
      });
      return {
        ...state,
        layout,
      };
    }

    case types.LAYOUT_FETCH_MORE: {
      const layout = [];
      state.layout.map((item, index) => {
        if (index === extra.index) {
          layout.push({
            ...item,
            list: item.list.concat(payload),
            isFetching: false,
            finish
          });
        } else {
          layout.push(item);
        }
      });
      return {
        ...state,
        layout,
      };
    }

    case types.LAYOUT_FETCHING: {
      const layout = [];
      state.layout.map((item, index) => {
        if (index === extra.index) {
          layout.push({
            ...item,
            isFetching: true,
          });
        } else {
          layout.push(item);
        }
      });
      return {
        ...state,
        layout,
      };
    }

    default:
      return state;
  }
};
