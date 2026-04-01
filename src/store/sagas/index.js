import {all} from "redux-saga/effects";
import {authSaga} from "./authSagas";
import {dashboardSaga} from "./dashboardSagas";
import {userSaga} from "./userSagas";
import{bannerSaga} from "./bannerSagas";
import{categorySaga} from "./homeSagas";
import{productSaga} from "./homeSagas";
import{languageSaga} from "./languageSagas";
import{restaurantSaga} from "./restaurantSagas";
import{branchSaga} from "./branchSagas";
import { paymentSaga } from "./paymentSaga";
export function* rootSaga(getState) {
  yield all([
    authSaga(),
    dashboardSaga(),
    userSaga(),
    bannerSaga(),
    categorySaga(),
    productSaga(),
    languageSaga(),
    restaurantSaga(), 
    branchSaga(),
    paymentSaga()
   ]);
}
