import Types from "../../types/types";

const ourProjects = (state = {}, action) => {
    switch (action.type) {
        case Types.GET_OUR_PROJECTS:
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
};

export default ourProjects;
