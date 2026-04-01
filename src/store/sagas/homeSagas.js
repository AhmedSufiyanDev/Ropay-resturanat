import * as actions from "../actions";
import * as actionsTypes from "../actionTypes";
import { put, takeEvery, all, fork } from "redux-saga/effects";
import axios from 'axios';
import HomeService from '../../services/home.service'




function* getRestaurantCategoriesStart(action) {
  try {
    let restaurant_id = null;
    let language_id = null;
    if(action){
      restaurant_id = action.payload?.restaurant_id;
      language_id = action.payload?.language_id;
    }
    const response = yield HomeService.getCategories(restaurant_id, language_id);
    if (response?.data) {
      yield put(actions.getRestaurantCategoriesSuccess(response.data.data));
    } else {
      yield put(actions.getRestaurantCategoriesFailure("network error"));
    }

  } catch (err) {
    let error = err?.response?.data?.message
    if (!error) error = 'network error'

    yield put(actions.getBannersFailure(error));
  }
}
function* getRestaurantCategoriesSaga() {
  yield takeEvery(actionsTypes.GET_RESTAURANT_CATEGORIES_START, getRestaurantCategoriesStart);
}



function* getProductStart(action) {
  try {
    let category_id = null;
    let category_ids = [];
    if(action.payload?.selectedCategoryId)
      category_id = action.payload?.selectedCategoryId;
    else if(action.payload?.category_ids)
      category_ids = action.payload?.category_ids;
    const language_id = action.payload?.language_id;
    const status = 1;
    let response = null;
    if(category_id)
      response = yield HomeService.getProducts(category_id, language_id, status);
    else if(category_ids){
      const data = {
        category_ids, language_id, status
      }
      response = yield HomeService.getAllCategoriesProducts(data);
    }
    if (response?.data) {
      yield put(actions.getProductSuccess(response?.data));
    } else {
      yield put(actions.getProductFailure("network error"));
    }

  } catch (err) {
    let error = err?.response?.data?.message
    if (!error) error = 'network error'

    yield put(actions.getProductFailure(error));
  }
}
function* getProductsSaga() {
  yield takeEvery(actionsTypes.GET_PRODUCT_LIST_START, getProductStart);
}

function* getCartItemsStart(action) {
  try {
    const order_id = action.payload?.order_id;
    const language_id = action.payload?.language_id;
    const status = 1;
    const response = yield HomeService.getCartItems(order_id, language_id, status);
    if (response?.data) {
      yield put(actions.getCartItemsSuccess(response?.data));
    } else {
      yield put(actions.getCartItemsFailure("network error"));
    }

  } catch (err) {
    let error = err?.response?.data?.message
    if (!error) error = 'network error'

    yield put(actions.getCartItemsFailure(error));
  }
}
function* getCartItemsSaga() {
  yield takeEvery(actionsTypes.GET_CART_ITEMS_LIST_START, getCartItemsStart);
}


export function* categorySaga() {
  yield all([fork(getRestaurantCategoriesSaga)]);
}
export function* productSaga() {
  yield all([fork(getProductsSaga),fork(getCartItemsSaga)]);
}
