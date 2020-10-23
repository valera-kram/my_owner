import { getProfileRoutine, clearLocalProfileRoutine } from "../actions";

const initialState = {
  manager: {
    id: null,
    firstName: null,
    lastName: null,
  }
};

export default (state = initialState, action) => {
  if (getProfileRoutine.isSuccessAction(action)) {
    const { manager } = action.payload.data;
    
    return {
      ...state,
      manager,
    };
  }
  if (clearLocalProfileRoutine.isSuccessAction(action)) {
    return {
      ...state,
      initialState,
    };
  }
  return state;
};
