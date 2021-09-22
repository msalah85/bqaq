import Types from "../../types/types";
import requester from '../../../requester/requester';

export const GET_MEDIA_CENTER_SECTION = (params) => {

    return async function (dispatch) {
        dispatch({
            type: Types.TOGGLE_SPINNER,
            payload: true,
        })
        await requester
            .get('/content/pages/media-center', { params })
            .then((response) => {
                dispatch({
                    type: Types.GET_MEDIA_CENTER_SECTION,
                    payload: response.data.model,
                });
                dispatch({
                    type: Types.TOGGLE_SPINNER,
                    payload: false,
                })
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

export const GET_POST_DETAILS = (params) => {

    return async function (dispatch) {
        dispatch({
            type: Types.TOGGLE_SPINNER,
            payload: true,
        })
        await requester
            .get(`/media-center/posts/get-details`, { params })
            .then((response) => {
                dispatch({
                    type: Types.GET_POST_DETAILS,
                    payload: response.data.model,
                });
                dispatch({
                    type: Types.TOGGLE_SPINNER,
                    payload: false,
                })
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

export const CLEAN_PRAISE_DETAILS = () => ({ type: Types.CLEAN_POST_DETAILS })

