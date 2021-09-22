import Types from "../../types/types";

const whoWeAre = (state = {}, action) => {
    switch (action.type) {
        case Types.GET_WHO_WE_ARE:
            return {
                ...state,
                ...action.payload,
            };

        case Types.GET_PRAISE_DETAILS:
            return {
                ...state,
                praiseDetails: action.payload
            };

        case Types.CLEAN_PRAISE_DETAILS:
            return {
                ...state,
                praiseDetails: null,
            };

        // case Types.GET_OUR_GOALS:
        //     return {
        //         ...state,
        //         ourGoals: action.payload,
        //     };


        default:
            return state;
    }
};

export default whoWeAre;
