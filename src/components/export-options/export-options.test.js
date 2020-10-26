import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import ExportOptions from './export-options';

test("renders without crashing", () => {
    const modalClose = jest.fn();
    const {container} = render(<ExportOptions modalClose={modalClose}/>)
    expect(screen.getByText("csv")).toBeInTheDocument();
    fireEvent.click(container.firstChild.firstChild)
});

test("should render column names in the modal", () => {
    const modalClose = jest.fn();
    render(<ExportOptions modalClose={modalClose} columns={["employee_id", "discrepancies"]}/>)
    expect(screen.getByLabelText("employee_id")).toBeInTheDocument();
});

test("should update column name in state when clicked", () => {
    const modalClose = jest.fn();
    render(<ExportOptions modalClose={modalClose} columns={["employee_id", "discrepancies"]}/>);
    const checkbox = screen.getByLabelText("employee_id");
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);
});

test("should generate csv wtih data", () => {
    const modalClose = jest.fn();
    render(<ExportOptions modalClose={modalClose} columns={["employee_id"]} employees={{"1": ["1"]}}/>);
    const button = screen.getByText(/start export/i);
    const checkbox = screen.getByLabelText("employee_id");
    fireEvent.click(checkbox);
    fireEvent.click(button);
    expect(modalClose).toHaveBeenCalled();
});