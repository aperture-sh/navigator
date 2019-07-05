import {
    DARK_MODE_OFF,
    DARK_MODE_ON,
    FINISH_UPLOAD,
    REMOVE_UPLOAD,
    SHOW_FEATURES,
    START_UPLOAD, UPDATE_UPLOAD_PROGRESS
} from "../actions/ActionsTypes";
import uuidv4 from 'uuid/v4';

const initialState = {
    darkMode: false,
    features: [],
    files: {}
};

const app = (state = initialState, action) => {
    let files = {};
    let uuid = uuidv4();

    switch (action.type) {
        case DARK_MODE_ON:
            return { ...state, darkMode: true };
        case DARK_MODE_OFF:
            return { ...state, darkMode: false };
        case SHOW_FEATURES:
            return { ...state, features: action.payload };
        case START_UPLOAD:
            Object.assign(files, state.files);
            files[uuid] =  { id: uuid, fileName: action.payload.fileName, progress: 0, file: action.payload.file};
            return { ...state,
                files: files
            };
        case FINISH_UPLOAD:

            Object.assign(files, state.files);
            files[action.payload].progress = 100;
            return { ...state,
                files: files
            };
        case REMOVE_UPLOAD:
            Object.assign(files, state.files);
            delete files[action.payload];
            return { ...state,
                files: files
            };
        case UPDATE_UPLOAD_PROGRESS:
            Object.assign(files, state.files);
            files[action.payload.fileId].progress = action.payload.progress;
            return { ...state,
                files: files
            };
        default:
            return state;
    }
};

export default app;