import {
    ADD_FEATURES, CHANGE_FEATURE_PROP, CHANGE_FILTER, CLOSE_DRAWER,
    CLOSE_EXHAUSTER,
    CONFIG_CHANGE,
    DARK_MODE_OFF,
    DARK_MODE_ON, DELETE_FEATURE,
    FINISH_UPLOAD, HIDE_BASELAYER, INIT_FEATURES, OPEN_DRAWER, OPEN_EXHAUSTER, REMOVE_PROPERTY_FROM_FEATURE,
    REMOVE_UPLOAD, SHOW_BASELAYER,
    SHOW_FEATURES,
    START_UPLOAD, START_UPLOADS, SUBMIT_FEATURE, UPDATE_UPLOAD_PROGRESS
} from "../actions/ActionsTypes";
import uuidv4 from 'uuid/v4';

const initialState = {
    darkMode: true,
    features: [],
    exhausted_features: [],
    files: {},
    config: undefined,
    filter: undefined,
    modal: false,
    drawer: false,
    baselayer: true
};

const app = (state = initialState, action) => {
    let files = {};
    let tmpFeatures = [];
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
        case START_UPLOADS:
            Object.assign(files, state.files);
            for (let i=0; i<action.payload.files.length;i++) {
                let f = action.payload.files[i];
                let uuidTmp = uuidv4();
                files[uuidTmp] =  { id: uuidTmp, fileName: f.name, progress: 0, file: f};
            }
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
            Object.assign(tmpFeatures, state.exhausted_features);
            tmpFeatures = tmpFeatures.concat(action.payload);
            return { ...state,
                exhausted_features: tmpFeatures
            };
        case DELETE_FEATURE || SUBMIT_FEATURE:
            Object.assign(tmpFeatures, state.exhausted_features);
            let tmp = tmpFeatures.find((f) => f._id.$oid === action.payload);
            tmpFeatures.splice(tmpFeatures.indexOf(tmp), 1);
            return { ...state,
                exhausted_features: tmpFeatures
            };
        case CHANGE_FEATURE_PROP:
            Object.assign(tmpFeatures, state.exhausted_features);
            let tmp2 = tmpFeatures.find((f) => f._id.$oid === action.payload.id);
            tmp2.properties[action.payload.key] = action.payload.value;
            return { ...state,
                exhausted_features: tmpFeatures
            };
        case REMOVE_PROPERTY_FROM_FEATURE:
            Object.assign(tmpFeatures, state.exhausted_features);
            let tmp3 = tmpFeatures.find((f) => f._id.$oid === action.payload.id);
            delete tmp3.properties[action.payload.key];
            return { ...state,
                exhausted_features: tmpFeatures
            };
        case INIT_FEATURES:
            return { ...state,
                exhausted_features: action.payload
            };
        case HIDE_BASELAYER:
            return { ...state,
                baselayer: false
            };
        case SHOW_BASELAYER:
            return { ...state,
                baselayer: true
            };
        case OPEN_DRAWER:
            return { ...state,
                drawer: true
            };
        case CLOSE_DRAWER:
            return { ...state,
                drawer: false
            };
        case CHANGE_FILTER:
            return { ...state,
                filter: action.payload
            };
        default:
            return state;
    }
};

export default app;