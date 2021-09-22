import Types from "../../types/types";
import requester from '../../../requester/requester';

export const GET_OUR_PROJECTS = () => {

    return async function (dispatch) {
        dispatch({
            type: Types.TOGGLE_SPINNER,
            payload: true,
        })
        await requester
            .get('/content/pages/projects')
            .then((response) => {
                dispatch({
                    type: Types.GET_OUR_PROJECTS,
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


