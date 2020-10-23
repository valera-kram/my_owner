import { createThunkRoutine } from 'redux-thunk-routine';

export const createSessionRoutine = createThunkRoutine("CREATE_SESSION");
export const deleteSessionRoutine = createThunkRoutine("DELETE_SESSION");
export const getProfileRoutine = createThunkRoutine("GET_PROFILE");
export const clearLocalProfileRoutine = createThunkRoutine("CLEAR_LOCAL_PROFILE");
export const getCommodityTypesRoutine = createThunkRoutine("GET_COMMODITY_TYPES");
export const createCommodityTypeRoutine = createThunkRoutine("CREATE_COMMODITY_TYPE");
export const updateCommodityTypeRoutine = createThunkRoutine("UPDATE_COMMODITY_TYPE");
export const deleteCommodityTypeRoutine = createThunkRoutine("DELETE_COMMODITY_TYPE");

export const openCommodityTypeModalRoutine = createThunkRoutine("OPEN_COMMODITY_TYPE_MODAL");
export const closeCommodityTypeModalRoutine = createThunkRoutine("CLOSE_COMMODITY_TYPE_MODAL");

export const setErrorRoutine = createThunkRoutine("SET_ERROR");
export const hideErrorRoutine = createThunkRoutine("HIDE_ERROR");