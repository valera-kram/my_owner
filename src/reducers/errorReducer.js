import { setErrorRoutine, hideErrorRoutine } from '../actions';
import _get from 'lodash/get';

const initialState = {
    type: null,
    message: null,
    isOpen: null
}

export default (state = initialState, action) => {
    if(setErrorRoutine.isSuccessAction(action)) {
        return {
            ...state,
            type: _get(action.payload, 'response.data.error.type') || null,
            message: typeof action.payload === 'string' ? (action.payload) : (_get(action.payload, 'response.data.error.message') || 'Failed to load data'),
            isOpen: true
        }
    }
    if(hideErrorRoutine.isSuccessAction(action)) {
        return {
            ...state,
            type: null,
            message: null,
            isOpen: false
        }
    }
    return state;
}