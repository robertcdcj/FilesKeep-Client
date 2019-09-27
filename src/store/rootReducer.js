import * as actionTypes from "./actions.js";
const initialState = {
    auth: false,
    initialLaunch: true,
    errorMessage: ""
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTHENTICATED:
            return {
                ...state,
                auth: true,
                initialLaunch: false
            }
        case actionTypes.NOT_AUTHENTICATED:
            return {
                ...state,
                auth: false,
                initialLaunch: false
            }
        case actionTypes.SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        case actionTypes.UNSET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: ""
            }
        default:
            return state;
    }
}

export default rootReducer;
