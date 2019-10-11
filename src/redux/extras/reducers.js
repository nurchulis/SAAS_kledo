import {updateObject} from '../utility';

import * as actionTypes from '../actionTypes';

const initialState = {
  extras: null
};

const setExtras = (state, action) => {
  return updateObject(state, {
    extras: action.payload.extras
  });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.SET_EXTRAS: return setExtras(state, action);
      default: return state;
    }
};

export default reducer;
