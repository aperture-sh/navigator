import {
    ADD_FEATURES,
    CLOSE_EXHAUSTER,
    CONFIG_CHANGE,
    DARK_MODE_OFF,
    DARK_MODE_ON,
    FINISH_UPLOAD, OPEN_EXHAUSTER, REMOVE_UPLOAD,
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

export const startUpload = (fileName, file) => ({
    type: START_UPLOAD,
    payload: {
        fileName: fileName,
        file: file
    }
});

export const finishUpload = (fileId) => ({
    type: FINISH_UPLOAD,
    payload: fileId
});

export const removeUpload = (fileId) => ({
    type: REMOVE_UPLOAD,
    payload: fileId
});

export const updateUploadProgress = (fileId, progress) => ({
    type: UPDATE_UPLOAD_PROGRESS,
    payload: {
        fileId: fileId,
        progress: progress
    }
});

export const configChange = (config) => ({
    type: CONFIG_CHANGE,
    payload: config
});

export const openExhauster = () => ({
   type: OPEN_EXHAUSTER
});

export const closeExhauster = () => ({
    type: CLOSE_EXHAUSTER
});

export const addExhaustedFeatures = (features) => ({
    type: ADD_FEATURES,
    payload: features
});