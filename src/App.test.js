import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers';

const mockStore = createStore(rootReducer, applyMiddleware(thunk));

test('renders app component without crashing', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Provider store={mockStore}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
  const linkElement = getByText(/MATEN/i);
  expect(linkElement).toBeInTheDocument();
});

test('render results page without crashing', () => {
  const history = createMemoryHistory();
  history.push("/results");
  render(
    <Provider store={mockStore}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
  expect(screen.getByText(/Upload files and generate data/i)).toBeInTheDocument();
});

test('render field-map settings page without crashing', () => {
  const history = createMemoryHistory();
  history.push("/map-fields");
  render(
    <Provider store={mockStore}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
  expect(screen.getByText(/workday/i)).toBeInTheDocument();
})

test('landing on a bad page', () => {
  const history = createMemoryHistory();
  history.push("/bad-page");
  const { getByText } = render(
    <Provider store={mockStore}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
  expect(getByText(/Uh-Oh! Now What?/i)).toBeInTheDocument()
})
