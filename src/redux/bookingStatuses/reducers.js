import {updateObject} from '../utility';

import * as actionTypes from '../actionTypes';

const initialState = {
  bookingStatuses: null
};

const setBookingStatuses = (state, action) => {
  return updateObject(state, {
    bookingStatuses: action.payload.bookingStatuses
  });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
      case actionTypes.SET_BOOKINGSTATUSES: return setBookingStatuses(state, action);
      default: return state;
    }
};

export default reducer;
