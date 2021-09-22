import Types from "../../types/types";

const bookStore = (state = {}, action) => {
    switch (action.type) {
        case Types.GET_BOOKSTORE:
            return {
                ...state,
                books: action.payload,
            };

        case Types.GET_BOOK_DETAILS:
            return {
                ...state,
                bookDetailsData: action.payload,
            };

        default:
            return state;
    }
};

export default bookStore;
