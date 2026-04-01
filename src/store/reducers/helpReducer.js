import * as actionTypes from "../actionTypes";

const initialState = {
  loading: false,
  data: null,
  open: false,
  handler: null
};

const dummyHandler = () => {
}
export const helpReducer = (state = initialState, action) => { 
  switch (action.type) {
    case actionTypes.HELP_HANDLER:
      return {
        ...state,
        open: action.payload?.open,
        data: action.payload.data,
        handler: action.payload.handler ?? dummyHandler
      };

    default:
      return {...state};
  }
};
