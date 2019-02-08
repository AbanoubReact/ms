/**
 * Created by InspireUI on 10/21/2016.
 *
 * @format
 */

import { WooWorker } from "api-ecommerce";

export const TOGGLE_PRODUCT_VIEW_MODE = "TOGGLE_PRODUCT_VIEW_MODE";

export const REQUEST_PRODUCT = "REQUEST_PRODUCT";
export const RECEIVE_PRODUCT = "RECEIVE_PRODUCT";
export const PRODUCT_FAILURE = "PRODUCT_FAILURE";
export const CLEAR_PRODUCT = "CLEAR_PRODUCT";

export const REQUEST_PRODUCTS = "REQUEST_PRODUCTS";
export const RECEIVE_PRODUCTS = "RECEIVE_PRODUCTS";
export const PRODUCTS_FAILURE = "PRODUCTS_FAILURE";
export const CLEAR_PRODUCTS = "CLEAR_PRODUCTS";

export const FETCH_PRODUCTS_NAME = "FETCH_PRODUCTS_NAME";

export const ProductViewMode = {
  LIST_VIEW: "LIST_VIEW",
  GRID_VIEW: "GRID_VIEW",
};

export const toggleProductViewMode = () => {
  return { type: TOGGLE_PRODUCT_VIEW_MODE };
};

export const requestProduct = () => {
  return {
    type: REQUEST_PRODUCT,
  };
};

export const receiveProduct = (json) => {
  return {
    type: RECEIVE_PRODUCT,
    product: json,
  };
};

export const productFailure = (error) => {
  return {
    type: PRODUCT_FAILURE,
    error,
  };
};

export const clearProduct = () => {
  return { type: CLEAR_PRODUCT };
};

export const requestProducts = () => {
  return {
    type: REQUEST_PRODUCTS,
  };
};

export const receiveProducts = (json) => {
  return {
    type: RECEIVE_PRODUCTS,
    products: json,
  };
};

export const productsFailure = (error) => {
  return {
    type: PRODUCTS_FAILURE,
    error,
  };
};

export const clearProducts = () => {
  return { type: CLEAR_PRODUCTS };
};

export const getProductsByName = () => {
  return { type: FETCH_PRODUCTS_NAME };
};

export const fetchProductById = (productId, _callback) => {
  return (dispatch) => {
    dispatch(requestProduct());
    const callback = (json) => {
      dispatch(receiveProduct(json));
      _callback();
    };
    const error = (error) => dispatch(productFailure(error));
    return WooWorker.productById(callback, error, productId);
  };
};

export const fetchProductsByCategoryId = (categoryId, per_page, page) => {
  return (dispatch) => {
    dispatch(requestProducts());
    const callback = (json) => dispatch(receiveProducts(json));
    const error = (error) => dispatch(productsFailure(error));
    return WooWorker.productsByCategoryId(
      callback,
      error,
      categoryId,
      per_page,
      page
    );
  };
};

export const fetchProductsByName = (name, per_page = 8, page = 1) => {
  return (dispatch) => {
    dispatch(requestProducts());
    const callback = (json) => dispatch(getProductsByName(json));
    const error = (error) => dispatch(productsFailure(error));
    return WooWorker.productsByName(callback, error, name, per_page, page);
  };
};
