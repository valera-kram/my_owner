import _filter from 'lodash/filter';

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
    const { commodity_types, pagination } = action.payload.data;

    const data = state.data.concat(commodity_types);

    return { ...state, data, pagination: { ...pagination, count: state.pagination.count + pagination.count } };
  }
  if (createCommodityTypeRoutine.isSuccessAction(action)) {
    const { commodity_type } = action.payload.data
    const data = state.data.concat(commodity_type);

    return { ...state, data, pagination: { ...state.pagination, total_count: state.pagination.total_count + 1, count: state.pagination.count + 1 } }
  }

  if (updateCommodityTypeRoutine.isSuccessAction(action)) {
    const { id, name } = action.payload.commodity_type;

    let data = state.data.map((pair) => {
      if (pair.id !== id)
        return pair;
      else
        return { id, name };
    })

    return { ...state, data };
  }
  if (deleteCommodityTypeRoutine.isSuccessAction(action)) {
    const { id } = action.payload;

    let data = _filter(state.data, (pair) => {
      return pair.id !== id
    })

    return { ...state, data, pagination: { ...state.pagination, total_count: state.pagination.total_count - 1, count: state.pagination.count - 1 } };
  }
  return state;
}
