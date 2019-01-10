import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import logger from "redux-logger";
import thunk from 'redux-thunk';

const enhancer = applyMiddleware(thunk, logger);

const store = createStore(reducer, enhancer);

export default store;
