import * as actionTypes from "../actionTypes";

const initialState = {
  loading: false,
  data: null,
  open: false,
  handler: null
};

const dummyHandler = () => {
}
export const confirmationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CONFIRMATION_MODAL:
      return {
        ...state,
        error: action.payload?.open,
        open: action.payload?.open,
        data: action.payload.data,
        handler: action.payload.handler ?? dummyHandler
      };

    default:
      return {...state};
  }
};
