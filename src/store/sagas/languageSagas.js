import * as actions from "../actions";
import * as actionsTypes from "../actionTypes";
import { put, takeEvery, all, fork } from "redux-saga/effects";
import axios from 'axios';
import HomeService from '../../services/home.service'




function* fetchAllLanguagesRequest(action) {
  try {
    const response = yield HomeService.getLanguages();
    if (response?.data) {
      yield put(actions.fetchAllLanguagesSuccess(response?.data));
    } else {
      yield put(actions.fetchAllLanguagesFailure("network error"));
    }

  } catch (err) {
    let error = err?.response?.data?.message
    if (!error) error = 'network error'

    yield put(actions.fetchAllLanguagesFailure(error));
  }
}
function* getLanguageSaga() {
  yield takeEvery(actionsTypes.FETCH_ALL_LANGUAGES_REQUEST, fetchAllLanguagesRequest);
}


function* getAllKeywordStart(action) {
  try {
    const response = yield HomeService.getAllKeysWords();
    if (response?.data) {
      yield put(actions.getAllKeywordSuccess(response?.data));
    } else {
      yield put(actions.getAllKeywordFailure("network error"));
    }

  } catch (err) {
    let error = err?.response?.data?.message
    if (!error) error = 'network error'

    yield put(actions.getAllKeywordFailure(error));
  }
}
function* getKeywordsSaga() {
  yield takeEvery(actionsTypes.GET_ALL_KEYWORD_START, getAllKeywordStart);
}



function* getAllDetailLangStart(action) {
  console.log("sagaaa action",action);
  try {
    if (action.payload) {
      const language_id = action.payload?.languageId;
      let params = {language_id};

    const response = yield HomeService.getLangDetail(params);
    if (response?.data) {
      yield put(actions.getAllDetailLangSuccess(response?.data));
    } else {
      yield put(actions.getAllDetailLangFailure("network error"));
    }
  }
  } catch (err) {
    let error = err?.response?.data?.message
    if (!error) error = 'network error'

    yield put(actions.getAllDetailLangFailure(error));
  }
}
function* getLangDetailSaga() {
  yield takeEvery(actionsTypes.GET_ALL_DETAIL_LANG_START, getAllDetailLangStart);
}

export function* languageSaga() {
  yield all([fork(getLanguageSaga),fork(getKeywordsSaga),fork(getLangDetailSaga)]);
}

