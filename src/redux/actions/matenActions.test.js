import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { MATEN_MERGE_START, MATEN_MERGE_SUCCESS, MATEN_MERGE_UPDATE } from '../constants/matenConstants';
import { matenMerge, matenUpdate } from './matenActions';
import { INITIAL_STATE as fieldMapState } from '../reducers/fieldMapReducer';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('maten actions' , () => {
    it('update data after merging is done', () => {
        const store = mockStore({ maten: {
            data: null,
            loading: false,
            error: null
        }})
        const expectedActions = [
            { type: MATEN_MERGE_START },
            { type: MATEN_MERGE_SUCCESS, payload: {
                employees: {
                    "1" : [ "1", "fn", "ln", "F", "10/02/2010", "", "", "", "", "", "ACTIVE", []],
                    "2" : ["2", "fn", "ln", "F", "10/02/2010", "", "", "", "", "", undefined, [{
                        "EE_ID" : "",
                        "Employee_Id": "2"
                    }, {
                        "FIRST_NAME": "",
                        "First_Name" : "fn"
                    }, {
                        "LAST_NAME" : "",
                        "Last_Name": "ln"
                    }, {
                        "HIRE_DT" : "",
                        "Hire_Date" : "10/02/2010"
                    }, {
                        "TERM_DT": "",
                        "Termination_Date": ""
                    }, {
                        "BENEFITS_STATUS_CODE" : undefined,
                        "STATUS_CODE" : "ACTIVE"
                    }]],
                    "3" : [ "3", "fn", "ln", "", "10/02/2010", "", "", "", "", "", "ACTIVE", [{
                        "EE_ID" : "3",
                        "Employee_Id": ""
                    }, {
                        "FIRST_NAME": "fn",
                        "First_Name" : ""
                    }, {
                        "LAST_NAME" : "ln",
                        "Last_Name": ""
                    }, {
                        "HIRE_DT" : "10/02/2010",
                        "Hire_Date" : ""
                    }, {
                        "TERM_DT": "",
                        "Termination_Date": ""
                    }, {
                        "BENEFITS_STATUS_CODE" : "ACTIVE",
                        "STATUS_CODE" : ""
                    }]]
                },
                "headers": [
                    "Employee_Id", "First_Name", "Last_Name", "Employment_Type", "Hire_Date",
                    "Termination_Date", "Termination_Status", "Termination_Reason", "Leave_Status", "Leave_Type",
                    "BENEFITS_STATUS_CODE", "DISCREPANCIES"
                ]
            } }
        ];
        const fieldMap = fieldMapState.data;
        const workday = {
            "workday": {
                headers: [
                    "Employee_Id", "First_Name", "Last_Name", "Employment_Type", "Hire_Date",
                    "Termination_Date", "Termination_Status", "Termination_Reason", "Leave_Status", "Leave_Type"
                ],
                employees: {
                    "1" : ["1", "fn", "ln", "F", "10/02/2010", "", "", "", "", ""],
                    "2" : ["2", "fn", "ln", "F", "10/02/2010", "", "", "", "", ""],
                }
            }
        };
        const alight = {
            "alight" : {
                headers: ["EE_ID", "FIRST_NAME", "LAST_NAME", "HIRE_DT", "TERM_DT", "BENEFITS_STATUS_CODE"],
                employees: {
                    "1" : ["1", "fn", "ln", "10/02/2010", "", "ACTIVE"],
                    "3" : ["3", "fn", "ln", "10/02/2010", "", "ACTIVE"]
                }
            }
        }
        return store.dispatch(matenMerge(fieldMap,workday, alight)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })

    })
});

describe("maten update action with employee id update", () => {
    it("update employee data based on user selection", () => {
        const store = mockStore(
            {
                maten: {
                    data: {
                        "employees" : {
                            "1" : [ "1", "fn", "ln", "F", "10/02/2010", "", "", "", "", "", "ACTIVE", []],
                            "2" : ["2", "fn", "ln", "F", "10/02/2010", "", "", "", "", "", undefined, [{
                                "Employee_Id": "2",
                                "EE_ID" : ""
                            }, {
                                "FIRST_NAME": "",
                                "First_Name" : "fn"
                            }, {
                                "LAST_NAME" : "",
                                "Last_Name": "ln"
                            }, {
                                "HIRE_DT" : "",
                                "Hire_Date" : "10/02/2010"
                            }, {
                                "TERM_DT": "",
                                "Termination_Date": ""
                            }, {
                                "BENEFITS_STATUS_CODE" : undefined,
                                "STATUS_CODE" : "ACTIVE"
                            }]],
                        },
                        "headers": [
                            "Employee_Id", "First_Name", "Last_Name", "Employment_Type", "Hire_Date",
                            "Termination_Date", "Termination_Status", "Termination_Reason", "Leave_Status", "Leave_Type",
                            "BENEFITS_STATUS_CODE", "DISCREPANCIES"
                        ]
                    },
                    loading: false,
                    error: null
                },
        });
        const emp = ["2", "fn", "ln", "F", "10/02/2010", "", "", "", "", "", undefined, [{
            "Employee_Id": "2",
            "EE_ID" : ""
        }, {
            "FIRST_NAME": "",
            "First_Name" : "fn"
        }, {
            "LAST_NAME" : "",
            "Last_Name": "ln"
        }, {
            "HIRE_DT" : "",
            "Hire_Date" : "10/02/2010"
        }, {
            "TERM_DT": "",
            "Termination_Date": ""
        }, {
            "BENEFITS_STATUS_CODE" : undefined,
            "STATUS_CODE" : "ACTIVE"
        }]];
        const headers = [
            "Employee_Id", "First_Name", "Last_Name", "Employment_Type", "Hire_Date",
            "Termination_Date", "Termination_Status", "Termination_Reason", "Leave_Status", "Leave_Type",
            "BENEFITS_STATUS_CODE", "DISCREPANCIES"
        ];
        const expectedActions = [
            {
                type: MATEN_MERGE_UPDATE,
                payload: {
                    "2":  ["2", "fn", "ln", "F", "10/02/2010", "", "", "", "", "", undefined, [{
                        "FIRST_NAME": "",
                        "First_Name" : "fn"
                    }, {
                        "LAST_NAME" : "",
                        "Last_Name": "ln"
                    }, {
                        "HIRE_DT" : "",
                        "Hire_Date" : "10/02/2010"
                    }, {
                        "TERM_DT": "",
                        "Termination_Date": ""
                    }, {
                        "STATUS_CODE" : "ACTIVE",
                        "BENEFITS_STATUS_CODE" : undefined
                    }]]
                }
            }
        ];
        return store.dispatch(matenUpdate("workday","2", emp, 0, headers)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    });
})

describe("maten update action with status code update" , () => {
    it("update status code ", () => {
        const store = mockStore(
            {
                maten: {
                    data: {
                        "employees" : {
                            "1" : [ "1", "fn", "ln", "F", "10/02/2010", "", "", "", "", "", "ACTIVE", []],
                            "2" : ["2", "fn", "ln", "F", "10/02/2010", "", "", "", "", "", undefined, [{
                                "Employee_Id": "2",
                                "EE_ID" : ""
                            }, {
                                "FIRST_NAME": "",
                                "First_Name" : "fn"
                            }, {
                                "LAST_NAME" : "",
                                "Last_Name": "ln"
                            }, {
                                "HIRE_DT" : "",
                                "Hire_Date" : "10/02/2010"
                            }, {
                                "TERM_DT": "",
                                "Termination_Date": ""
                            }, {
                                "BENEFITS_STATUS_CODE" : undefined,
                                "STATUS_CODE" : "ACTIVE"
                            }]],
                        },
                        "headers": [
                            "Employee_Id", "First_Name", "Last_Name", "Employment_Type", "Hire_Date",
                            "Termination_Date", "Termination_Status", "Termination_Reason", "Leave_Status", "Leave_Type",
                            "BENEFITS_STATUS_CODE", "DISCREPANCIES"
                        ]
                    },
                    loading: false,
                    error: null
                },
        });
        const emp = ["2", "fn", "ln", "F", "10/02/2010", "", "", "", "", "", undefined, [{
            "Employee_Id": "2",
            "EE_ID" : ""
        }, {
            "First_Name" : "fn",
            "FIRST_NAME": ""
        }, {
            "Last_Name": "ln",
            "LAST_NAME" : "",
        }, {
            "Hire_Date" : "10/02/2010",
            "HIRE_DT" : ""
        }, {
            "Termination_Date": "",
            "TERM_DT": ""
        }, {
            "STATUS_CODE" : "ACTIVE",
            "BENEFITS_STATUS_CODE" : undefined
        }]];
        const headers = [
            "Employee_Id", "First_Name", "Last_Name", "Employment_Type", "Hire_Date",
            "Termination_Date", "Termination_Status", "Termination_Reason", "Leave_Status", "Leave_Type",
            "BENEFITS_STATUS_CODE", "DISCREPANCIES"
        ];
        const expectedActions = [
            {
                payload: {
                    "2":  [
                            "2", "fn", "ln", "F", "10/02/2010", "", "", "", "", "", undefined, [{
                                "Employee_Id": "2",
                                "EE_ID" : ""
                            },{
                                "FIRST_NAME": "",
                                "First_Name" : "fn"
                            }, {
                                "LAST_NAME" : "",
                                "Last_Name": "ln"
                            }, {
                                "HIRE_DT" : "",
                                "Hire_Date" : "10/02/2010"
                            }, {
                                "TERM_DT": "",
                                "Termination_Date": ""
                            }
                        ]
                    ]
                },

                type: MATEN_MERGE_UPDATE
            }
        ];
        return store.dispatch(matenUpdate("alight","2", emp, 5, headers)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
});

describe("maten update action with non status code update" , () => {
    it("update status code ", () => {
        const store = mockStore(
            {
                maten: {
                    data: {
                        "employees" : {
                            "1" : [ "1", "fn", "ln", "F", "10/02/2010", "", "", "", "", "", "ACTIVE", []],
                            "2" : ["2", "fn", "ln", "F", "10/02/2010", "", "", "", "", "", undefined, [{
                                "Employee_Id": "2",
                                "EE_ID" : ""
                            }, {
                                "First_Name" : "fn",
                                "FIRST_NAME": "fn2"
                            },{
                                "LAST_NAME" : "",
                                "Last_Name": "ln"
                            }, {
                                "HIRE_DT" : "",
                                "Hire_Date" : "10/02/2010"
                            }, {
                                "TERM_DT": "",
                                "Termination_Date": ""
                            }, {
                                "BENEFITS_STATUS_CODE" : undefined,
                                "STATUS_CODE" : "ACTIVE"
                            }]],
                        },
                        "headers": [
                            "Employee_Id", "First_Name", "Last_Name", "Employment_Type", "Hire_Date",
                            "Termination_Date", "Termination_Status", "Termination_Reason", "Leave_Status", "Leave_Type",
                            "BENEFITS_STATUS_CODE", "DISCREPANCIES"
                        ]
                    },
                    loading: false,
                    error: null
                },
        });
        const emp = store.getState()["maten"]["data"]["employees"]["2"];
        const headers = store.getState()["maten"]["data"]["headers"];
        const expectedActions = [
            {
                payload: {
                    "2":  [
                            "2", "fn2", "ln", "F", "10/02/2010", "", "", "", "", "", undefined, [{
                                "Employee_Id": "2",
                                "EE_ID" : ""
                            },{
                                "LAST_NAME" : "",
                                "Last_Name": "ln"
                            }, {
                                "HIRE_DT" : "",
                                "Hire_Date" : "10/02/2010"
                            }, {
                                "TERM_DT": "",
                                "Termination_Date": ""
                            } , {
                                "BENEFITS_STATUS_CODE" : undefined,
                                "STATUS_CODE" : "ACTIVE"
                            }
                        ]
                    ]
                },

                type: MATEN_MERGE_UPDATE
            }
        ];
        return store.dispatch(matenUpdate("alight","2", emp, 1, headers)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
});

