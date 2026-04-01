import * as actionTypes from "../actionTypes";
import {setUserDataInLocalStorage} from "../../services/utils";

export const loginStart = (data) => {
  return {
    type: actionTypes.LOGIN_START,
    payload: data,
  };
};
export const loginSuccess = (data) => {
  console.log('loginSuccess auth.js ',data);
  
  localStorage.setItem('access_token', data?.data?.access_token);
  setUserDataInLocalStorage(data.user);
  let d = {user: null, message: 'Successfully loggedIn '}
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: data,
  };
};
export const loginFailure = (error) => {

  return {
    type: actionTypes.LOGIN_FAILURE,
    payload: error,
  };
};
export const signupStart = (data) => {
  return {
    type: actionTypes.SIGNUP_START,
    payload: data,
  };
};
export const signupSuccess = (data, signup) => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    payload: data,
};
};
export const signupFailure = (error) => {
  return {
    type: actionTypes.SIGNUP_FAILURE,
    payload: error,
  };
};
export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
    payload: null,
  };
};

export const logoutSuccess = () => { 
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');

  return {
    type: actionTypes.LOGOUT_SUCCESS,
    payload: null,
  };
};

export const loginErrorHandlerSuccess = () => {
  return {
    type: actionTypes.LOGIN_ERROR_HANDLER_SUCCESS,
    payload: null,
  };
};
export const sendOtp = (data) => {
  return {
      type: actionTypes.SEND_OTP_START,
      payload: data,
  };
};
export const sendOtpSuccess = (data) => {
  //console.log('sendOtpSuccess ',data.data);
  return {
      type: actionTypes.SEND_OTP_SUCCESS,
      payload: data.data,

  };
};
export const sendOtpFailure = (data) => {
  return {
      type: actionTypes.SEND_OTP_FAILURE,
      payload: data,
  };
}

export const verifyOtp = (data) => {
  return {
      type: actionTypes.VERIFY_OTP_START,
      payload: data,
  };
};
export const verifyOtpSuccess = (data) => {
  //console.log('sendOtpSuccess ',data.data);
  return {
      type: actionTypes.VERIFY_OTP_SUCCESS,
      payload: data,

  };
};
export const verifyOtpFailure = (data) => {
  return {
      type: actionTypes.VERIFY_OTP_FAILURE,
      payload: data,
  };
}
export const verifyOtpHandlerSuccess = (data) => {
  return {
      type: actionTypes.VERIFY_OTP_MESSAGE_HANDLER,
      payload: null,
  };
}




export const sendQuery = (data) => {
  return {
      type: actionTypes.SEND_QUERY_START,
      payload: data,
  };
};
export const sendQuerySuccess = (data) => {
  //console.log('sendOtpSuccess ',data.data);
  return {
      type: actionTypes.SEND_QUERY_SUCCESS,
      payload: data.data,

  };
};
export const sendQueryFailure = (data) => {
  return {
      type: actionTypes.SEND_QUERY_FAILURE,
      payload: data,
  };
};