import Types from "../../types/types";

const videos = (state = {}, action) => {
    switch (action.type) {
        case Types.GET_VIDEOS:
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
};

export default videos;
