import * as actionTypes from "../actionTypes";

const initialState = {
    loading: false,
    restaurantSuccess: null,
    restaurantError: null,
    restaurantLoading: false,
    updateOrderItemSuccess: null,
    createOrder:null,
    createOrderMessage:null,
    updateOrderItemLoading: false,
    updateOrderSuccess:null,
    createRevoultOrderForPaymentSuccess:null,
    createRevoultOrderForPaymentError:null,
    createEtisilatOrderForPaymentSuccess:null,
    createEtisilatOrderForPaymentError:null,
    getPopularProductsSuccess:null,
    getPopularProductsError:null,
    error: null,
    success: null,

};

export const restaurantReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_RESTAURANT_DATA_START:
          return { ...state, loading: true, restaurantError: null, restaurantSuccess: null };
        case actionTypes.GET_RESTAURANT_DATA_SUCCESS:
          return {
            ...state,
            loading: false,
            restaurantError: null,
            restaurantSuccess: action.payload,
          };
        case actionTypes.GET_RESTAURANT_DATA_FAILURE:
          return {
            ...state,
            loading: false,
            restaurantError: action.payload,
            restaurantSuccess: null,
          };

        case actionTypes.UPDATE_ORDER_ITEM_START:
            return { ...state, updateOrderItemLoading: true, error: null, updateOrderItemSuccess: null };
        case actionTypes.UPDATE_ORDER_ITEM_SUCCESS:
            return { ...state, updateOrderItemLoading: false, error: null, updateOrderItemSuccess: action.payload, };
        case actionTypes.UPDATE_ORDER_ITEM_FAILURE:
            return { ...state, updateOrderItemLoading: false, error: action.payload };

        case actionTypes.GET_ORDER_START:
            return { ...state, loading: true, error: null, createOrder: null, createOrderMessage: null };
        case actionTypes.GET_ORDER_SUCCESS:
            return { ...state, loading: false, error: null, createOrder: action.payload, createOrderMessage: action.payload };
        case actionTypes.GET_ORDER_FAILURE:
            return { ...state, loading: false, error: action.payload, createOrder: null, createOrderMessage: null };

        case actionTypes.UPDATE_ORDER_START:
            return { ...state, loading: true, error: null, updateOrderSuccess: null };
        case actionTypes.UPDATE_ORDER_SUCCESS:
            return { ...state, loading: false, error: null, updateOrderSuccess: action.payload, };
        case actionTypes.UPDATE_ORDER_FAILURE:
            return { ...state, loading: false, error: action.payload, updateOrderSuccess: null, };

        case actionTypes.CREATE_REVOULT_ORDER_FOR_PAYMENT_START:
          return { ...state, loading: true, createRevoultOrderForPaymentError: null, createRevoultOrderForPaymentSuccess: null };
        case actionTypes.CREATE_REVOULT_ORDER_FOR_PAYMENT_SUCCESS:
            return { ...state, loading: false, createRevoultOrderForPaymentError: null, createRevoultOrderForPaymentSuccess: action.payload, };
        case actionTypes.CREATE_REVOULT_ORDER_FOR_PAYMENT_FAILURE:
            return { ...state, loading: false, createRevoultOrderForPaymentError: action.payload, createRevoultOrderForPaymentSuccess: null, };

        case actionTypes.CREATE_ETISILAT_ORDER_FOR_PAYMENT_START:
          return { ...state, loading: true, createEtisilatOrderForPaymentError: null, createEtisilatOrderForPaymentSuccess: null };
        case actionTypes.CREATE_ETISILAT_ORDER_FOR_PAYMENT_SUCCESS:
            return { ...state, loading: false, createEtisilatOrderForPaymentError: null, createEtisilatOrderForPaymentSuccess: action.payload, };
        case actionTypes.CREATE_ETISILAT_ORDER_FOR_PAYMENT_FAILURE:
            return { ...state, loading: false, createEtisilatOrderForPaymentError: action.payload, createEtisilatOrderForPaymentSuccess: null, };

        case actionTypes.GET_POPULAR_PRODUCTS_START:
          console.log("===1",)
          return { ...state, restaurantLoading: true, getPopularProductsError: null, getPopularProductsSuccess: null };
        case actionTypes.GET_POPULAR_PRODUCTS_SUCCESS:
          console.log("===2",)
            return { ...state, restaurantLoading: false, getPopularProductsError: null, getPopularProductsSuccess: action.payload, };
        case actionTypes.GET_POPULAR_PRODUCTS_FAILURE:
          console.log("===3",)
            return { ...state, restaurantLoading: false, getPopularProductsError: action.payload, getPopularProductsSuccess: null, };

        case actionTypes.MESSAGE_HANDLER:
          return {
            ...state,
            loading: false,
            restaurantError: action.payload,
            restaurantLoading: false,
            updateOrderItemSuccess:action.payload,
            createOrder:action.payload,
            updateOrderSuccess:action.payload,
            createRevoultOrderForPaymentSuccess:action.payload,
            createRevoultOrderForPaymentError:action.payload,
            createEtisilatOrderForPaymentSuccess:action.payload,
            createEtisilatOrderForPaymentError:action.payload,
            getPopularProductsSuccess:action.payload,
            getPopularProductsError:action.payload,
            error: action.payload,
            success: action.payload,
          };

        case actionTypes.CREATE_ORDER_MESSAGE_HANDLER:
          return {
            ...state,
            createOrderMessage:action.payload,
          };

        default:
            return {...state};
    }
};

