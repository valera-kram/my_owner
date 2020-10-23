import { combineReducers } from "redux";

import sessionReducer from "./sessionReducer";
import profile from "./profileReducer";
import error from "./errorReducer";
import commodityTypes from "./commodityTypesReducer";
import modals from "./modalsReducer";

export default combineReducers({
  authorization: sessionReducer,
  profile,
  error,
  commodityTypes,
  modals
});
