import _map from "lodash/map";

import {
  getCommodityTypesRoutine,
  createCommodityTypeRoutine,
  updateCommodityTypeRoutine,
  deleteCommodityTypeRoutine,
} from "../actions";

const initialState = {
  data: [],
  pagination: {
    limit: 0, 
    offset: 0,
    count: 0,
    total_count: 0
  }
};

export default (state = initialState, action) => {
  if (getCommodityTypesRoutine.isSuccessAction(action)) {
    const { commodity_types } = action.payload.data;

    const data = _map(commodity_types, (commodity_type) => ({
      id: commodity_type.id,
      name: commodity_type.name,
    }));

    const { limit, offset, count, total_count } = action.payload.data.pagination;

    const pagination = {
      limit,
      offset,
      count: offset+count, 
      total_count 
    }

    return { ...state, data, pagination };
  }
  if (createCommodityTypeRoutine.isSuccessAction(action)) {
    console.log(action.payload)
    const { commodity_type } = action.payload.data

    return { ...state, data: commodity_type }
  }

  if(updateCommodityTypeRoutine.isSuccessAction(action)) {
    return state;
  }
  if(deleteCommodityTypeRoutine.isSuccessAction(action)) {
    return state;
  }
  return state;
};
