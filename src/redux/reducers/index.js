import { combineReducers } from "redux";
import fieldMapReducer from "./fieldMapReducer";
import fileReducer from "./fileReducer";
import matenReducer from "./matenReducer";

const rootReducer = combineReducers({
    maten: matenReducer,
    files: fileReducer,
    fieldMap: fieldMapReducer
});

export default rootReducer;