import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { AnyAction, configureStore, Store } from '@reduxjs/toolkit';
import {
  act,
  createEvent,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { ConfigProvider as RHHCConfigProvider } from 'react-helsinki-headless-cms';
import Modal from 'react-modal';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import wait from 'waait';

import { createApolloCache } from '../domain/app/apollo/apolloClient';
import reducers from '../domain/app/reducers';
import { store as reduxStore } from '../domain/app/store';
import useRHHCConfig from '../hooks/useRHHCConfig';

export const arrowUpKeyPressHelper = () =>
  fireEvent.keyDown(document, { code: 38, key: 'ArrowUp' });

export const arrowDownKeyPressHelper = () =>
  fireEvent.keyDown(document, { code: 40, key: 'ArrowDown' });

export const escKeyPressHelper = () =>
  fireEvent.keyDown(document, { code: 27, key: 'Escape' });

export const tabKeyPressHelper = () =>
  fireEvent.keyDown(document, { code: 9, key: 'Tab' });

type CustomRenderResult = RenderResult & {
  user: ReturnType<(typeof userEvent)['setup']>;
};

type CustomRender = {
  (
    ui: React.ReactElement,
    options?: {
      routes?: string[];
      path?: string;
      mocks?: MockedResponse[];
      initialState?: Record<string, any>;
      /* eslint-disable @typescript-eslint/no-explicit-any */
      store?: Store<any, AnyAction>;
    }
  ): CustomRenderResult;
};

type Props = {
  children: React.ReactNode;
};

export function RHHCConfigProviderWithProvidedApolloClient({
  children,
}: Props) {
  // Use apollo client from enclosing apollo provider, e.g. MockedProvider
  const apolloClient = useApolloClient();

  // FIXME: Fix types of apolloClient/RHHCConfig so they are compatible without casting
  const normalizedCacheObjectApolloClient =
    apolloClient as ApolloClient<NormalizedCacheObject>;

  const rhhcConfig = useRHHCConfig({
    apolloClient: normalizedCacheObjectApolloClient,
    eventsApolloClient: normalizedCacheObjectApolloClient,
    venuesApolloClient: normalizedCacheObjectApolloClient,
  });
  return (
    <RHHCConfigProvider config={rhhcConfig}>{children}</RHHCConfigProvider>
  );
}

const customRender: CustomRender = (
  ui,
  {
    routes = ['/'],
    mocks = [],
    initialState = {},
    store = configureStore({
      reducer: reducers,
      preloadedState: initialState,
    }),
  } = {}
): CustomRenderResult => {
  routes.forEach((route) => {
    window.history.pushState({}, 'Test page', route);
  });
  const user = userEvent.setup();
  const Wrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <Provider store={store}>
      <MockedProvider mocks={mocks} cache={createApolloCache()}>
        <RHHCConfigProviderWithProvidedApolloClient>
          <BrowserRouter>{children}</BrowserRouter>
        </RHHCConfigProviderWithProvidedApolloClient>
      </MockedProvider>
    </Provider>
  );

  const renderResult = render(ui, { wrapper: Wrapper });
  return { ...renderResult, user };
};

const renderWithRoute: CustomRender = (
  ui,
  {
    routes = ['/'],
    path = '/',
    initialState = {},
    store = configureStore({
      reducer: reducers,
      preloadedState: initialState,
    }),
    mocks = [],
  } = {}
): CustomRenderResult => {
  routes.forEach((route) => {
    window.history.pushState({}, 'Test page', route);
  });
  const user = userEvent.setup();
  const Wrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <Provider store={store}>
      <MockedProvider mocks={mocks} cache={createApolloCache()}>
        <RHHCConfigProviderWithProvidedApolloClient>
          <BrowserRouter>
            <Routes>
              <Route path={'/'} element={<>{children}</>} />
              <Route path={path} element={<>{children}</>} />
            </Routes>
          </BrowserRouter>
        </RHHCConfigProviderWithProvidedApolloClient>
      </MockedProvider>
    </Provider>
  );

  const renderResult = render(ui, { wrapper: Wrapper });
  Modal.setAppElement(renderResult.container);
  return { ...renderResult, user };
};

const actWait = (amount?: number) => act(() => wait(amount));

// eslint-disable-next-line import/export
export { actWait, reduxStore, customRender as render, renderWithRoute };

export type PasteEvent = {
  clipboardData: {
    types: string[];
    getData: (type: string) => string;
  };
};

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
// eslint-disable-next-line import/export
export * from '@testing-library/react';
export { render as defaultRender } from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

// /**
//  * There is a problem in userEvent clear and userEvent type
//  * and some reason why the field needs to be touched, so it would act properly.
//  * Issue: https://github.com/testing-library/user-event/discussions/970
//  * */
// export const fixUserEventWrapper = async (
//   action:
//     | {
//         element: Element;
//         check: () => Promise<void>;
//       }
//     | {
//         element: Element;
//         type: () => Promise<void>;
//       }
//     | {
//         element: Element;
//         clear: () => Promise<void>;
//       }
// ) => {
//   if ('type' in action) {
//     await userEvent.type(action.element, 'fix');
//     await action.type();
//   } else if ('clear' in action) {
//     await action.clear();
//     await action.clear();
//   } else if ('check' in action) {
//     await action.check();
//     await action.check();
//   }
// };
