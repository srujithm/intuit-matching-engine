import { render, screen, fireEvent } from '@testing-library/react';
import React from  'react';
import renderWithRedux from '../../utils/renderWithRedux';
import MergeArea from './merge-area';

test('renders without crashing', () => {
    render(
        renderWithRedux(<MergeArea />)
    );
    expect(screen.getByText(/MATCH & GENERATE/i)).toBeInTheDocument();
});

test('renders modal upon button click', () => {
    render(renderWithRedux(<MergeArea />));
    fireEvent.click(
        screen.getByText(/MATCH & GENERATE/i)
    );
    expect(screen.getByText(/CONFIRM FIELD MAP/i)).toBeInTheDocument();
});

test('button should be disabled when there is no data', () => {
    render(renderWithRedux(<MergeArea />));
    expect(screen.getByText(/MATCH & GENERATE/i)).toHaveAttribute('disabled');
})