import Types from "../../types/types";
import requester from '../../../requester/requester';
import Swal from 'sweetalert2';

export const CONTACT_US = (formData) => {
    return async function (dispatch) {
        dispatch({
            type: Types.TOGGLE_SPINNER,
            payload: true,
        })
        await requester
            .post('/contact/contact-form', formData)
            .then((response) => {
                dispatch({
                    type: Types.TOGGLE_SPINNER,
                    payload: false,
                })
                Swal.fire({
                    icon: 'success',
                    title: 'وصلنا رسالتك بنجاح',
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