import Types from "../../types/types";
import requester from '../../../requester/requester';
import Swal from 'sweetalert2';

export const GET_DONNATION_LIST_OF_PROJECT = (projectId) => {
    return async function (dispatch) {
        await requester
            .get(`/projects/donation/get-list-of-donations-for-project?projectId=${projectId}`)
            .then((response) => {
                dispatch({
                    type: Types.GET_DONNATION_LIST_OF_PROJECT,
                    payload: response.data.model,
                });
            })
            .catch((error) => {
                console.log('ERR', error);
            });
    }
}


export const MAKE_NEW_DONNATION = (donnationData) => {
    return async function (dispatch) {
        dispatch({
            type: Types.TOGGLE_SPINNER,
            payload: true,
        })
        await requester
            .post('/projects/donate/make-donate', donnationData)
            .then((response) => {
                dispatch({
                    type: Types.TOGGLE_SPINNER,
                    payload: false,
                })
                Swal.fire({
                    icon: 'success',
                    title: 'وصلنا تبرعك بنجاح',
                }).then((result) => { if (result.isConfirmed) window.location.href = "/"; })
            })
            .catch((error) => {
                dispatch({
                    type: Types.TOGGLE_SPINNER,
                    payload: false,
                })
                Swal.fire({
                    icon: 'error',
                    title: 'فشل الاتصال',
                })
                console.log('ERR', error);
            });
    }
}