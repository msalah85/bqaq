import Types from "../../types/types";
import requester from '../../../requester/requester';

export const TOGGLE_SPINNER = (spinnerStatus) => {
    return {
        type: Types.TOGGLE_SPINNER,
        payload: spinnerStatus,
    }
}


