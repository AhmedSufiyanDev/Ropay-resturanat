import * as actionTypes from "../actionTypes";
import { verifyOtp, verifyOtpFailure } from "../actions";

const initialState = {
  loading: false,
  user: null,
  error: null,
  success: null,
  sendOtpData: null,
  sendOtpError: null,

  verifyOtpData :null,
  verifyOtpError :null,

  sendQueryData: null,
  sendQueryError: null,

  loggedInSuccess:false,
  loggedInError:false,

  signUpSuccess:false,
  signUpError:false,
};

export const authReducer = (state = initialState, action) => {
  //console.log('authReducer ',actionTypes.SEND_OTP_SUCCESS,' action.payload ',action.payload);
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return {...state, loading: true, loggedInError: false, success: null, user: null};
    case actionTypes.LOGIN_SUCCESS:
      return {...state, loading: false, loggedInError: false, success: action.payload.message,loggedInSuccess:true};
    case actionTypes.LOGIN_FAILURE:
      return {...state, loading: false, loggedInError: true,success:null, user: null,loggedInSuccess:false};

    case actionTypes.SIGNUP_START:
      return {...state, loading: true, signUpError: false, signUpSuccess: false};
    case actionTypes.SIGNUP_SUCCESS:
      return {...state, loading: false, signUpError: false, signUpSuccess: true};
    case actionTypes.SIGNUP_FAILURE:
      return {...state, loading: false,error: action.payload, signUpError: true, signUpSuccess: false};

    /** SEND OTP START */
    case actionTypes.SEND_OTP_START:
      return { ...state, loading: true, sendOtpError: null, sendOtpData: null };

    case actionTypes.SEND_OTP_SUCCESS:
      return {  ...state, loading: false, sendOtpError: null, sendOtpData: action.payload, };

    case actionTypes.SEND_OTP_FAILURE:
      return { ...state, loading: false, sendOtpError: action.payload, sendOtpData: null, };
    /** END */

    /** Verify OTP START */
    case actionTypes.VERIFY_OTP_START:
      return {...state,loading:true, verifyOtpError:null, verifyOtpData:null};
    
    case actionTypes.VERIFY_OTP_SUCCESS:
      return {...state,loading:true, verifyOtpError:null, verifyOtpData:action.payload};

    case actionTypes.VERIFY_OTP_FAILURE:
      return {...state,loading:true, verifyOtpError:action.payload, verifyOtpData:null};

    case actionTypes.VERIFY_OTP_MESSAGE_HANDLER:
      return {...state,loading:false, verifyOtpData:action.payload};
    /**END */




    /** SEND QUERY START */
    case actionTypes.SEND_QUERY_START:
      return { ...state, loading: true, sendQueryError: null, sendQueryData: null };

    case actionTypes.SEND_QUERY_SUCCESS:
      return {  ...state, loading: false, sendQueryError: null, sendQueryData: action.payload, };

    case actionTypes.SEND_QUERY_FAILURE:
      return { ...state, loading: false, sendQueryError: action.payload, sendQueryData: null, };
    /** END */

    case actionTypes.LOGOUT:
      return {...state, loading: true, error: null, success: null, user: {}, loggedInSuccess:false};
    case actionTypes.LOGOUT_SUCCESS:
      return {...state, loading: false, error: null, success: null, user: null};

    case actionTypes.LOGIN_ERROR_HANDLER_SUCCESS:
      return {...state, loading: false, error: action.payload, success: action.payload,};
    default:
      return {
        ...state, 
        loggedInSuccess:false,
        loggedInError: false, 
        signUpSuccess:false,
        signUpError:false,
        sendOtpData: null,
        sendOtpError:null,
        error:null, 
        loading: false
      };
  }
};
