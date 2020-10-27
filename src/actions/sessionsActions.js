import axios from "../apis";
import { sessionService } from "redux-react-session";

import history from "../history";

import { createSessionRoutine, deleteSessionRoutine } from "./index";


export const createSession = ({ username, password }) => async (dispatch) => {
  dispatch(createSessionRoutine.request({ username, password }));
  try {
    const response = await axios.post(
      "/manager/sessions",
      {
        username,
        password,
        session: {
          platform_type: "web",
        },
      }
    );

    await sessionService
      .saveSession({ token: response.data.session.access_token })
      .then(() => {
        history.push("/profile");
        return dispatch(createSessionRoutine.success(response));
      });
  } catch (error) {
    dispatch(createSessionRoutine.failure(error));
    throw error;
  }
};

export const deleteSession = () => async (dispatch) => {
  dispatch(deleteSessionRoutine.request());
  try {
    const currentSession = await sessionService.loadSession();
    const response = await axios.delete(
      "/manager/sessions",
      {
        params: {
          access_token: currentSession.token,
        },
      }
    );

    await sessionService.deleteSession().then(() => {
      return dispatch(deleteSessionRoutine.success(response));
    });
  } catch (error) {
    dispatch(deleteSessionRoutine.failure(error));
  }
};
