import { MATEN_MERGE_FAILURE, MATEN_MERGE_START, MATEN_MERGE_SUCCESS, MATEN_MERGE_UPDATE } from "../constants/matenConstants";

export const INITIAL_STATE = {
    loading: false,
    error: null,
    data: null
}

const matenReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case MATEN_MERGE_START: return {
            ...state,
            loading: true
        };
        case MATEN_MERGE_SUCCESS: return {
            ...state,
            loading: false,
            error: null,
            data: action.payload
        };
        case MATEN_MERGE_FAILURE: return {
            ...state,
            loading: false,
            error: action.payload
        };
        case MATEN_MERGE_UPDATE: return {
            ...state,
            loading: false,
            error: null,
            data: {
                ...state.data,
                ...action.payload
            }
        }
        default : return state;
    }
};

export default matenReducer;