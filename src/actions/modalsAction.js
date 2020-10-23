import { getThunkActionCreator } from "redux-thunk-routine";
import {
  openCommodityTypeModalRoutine,
  closeCommodityTypeModalRoutine,
} from "./index";

export const openCommodityTypeModal = getThunkActionCreator(
  openCommodityTypeModalRoutine,
  async () => {
    return await true;
  }
);

export const closeCommodityTypeModal = getThunkActionCreator(
  closeCommodityTypeModalRoutine,
  async () => {
    return await true;
  }
);
