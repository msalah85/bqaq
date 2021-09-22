import Types from "../../types/types";
import requester from '../../../requester/requester'
import SecureLS from "secure-ls";
import jwt_decode from "jwt-decode";
import { notify } from "../../../reusable/toastNotification/ToastNotification";
export const TOGGLE_SIGNIN_POPUP = status => ({
  type: Types.TOGGLE_SIGNIN_POPUP,
  payload: status
})

export const REGISTER_NEW_USER = (data, callBackFn) => {
  return async function (dispatch) {
    dispatch({
      type: Types.TOGGLE_SPINNER,
      payload: true,
    })
    await requester
      .post(`/client/account/register-with-email`, data)
      .then((response) => {
        dispatch({
          type: Types.TOGGLE_SPINNER,
          payload: false,
        })
        callBackFn('signin');
      })
      .catch((error) => {
        // notify({ body: 'Failed', header: 'Error', type: 'error' })
        dispatch({
          type: Types.TOGGLE_SPINNER,
          payload: false,
        })
        notify({ body: 'هناك خطا في بيانات الحساب', type: 'error' })

        console.log('ERR', error);
      });
  }
}

export const SIGNIN_WITH_EMAIL = (data, popupController) => {

  return async function (dispatch) {
    dispatch({
      type: Types.TOGGLE_SPINNER,
      payload: true,
    })
    await requester
      .post(`/client/account/signin-with-email`, data)
      .then((response) => {

        console.log(response);
        popupController(false);
        var ls = new SecureLS({ encodingType: 'des', isCompression: true, encryptionSecret: '!baqiq-jwt@data*2021.urgent$' });
        ls.set('baqiqUserData', { data: response.data.model });
        let userData = response.data?.model?.accessToken && jwt_decode(response.data.model.accessToken);

        dispatch({
          type: Types.SIGNEDIN_USERDATA,
          userData: userData,
        });
        dispatch({
          type: Types.TOGGLE_SPINNER,
          payload: false,
        });
      })
      .catch((error) => {
        // notify({ body: 'Failed', header: 'Error', type: 'error' })
        dispatch({
          type: Types.TOGGLE_SPINNER,
          payload: false,
        })
        notify({ body: 'فشل تسجيل الدخول برجاء المحاوله مره اخرى', type: 'error' })
        console.log('ERR', error.response);
      });
  }
}

export const SIGNIN_WITH_LOCAL_STORAGE = () => {


  var ls = new SecureLS({ encodingType: 'des', isCompression: true, encryptionSecret: '!baqiq-jwt@data*2021.urgent$' });
  let tokens = ls.get('baqiqUserData').data;
  let userData = tokens && jwt_decode(tokens.accessToken);
  return ({
    type: Types.SIGNEDIN_USERDATA,
    userData: userData,
  });

}

export const LOG_OUT = () => {

  var ls = new SecureLS({ encodingType: 'des', isCompression: true, encryptionSecret: '!baqiq-jwt@data*2021.urgent$' });
  ls.clear('baqiqUserData');
  location.reload();
  return {
    type: Types.LOG_OUT,
  };

}

export const VERIFY_MOBILE = data => {
  return async function (dispatch) {
    dispatch({
      type: Types.TOGGLE_SPINNER,
      payload: true,
    })
    await requester
      .post(`/client/registration/mobile/verify`, data)
      .then((response) => {
        dispatch({
          type: Types.VERIFY_MOBILE,
          // payload: ,
        });
        dispatch({
          type: Types.TOGGLE_SPINNER,
          payload: false,
        })
      })
      .catch((error) => {
        // notify({ body: 'Failed', header: 'Error', type: 'error' })
        dispatch({
          type: Types.TOGGLE_SPINNER,
          payload: false,
        })
        console.log('ERR', error);
      });
  }
}

export const VERIFY_EMAIL = data => {
  return async function (dispatch) {
    dispatch({
      type: Types.TOGGLE_SPINNER,
      payload: true,
    })
    await requester
      .post(`/client/registration/email/verify`, data)
      .then((response) => {
        dispatch({
          type: Types.VERIFY_EMAIL,
          // payload: ,
        });
        dispatch({
          type: Types.TOGGLE_SPINNER,
          payload: false,
        })
      })
      .catch((error) => {
        // notify({ body: 'Failed', header: 'Error', type: 'error' })
        dispatch({
          type: Types.TOGGLE_SPINNER,
          payload: false,
        })
        console.log('ERR', error);
      });
  }
}

export const FORGET_PASSWORD = (data, callBackFn) => {
  console.log(data);
  return async function (dispatch) {
    dispatch({
      type: Types.TOGGLE_SPINNER,
      payload: true,
    })
    await requester
      .post(`/client/account/forget-password`, data)
      .then((response) => {
        callBackFn('confirmCode');
        dispatch({
          type: Types.FORGET_PASSWORD,
          payload: response.data.model,
        });
        dispatch({
          type: Types.TOGGLE_SPINNER,
          payload: false,
        })
      })
      .catch((error) => {
        // notify({ body: 'Failed', header: 'Error', type: 'error' })
        dispatch({
          type: Types.TOGGLE_SPINNER,
          payload: false,
        })
        console.log('ERR', error);
      });
  }
}

export const VERIFY_RESET_CODE = (data, callBackFn) => {
  console.log(data);
  return async function (dispatch) {
    dispatch({
      type: Types.TOGGLE_SPINNER,
      payload: true,
    })
    await requester
      .post(`/client/account/verify-reset-code`, data)
      .then((response) => {
        callBackFn('resetPw');
        console.log(response.data.model);
        dispatch({
          type: Types.TOGGLE_SPINNER,
          payload: false,
        });
        dispatch({
          type: Types.VERIFY_RESET_CODE,
          payload: data.resetCode,
        });
      })
      .catch((error) => {
        // notify({ body: 'Failed', header: 'Error', type: 'error' })
        dispatch({
          type: Types.TOGGLE_SPINNER,
          payload: false,
        });
        console.log('ERR', error);
      });
  }
}

export const RESET_PASSWORD = (data, callBackFn) => {
  console.log(data);

  return async function (dispatch) {
    dispatch({
      type: Types.TOGGLE_SPINNER,
      payload: true,
    })
    await requester
      .post(`/client/account/reset-password`, data)
      .then((response) => {
        callBackFn('resetPwSuccess');
        dispatch({
          type: Types.TOGGLE_SPINNER,
          payload: false,
        })
      })
      .catch((error) => {
        // notify({ body: 'Failed', header: 'Error', type: 'error' })
        dispatch({
          type: Types.TOGGLE_SPINNER,
          payload: false,
        })
        console.log('ERR', error);
      });
  }
}

export const CLEAN_UP_RESET_DATA = () => {

  return { type: Types.CLEAN_UP_RESET_DATA }
}

export const CHANGE_PASSWORD = data => {
  return async function (dispatch) {
    dispatch({
      type: Types.TOGGLE_SPINNER,
      payload: true,
    })
    await requester
      .post(`/client/account/change-password`, data)
      .then((response) => {
        dispatch({
          type: Types.TOGGLE_SPINNER,
          payload: false,
        })
        dispatch({
          type: Types.CHANGE_PASSWORD,
          // payload: ,
        });
      })
      .catch((error) => {
        // notify({ body: 'Failed', header: 'Error', type: 'error' })
        dispatch({
          type: Types.TOGGLE_SPINNER,
          payload: false,
        })
        console.log('ERR', error);
      });
  }
}