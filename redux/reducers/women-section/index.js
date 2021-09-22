import Types from "../../types/types";

const womenSection = (state = {}, action) => {
    switch (action.type) {
        case Types.GET_WOMEN_SECTION:
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
};

export default womenSection;
