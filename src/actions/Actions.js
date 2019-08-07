import {
    ADD_FEATURES,
    CHANGE_FEATURE_PROP, CLOSE_DRAWER,
    CLOSE_EXHAUSTER,
    CONFIG_CHANGE,
    DARK_MODE_OFF,
    DARK_MODE_ON,
    DELETE_FEATURE,
    FINISH_UPLOAD,
    HIDE_BASELAYER,
    INIT_FEATURES, OPEN_DRAWER,
    OPEN_EXHAUSTER,
    REMOVE_PROPERTY_FROM_FEATURE,
    REMOVE_UPLOAD,
    SHOW_BASELAYER,
    SHOW_FEATURES,
    START_UPLOAD, START_UPLOADS,
    SUBMIT_FEATURE,
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

export const startUploads = (files) => ({
    type: START_UPLOADS,
    payload: {
        files: files
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

export const deleteExhaustedFeature = (id) => ({
    type: DELETE_FEATURE,
    payload: id
});

export const submitExhaustedFeature = (id) => ({
    type: SUBMIT_FEATURE,
    payload: id
});

export const changeExhaustedFeatureProperty = (id, key, value) => ({
   type: CHANGE_FEATURE_PROP,
   payload: {
       id: id,
       key: key,
       value: value
   }
});

export const removePropertyFromFeature = (id, key) => ({
    type: REMOVE_PROPERTY_FROM_FEATURE,
    payload: {
        id: id,
        key: key
    }
});

export const initExhaustedFeatures = (features) => ({
    type: INIT_FEATURES,
    payload: features
});

export const hideBaselayer  = () => ({
    type: HIDE_BASELAYER
});

export const showBaselayer  = () => ({
    type: SHOW_BASELAYER
});

export const openDrawer = () => ({
    type: OPEN_DRAWER
});

export const closeDrawer = () => ({
    type: CLOSE_DRAWER
});