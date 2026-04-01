import * as actionTypes from "../actionTypes";

const initialState = {
  loading: false,
  branchList: null,
  branchListError: null,
  success: null,
  error: null, 
};
export const branchReducer = (state = initialState, action) => {
  // console.log(action.type,' restaurantReducer ',action.payload);
  switch (action.type) {
    case actionTypes.GET_BRANCH_LIST_START:
      return { ...state, loading: true, error:null, branchListError: null, branchList: null };
    case actionTypes.GET_BRANCH_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        branchListError: null,
        branchList: action.payload,
      };
    };
    case actionTypes.GET_BRANCH_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        branchListError: action.payload,
        error:action.payload,
        branchList: null,
      };
 
    case actionTypes.MESSAGE_HANDLER:
      return {
        ...state,
        loading: false,
        branchListError: action.payload,
        error: action.payload,
        success: action.payload,
      };

    default:
      return { ...state };
  }
};
