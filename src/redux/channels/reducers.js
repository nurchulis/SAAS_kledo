import { updateObject } from '../utility';

import * as actionTypes from '../actionTypes';

const initialState = {
  channels: null,
};

const setChannels = (state, action) => {
  return updateObject( state, {
    channels: action.inits.channels,
    channelTypes: action.inits.channelTypes,
    error: false,
  } );
};


const addChannel = ( state, action ) => {
  const channels = [ action.payload, ...state.channels ];
  return updateObject( state, {channels} );
};

const editChannel = ( state, action ) => {
  const items = state.channels.map(item => {
    if (item.id === action.payload.id){
      return action.payload;
    }
    return item;
  });
  return updateObject( state, {channels: items} );
};


const deleteChannel = ( state, action ) => {
  const channels = state.channels.filter( channel => channel.id !== action.channelId );
  return updateObject( state, 
    { channels } 
  );
};


const moveChannel = ( state, action ) => {
  const { dragIndex, hoverIndex } = action.payload;
  const channels = [...state.channels];
  const srcChannel = channels[dragIndex];
  // const { data } = this.state;
  // const dragRow = channels[action.dragIndex];
  // const dstChannel = channels[hoverIndex];
  console.log("Move Channel srcChannel", srcChannel);
  console.log("Move Channel state", state);
  console.log("Move Channel reducers BEFORE", channels);
  console.log("dragIndex, dragIndex");
  channels.splice(dragIndex, 1);
  channels.splice(hoverIndex,0,srcChannel);
  // console.log("Move Channel reducers action", action);
  // console.log("Move Channel reducers channels", channels);
  return updateObject( state, {channels} );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
      case actionTypes.SET_CHANNELS: return setChannels( state, action );
      case actionTypes.ADD_CHANNEL: return addChannel( state, action );
      case actionTypes.EDIT_CHANNEL: return editChannel( state, action );
      case actionTypes.DELETE_CHANNEL: return deleteChannel( state, action );
      case actionTypes.MOVE_CHANNEL: return moveChannel( state, action );
      default: return state;
    }
};

export default reducer;
