import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRedux from '../../utils/renderWithRedux';
import FieldSettings from './field-settings';

test('renders without crashing', () => {
    render(
        renderWithRedux(<FieldSettings/> )
    )
    expect(screen.getByText(/workday/i)).toBeInTheDocument();
});