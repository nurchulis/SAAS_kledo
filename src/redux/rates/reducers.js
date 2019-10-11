import { updateObject } from '../utility';

import * as actionTypes from '../actionTypes';

const emptyGuest = {
  id: 0,
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  address: "",
  is_child: 0,
  age: 0,
  note: "",
  country_id: 0,
  booking_type_id: 0
}

const initialState = {
  guests: [emptyGuest],
  paging: {
    current_page: 0,
    total: 0,
  }
};

const setGuests = (state, action) => {
  const paging = {...action.payload};
  delete paging.data;
  console.log("setGuests reducers");
  console.log("action.payload", action.payload);
  return updateObject( state, {
    guests: action.payload.data,
    paging,
  } );
};


const addGuest = ( state, action ) => {
  const guests = [ action.payload, ...state.guests ];
  return updateObject( state, {guests} );
};

const editGuest = ( state, action ) => {
  const items = state.guests.map(item => {
    if (item.id === action.payload.id){
      return action.payload;
    }
    return item;
  });
  return updateObject( state, {guests: items} );
};


const deleteGuest = ( state, action ) => {
  const guests = state.guests.filter( guest => guest.id !== action.guestId );
  return updateObject( state, 
    { guests } 
  );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
      case actionTypes.SET_GUESTS: return setGuests( state, action );
      case actionTypes.ADD_GUEST: return addGuest( state, action );
      case actionTypes.EDIT_GUEST: return editGuest( state, action );
      case actionTypes.DELETE_GUEST: return deleteGuest( state, action );
      default: return state;
    }
};

export default reducer;
