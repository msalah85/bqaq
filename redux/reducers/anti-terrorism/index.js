import Types from "../../types/types";

const antiTerrorism = (state = {}, action) => {
    console.log('anti reducer');
    switch (action.type) {
        case Types.GET_EFFORTS: {
            console.log('statteeeee', action);

            return {
                ...state,
                efforts: action.payload,
            };
        }
        case Types.GET_SUSPICIONS:
            return {
                ...state,
                suspicions: action.payload,
            };

        case Types.GET_RESEARCH:
            return {
                ...state,
                researches: action.payload,
            };

        case Types.GET_VIDEOS:
            return {
                ...state,
                videos: action.payload,
            };

        case Types.GET_AUDIOS:
            return {
                ...state,
                audios: action.payload,
            };

        default:
            return state;
    }
};

export default antiTerrorism;
