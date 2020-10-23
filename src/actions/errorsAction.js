import { getThunkActionCreator } from "redux-thunk-routine";

import { setErrorRoutine, hideErrorRoutine } from "../actions";

export const setError = getThunkActionCreator(
  setErrorRoutine,
  async (error) => {
    return error;
  }
);

export const hideError = getThunkActionCreator(hideErrorRoutine, async () => {
  return true;
});
