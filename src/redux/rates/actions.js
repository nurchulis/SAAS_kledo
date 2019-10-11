import axios from 'axios';

import * as actionTypes from '../actionTypes';

export const setGuests = ( payload ) => {
    return {
        type: actionTypes.SET_GUESTS,
        payload
    };
};




export const addGuestRedux = ( payload ) => {
    return {
        type: actionTypes.ADD_GUEST,
        payload
    };
};


export const editGuestRedux = ( payload ) => {
    return {
        type: actionTypes.EDIT_GUEST,
        payload
    };
};

export const initGuests = (payload) => {
    return dispatch => {
        const endpoint = `guests/?page=${payload.page}`;

        // const data = payload;
        console.log("Payload", payload);
        // console.log("Data", data);
        return axios.get( endpoint )
            .then( response => {
               console.log("response initGuests", response.data);
               dispatch(setGuests(response.data));
            } )
            /*
            .catch( error => {
                // dispatch(stopLoading(error));
                // console.log("axios failed", error);
            });
            */
    };
};

export const addGuest = (payload) => {
    return dispatch => {
        const endpoint = 'guests';

        // const data = {name: payload.name, type_id: payload.typeId};
        console.log("Payload", payload);
        // console.log("Data", data);
        return axios.post( endpoint, payload )
            .then( response => {
               console.log("response addGuest", response.data);
               dispatch(addGuestRedux(response.data.data));
            } )
            .catch( error => {
                // dispatch(stopLoading(error));
                console.log("axios failed", error);
            });
            
    };
};


export const editGuest = (payload) => {
    return dispatch => {
        const endpoint = `guests/${payload.id}`;

        const data = payload;
        console.log("Payload", payload);
        console.log("Data", data);
        return axios.put( endpoint, data )
            .then( response => {
               console.log("response editGuest", response.data);
               dispatch(editGuestRedux(response.data.data));
            } )
            /*
            .catch( error => {
                // dispatch(stopLoading(error));
                // console.log("axios failed", error);
            });
            */
    };
};

export const deleteGuestRedux = ( guestId ) => {
    return {
        type: actionTypes.DELETE_GUEST,
        guestId
    };
};

export const deleteGuest = (data) => {
    return dispatch => {
        const endpoint = `guests/${data.id}`;
        // console.log("endpoint:", endpoint);
        return axios.delete( endpoint, {}  )
            .then( response => {
               // console.log("response deleteGuest", response.data);
               dispatch(deleteGuestRedux(data.id));
            } )
            /*
            .catch( error => {
                // dispatch(stopLoading(error));
                // console.log("axios failed", error);
            });
            */
    };
};
