import * as actions from "../actions";
import * as actionsTypes from "../actionTypes";
import { put, takeEvery, all, fork } from "redux-saga/effects";
import axios from 'axios';
import HomeService from '../../services/home.service'




function* getBannersStart(action) {
  try {
    const response = yield HomeService.getBanners();
    if (response?.data) {
      yield put(actions.getBannersSuccess(response?.data));
    } else {
      yield put(actions.getBannersFailure("network error"));
    }

  } catch (err) {
    let error = err?.response?.data?.message
    if (!error) error = 'network error'

    yield put(actions.getBannersFailure(error));
  }
}
function* getBannersSaga() {
  yield takeEvery(actionsTypes.GET_BANNERS_START, getBannersStart);
}




export function* bannerSaga() {
  yield all([
    fork(getBannersSaga),
    
  ]);
}
