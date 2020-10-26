const { FILE_UPLOAD_START, FILE_UPLOAD_SUCCESS, FILE_UPLOAD_FAILURE } = require("../constants/fileConstants");

const INITIAL_STATE = {
    loading: false,
    error: null,
    data: {}
};

const fileReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case FILE_UPLOAD_START : return {
            ...state,
            loading: true,
            error: null
        };
        case FILE_UPLOAD_SUCCESS: return {
            ...state,
            loading: false,
            error: null,
            data: {
                ...state.data,
                ...action.payload
            }
        };
        case FILE_UPLOAD_FAILURE: return {
            ...state,
            loading: false,
            error: action.payload
        };
        default: return state;
    }
};

export default fileReducer;