import Types from "../../types/types";

const mediaCenter = (state = {}, action) => {
    switch (action.type) {
        case Types.GET_MEDIA_CENTER_SECTION:
            return {
                ...state,
                pageData: action.payload,
            };

        case Types.GET_POST_DETAILS:
            return {
                ...state,
                postDetails: action.payload
            };

        case Types.CLEAN_POST_DETAILS:
            return {
                ...state,
                postDetails: null,
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

export default mediaCenter;