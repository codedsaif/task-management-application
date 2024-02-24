import { applyMiddleware, legacy_createStore } from "redux";
import logger from "redux-logger";
import reducer from "./reducer";

const store = legacy_createStore(reducer, applyMiddleware(logger));

export default store;
