import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { AnyAction, Store } from '@reduxjs/toolkit';
import {
  createEvent,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';
import { createMemoryHistory, History } from 'history';
import * as React from 'react';
import Modal from 'react-modal';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';

import { apolloCache } from '../domain/app/apollo/apolloClient';
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
    store = reduxStore,
  } = {}
) => {
  const Wrapper: React.FC = ({ children }) => (
    <Provider store={store}>
      <MockedProvider mocks={mocks}>
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
    store = reduxStore,
    mocks = [],
  } = {}
) => {
  const Wrapper: React.FC = ({ children }) => (
    <Provider store={store}>
      <MockedProvider mocks={mocks} cache={apolloCache}>
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
      /* eslint-disable @typescript-eslint/no-explicit-any */
      store?: Store<any, AnyAction>;
    }
  ): CustomRenderResult;
};

export type CustomRenderResult = RenderResult & { history: History };

export { customRender as render, renderWithRoute, reduxStore };

export const createPasteEvent = (html: string): PasteEvent => {
  const text = html.replace('<[^>]*>', '');
  return {
    clipboardData: {
      types: ['text/plain', 'text/html'],
      getData: (type) => (type === 'text/plain' ? text : html),
    },
  };
};

export const pasteToTextEditor = (
  editor: Element | Node | Document | Window,
  text: string
): void => {
  const eventProperties = createPasteEvent(text);
  const pasteEvent = createEvent.paste(editor, eventProperties);
  fireEvent(editor, pasteEvent);
};

// re-export everything
export * from '@testing-library/react';
export { render as defaultRender } from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
