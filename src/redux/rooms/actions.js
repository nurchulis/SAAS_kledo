import axios from 'axios';

import * as actionTypes from '../actionTypes';

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




export const addRoomRedux = ( payload ) => {
    return {
        type: actionTypes.ADD_ROOM,
        payload
    };
};

export const addRoomTypeRedux = ( payload ) => {
    return {
        type: actionTypes.ADD_ROOM_TYPE,
        payload
    };
};

export const editRoomRedux = ( payload ) => {
    return {
        type: actionTypes.EDIT_ROOM,
        payload
    };
};


export const addRoom = (payload) => {
    return dispatch => {
        const endpoint = 'rooms';

        const data = {name: payload.name, type_id: payload.typeId};
        console.log("Payload", payload);
        console.log("Data", data);
        return axios.post( endpoint, data )
            .then( response => {
               console.log("response addRoom", response.data);
               dispatch(addRoomRedux(response.data.data));
            } )
            /*
            .catch( error => {
                // dispatch(stopLoading(error));
                // console.log("axios failed", error);
            });
            */
    };
};

export const addRoomType = (payload) => {
    return dispatch => {
        const endpoint = 'roomTypes';
        const data = {name: payload.name};
        console.log("addRoomType data:", data);
        return axios.post( endpoint, data  )
            .then( response => {
               console.log("response addRoomType", response.data);
               dispatch(addRoomTypeRedux(response.data.data));
            } )
            /*
            .catch( error => {
                // dispatch(stopLoading(error));
                // console.log("axios failed", error);
            });
            */
    };
};

export const editRoom = (payload) => {
    return dispatch => {
        const endpoint = `rooms/${payload.id}`;

        const data = {name: payload.name, type_id: payload.typeId};
        console.log("Payload", payload);
        console.log("Data", data);
        return axios.put( endpoint, data )
            .then( response => {
               console.log("response editRoom", response.data);
               dispatch(editRoomRedux(response.data.data));
            } )
            /*
            .catch( error => {
                // dispatch(stopLoading(error));
                // console.log("axios failed", error);
            });
            */
    };
};

export const editRoomType = (payload) => {
    return dispatch => {
        const endpoint = `roomTypes/${payload.id}`;
        const data = {name: payload.name};
         console.log("endpoint:", endpoint);
        return axios.put( endpoint, data  )
            .then( response => {
               console.log("response addRoomType", response.data);
               dispatch(addRoomTypeRedux(response.data.data));
            } )
            /*
            .catch( error => {
                // dispatch(stopLoading(error));
                // console.log("axios failed", error);
            });
            */
    };
};

export const deleteRoomRedux = ( roomId ) => {
    return {
        type: actionTypes.DELETE_ROOM,
        roomId
    };
};

export const deleteRoomTypeRedux = ( roomTypeId ) => {
    return {
        type: actionTypes.DELETE_ROOM_TYPE,
        roomTypeId
    };
};


export const deleteRoom = (data) => {
    return dispatch => {
        const endpoint = `rooms/${data.id}`;
        // console.log("endpoint:", endpoint);
        return axios.delete( endpoint, {}  )
            .then( response => {
               // console.log("response deleteRoom", response.data);
               dispatch(deleteRoomRedux(data.id));
            } )
            /*
            .catch( error => {
                // dispatch(stopLoading(error));
                // console.log("axios failed", error);
            });
            */
    };
};

export const deleteRoomType = (data) => {
    return dispatch => {
        const endpoint = `roomTypes/${data.id}`;
        // console.log("endpoint:", endpoint);
        return axios.delete( endpoint, {}  )
            .then( response => {
               // console.log("response deleteRoomType", response.data);
               dispatch(deleteRoomTypeRedux(data.id));
            } )
            /*
            .catch( error => {
                // dispatch(stopLoading(error));
                // console.log("axios failed", error);
            });
            */
    };
};


export const moveRoomRedux = ( payload ) => {
    return {
        type: actionTypes.MOVE_ROOM,
        payload
    };
};

export const moveRoom = (payload) => {
    return dispatch => {
        const endpoint = `rooms/${payload.srcId}/move`;

        const data = {dest_id: payload.destId};
        console.log("moveRoom Payload", payload);
        
        // dispatch({type: actionTypes.START_LOADING});
        
        return axios.patch( endpoint, data )
            .then( response => {
               console.log("response moveRoom", response.data);
               dispatch(moveRoomRedux(payload));
               // dispatch({type: actionTypes.STOP_LOADING});
            } )
            
            .catch( error => {
                // dispatch({type: actionTypes.STOP_LOADING});
            });
    };
};
