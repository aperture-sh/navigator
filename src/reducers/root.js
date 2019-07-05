import {DARK_MODE_OFF, DARK_MODE_ON, SHOW_FEATURES, START_UPLOAD} from "../actions/ActionsTypes";
import uuidv4 from 'uuid/v4';

const initialState = {
    darkMode: false,
    features: [],
    files: {}
};

const app = (state = initialState, action) => {
    switch (action.type) {
        case DARK_MODE_ON:
            return { ...state, darkMode: true };
        case DARK_MODE_OFF:
            return { ...state, darkMode: false };
        case SHOW_FEATURES:
            return { ...state, features: action.payload };
        case START_UPLOAD:
            let files = {};
            let uuid = uuidv4();
            Object.assign(files, state.files);
            files[uuid] =  { id: uuid, fileName: action.payload, progress: 0};
            return { ...state,
                files: files
            };
        default:
            return state;
    }
};

export default app;