import axios from "../apis";
import { sessionService } from "redux-react-session";
import {
  getCommodityTypesRoutine,
  createCommodityTypeRoutine,
  updateCommodityTypeRoutine,
  deleteCommodityTypeRoutine,
} from "./index";
import { getThunkActionCreator } from "redux-thunk-routine";

export const getCommodityTypes = getThunkActionCreator(
  getCommodityTypesRoutine,
  async ({ limit, offset }) => {
    const currentSession = await sessionService.loadSession();
    return await axios.get(
      "/manager/commodity_types",
      {
        params: {
          access_token: currentSession.token,
          limit: limit,
          offset: offset,
        },
      }
    );
  }
);

export const createCommodityType = getThunkActionCreator(
  createCommodityTypeRoutine,
  async ({ commodity_type }) => {
    const currentSession = await sessionService.loadSession();
    return await axios.post(
      "/manager/commodity_types",
      {
        access_token: currentSession.token,
        commodity_type,
      }
    );
  }
);

export const updateCommodityType = getThunkActionCreator(
    updateCommodityTypeRoutine,
    async ({ id, commodity_type }) => {
      const currentSession = await sessionService.loadSession();
      const response = await axios.patch(`/manager/commodity_types/${id}`,
       {
           access_token: currentSession.token, commodity_type
       }
    );
    const { name } = commodity_type
    return await{ response, commodity_type: { id, name } }
  }
);

export const deleteCommodityType  = getThunkActionCreator(
    deleteCommodityTypeRoutine,
    async (id) => {
      const currentSession = await sessionService.loadSession();
      const response = await axios.delete(`/manager/commodity_types/${id}`, { params: { access_token: currentSession.token } });
      return await { response, id };
    }
  );
  
  