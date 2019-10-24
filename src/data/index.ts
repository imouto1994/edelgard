import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import { reducer as endingReducer } from "./ending";
import { State, Action, Dispatch } from "./type";

const rootReducer = combineReducers<State, Action>({
  ending: endingReducer,
});

const middlewares = [thunk];

if (process.env.NODE_ENV === "development") {
  const { createLogger } = require("redux-logger"); // eslint-disable-line @typescript-eslint/no-var-requires
  const loggerMiddleware = createLogger({ collapsed: true });
  middlewares.push(loggerMiddleware);
}

const store = createStore(
  rootReducer,
  {},
  applyMiddleware<Dispatch, State>(...middlewares),
);

export default store;
