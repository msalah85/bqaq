import Types from "../../types/types";

const elgaliat = (state = {}, action) => {
    switch (action.type) {
        case Types.GET_ELGALIAT:
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
};

export default elgaliat;
