import { createSessionRoutine, deleteSessionRoutine } from "../actions";

const initialState = {
  createdSession: {
    access_token: null,
  },
};

export default (state = initialState, action) => {
  if (createSessionRoutine.isSuccessAction(action)) {
    const { data } = action.payload;

    return {
      ...state,
      createdSession: data.session,
    };
  }
  if (deleteSessionRoutine.isSuccessAction(action)) {
    return {
      ...state,
      createdSession: {
        access_token: null
      }
    };
  }
  return state;
};
