import * as actionTypes from "../actionTypes";


export const confirmationHandler = (data) => {
  return {
    type: actionTypes.CONFIRMATION_MODAL,
    payload: data,
  };
};
