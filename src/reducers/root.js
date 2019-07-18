import {
    ADD_FEATURES,
    CLOSE_EXHAUSTER,
    CONFIG_CHANGE,
    DARK_MODE_OFF,
    DARK_MODE_ON, DELETE_FEATURE,
    FINISH_UPLOAD, OPEN_EXHAUSTER,
    REMOVE_UPLOAD,
    SHOW_FEATURES,
    START_UPLOAD, SUBMIT_FEATURE, UPDATE_UPLOAD_PROGRESS
} from "../actions/ActionsTypes";
import uuidv4 from 'uuid/v4';

const initialState = {
    darkMode: true,
    features: [],
    exhausted_features: [],
    files: {},
    config: undefined,
    modal: false
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
        case CONFIG_CHANGE:
            return { ...state,
                config: action.payload
            };
        case OPEN_EXHAUSTER:
            return { ...state,
                modal: true
            };
        case CLOSE_EXHAUSTER:
            return { ...state,
                modal: false
            };
        case ADD_FEATURES:
            return { ...state,
                exhausted_features: action.payload
            };
        case DELETE_FEATURE || SUBMIT_FEATURE:
            let exhaustedFeatures = [];
            Object.assign(exhaustedFeatures, state.exhausted_features);
            let index = exhaustedFeatures.find((f) => f._id.$oid === action.payload);
            exhaustedFeatures.splice(index, 1);
            return { ...state,
                exhausted_features: exhaustedFeatures
            };
        default:
            return state;
    }
};

export default app;