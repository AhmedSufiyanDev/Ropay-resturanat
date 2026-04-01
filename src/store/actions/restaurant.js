import * as actionTypes from "../actionTypes";

export const getRestaurantData = (data) => {
    return {
        type: actionTypes.GET_RESTAURANT_DATA_START,
        payload: data,
    };
};
export const getRestaurantDataSuccess = (data) => {
    return {
        type: actionTypes.GET_RESTAURANT_DATA_SUCCESS,
        payload: data,

    };
};
export const getRestaurantDataFailure = (data) => {
    return {
        type: actionTypes.GET_RESTAURANT_DATA_FAILURE,
        payload: data,
    };
};

export const updateOrderItemStart = (data) => {
  console.log("data start",data);
  return {
      type: actionTypes.UPDATE_ORDER_ITEM_START,
      payload: data,
  };
};
export const updateOrderItemSuccess = (data) => {
  console.log("data successss",data);
  return {
      type: actionTypes.UPDATE_ORDER_ITEM_SUCCESS,
      payload: data,
  };
};
export const updateOrderItemFailure = (data) => {
  return {
      type: actionTypes.UPDATE_ORDER_ITEM_FAILURE,
      payload: data,
  };
};

export const getOrderStart = (data) => {
  console.log("data start",data);
  return {
      type: actionTypes.GET_ORDER_START,
      payload: data,
  };
};
export const getOrderSuccess = (data) => {
  console.log("data successss",data);
  return {
      type: actionTypes.GET_ORDER_SUCCESS,
      payload: data,
  };
};
export const getOrderFailure = (data) => {
  return {
      type: actionTypes.GET_ORDER_FAILURE,
      payload: data,
  };
};

export const updateOrderStart = (data) => {
  console.log("data start",data);
  return {
      type: actionTypes.UPDATE_ORDER_START,
      payload: data,
  };
};
export const updateOrderSuccess = (data) => {
  console.log("data successss",data);
  return {
      type: actionTypes.UPDATE_ORDER_SUCCESS,
      payload: data,
  };
};
export const updateOrderFailure = (data) => {
  return {
      type: actionTypes.UPDATE_ORDER_FAILURE,
      payload: data,
  };
};

export const createRevoultOrderForPaymentStart = (data) => {
  console.log("data start",data);
  return {
      type: actionTypes.CREATE_REVOULT_ORDER_FOR_PAYMENT_START,
      payload: data,
  };
};
export const createRevoultOrderForPaymentSuccess = (data) => {
  console.log("data successss",data);
  return {
      type: actionTypes.CREATE_REVOULT_ORDER_FOR_PAYMENT_SUCCESS,
      payload: data,
  };
};
export const createRevoultOrderForPaymentFailure = (data) => {
  return {
      type: actionTypes.CREATE_REVOULT_ORDER_FOR_PAYMENT_FAILURE,
      payload: data,
  };
};

export const createEtisilatOrderForPaymentStart = (data) => {
  console.log("data start",data);
  return {
      type: actionTypes.CREATE_ETISILAT_ORDER_FOR_PAYMENT_START,
      payload: data,
  };
};
export const createEtisilatOrderForPaymentSuccess = (data) => {
  console.log("data successss",data);
  return {
      type: actionTypes.CREATE_ETISILAT_ORDER_FOR_PAYMENT_SUCCESS,
      payload: data,
  };
};
export const createEtisilatOrderForPaymentFailure = (data) => {
  return {
      type: actionTypes.CREATE_ETISILAT_ORDER_FOR_PAYMENT_FAILURE,
      payload: data,
  };
};

export const getPopularProductsStart = (data) => {
  // console.log("data start",data);
  return {
      type: actionTypes.GET_POPULAR_PRODUCTS_START,
      payload: data,
  };
};
export const getPopularProductsSuccess = (data) => {
  console.log("data successss",data);
  return {
      type: actionTypes.GET_POPULAR_PRODUCTS_SUCCESS,
      payload: data,
  };
};
export const getPopularProductsFailure = (data) => {
  return {
      type: actionTypes.GET_POPULAR_PRODUCTS_FAILURE,
      payload: data,
  };
};

export const messageHandler = () => {
  return {
      type: actionTypes.MESSAGE_HANDLER,
      payload: null,
  };
};

export const createOrderMessageHandler = () => {
  return {
      type: actionTypes.CREATE_ORDER_MESSAGE_HANDLER,
      payload: null,
  };
};