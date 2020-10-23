import {
  openCommodityTypeModalRoutine,
  closeCommodityTypeModalRoutine,
} from "../actions";

const initialState = {
  commodityTypeModal: {
    open: false,
  },
};

export default (state = initialState, action) => {
  if (openCommodityTypeModalRoutine.isSuccessAction(action)) {
    return { ...state, commodityTypeModal: { open: true } };
  }
  if (closeCommodityTypeModalRoutine.isSuccessAction(action)) {
    return { ...state, commodityTypeModal: { open: false } };
  }
  return state;
};
