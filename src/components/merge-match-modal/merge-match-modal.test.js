import { render, screen } from '@testing-library/react';
import React from  'react';
import renderWithRedux from '../../utils/renderWithRedux';
import MergeMatchModal from './merge-match-modal';

test('renders without crashing', () => {
    render(
        renderWithRedux(<MergeMatchModal title="something" />)
    );
    expect(screen.getByText(/something/i)).toBeInTheDocument();
});

test('renders with display block if props.show is set to true', () => {
    const {container} = render(
        renderWithRedux(<MergeMatchModal title="something" show={true}/>)
    );
    expect(container.firstChild.classList.contains('display-block')).toBe(true);
});

test('renders with display none if props.show is set to false', () => {
    const {container} = render(
        renderWithRedux(<MergeMatchModal title="something" show={false}/>)
    );
    expect(container.firstChild.classList.contains('display-none')).toBe(true);
});