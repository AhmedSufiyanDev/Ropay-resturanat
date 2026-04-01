import * as actionTypes from "../actionTypes";

const initialState = {
    loading: false,
    dashboard: null,
    error: null,
};

export const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.DASHBOARD_START:
            return {...state, loading: true, error: null, dashboard: null};
        case actionTypes.DASHBOARD_SUCCESS:
            return {...state, loading: false, error: null, dashboard: action.payload};
        case actionTypes.DASHBOARD_FAILURE:
            return {...state, loading: false, error: action.payload, dashboard: null};
        default:
            return {...state};
    }
};
