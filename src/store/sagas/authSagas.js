import * as actions from "../actions";
import * as actionsTypes from "../actionTypes";
import {all, fork, put, takeEvery} from "redux-saga/effects";
import AuthService from "../../services/auth.service";
import HttpService from "../../services/http.service";
import { act } from "react";

function* loginStart(action) {
  try {
    console.log("action in loginStart",action);
    //const payload = action.payload;
    //console.log("payload in loginStart",payload);
    // const response = yield AuthService.verifyOtp({
    //   email: action.payload.email,
    //   otp: parseInt(action.payload.otp),
    // });
    
    const response = yield AuthService.login({
      email: action.payload.email,
      password: action.payload.password,
    });

    console.log("response.data.access_token",response);
  
    if(response.data.data.access_token) {//response.statusCode ===  201 //.data.access_token
      console.log("login data return from server",response?.data?.data);
      console.log("Access Token",response.data.data.access_token);

      // localStorage.setItem('access_token',response.data.data.access_token);
      // HttpService.setToken(response.data.accessToken);//set token in header

      HttpService.setToken(response.data?.data?.access_token);//set token in header
      let user = response?.data?.data?.user || {}; 
      HttpService.setUser(user._id);// set userId and role in header

      console.log('storing in localstorage ',user);
      localStorage.setItem('user', JSON.stringify(user)); 
      yield put(actions.loginSuccess(response.data));
    } else {
      yield put(actions.loginFailure("Invalid Creditionals"));
    }
  } catch (err) { 
    let error = err?.response?.data?.message;

    if (!error) {
      error = err?.response?.message || "Network error";
    }
    yield put(actions.loginFailure(error));
  }
}

function* loginStartSaga() {
  yield takeEvery(actionsTypes.LOGIN_START, loginStart);
}

function* signUpStart(action) {
  try { 
    console.log("sign up start saga");
    let payload = action.payload; 
    // const domain ="perfetto.ropay.bg"// window.location.href;
    // console.log("domain",domain);
    // payload['employee_corner']=1;
    console.log('singup payload',payload);
    const role_id = "661fa91d0f11708b9bc19d49"; // this role id is fixed for customer
    // const {signUpName, signUpEmail, cellNumber, signUpPassword} = payload;
    const {name,email,password,mobile_no,domain} = payload;
    console.log("data in payload",name,email,password,mobile_no,domain);
    const data = {name,email,password,mobile_no,role_id,domain};
    console.log("payloadData",data);
    let response = yield AuthService.signup(data);
    console.log('authSagas signUpStart ',response);

    if (response?.data.statusCode==201) {
      yield put(actions.signupSuccess(response));
    } else {  
      yield put(actions.signupFailure(response?.data));
    }
 
  } catch (err) { 
    let error = err?.response?.data?.message;
    if (!error) {
      error = "network error"
    }
    yield put(actions.signupFailure(error));
  }
}

function* sendOtp(action) {
  try { 
    if (action.payload) {
      
      const response = yield AuthService.sendOtp({
        email: action.payload.email,
        rememberMe: true,
      }); 
      console.log('sendOtp resp',response)
      if (response?.data.statusCode==200) {
        yield put(actions.sendOtpSuccess(response));
      } else {
        yield put(actions.sendOtpFailure(response?.data));
      }
    }
  } catch (err) {
    let error = err?.response?.data?.message
    if (!error) error = 'network error'
    
    yield put(actions.sendOtpFailure(error));
  }
}

function* sendOtpSaga() {
  yield takeEvery(actionsTypes.SEND_OTP_START, sendOtp);
}

function* verifyOTP(action){
  console.log("verify OTP saga values",action);
  const data = action.payload;
  const otpResponse =  yield AuthService.verifyOtp(data);
  console.log("otpResponse after Verification is ",otpResponse);
  if(otpResponse){ //.data?.data?.accessToken
    yield put(actions.verifyOtpSuccess(otpResponse));
  }
  else{
    yield put(actions.verifyOtpFailure("Invalid Otp"));
  }
}

function* verifyOtpSaga(){
  yield takeEvery(actionsTypes.VERIFY_OTP_START, verifyOTP);
}

function* sendQuery(action) {
  try { 
    if (action.payload) {
      
      const response = yield AuthService.sendQuery(action.payload); 
      console.log('sendOtp resp',response)
      if (response?.data?.statusCode==200) {
        yield put(actions.sendQuerySuccess(response));
      } else {
        yield put(actions.sendQueryFailure(response?.data));
      }
    }
  } catch (err) {
    let error = err?.response?.data?.message
    if (!error) error = 'network error'
    
    yield put(actions.sendQueryFailure(error));
  }
}

function* sendQuerySaga() {
  yield takeEvery(actionsTypes.SEND_QUERY_START, sendQuery);
}

function* signupStartSaga() {
  yield takeEvery(actionsTypes.SIGNUP_START, signUpStart);
}

export function* authSaga() {
  yield all([fork(loginStartSaga),fork(sendOtpSaga),
           fork(signupStartSaga), fork(sendQuerySaga),
           fork(verifyOtpSaga)]);
}
