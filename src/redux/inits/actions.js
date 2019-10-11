import axios from 'axios';

import * as actionTypes from '../actionTypes';

export const startLoading = () => {
    return {
        type: actionTypes.START_LOADING
    };
};


export const stopLoading = () => {
    return {
        type: actionTypes.STOP_LOADING
    };
};

export const setRooms = ( inits ) => {
    return {
        type: actionTypes.SET_ROOMS,
        inits
    };
};

export const setChannels = ( inits ) => {
    return {
        type: actionTypes.SET_CHANNELS,
        inits
    };
};

export const setRefs = ( payload ) => {
    // console.log("setRefs--", payload);
    return {
        type: actionTypes.SET_REFS,
        payload
    };
};

export const setBookingStatuses = ( payload ) => {
  return {
      type: actionTypes.SET_BOOKINGSTATUSES,
      payload
  };
};

export const setExtras = ( payload ) => {
  return {
      type: actionTypes.SET_EXTRAS,
      payload
  };
};

export const inits = () => {
    return dispatch => {
        dispatch(startLoading());
        axios.get('inits')
            .then( response => {
                dispatch(setRooms(response.data.data));
                dispatch(setChannels(response.data.data));
                dispatch(setRefs(response.data.data));
                dispatch(setBookingStatuses(response.data.data));
                dispatch(setExtras(response.data.data));
                dispatch(stopLoading());
            } )
            .catch( error => {
                dispatch(stopLoading(error));
            });
    };
};
