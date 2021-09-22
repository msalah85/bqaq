import Types from "../../types/types";

const lessons = (state = {}, action) => {
    switch (action.type) {
        case Types.GET_LESSONS:
            return {
                ...state,
                lessonsData: action.payload,
            };

        case Types.GET_LESSON_DETAILS:
            return {
                ...state,
                lessonDetailsData: action.payload,
            };

        case Types.GET_ALL_SHEIKHS:
            return {
                ...state,
                allSheikhs: action.payload,
            };

        case Types.GET_SHEIKH_DETAILS:
            return {
                ...state,
                sheikhDetails: action.payload,
            };

        default:
            return state;
    }
};

export default lessons;
