import { getThunkActionCreator } from "redux-thunk-routine";
import axios from "axios";

import { getProfileRoutine, clearLocalProfileRoutine } from "./index";

export const getProfile = getThunkActionCreator(
  getProfileRoutine,
  async (access_token) => {
    return await axios.get("https://staging.ownerapp.ai/manager/profile", {
      params: {
        access_token,
      },
    });
  }
);

export const clearLocalProfile = getThunkActionCreator(
  clearLocalProfileRoutine,
  async () => {
    return true;
  }
);
