import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import renderWithRedux from '../../utils/renderWithRedux';
import Pagination from './pagination';

test('renders without crashing', () => {
    const updatePage = jest.fn();
    const {container} = render(
        renderWithRedux(<Pagination pages={12} page={1} updatePage={updatePage}/>)
    )
    expect(screen.getByText('1', { exact: true })).toBeInTheDocument();
    fireEvent.click(container.firstChild.firstChild);
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('...'));
    fireEvent.click(container.firstChild.lastChild);
    expect(updatePage).toHaveBeenCalled();
});

test('renders previous page and next page when in the middle', () => {
    render(
        renderWithRedux(<Pagination pages={80} page={56}/>)
    )
    expect(screen.getByText('54', { exact: true })).toBeInTheDocument();
    expect(screen.getByText('55', { exact: true })).toBeInTheDocument();
    expect(screen.getByText('57', { exact: true })).toBeInTheDocument();
    expect(screen.getByText('58', { exact: true })).toBeInTheDocument();
});

test("should render last page when last page number is provided", () => {
    const updatePage = jest.fn();
    const {container} = render(
        renderWithRedux(<Pagination pages={12} page={12} updatePage={updatePage}/>)
    )
    expect(screen.getByText('12', { exact: true })).toBeInTheDocument();
    fireEvent.click(container.firstChild.firstChild);
    fireEvent.click(screen.getByText('12'));
    fireEvent.click(screen.getByText('...'));
    fireEvent.click(container.firstChild.lastChild);
    expect(updatePage).toHaveBeenCalled();
});

test("should render all pages if page count is less than 10", () => {
    const updatePage = jest.fn();
    const {container} = render(
        renderWithRedux(<Pagination pages={9} page={1} updatePage={updatePage}/>)
    )
    expect(screen.getByText('9', { exact: true })).toBeInTheDocument();
    fireEvent.click(container.firstChild.firstChild);
    fireEvent.click(screen.getByText('9'));
    fireEvent.click(container.firstChild.lastChild);
    expect(updatePage).toHaveBeenCalled();
})

test('should update page when clicked', () => {
    const updatePage = jest.fn();
    const {container} =render(
        renderWithRedux(<Pagination pages={50} page={25} updatePage={updatePage}/>)
    );
    fireEvent.click(container.firstChild.firstChild);
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('23'));
    fireEvent.click(screen.getByText('24'));
    fireEvent.click(screen.getByText('25'));
    fireEvent.click(screen.getByText('26'));
    fireEvent.click(screen.getByText('27'));
    fireEvent.click(screen.getByText('50'));
    fireEvent.click(container.firstChild.lastChild);
    expect(updatePage).toHaveBeenCalled();
})