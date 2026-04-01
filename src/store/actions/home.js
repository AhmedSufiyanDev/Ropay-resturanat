
import * as actionTypes from "../actionTypes";


export const getRestaurantCategoriesStart = (data) => {
  return {
      type: actionTypes.GET_RESTAURANT_CATEGORIES_START,
      payload: data,
  };
};
export const getRestaurantCategoriesSuccess = (data) => {
  return {
      type: actionTypes.GET_RESTAURANT_CATEGORIES_SUCCESS,
      payload: data,
  };
};
export const getRestaurantCategoriesFailure = (data) => {
  return {
      type: actionTypes.GET_RESTAURANT_CATEGORIES_FAILURE,
      payload: data,
  };
};


export const getProductStart = (data) => {
  return {
      type: actionTypes.GET_PRODUCT_LIST_START,
      payload: data,
  };
};
export const getProductSuccess = (data) => {
  return {
      type: actionTypes.GET_PRODUCT_LIST_SUCCESS,
      payload: data,
  };
};
export const getProductFailure = (data) => {
  return {
      type: actionTypes.GET_PRODUCT_LIST_FAILURE,
      payload: data,
  };
};

export const getCartItemsStart = (data) => {
  return {
      type: actionTypes.GET_CART_ITEMS_LIST_START,
      payload: data,
  };
};
export const getCartItemsSuccess = (data) => {
  return {
      type: actionTypes.GET_CART_ITEMS_LIST_SUCCESS,
      payload: data,
  };
};
export const getCartItemsFailure = (data) => {
  return {
      type: actionTypes.GET_CART_ITEMS_LIST_FAILURE,
      payload: data,
  };
};