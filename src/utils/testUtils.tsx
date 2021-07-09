import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { AnyAction, configureStore, Store } from '@reduxjs/toolkit';
import { act, fireEvent, render, RenderResult } from '@testing-library/react';
import { createMemoryHistory, History } from 'history';
import * as React from 'react';
import Modal from 'react-modal';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import wait from 'waait';

import { createApolloCache } from '../domain/app/apollo/apolloClient';
import reducers from '../domain/app/reducers';
import { store as reduxStore } from '../domain/app/store';

export const arrowUpKeyPressHelper = () =>
  fireEvent.keyDown(document, { code: 38, key: 'ArrowUp' });

export const arrowDownKeyPressHelper = () =>
  fireEvent.keyDown(document, { code: 40, key: 'ArrowDown' });

export const escKeyPressHelper = () =>
  fireEvent.keyDown(document, { code: 27, key: 'Escape' });

export const tabKeyPressHelper = () =>
  fireEvent.keyDown(document, { code: 9, key: 'Tab' });

const customRender: CustomRender = (
  ui,
  {
    routes = ['/'],
    history = createMemoryHistory({ initialEntries: routes }),
    mocks = [],
    initialState = {},
    store = configureStore({
      reducer: reducers,
      preloadedState: initialState,
    }),
  } = {}
) => {
  const Wrapper: React.FC = ({ children }) => (
    <Provider store={store}>
      <MockedProvider mocks={mocks} cache={createApolloCache()}>
        <Router history={history}>{children}</Router>
      </MockedProvider>
    </Provider>
  );

  const renderResult = render(ui, { wrapper: Wrapper });
  return { ...renderResult, history };
};

const renderWithRoute: CustomRender = (
  ui,
  {
    routes = ['/'],
    path = '/',
    history = createMemoryHistory({ initialEntries: routes }),
    initialState = {},
    store = configureStore({
      reducer: reducers,
      preloadedState: initialState,
    }),
    mocks = [],
  } = {}
) => {
  const Wrapper: React.FC = ({ children }) => (
    <Provider store={store}>
      <MockedProvider mocks={mocks} cache={createApolloCache()}>
        <Router history={history}>
          <Route exact path={path}>
            {children}
          </Route>
        </Router>
      </MockedProvider>
    </Provider>
  );

  const renderResult = render(ui, { wrapper: Wrapper });
  Modal.setAppElement(renderResult.container);
  return { ...renderResult, history };
};

type CustomRender = {
  (
    ui: React.ReactElement,
    options?: {
      routes?: string[];
      path?: string;
      history?: History;
      mocks?: MockedResponse[];
      initialState?: Record<string, any>;
      /* eslint-disable @typescript-eslint/no-explicit-any */
      store?: Store<any, AnyAction>;
    }
  ): CustomRenderResult;
};

export type CustomRenderResult = RenderResult & { history: History };

const actWait = (amount?: number) => act(() => wait(amount));

export { actWait, reduxStore, customRender as render, renderWithRoute };

// re-export everything
export * from '@testing-library/react';
export { render as defaultRender } from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
