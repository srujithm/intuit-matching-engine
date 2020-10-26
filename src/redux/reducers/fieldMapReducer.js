import { FIELD_MAP_UPDATE_FAILURE, FIELD_MAP_UPDATE_START, FIELD_MAP_UPDATE_SUCCESS } from "../constants/fieldMapConstants";

export const INITIAL_STATE = {
    data: {
        "workday" : [ "Employee_Id", "First_Name", "Last_Name", "Hire_Date", "Termination_Date" ],
        "alight"  : [ "EE_ID", "FIRST_NAME", "LAST_NAME", "HIRE_DT", "TERM_DT"]
    },
    loading: false,
    error: null
};

const fieldMapReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case FIELD_MAP_UPDATE_START : return {
            ...state,
            loading: true,
            error: null
        };
        case FIELD_MAP_UPDATE_SUCCESS: return {
            ...state,
            data: {...action.payload},
            loading: false,
            error: null
        };
        case FIELD_MAP_UPDATE_FAILURE : return {
            ...state,
            loading: false,
            error: action.payload
        };
        default: return state;
    }
};

export default fieldMapReducer;