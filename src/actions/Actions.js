import {
    DARK_MODE_OFF,
    DARK_MODE_ON,
    FINISH_UPLOAD, REMOVE_UPLOAD,
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
