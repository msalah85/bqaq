import Types from "../../types/types";

const authorization = (state = { showSigninPopup: false }, action) => {
    switch (action.type) {
        case Types.TOGGLE_SIGNIN_POPUP:
            return {
                ...state,
                showSigninPopup: action.payload,
            };

        case Types.SIGNEDIN_USERDATA:
            return {
                ...state,
                userData: action.userData,
            };

        case Types.LOG_OUT:
            return {
                ...state,
                userData: null,
            };

        case Types.VERIFY_MOBILE:
            return {
                ...state,

            };

        case Types.VERIFY_EMAIL:
            return {
                ...state,

            };

        case Types.FORGET_PASSWORD:
            console.log(action);
            return {
                ...state,
                resetPWData: action.payload,
            };

        case Types.VERIFY_RESET_CODE:
            return {
                ...state,
                resetPWData: { ...state.resetPWData, resetCode: action.payload }
            };

        case Types.RESET_PASSWORD:
            return {
                ...state,

            };

        case Types.CHANGE_PASSWORD:
            return {
                ...state,

            };
        case Types.CLEAN_UP_RESET_DATA:
            return {
                ...state,
                resetPWData: null,
            }
        default:
            return state;
    }
};

export default authorization;
