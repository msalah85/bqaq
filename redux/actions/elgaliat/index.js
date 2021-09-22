import Types from "../../types/types";
import requester from '../../../requester/requester';

export const GET_ELGALIAT = (params) => {
    return async function (dispatch) {
        dispatch({
            type: Types.TOGGLE_SPINNER,
            payload: true,
        })
        await requester
            .get('/content/pages/el-galiat', { params })
            .then((response) => {
                dispatch({
                    type: Types.GET_ELGALIAT,
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