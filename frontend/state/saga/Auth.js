import {types} from "../actionTypes";
import { call, put } from "redux-saga/effects";
import {Login} from "../actions/auth";

export function* workerAuth(action) {
    try {
      const payload = yield call(Login, action.payload);
      yield put({ type: types.AUTH_RESP, payload });
    } catch (e) {
      yield put({ type:types.AUTH_RESP, payload: e });
    }
}

