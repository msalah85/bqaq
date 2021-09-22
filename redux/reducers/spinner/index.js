import Types from "../../types/types";

const spinner = (state = false, action) => {
    switch (action.type) {
        case Types.TOGGLE_SPINNER:
            return action.payload;

        default:
            return state;
    }
};

export default spinner;
