import axios from 'axios';

import * as actionTypes from '../actionTypes';

export const setChannels = ( inits ) => {
    return {
        type: actionTypes.SET_CHANNELS,
        inits
    };
};




export const addChannelRedux = ( payload ) => {
    return {
        type: actionTypes.ADD_CHANNEL,
        payload
    };
};


export const editChannelRedux = ( payload ) => {
    return {
        type: actionTypes.EDIT_CHANNEL,
        payload
    };
};


export const addChannel = (payload) => {
    return dispatch => {
        const endpoint = 'channels';

        // const data = {name: payload.name, type_id: payload.typeId};
        console.log("Payload", payload);
        // console.log("Data", data);
        return axios.post( endpoint, payload )
            .then( response => {
               console.log("response addChannel", response.data);
               dispatch(addChannelRedux(response.data.data));
            } )
            .catch( error => {
                // dispatch(stopLoading(error));
                console.log("axios failed", error);
            });
            
    };
};


export const editChannel = (payload) => {
    return dispatch => {
        const endpoint = `channels/${payload.id}`;

        const data = payload;
        console.log("Payload", payload);
        console.log("Data", data);
        return axios.put( endpoint, data )
            .then( response => {
               console.log("response editChannel", response.data);
               dispatch(editChannelRedux(response.data.data));
            } )
            /*
            .catch( error => {
                // dispatch(stopLoading(error));
                // console.log("axios failed", error);
            });
            */
    };
};

export const deleteChannelRedux = ( channelId ) => {
    return {
        type: actionTypes.DELETE_CHANNEL,
        channelId
    };
};

export const deleteChannel = (data) => {
    return dispatch => {
        const endpoint = `channels/${data.id}`;
        // console.log("endpoint:", endpoint);
        return axios.delete( endpoint, {}  )
            .then( response => {
               // console.log("response deleteChannel", response.data);
               dispatch(deleteChannelRedux(data.id));
            } )
            /*
            .catch( error => {
                // dispatch(stopLoading(error));
                // console.log("axios failed", error);
            });
            */
    };
};

export const moveChannelRedux = ( payload ) => {
    return {
        type: actionTypes.MOVE_CHANNEL,
        payload
    };
};

export const moveChannel = (payload) => {
    return dispatch => {
        const endpoint = `channels/${payload.srcId}/move`;

        const data = {dest_id: payload.destId};
        console.log("moveChannel Payload", payload);
        
        // dispatch({type: actionTypes.START_LOADING});
        
        return axios.patch( endpoint, data )
            .then( response => {
               console.log("response moveChannel", response.data);
               dispatch(moveChannelRedux(payload));
               // dispatch({type: actionTypes.STOP_LOADING});
            } )
            
            .catch( error => {
                // dispatch({type: actionTypes.STOP_LOADING});
            });
    };
};
