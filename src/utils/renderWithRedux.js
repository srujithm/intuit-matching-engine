import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

const renderWithRedux = (component) => {
    return (
        <Provider store={store}>
            {component}
        </Provider>
    )
};

export default renderWithRedux;