import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import renderWithRedux from '../../utils/renderWithRedux';
import ResultsPage from './results-page';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

test('renders without crashing', () => {
    render(
        renderWithRedux(<ResultsPage />)
    )
    expect(screen.getByText(/Upload files and generate data/i)).toBeInTheDocument();
});

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
})
it("should show employee details from state", () => {
    render(
        <Provider store={store}>
            <ResultsPage />
        </Provider>
    );
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("1 issue(s)")).toBeInTheDocument()
});

it("should render list of issues in modal", () => {
    render(
        <Provider store={store}>
            <ResultsPage />
        </Provider>
    );

    fireEvent.click(screen.getByText("1 issue(s)"));
    expect(screen.getByText("View/Fix Issues")).toBeInTheDocument();
});
