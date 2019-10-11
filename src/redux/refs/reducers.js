import { updateObject } from '../utility';

import * as actionTypes from '../actionTypes';

const initialState = {
  countries: [],
  bookingTypes: []
};

const setRefs = (state, action) => {
  // console.log("setRefs--", action);
  return updateObject( state, {
    countries: action.payload.countries,
    bookingTypes: action.payload.bookingTypes,
  } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
      case actionTypes.SET_REFS: return setRefs( state, action );
      default: return state;
    }
};

export default reducer;
