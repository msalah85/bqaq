import Types from "../../types/types";
import requester from '../../../requester/requester';

export const GET_WOMEN_SECTION = () => {

    return async function (dispatch) {
        dispatch({
            type: Types.TOGGLE_SPINNER,
            payload: true,
        })
        await requester
            .get('/content/pages/woman-section')
            .then((response) => {
                dispatch({
                    type: Types.GET_WOMEN_SECTION,
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


