import * as actionTypes from "../actionTypes";

export const dashboardStart = (data) => {
    return {
        type: actionTypes.DASHBOARD_START,
        payload: data,
    };
};
export const dashboardSuccess = (data) => {
    return {
        type: actionTypes.DASHBOARD_SUCCESS,
        payload: data,
    };
};
export const dashboardFailure = (error) => {
    return {
        type: actionTypes.DASHBOARD_FAILURE,
        payload: error,
    };
};

export const dashboardErrorHandlerSuccess = () => {
    return {
        type: actionTypes.DASHBOARD_ERROR_HANDLER_SUCCESS,
        payload: null,
    };
};
