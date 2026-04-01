import * as actionTypes from "../actionTypes";

export const getUsersList = (data) => {
    return {
        type: actionTypes.GET_USERS_LIST_START,
        payload: data,
    };
};
export const getUsersListSuccess = (data) => {
    return {
        type: actionTypes.GET_USERS_LIST_SUCCESS,
        payload: data.data,
    };
};
export const getUsersListFailure = (data) => {
    return {
        type: actionTypes.GET_USERS_LIST_FAILURE,
        payload: data,
    };
};

export const getUserData = (data) => {
    return {
        type: actionTypes.GET_USER_DATA_START,
        payload: data,
    };
};
export const getUserDataSuccess = (data) => {
    return {
        type: actionTypes.GET_USER_DATA_SUCCESS,
        payload: data,

    };
};
export const getUserDataFailure = (data) => {
    return {
        type: actionTypes.GET_USER_DATA_FAILURE,
        payload: data,
    };
};

export const addNewUser = (data) => {
    return {
        type: actionTypes.ADD_NEW_USER_START,
        payload: data,
    };
};

export const updateUser = (data) => {
    return {
        type: actionTypes.UPDATE_USER_START,
        payload: data,
    };
};
export const updateUserSuccess = (data) => {
    return {
        type: actionTypes.UPDATE_USER_SUCCESS,
        payload: data,
    };
};
export const updateUserFailure = (data) => {
    return {
        type: actionTypes.UPDATE_USER_FAILURE,
        payload: data,
    };
};

///////////////userServicesList///////
export const setUserServicesList = (data) => {
    return {
        type: actionTypes.SET_USER_SERVICES_LIST,
        payload: data,
    };
};

export const deleteUser = (data) => {
    return {
        type: actionTypes.DELETE_USER_START,
        payload: data,
    };
};
export const deleteUserSuccess = (data) => {
    return {
        type: actionTypes.DELETE_USER_SUCCESS,
        payload: data,
    };
};
export const deleteUserFailure = (data) => {
    return {
        type: actionTypes.DELETE_USER_FAILURE,
        payload: data,
    };
};

export const messageHandler = () => {
    return {
        type: actionTypes.MESSAGE_HANDLER,
        payload: null,
    };
};
