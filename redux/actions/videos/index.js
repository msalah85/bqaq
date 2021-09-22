import Types from "../../types/types";
import requester from '../../../requester/requester';

export const GET_VIDEOS = (params) => {
    return async function (dispatch) {
        dispatch({
            type: Types.TOGGLE_SPINNER,
            payload: true,
        })
        await requester
            .get('/content/pages/videos', { params })
            .then((response) => {
                dispatch({
                    type: Types.GET_VIDEOS,
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

