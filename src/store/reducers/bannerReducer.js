import * as actionTypes from "../actionTypes";

const initialState = {
    loading: false,
    bannersData: null,
    error: null,
    success: null,

};

export const bannerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_BANNERS_START:
            return { ...state, bannersLoading: true, error: null, success: null, bannersData: null };
        case actionTypes.GET_BANNERS_SUCCESS:
            return { ...state, bannersLoading: false, error: null, success: null, bannersData: action.payload, };
        case actionTypes.GET_BANNERS_FAILURE:
            return { ...state, bannersLoading: false, error: action.payload, success: null, };
        default:
            return {...state};
    }
};

