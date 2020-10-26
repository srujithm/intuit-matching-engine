const { FILE_UPLOAD_START, FILE_UPLOAD_SUCCESS, FILE_UPLOAD_FAILURE } = require("../constants/fileConstants")

const fileUploadStart = () => {
    return {
        type: FILE_UPLOAD_START
    }
};

const fileUploadSuccess = (data) => {
    return {
        type: FILE_UPLOAD_SUCCESS,
        payload: data
    }
};

const fileUploadFailure = (error) => {
    return {
        type: FILE_UPLOAD_FAILURE,
        payload: error
    }
};

export const fileUpload = (id,file) => dispatch => {
    dispatch(fileUploadStart());
    try {
        let reader = new FileReader();
        let name = file.name.split(".csv")[0].toLowerCase();
        /*
            result = {
                "headers" : [],
                "employees" : {
                    "emp_id" : []
                }
            }
        */
        reader.onload = () => {
            let text = reader.result;
            let lines = text.split("\n");
            let headers = lines[0].trim().split(",");
            var id_index = 0;
            if ( name === "workday") {
                id_index = headers.indexOf("Employee_Id")
            } else if ( name === "alight") {
                id_index = headers.indexOf("EE_ID")
            }
            let result = {};
            result["headers"] = headers;
            result["employees"] = {};
            for (let i=1;i<lines.length; i++) {
                let values = lines[i].trim().split(",");
                let employee_id = values[id_index];
                result["employees"][employee_id] = values;
            }
            dispatch(fileUploadSuccess({[id]: { [name]: result}}));
        }
        reader.readAsText(file);
    } catch (e) {
        dispatch(fileUploadFailure(e));
    }
};