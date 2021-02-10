import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import { persistStore } from "redux-persist";

import rootReducer from "./root-reducer";

const middlewares = [logger];

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger))
);

export const persistor = persistStore(store);

export default { store, persistor };
