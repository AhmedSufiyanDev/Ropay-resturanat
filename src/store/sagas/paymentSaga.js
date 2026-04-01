import * as actions from "../actions";
import * as actionsTypes from "../actionTypes";
import {put, takeEvery, all, fork, takeLatest} from "redux-saga/effects";
import PaymentService from "../../services/payment.service";
import restaurantService from "../../services/restaurant.service";
import { act } from "react-dom/test-utils";
import { Restaurant } from "@material-ui/icons";

function* getPaymentGateways() {
  try {
    const response = yield PaymentService.listPaymentGateways();

    if (response?.data.statusCode === 200) {
      yield put(actions.getPaymentGatewaysSuccess(response.data));
    } else {
      yield put(actions.getPaymentGatewaysFailure("network error"));
    }
  } catch (err) {
    let error = err?.response?.data?.message
    if (!error) {
      error = 'network error'
    }
    yield put(actions.getPaymentGatewaysFailure(error));
  }
}

function* getPaymentGatewaysSaga() {
  yield takeLatest(actionsTypes.GET_PAYMENT_GATEWAYS_START, getPaymentGateways);
}

function* paymentDetails(action) {
  try {
    let payload = action.payload
    const response = yield PaymentService.paymentDetails(payload);//params
    console.log('payment list response userSagas============ ',response);
    if (response?.data.statusCode === 200) {
      yield put(actions.getOrderPaymentSuccess(response));
    } else {
        console.log('IN ERRor',response.status,response.message)
      yield put(actions.getOrderPaymentFailure({status:response?.data?.status,message:response?.data?.message}));
    }
  } catch (err) {
    let error = err?.response?.data?.message
    if (!error) {
      error = 'network error'
    }
    yield put(actions.getOrderPaymentFailure(error));
  }
}

function* paymentDetailsSaga() {
  yield takeEvery(actionsTypes.GET_ORDER_PAYMENT_LIST_START, paymentDetails);
}

function* UpdateOrderPaymentDetails(action) { 
    try {
      if (action) {
        const payload = action.payload;
        console.log("payload",payload);
        const response = yield restaurantService.updateOrder(payload);
        console.log('res',response)
        if (response?.data.statusCode==201 || response?.data.statusCode==200) {
        //   localStorage.setItem("sessionId",response?.data?.data)
          yield put(actions.updateOrderPaymentSuccess(response?.data));
        } 
        else {
          yield put(actions.updateOrderPaymentFailure(response?.data));
        }
      }
    } catch (err) {
      let error = err?.response?.data?.message
      if (!error) error = 'network error'
  
      yield put(actions.updateOrderPaymentFailure(error));
    }
  }
  
  function* updateOrderPaymentDetailsSaga() {
    yield takeEvery(actionsTypes.UPDATE_ORDER_PAYMENT_START, UpdateOrderPaymentDetails);
  }

export function* paymentSaga() {
  yield all([fork(getPaymentGatewaysSaga),fork(paymentDetailsSaga),fork(updateOrderPaymentDetailsSaga)]);
}
