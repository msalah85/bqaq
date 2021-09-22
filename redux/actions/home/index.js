import Types from "../../types/types";
import requester from '../../../requester/requester';

export const GET_BANNERS = () => {
    return async function (dispatch) {

        dispatch({
            type: Types.TOGGLE_SPINNER,
            payload: true,
        })
        await requester
            .get(`/content/banners/get-banners?selectUnActive=true`)
            .then((response) => {
                console.log(response);
                dispatch({
                    type: Types.GET_BANNERS,
                    payload: response.data.model,
                });
                // dispatch({
                //     type: Types.TOGGLE_SPINNER,
                //     payload: false,
                // });
            })
            .catch((error) => {
                // dispatch({
                //     type: Types.TOGGLE_SPINNER,
                //     payload: false,
                // });
                console.log('ERR', error);
            });
    }
}

export const GET_HOME_DATA = () => {

    return async function (dispatch) {

        dispatch({
            type: Types.TOGGLE_SPINNER,
            payload: true,
        })

        await requester
            .get(`/content/pages/home`)
            .then((response) => {

                dispatch({
                    type: Types.GET_HOME_DATA,
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
                });

            });
    }

}
