import {
  Action,
  applyMiddleware as applyReduxMiddleware,
  createStore as createReduxStore,
} from "redux";
import { composeWithDevTools as composeWithReduxDevTools } from "redux-devtools-extension";
import { reducer } from "../ToyRobot";

const logger = () => (next: Function) => (action: Action) => {
  console.log("action:", action);
  return next(action);
};

export const setupStore = () => {

  const middlewares = [];

  if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
  }

  return createReduxStore(
    reducer,
    composeWithReduxDevTools(
      applyReduxMiddleware(...middlewares),
    ),
  );
};