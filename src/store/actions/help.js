import * as actionTypes from "../actionTypes";


export const helpHandler = (data) => {
  return {
    type: actionTypes.HELP_HANDLER,
    payload: data,
  };
};
