import {DARK_MODE_OFF, DARK_MODE_ON, SHOW_FEATURES} from "../actions/ActionsTypes";

const initialState = {
    darkMode: false,
    features: []
};

const app = (state = initialState, action) => {
    switch (action.type) {
        case DARK_MODE_ON:
            return { ...state, darkMode: true };
        case DARK_MODE_OFF:
            return { ...state, darkMode: false };
        case SHOW_FEATURES:
            return { ...state, features: action.payload };
        default:
            return state;
    }
};

export default app;