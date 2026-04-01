import * as actionTypes from "../actionTypes";

const initialState = {
  loading: false,
  usersList: null,
  usersListError: null,
  userLoading: false,
  user: null,
  userDataError: null,
  success: null,
  error: null,
  servicesList: null

};
export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USERS_LIST_START:
      return { ...state, loading: true, usersListError: null, usersList: null };
    case actionTypes.GET_USERS_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        usersListError: null,
        usersList: action.payload,
      };
    };
    case actionTypes.GET_USERS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        usersListError: action.payload,
        usersList: null,
      };

    case actionTypes.GET_USER_DATA_START:
      return { ...state, userLoading: true, userDataError: null, user: null };
    case actionTypes.GET_USER_DATA_SUCCESS:
      return {
        ...state,
        userLoading: false,
        userDataError: null,
        user: action.payload,
      };
    case actionTypes.GET_USER_DATA_FAILURE:
      return {
        ...state,
        userLoading: false,
        userDataError: action.payload,
        user: null,
      };

    case actionTypes.UPDATE_USER_START:
      return { ...state, loading: true, success: null, error: null };
    case actionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
        error: null
      };
    case actionTypes.UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,   
        success: null,
      }; 

    case actionTypes.DELETE_USER_START:
      return { ...state, loading: true, success: null, error: null };
    case actionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
        error: null
      };
    case actionTypes.DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: null,
      };

    ////////userServicesList//////////////////////
    case actionTypes.SET_USER_SERVICES_LIST: 
      return {
        ...state,
        servicesList: action.payload,
      };

    case actionTypes.MESSAGE_HANDLER:
      return {
        ...state,
        loading: false,
        usersListError: action.payload,
        userDataError: action.payload,
        error: action.payload,
        success: action.payload,
      };
    default:
      return { ...state };
  }
};
