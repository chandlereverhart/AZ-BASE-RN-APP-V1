import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "@react-native-async-storage/async-storage";
// slices

import logBookReducer from "./slices/logBook";
import exitsReducer from "./slices/exits";

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: ["client"],
};

const rootReducer = combineReducers({
  logBook: logBookReducer,
  exits: exitsReducer,
});

export { rootPersistConfig, rootReducer };
