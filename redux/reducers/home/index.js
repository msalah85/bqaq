import Types from "../../types/types";

const home = (state = {}, action) => {
    switch (action.type) {
        case Types.GET_BANNERS:
            return {
                ...state,
                banners: action.payload,
            };

        case Types.GET_HOME_DATA:
            return {
                ...state,
                homeData: action.payload,
            };

        default:
            return state;
    }
};

export default home;
