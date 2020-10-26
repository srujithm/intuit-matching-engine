import { render } from '@testing-library/react';
import React from 'react';
import renderWithRedux from '../../utils/renderWithRedux';
import DataPreview from './data-preview';

test("renders without crashing", () => {
    const { container } = render(
        renderWithRedux(<DataPreview show={true}/>)
    );
    expect(container.firstChild.classList.contains('display-block')).toBe(true);
})