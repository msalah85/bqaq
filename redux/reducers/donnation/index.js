import Types from "../../types/types";

const donnationListOfProject = (state = [], action) => {
    switch (action.type) {
        case Types.GET_DONNATION_LIST_OF_PROJECT:
            console.log('dataa', action);
            return [...action.payload];



        default:
            return state;
    }
};

export default donnationListOfProject;
