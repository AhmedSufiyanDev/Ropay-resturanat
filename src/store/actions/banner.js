
import * as actionTypes from "../actionTypes";


export const getBannersStart = (data) => {
  return {
      type: actionTypes.GET_BANNERS_START,
      payload: data,
  };
};
export const getBannersSuccess = (data) => {
  return {
      type: actionTypes.GET_BANNERS_SUCCESS,
      payload: data,
  };
};
export const getBannersFailure = (data) => {
  return {
      type: actionTypes.GET_BANNERS_FAILURE,
      payload: data,
  };
};
