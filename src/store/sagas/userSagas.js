import * as actions from "../actions";
import * as actionsTypes from "../actionTypes";
import {put, takeEvery, all, fork} from "redux-saga/effects";
import UserService from '../../services/user.service'


function* getUsersList(action) {
  try {
    if (action.payload) {
      const page = action.payload?.pageNo;
      const pageSize = action.payload?.pageSize;
      const role = action.payload?.roleName;
      const search = action.payload?.search;
      const status = action.payload?.statusType;
      let params = {page, pageSize, role, search, status};

      const response = yield UserService.list(params);
      if (response?.data.statusCode === 200) {
        yield put(actions.getUsersListSuccess(response.data));
      } else {
        yield put(actions.getUsersListFailure("network error"));
      }
    }
  } catch (err) {
    let error = err?.response?.data?.message
    if (!error) {
      error = 'network error'
    }
    yield put(actions.getUsersListFailure(error));
  }
}


function* getUsersListSaga() {
  yield takeEvery(actionsTypes.GET_USERS_LIST_START, getUsersList);
}

export function* userSaga() {
  yield all([fork(getUsersListSaga),]);
}
