import * as actions from "../actions";
import * as actionsTypes from "../actionTypes";
import {all, fork, put, takeEvery} from "redux-saga/effects";
import DashboardService from "../../services/dashboard.service";

function* dashboardStart(action) {

  const response = yield DashboardService.list(action.payload);
  if (response && response.data && response.data.statusCode === 200) {
    yield put(actions.dashboardSuccess(response?.data?.data));
  } else {
    yield put(actions.dashboardFailure({error: "no data"}));
  }
}

function* dashboardStartSaga() {
  yield takeEvery(actionsTypes.DASHBOARD_START, dashboardStart);
}

export function* dashboardSaga() {
  yield all([fork(dashboardStartSaga)]);
}
