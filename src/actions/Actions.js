import {
    DARK_MODE_OFF,
    DARK_MODE_ON,
    FINISH_UPLOAD,
    SHOW_FEATURES,
    START_UPLOAD,
    UPDATE_UPLOAD_PROGRESS
} from "./ActionsTypes";

export const turnDarkModeOn = () => ({
    type: DARK_MODE_ON
});

export const turnDarkModeOff = () => ({
    type: DARK_MODE_OFF
});

export const showFeatures = (features) => ({
    type: SHOW_FEATURES,
    payload: features
});

export const startUpload = (fileName) => ({
    type: START_UPLOAD,
    payload: fileName
});

export const finishUpload = (fileName) => ({
    type: FINISH_UPLOAD,
    payload: fileName
});

export const updateUploadProgress = (fileName, progress) => ({
    type: UPDATE_UPLOAD_PROGRESS,
    payload: {
        fileName: fileName,
        progress: progress
    }
});
