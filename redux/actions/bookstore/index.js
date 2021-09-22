import Types from "../../types/types";
import requester from '../../../requester/requester';

export const GET_BOOKSTORE = (params) => {
    return async function (dispatch) {
        dispatch({
            type: Types.TOGGLE_SPINNER,
            payload: true,
        })
        await requester
            .get('/books/get', { params })
            .then((response) => {
                dispatch({
                    type: Types.GET_BOOKSTORE,
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

export const GET_BOOK_DETAILS = (params) => {
    return async function (dispatch) {
        dispatch({
            type: Types.TOGGLE_SPINNER,
            payload: true,
        })
        await requester
            .get('/books/get-details', { params })
            .then((response) => {
                dispatch({
                    type: Types.GET_BOOK_DETAILS,
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