import { render, screen, fireEvent, createEvent } from '@testing-library/react';
import React from 'react';
import renderWithRedux from '../../utils/renderWithRedux';
import FileUpload from './file-upload';

test('renders without crashing', () => {
    render(
        renderWithRedux(<FileUpload />)
    );

    expect(screen.getByText(/Upload your file here/i)).toBeInTheDocument();
});

test("file should be removed when clicked on remove button", () => {
    render(
        renderWithRedux(<FileUpload />)
    );
    fireEvent.click(screen.getByText(/remove/i));
    expect(screen.getByText(/Upload your file here/i)).toBeInTheDocument();

});

test("should be able to upload file", () => {
    render(
        renderWithRedux(<FileUpload />)
    )
    const inputEl = screen.getByLabelText(/upload file/i);
    const file = new File(['random'], 'alight.csv', {
        type: 'text/csv'
    })
    Object.defineProperty(inputEl, 'files', {
        value: [file],
    })
    fireEvent.change(inputEl);
    expect(screen.getByText(/alight/i)).toBeInTheDocument();
});

test("should be able to render modal when file is uploaded", () => {
    const modalShow = jest.fn()
    render(
        renderWithRedux(<FileUpload modalShow={modalShow}/>)
    )
    const inputEl = screen.getByLabelText(/upload file/i);
    const file = new File(['random'], 'alight.csv', {
        type: 'text/csv'
    })
    Object.defineProperty(inputEl, 'files', {
        value: [file],
    })
    fireEvent.change(inputEl);
    fireEvent.click(screen.getByText(/preview/i));
    expect(screen.getByText(/alight/i)).toBeInTheDocument();
});

test("should be  able to accept a file when dropped in the component", () => {
    const modalShow = jest.fn()
    const {container} = render(
        renderWithRedux(<FileUpload modalShow={modalShow}/>)
    )
    const file = new File(['random'], 'alight.csv', { type: 'text/csv' });
    const fileList = [file];
    const fileDropEvent = createEvent.drop(container.firstChild);
    Object.defineProperty(fileDropEvent, "dataTransfer", {
        value: {
          files: fileList,
        }
      })
    fireEvent(container.firstChild, fileDropEvent);
    expect(screen.getByText(/alight/i)).toBeInTheDocument();
});

test("should be able to remove file when clicked on remove button", () => {
    render(
        renderWithRedux(<FileUpload />)
    )
    const inputEl = screen.getByLabelText(/upload file/i);
    const file = new File(['random'], 'alight.csv', {
        type: 'text/csv'
    })
    Object.defineProperty(inputEl, 'files', {
        value: [file],
    })
    fireEvent.change(inputEl);
    fireEvent.click(screen.getByText(/remove/i));
    expect(screen.getByText(/Upload your file here/i)).toBeInTheDocument();
});

test("should update background color when dragged and return to normal when leaving", () => {
    const { container } = render(
        renderWithRedux(<FileUpload />)
    )
    fireEvent.dragEnter(container.firstChild);
    expect(container.firstChild.classList.contains('dragged')).toBe(true);
    fireEvent.dragLeave(container.firstChild);
    expect(container.firstChild.classList.contains('dragged')).not.toBe(true);
})