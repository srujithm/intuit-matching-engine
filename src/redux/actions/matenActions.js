const { MATEN_MERGE_START, MATEN_MERGE_SUCCESS, MATEN_MERGE_FAILURE, MATEN_MERGE_UPDATE } = require("../constants/matenConstants")

const matenMergeStart = () => {
    return {
        type: MATEN_MERGE_START
    }
};

const matenMergeSuccess = (data) => {
    return {
        type: MATEN_MERGE_SUCCESS,
        payload: data
    }
};

const matenMergeFailure = (error) => {
    return {
        type: MATEN_MERGE_FAILURE,
        payload: error
    }
};

export const matenMerge = (fieldMap, data1, data2) => async dispatch => {
    dispatch(matenMergeStart());
    try {
        var workday = {};
        var alight = {};
        if (data1.hasOwnProperty("workday")) {
            workday = data1["workday"];
            alight = data2["alight"];
        } else {
            alight = data1["alight"];
            workday = data2["workday"];
        }
        let indexMap = {};
        fieldMap.workday.map((item, index) => {
            const alight_item = fieldMap.alight[index];
            let workday_index = workday.headers.indexOf(item);
            let alight_index = alight.headers.indexOf(alight_item);
            indexMap[workday_index] = alight_index;
        });
        let finalResult = {
            headers : [...workday.headers, 'BENEFITS_STATUS_CODE', 'DISCREPANCIES'],
            employees: {}
        };
        let benefits_index = alight.headers.indexOf('BENEFITS_STATUS_CODE');
        const getBenefitCode = (workday_emp) => {
            let employment_type_index = workday.headers.indexOf('Employment_Type');
            let termination_status_index = workday.headers.indexOf('Termination_Status');
            let termination_date_index = workday.headers.indexOf('Termination_Date');
            let termination_reason_index = workday.headers.indexOf('Termination_Reason');
            let leave_status_index = workday.headers.indexOf('Leave_Status');
            let leave_type_index = workday.headers.indexOf('Leave_Type');

            let benefit_code = "";
            let benefit_leaves = [
                "Regulatory > Family Medical Leave Act",
                "Company > Disability",
                "Personal > Health Reasons",
                "Regulatory > Uncertified Medical Leave",
                "Regulatory > Workers Compensation"
            ]
            let non_benefit_leaves = [
                "Personal > Personal Leave",
                "Regulatory > Work Authorization Leave"
            ]
            if ( workday_emp[employment_type_index]?.toLowerCase() === "p" ) {
                benefit_code = "INELG1"
            } else if ( workday_emp[termination_status_index]?.toLowerCase() === "true" ) {
                let termination_date = new Date(workday_emp[termination_date_index]);
                let current_date = new Date();
                if ( workday_emp[termination_reason_index]?.toLowerCase() === "death" && termination_date < current_date) {
                    benefit_code = "DTH15"
                } else {
                    benefit_code = "TERM01"
                }
            } else if ( workday_emp[leave_status_index]?.toLowerCase() === "true") {
                if ( benefit_leaves.includes(workday_emp[leave_type_index]) ) {
                    benefit_code = "STDUN1"
                } else if ( non_benefit_leaves.includes(workday_emp[leave_type_index]) ) {
                    benefit_code = "INELG1"
                } else {
                    benefit_code = "ACTIVE"
                }
            } else {
                benefit_code = "ACTIVE"
            }

            return benefit_code
        }
        for ( let emp in workday.employees) {
            let workday_emp = workday.employees[emp];
            let alight_emp = alight.employees?.[emp] || [];
            let discrepancies = [];
            for ( let i in indexMap) {
                if (alight_emp.hasOwnProperty(indexMap[i]) ) {
                    if (workday_emp[i].trim() !== alight_emp[indexMap[i]].trim()) {
                        discrepancies.push({
                            [workday.headers[i]] : workday_emp[i],
                            [alight.headers[indexMap[i]]] : alight_emp[indexMap[i]]
                        });
                    }
                } else {
                    discrepancies.push({
                        [workday.headers[i]] : workday_emp[i],
                        [alight.headers[indexMap[i]]] : ""
                    });
                }
            }
            // check for benefits_status_code
            let benefit_code = getBenefitCode(workday_emp);
            let expected_benefit_code = alight_emp?.[benefits_index];
            if ( benefit_code !== expected_benefit_code) {
                discrepancies.push({
                    "STATUS_CODE" : benefit_code,
                    "BENEFITS_STATUS_CODE": expected_benefit_code 
                })
            }
            finalResult.employees[emp] = [...workday_emp, alight_emp?.[benefits_index], discrepancies];
        }
        for ( let emp in alight.employees) {
            let workday_emp = workday.employees?.[emp] || [];
            let alight_emp = alight.employees[emp];
            let discrepancies = [];
            if (workday_emp.length === 0 ) {
                for ( let i in indexMap) {
                    discrepancies.push({
                        [workday.headers[i]] : "",
                        [alight.headers[indexMap[i]]] : alight_emp[indexMap[i]]
                    });
                    
                }
                for (let j=0;j<workday.headers.length; j++) {
                    if (indexMap.hasOwnProperty(j)) {
                        workday_emp[j] = alight_emp[indexMap[j]];
                    } else {
                        workday_emp[j] = ""
                    }
                }
                let expected_benefit_code = alight_emp?.[benefits_index];
                discrepancies.push({
                    "STATUS_CODE" : "",
                    "BENEFITS_STATUS_CODE": expected_benefit_code 
                })
                finalResult.employees[emp] = [...workday_emp, alight_emp[benefits_index], discrepancies];
            }   
            
        }
        dispatch(matenMergeSuccess(finalResult));
    } catch (e) {
        console.log(e);
        dispatch(matenMergeFailure(e))
    }
};

const matenMergeUpdate = (data) => {
    return {
        type: MATEN_MERGE_UPDATE,
        payload: data
    }
}

export const matenUpdate = (type, employee_id, emp, disc_index, headers) => async dispatch => {
    //dispatch(matenMergeStart())
    try {
        let discrepancies = emp[emp.length - 1];
        let curr_disc = discrepancies[disc_index];
        if ( type === "workday" ) {
            let workday_header = Object.keys(curr_disc)[0];
            let alight_header = Object.keys(curr_disc)[1];
            if ( alight_header === "BENEFITS_STATUS_CODE") {
                let index = headers.indexOf("BENEFITS_STATUS_CODE");
                emp[index] = curr_disc[workday_header];
            }
        } else {
            let workday_header = Object.keys(curr_disc)[0];
            let alight_header = Object.keys(curr_disc)[1];
            if ( alight_header === "BENEFITS_STATUS_CODE") {
                let employment_type_index = headers.indexOf('Employment_Type');
                let termination_status_index = headers.indexOf('Termination_Status');
                let termination_date_index = headers.indexOf('Termination_Date');
                let termination_reason_index = headers.indexOf('Termination_Reason');
                let leave_status_index = headers.indexOf('Leave_Status');
                let leave_type_index = headers.indexOf('Leave_Type');
                let expected_benefit_code = curr_disc[alight_header];
                let benefit_leaves = [
                    "Regulatory > Family Medical Leave Act",
                    "Company > Disability",
                    "Personal > Health Reasons",
                    "Regulatory > Uncertified Medical Leave",
                    "Regulatory > Workers Compensation"
                ]
                let non_benefit_leaves = [
                    "Personal > Personal Leave",
                    "Regulatory > Work Authorization Leave"
                ]
                if ( expected_benefit_code === "DTH15") {
                    emp[termination_reason_index] = "Death";
                    emp[termination_status_index] = "TRUE";
                    emp[employment_type_index] = "F"
                } else if (expected_benefit_code === "ACTIVE") {
                    emp[leave_status_index] = "";
                    emp[leave_type_index] = "";
                    emp[termination_status_index] = "";
                    emp[termination_reason_index] = "";
                    emp[termination_date_index] = "";
                    emp[employment_type_index] = "F"
                } else if (expected_benefit_code === "INELG1") {
                    if (emp[employment_type_index] === "F") {
                        emp[leave_status_index] = "TRUE";
                        emp[leave_type_index] = non_benefit_leaves.sort(() => 0.5 - Math.random())[0];
                    } else {
                        emp[employment_type_index] = "P"
                    }
                } else if (expected_benefit_code === "STDUN1" ) {
                    emp[employment_type_index] = "F"
                    emp[leave_status_index] = "TRUE";
                    emp[leave_type_index] = benefit_leaves.sort(() => 0.5 - Math.random())[0];
                } else if (expected_benefit_code === "TERM01") {
                    emp[leave_status_index] = "";
                    emp[leave_type_index] = "";
                    emp[termination_reason_index] = "Voluntary>Resignation";
                    emp[termination_status_index] = "TRUE";
                    emp[termination_date_index] = new Date().toJSON().slice(0,10).split('-').reverse().join('/');
                }
            } else {
                let index = headers.indexOf(workday_header);
                emp[index] = curr_disc[alight_header];
            }
        }
        let new_discrepancies = discrepancies.filter((item, indx) => indx !== disc_index);
        emp[emp.length - 1] = new_discrepancies;
        dispatch(matenMergeUpdate({
            [employee_id] : emp
        }))
    } catch (e) {
        dispatch(matenMergeFailure(e))
    }
}