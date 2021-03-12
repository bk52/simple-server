import {createStore, combineReducers, applyMiddleware, compose  } from 'redux';
import createSagaMiddleware from "redux-saga";
import apiSaga from "./saga/watcher";
import auth from './reducers/auth';

const initialiseSagaMiddleware = createSagaMiddleware();
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
var cr=combineReducers({
    auth,
});
const store = createStore(cr,storeEnhancers(applyMiddleware(initialiseSagaMiddleware)));
initialiseSagaMiddleware.run(apiSaga);
export default store;