import * as actionTypes from "../actionTypes";

const initialState = {
    loading: false,
    PaymentDetails: null,
    success: null,
    error: null,
    PaymentError: null,
    UpdatePaymentError: null,
    UpdatePayment: null,
    paymentGateways: null,
    payStatus: null
};
export const paymentReducer = (state = initialState, action) => {
    // console.log(action.type,' restaurantReducer ',action.payload);
    switch (action.type) {
        case actionTypes.SET_PAY_STATUS:
            return {  ...state, payStatus: action.payload};

        case actionTypes.GET_PAYMENT_GATEWAYS_START:
            return { ...state, paymentGateways: null };
        case actionTypes.GET_PAYMENT_GATEWAYS_SUCCESS: {
            return {
                ...state,
                paymentGateways: action.payload,
            };
        };
        case actionTypes.GET_PAYMENT_GATEWAYS_FAILURE:
            return {
                ...state,
                paymentGateways:null,
            };

        case actionTypes.GET_ORDER_PAYMENT_LIST_START:
            return { ...state, loading: true, PaymentError: null, PaymentDetails: null };
        case actionTypes.GET_ORDER_PAYMENT_LIST_SUCCESS: {
            return {
                ...state,
                loading: false,
                PaymentDetails: action.payload,
            };
        };
        case actionTypes.GET_ORDER_PAYMENT_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                PaymentError: action.payload,
                PaymentDetails: null,
            };
        case actionTypes.UPDATE_ORDER_PAYMENT_START:
            return { ...state, loading: true, UpdatePaymentError: null, UpdatePayment: null };
        case actionTypes.UPDATE_ORDER_PAYMENT_SUCCESS: {
            return {
                ...state,
                loading: false,
                UpdatePayment: action.payload,
                UpdatePaymentError: null,
            };
        };
        case actionTypes.UPDATE_ORDER_PAYMENT_FAILURE:
            return {
                ...state,
                loading: false,
                UpdatePaymentError: action.payload,
                UpdatePayment: null,
            };

        case actionTypes.MESSAGE_HANDLER:
            return {
                ...state,
                loading: false,
                PaymentError: action.payload,
                success: action.payload,
                UpdatePaymentError: action.payload,
                UpdatePayment: action.payload,
                PaymentDetails: action.payload,
                paymentGateways: action.payload
            };

        default:
            return { ...state };
    }
};
