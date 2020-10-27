import { combineReducers } from "redux";

import authorization from "./sessionsReducer";
import profile from "./profileReducer";
import error from "./errorReducer";
import commodityTypes from "./commodityTypesReducer";
import modals from "./modalsReducer";

export default combineReducers({
  authorization,
  profile,
  error,
  commodityTypes,
  modals
});
