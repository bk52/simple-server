import { takeEvery } from "redux-saga/effects";
import {types} from "../actionTypes";
import {workerAuth} from "./Auth";

export default function* watcherSaga() {
    yield takeEvery(types.AUTH_LOGIN, workerAuth);
}