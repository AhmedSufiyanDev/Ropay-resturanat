import * as actionTypes from "../actionTypes";

export const setPayStatus = (data) => {
    return {
        type: actionTypes.SET_PAY_STATUS,
        payload: data,
    };
};

export const getPaymentGateways = (data) => {
    return {
        type: actionTypes.GET_PAYMENT_GATEWAYS_START,
        payload: data,
    };
};
export const getPaymentGatewaysSuccess = (data) => {
    console.log("data in action of getPaymentGatewaysSuccess",data.data);
    return {
        type: actionTypes.GET_PAYMENT_GATEWAYS_SUCCESS,
        payload: data,
    };
};

export const getPaymentGatewaysFailure = (data) => {
    return {
        type: actionTypes.GET_PAYMENT_GATEWAYS_FAILURE,
        payload: data,
    };
};

export const getOrderPaymentStart = (data) => {
    return {
        type: actionTypes.GET_ORDER_PAYMENT_LIST_START,
        payload: data,
    };
};
export const getOrderPaymentSuccess = (data) => {
    console.log('Action',data)
    return {
        type: actionTypes.GET_ORDER_PAYMENT_LIST_SUCCESS,
        payload: data,

    };
};
export const getOrderPaymentFailure = (data) => {
    return {
        type: actionTypes.GET_ORDER_PAYMENT_LIST_FAILURE,
        payload: data,
    };
};

// Payment Update At our end

export const updateOrderPaymentStart = (data) => {
    return {
        type: actionTypes.UPDATE_ORDER_PAYMENT_START,
        payload: data,
    };
};

export const updateOrderPaymentSuccess = (data) => {
    return {
        type: actionTypes.UPDATE_ORDER_PAYMENT_SUCCESS,
        payload: data,
    };
};

export const updateOrderPaymentFailure = (data) => {
    return {
        type: actionTypes.UPDATE_ORDER_PAYMENT_FAILURE,
        payload: data,
    };
};

export const paymentMessageHandler = () => {
  return {
      type: actionTypes.MESSAGE_HANDLER,
      payload: null,
  };
};