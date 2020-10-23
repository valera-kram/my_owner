import { createSessionRoutine, deleteSessionRoutine } from "./index";
import axios from "axios";
import history from "../history";
import { sessionService } from "redux-react-session";

export const createSession = ({ username, password }) => async (dispatch) => {
  dispatch(createSessionRoutine.request({ username, password }));
  try {
    const response = await axios.post(
      "https://staging.ownerapp.ai/manager/sessions",
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
      "https://staging.ownerapp.ai/manager/sessions",
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
