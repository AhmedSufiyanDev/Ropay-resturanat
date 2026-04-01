import * as actions from "../actions";
import * as actionsTypes from "../actionTypes";
import { put, takeEvery, all, fork } from "redux-saga/effects";
import axios from 'axios';
import RestaurantService from '../../services/restaurant.service';


function* getRestaurantByDomain(action) {
  try {
    if (action.payload) {
      const domain = action.payload;
      const status = 1;
      let params = {domain, status};

      const response = yield RestaurantService.getRestaurantByDomain(params);
      if (response?.data.statusCode === 200) {
        yield put(actions.getRestaurantDataSuccess(response.data));
      } else {
        yield put(actions.getRestaurantDataFailure("network error"));
      }
    }
  } catch (err) {
    let error = err?.response?.data?.message
    if (!error) {
      error = 'network error'
    }
    yield put(actions.getRestaurantDataFailure(error));
  }
}

function* getRestaurantDataSaga() {
  yield takeEvery(actionsTypes.GET_RESTAURANT_DATA_START, getRestaurantByDomain);
}



// function* CreateOrder(action) {
//   try {
//     if (action.payload) {
//       const sessionId = action.payload?.sessionId;
//       const split_type = action.payload?.split_type;
//       const type = action.payload?.type;
//       const user_id = action.payload?.user_id;
//       const restraunt_id = action.payload?.restraunt_id;
//       const quantity = action.payload?.quantity;
//       const price = action.payload?.price;
//       const category_id = action.payload?.category_id;
//       const product_id = action.payload?.product_id;
//       const personalDetails = action.payload?.personalDetails; // Add personalDetails here

//       let params = { sessionId, split_type, type, user_id, restraunt_id, quantity, price, category_id, product_id,personalDetails }
//       const response = yield RestaurantService.createOrder(params);
//       // if (response?.data.statusCode == 201 ) {
//         if (response?.data) {
//         yield put(actions.getOrderSuccess(response?.data));
//       }
//       else {
//         yield put(actions.getOrderFailure(response?.data));
//       }
//     }
//   } catch (err) {
//     let error = err?.response?.data?.message
//     if (!error) error = 'network error'

//     yield put(actions.getOrderFailure(error));
//   }
// }

function* UpdateOrderItem(action) { 
  try {
    if (action) {
      const payload = action.payload;
      console.log("payload",payload);
      const response = yield RestaurantService.updateOrderItem(payload);
      console.log("response",response);
      if (response?.data.statusCode==201 || response?.data.statusCode==200) {
        yield put(actions.updateOrderItemSuccess(response?.data));
      } 
      else {
        yield put(actions.updateOrderItemFailure(response?.data));
      }
    }
  } catch (err) {
    let error = err?.response?.data?.message
    if (!error) error = 'network error'

    yield put(actions.updateOrderItemFailure(error));
  }
}

function* updateOrderItemSaga() {
  yield takeEvery(actionsTypes.UPDATE_ORDER_ITEM_START, UpdateOrderItem);
}

function* CreateOrder(action) { 
  try {
    if (action) {
      const payload = action.payload;
      console.log("payload",payload);
      const response = yield RestaurantService.createOrder(payload);
      if (response?.data.statusCode==201 || response?.data.statusCode==200) {
        localStorage.setItem("sessionId",response?.data?.data?.sessionId)
        localStorage.setItem("orderId",response?.data?.data?.orderId)
        yield put(actions.getOrderSuccess(response?.data));
      } 
      else {
        yield put(actions.getOrderFailure(response?.data));
      }
    }
  } catch (err) {
    let error = err?.response?.data?.message
    if (!error) error = 'network error'

    yield put(actions.getOrderFailure(error));
  }
}

function* createOrderSaga() {
  yield takeEvery(actionsTypes.GET_ORDER_START, CreateOrder);
}

function* UpdateOrder(action) { 
  try {
    if (action) {
      const payload = action.payload;
      console.log("payload",payload);
      const response = yield RestaurantService.updateOrder(payload);
      console.log('res',response)
      if (response?.data.statusCode==201 || response?.data.statusCode==200) {
        // localStorage.setItem("sessionId",response?.data?.data?.sessionId)
        yield put(actions.updateOrderSuccess(response?.data));
      } 
      else {
        yield put(actions.updateOrderFailure(response?.data));
      }
    }
  } catch (err) {
    let error = err?.response?.data?.message
    if (!error) error = 'network error'

    yield put(actions.updateOrderFailure(error));
  }
}

function* updateOrderSaga() {
  yield takeEvery(actionsTypes.UPDATE_ORDER_START, UpdateOrder);
}

function* CreateRevoultOrderForPayment(action) { 
  try {
    if (action) {
      const payload = action.payload;
      console.log("payload",payload);
      const response = yield RestaurantService.createOrderForPayment(payload);
      if (response?.data.statusCode==201 || response?.data.statusCode==200) {
        // localStorage.setItem("sessionId",response?.data?.data?.sessionId)
        yield put(actions.createRevoultOrderForPaymentSuccess(response?.data));
      } 
      else {
        yield put(actions.createRevoultOrderForPaymentFailure(response?.data?.message));
      }
    }
  } catch (err) {
    let error = err?.response?.data?.message
    if (!error) error = 'network error'

    yield put(actions.createRevoultOrderForPaymentFailure(error));
  }
}

function* createRevoultOrderForPaymentSaga() {
  yield takeEvery(actionsTypes.CREATE_REVOULT_ORDER_FOR_PAYMENT_START, CreateRevoultOrderForPayment);
}

function* CreateEtisilatOrderForPayment(action) { 
  try {
    if (action) {
      const payload = action.payload;
      console.log("payload",payload);
      const response = yield RestaurantService.createOrderForPayment(payload);
      if (response?.data.statusCode==201 || response?.data.statusCode==200) {
        // localStorage.setItem("sessionId",response?.data?.data?.sessionId)
        yield put(actions.createEtisilatOrderForPaymentSuccess(response?.data));
      } 
      else {
        yield put(actions.createEtisilatOrderForPaymentFailure(response?.data?.message));
      }
    }
  } catch (err) {
    let error = err?.response?.data?.message
    if (!error) error = 'network error'

    yield put(actions.createEtisilatOrderForPaymentFailure(error));
  }
}

function* createEtisilatOrderForPaymentSaga() {
  yield takeEvery(actionsTypes.CREATE_ETISILAT_ORDER_FOR_PAYMENT_START, CreateEtisilatOrderForPayment);
}

function* GetPopularProducts(action) { 
  try {
    if (action) {
      const payload = action.payload;
      // console.log("payload",payload);
      const response = yield RestaurantService.getPopularProducts(payload);
      if (response?.data.statusCode==201 || response?.data.statusCode==200) {
        // localStorage.setItem("sessionId",response?.data?.data?.sessionId)
        yield put(actions.getPopularProductsSuccess(response?.data));
      } 
      else {
        yield put(actions.getPopularProductsFailure(response?.data?.message));
      }
    }
  } catch (err) {
    let error = err?.response?.data?.message
    if (!error) error = 'network error'

    yield put(actions.getPopularProductsFailure(error));
  }
}

function* getPopularProductsSaga() {
  yield takeEvery(actionsTypes.GET_POPULAR_PRODUCTS_START, GetPopularProducts);
}

export function* restaurantSaga() {
  yield all([fork(getRestaurantDataSaga), fork(updateOrderItemSaga), fork(createOrderSaga), fork(updateOrderSaga), fork(createRevoultOrderForPaymentSaga), fork(createEtisilatOrderForPaymentSaga), fork(getPopularProductsSaga)]);
}
