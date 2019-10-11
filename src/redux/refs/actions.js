import * as actionTypes from '../actionTypes';

export const setRefs = ( payload ) => {
    return {
        type: actionTypes.SET_REFS,
        payload
    };
};
