import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import swapiReducer from "./swapiReducer";

const rootReducer = combineReducers({
  swapi: swapiReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));