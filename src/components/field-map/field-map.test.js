import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import renderWithRedux from '../../utils/renderWithRedux';
import FieldMap from './field-map';

test("renders without crashing", () => {
    render(
        renderWithRedux(<FieldMap />)
    );
    expect(screen.getByText(/workday/i)).toBeInTheDocument();
});

test("should render confirm button if it is inside modal", () => {
    render(
        renderWithRedux(<FieldMap modal={true} />)
    );
    expect(screen.getByText(/confirm/i)).toBeInTheDocument();
});

test("should update fieldMap up on changing in alight", () => {
    render(
        renderWithRedux(<FieldMap />)
    );
    const elem = screen.getByDisplayValue('EE_ID');
    fireEvent.change(elem, { target: {value: 'EE_UID'}});
    expect(screen.getByDisplayValue(/EE_UID/i)).toBeInTheDocument();
});

test("should update fieldMap up on changing in workday", () => {
    render(
        renderWithRedux(<FieldMap />)
    );
    const elem = screen.getByDisplayValue('Employee_Id');
    fireEvent.change(elem, { target: {value: 'Employee_uid'}});
    expect(screen.getByDisplayValue(/Employee_uid/i)).toBeInTheDocument();
});