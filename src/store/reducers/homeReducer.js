import * as actionTypes from "../actionTypes";

const initialState = {
    loading: false,
    homeLoading: false,
    category: null,
    productsList:null,
    cartItemsList:null,
    error: null,
    success: null,
    productLoading:false,//null,
    cartItemsLoading:null,

};

export const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_RESTAURANT_CATEGORIES_START:
            return { ...state, loading: true, homeLoading:true , error: null, success: null, category: null };
        case actionTypes.GET_RESTAURANT_CATEGORIES_SUCCESS:
            return { ...state, loading: false,homeLoading:false, error: null, success: action.payload.success, category: action.payload, };
        case actionTypes.GET_RESTAURANT_CATEGORIES_FAILURE:
            return { ...state, loading: false,homeLoading:false, error: action.payload, success: null, };


        case actionTypes.GET_PRODUCT_LIST_START:
            return { ...state, productLoading: true, error: null, success: null, productsList: null };
        case actionTypes.GET_PRODUCT_LIST_SUCCESS:
            return { ...state, productLoading: false, error: null, success: action.payload.success, productsList: action.payload, };
        case actionTypes.GET_PRODUCT_LIST_FAILURE:
            return { ...state, productLoading: false, error: action.payload, success: null, };

        case actionTypes.GET_CART_ITEMS_LIST_START:
            return { ...state, cartItemsLoading: true, error: null, success: null, cartItemsList: null };
        case actionTypes.GET_CART_ITEMS_LIST_SUCCESS:
            return { ...state, cartItemsLoading: false, error: null, success: action.payload.success, cartItemsList: action.payload, };
        case actionTypes.GET_CART_ITEMS_LIST_FAILURE:
            return { ...state, cartItemsLoading: false, error: action.payload, success: null, };

        default:
            return {...state};
    }
};

