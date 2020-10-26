import { render } from '@testing-library/react';
import React from 'react';
import BackDrop from './back-drop';

test("renders without crashing", () => {
    const { container } = render(<BackDrop />);
    expect(container.firstChild.classList.contains('back-drop')).toBe(true);
})