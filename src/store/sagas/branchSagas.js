import * as actions from "../actions";
import * as actionsTypes from "../actionTypes";
import {put, takeEvery, all, fork, takeLatest} from "redux-saga/effects";
import BranchService from '../../services/branch.service'
import { act } from "react-dom/test-utils";
import { Restaurant } from "@material-ui/icons";


function* getBranchList(action) {
  try {
    const response = yield BranchService.list();//params
    // console.log('getBranchList response userSagas============ ',response);
    if (response?.data.statusCode === 200) {
      // console.log('response.data userSaga ',response.data?.data);
      yield put(actions.getBranchListSuccess(response.data));
    } else {
      yield put(actions.getBranchListFailure("network error"));
    }
  } catch (err) {
    let error = err?.response?.data?.message
    if (!error) {
      error = 'network error'
    }
    yield put(actions.getBranchListFailure(error));
  }
}

function* getBranchListSaga() {
  yield takeEvery(actionsTypes.GET_BRANCH_LIST_START, getBranchList);
}

export function* branchSaga() {
  yield all([fork(getBranchListSaga)]);
}
