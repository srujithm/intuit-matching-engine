import { render } from '@testing-library/react';
import React from 'react';
import { ImSpinner9 } from 'react-icons/im';
import BackDrop from '../back-drop/back-drop';
import Loading from './loading';

test('', () => {
    const { container } = render(
        <Loading />
    );
    expect(container.firstChild.classList.contains('loader')).toBe(true);
})