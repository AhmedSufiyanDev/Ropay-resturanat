import * as actionTypes from "../actionTypes";

export const getBranchList = (data) => {
    return {
        type: actionTypes.GET_BRANCH_LIST_START,
        payload: data,
    };
};
export const getBranchListSuccess = (data) => {
    // console.log("data in action of getBranchListSuccess",data.data);
    return {
        type: actionTypes.GET_BRANCH_LIST_SUCCESS,
        payload: data,
    };
};

export const getBranchListFailure = (data) => {
    return {
        type: actionTypes.GET_BRANCH_LIST_FAILURE,
        payload: data,
    };
};

export const messageHandler = () => {
    return {
        type: actionTypes.MESSAGE_HANDLER,
        payload: null,
    };
};