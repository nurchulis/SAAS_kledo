import { updateObject } from '../utility';

import * as actionTypes from '../actionTypes';

const initialState = {
  loading: false,
};

const startLoading = (state) => {
  return updateObject( state, {
    loading: true
  } );
};

const stopLoading = (state) => {
  return updateObject( state, {
    loading: false
  } );
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
      case actionTypes.START_LOADING: return startLoading( state );
      case actionTypes.STOP_LOADING: return stopLoading( state );
      default: return state;
    }
};

export default reducer;