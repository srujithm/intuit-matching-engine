import React from 'react';
import IssuesFix from './issues-fix';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import matenReducer from '../../redux/reducers/matenReducer';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore({
    maten: {
        data: {
            "employees" : {
                "1" : [ "1", "fn", "ln", "F", "10/02/2010", "", "", "", "", "", "ACTIVE", []],
                "2" : ["2", "fn", "ln", "F", "10/02/2010", "", "", "", "", "", undefined, [{
                    "Employee_Id": "2",
                    "EE_ID" : ""
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
    }
});
test("render without crashing", () => {
    
    const { rerender } = render(
        <Provider store={store}>
            <IssuesFix
                employee_id="2"
                employee={store.getState()["maten"]["data"]["employees"]["2"]}
                columns={[
                    "Employee_Id", "First_Name", "Last_Name", "Employment_Type", "Hire_Date",
                    "Termination_Date", "Termination_Status", "Termination_Reason", "Leave_Status", "Leave_Type",
                    "BENEFITS_STATUS_CODE", "DISCREPANCIES"
                ]}
            />
        </Provider>
    );
    
    
    fireEvent.click(screen.getByText(/workday/))
    rerender(
        <Provider store={store}>
            <IssuesFix
                employee_id="2"
                employee={store.getState()["maten"]["data"]["employees"]["2"]}
                columns={[
                    "Employee_Id", "First_Name", "Last_Name", "Employment_Type", "Hire_Date",
                    "Termination_Date", "Termination_Status", "Termination_Reason", "Leave_Status", "Leave_Type",
                    "BENEFITS_STATUS_CODE", "DISCREPANCIES"
                ]}
            />
        </Provider>
    )
    expect(screen.queryByText("workday")).not.toBeInTheDocument();
});