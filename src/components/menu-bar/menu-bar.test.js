import React from 'react';
import { render } from '@testing-library/react';
import MenuBar from './menu-bar';

test('render menu-bar', () => {
    const { getByText } = render(<MenuBar />);
    const text = getByText(/MATEN/i);
    expect(text).toBeInTheDocument();
})