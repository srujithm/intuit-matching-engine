import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRedux from '../../utils/renderWithRedux';
import HomePage from './home-page';

test('renders without crashing', () => {
    render(
        renderWithRedux(<HomePage />)
    )
    expect(screen.getByText(/MATCH & GENERATE/i)).toBeInTheDocument();
});