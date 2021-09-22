import Types from "../../types/types";
import requester from '../../../requester/requester';

export const GET_LESSONS = (params) => {
    return async function (dispatch) {
        dispatch({
            type: Types.TOGGLE_SPINNER,
            payload: true,
        })
        await requester
            .get('/content/pages/lessons', { params })
            .then((response) => {
                dispatch({
                    type: Types.GET_LESSONS,
                    payload: response.data.model,
                });
                dispatch({
                    type: Types.TOGGLE_SPINNER,
                    payload: false,
                });
            })
            .catch((error) => {
                dispatch({
                    type: Types.TOGGLE_SPINNER,
                    payload: false,
                })
                console.log('ERR', error);
            });
    }
}

export const GET_ALL_SHEIKHS = () => {
    return async function (dispatch) {
        dispatch({
            type: Types.TOGGLE_SPINNER,
            payload: true,
        })
        await requester
            .get('/lessons/sheikh/get')
            .then((response) => {
                dispatch({
                    type: Types.GET_ALL_SHEIKHS,
                    payload: response.data.model,
                });
                dispatch({
                    type: Types.TOGGLE_SPINNER,
                    payload: false,
                });
            })
            .catch((error) => {
                dispatch({
                    type: Types.TOGGLE_SPINNER,
                    payload: false,
                })
                console.log('ERR', error);
            });
    }
}

export const GET_SHEIKH_DETAILS = (params) => {
    return async function (dispatch) {
        dispatch({
            type: Types.TOGGLE_SPINNER,
            payload: true,
        })
        await requester
            .get('/lessons/sheikh/get-single', { params })
            .then((response) => {
                dispatch({
                    type: Types.GET_SHEIKH_DETAILS,
                    payload: response.data.model,
                });
                dispatch({
                    type: Types.TOGGLE_SPINNER,
                    payload: false,
                });
            })
            .catch((error) => {
                dispatch({
                    type: Types.TOGGLE_SPINNER,
                    payload: false,
                })
                console.log('ERR', error);
            });
    }
}

export const GET_LESSON_DETAILS = (params) => {
    return async function (dispatch) {
        dispatch({
            type: Types.TOGGLE_SPINNER,
            payload: true,
        })
        await requester
            .get('/lessons/get-details', { params })
            .then((response) => {
                dispatch({
                    type: Types.GET_LESSON_DETAILS,
                    payload: response.data.model,
                });
                dispatch({
                    type: Types.TOGGLE_SPINNER,
                    payload: false,
                });
            })
            .catch((error) => {
                dispatch({
                    type: Types.TOGGLE_SPINNER,
                    payload: false,
                })
                console.log('ERR', error);
            });
    }
}