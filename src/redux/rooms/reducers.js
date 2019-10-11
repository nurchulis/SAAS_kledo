import { updateObject } from '../utility';

import * as actionTypes from '../actionTypes';

const initialState = {
  rooms: null,
  roomTypes: null
};

const setRooms = (state, action) => {
  // console.log('reducers setrooms', state);
  return updateObject( state, {
    rooms: action.inits.rooms,
    roomTypes: action.inits.roomTypes,
    error: false,
  } );
};


const addRoom = ( state, action ) => {
  const rooms = [ action.payload, ...state.rooms ];
  return updateObject( state, {rooms} );
};

const addRoomType = ( state, action ) => {  
  const roomTypes = [ action.payload, ...state.roomTypes ];
  return updateObject( state, {roomTypes} );
};

const editRoom = ( state, action ) => {
  const items = state.rooms.map(item => {
    if (item.id === action.payload.id){
      return action.payload;
    }
    return item;
  });
  return updateObject( state, {rooms: items} );
};

const editRoomType = ( state, action ) => {
  const roomTypes = [ action.payload, ...state.roomTypes ];
  return updateObject( state, {roomTypes} );
};

const deleteRoom = ( state, action ) => {
  const rooms = state.rooms.filter( room => room.id !== action.roomId );
  return updateObject( state, 
    { rooms } 
  );
};

const deleteRoomType = ( state, action ) => {
  const roomTypes = state.roomTypes.filter( roomType => roomType.id !== action.roomTypeId );
  return updateObject( state, 
    { roomTypes } 
  );
};

const moveRoom = ( state, action ) => {
  const { dragIndex, hoverIndex } = action.payload;
  const rooms = [...state.rooms];
  const srcRoom = rooms[dragIndex];
  // const { data } = this.state;
  // const dragRow = rooms[action.dragIndex];
  // const dstRoom = rooms[hoverIndex];
  console.log("Move Room srcRoom", srcRoom);
  console.log("Move Room state", state);
  console.log("Move Room reducers BEFORE", rooms);
  console.log("dragIndex, dragIndex");
  rooms.splice(dragIndex, 1);
  rooms.splice(hoverIndex,0,srcRoom);
  // console.log("Move Room reducers action", action);
  // console.log("Move Room reducers rooms", rooms);
  return updateObject( state, {rooms} );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
      case actionTypes.SET_ROOMS: return setRooms( state, action );
      case actionTypes.ADD_ROOM: return addRoom( state, action );
      case actionTypes.ADD_ROOM_TYPE: return addRoomType( state, action );
      case actionTypes.EDIT_ROOM: return editRoom( state, action );
      case actionTypes.EDIT_ROOM_TYPE: return editRoomType( state, action );
      case actionTypes.DELETE_ROOM: return deleteRoom( state, action );
      case actionTypes.DELETE_ROOM_TYPE: return deleteRoomType( state, action );
      case actionTypes.MOVE_ROOM: return moveRoom( state, action );
      default: return state;
    }
};

export default reducer;
