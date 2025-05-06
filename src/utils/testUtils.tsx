import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
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
import { BrowserRouter, Route, Routes } from 'react-router';
import wait from 'waait';

import { createApolloCache } from '../domain/app/apollo/cache';
import IdleTimer from '../domain/auth/IdleTimerProvider';
import KultusAdminHDSLoginProvider from '../domain/auth/KultusAdminHDSLoginProvider';
import { OrganisationProvider } from '../domain/organisation/contextProviders/OrganisationProvider';
import useRHHCConfig from '../hooks/useRHHCConfig';

export type CustomRenderResult = RenderResult & {
  user: ReturnType<(typeof userEvent)['setup']>;
};

export type CustomRender = {
  (
    ui: React.ReactElement,
    options?: {
      routes?: string[];
      path?: string;
      mocks?: MockedResponse[];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initialState?: Record<string, any>;
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

export const customRender: CustomRender = (
  ui,
  { routes = ['/'], mocks = [] } = {}
): CustomRenderResult => {
  routes.forEach((route) => {
    window.history.pushState({}, 'Test page', route);
  });
  const user = userEvent.setup();
  const Wrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <KultusAdminHDSLoginProvider>
      <IdleTimer>
        <MockedProvider mocks={mocks} cache={createApolloCache()}>
          <BrowserRouter>
            <OrganisationProvider>
              <RHHCConfigProviderWithProvidedApolloClient>
                {children}
              </RHHCConfigProviderWithProvidedApolloClient>
            </OrganisationProvider>
          </BrowserRouter>
        </MockedProvider>
      </IdleTimer>
    </KultusAdminHDSLoginProvider>
  );

  const renderResult = render(ui, { wrapper: Wrapper });
  return { ...renderResult, user };
};

export const renderWithRoute: CustomRender = (
  ui,
  { routes = ['/'], path = '/', mocks = [] } = {}
): CustomRenderResult => {
  routes.forEach((route) => {
    window.history.pushState({}, 'Test page', route);
  });
  const user = userEvent.setup();
  const Wrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <KultusAdminHDSLoginProvider>
      <IdleTimer>
        <MockedProvider mocks={mocks} cache={createApolloCache()}>
          <BrowserRouter>
            <OrganisationProvider>
              <RHHCConfigProviderWithProvidedApolloClient>
                <Routes>
                  <Route path={'/'} element={<>{children}</>} />
                  <Route path={path} element={<>{children}</>} />
                </Routes>
              </RHHCConfigProviderWithProvidedApolloClient>
            </OrganisationProvider>
          </BrowserRouter>
        </MockedProvider>
      </IdleTimer>
    </KultusAdminHDSLoginProvider>
  );

  const renderResult = render(ui, { wrapper: Wrapper });
  Modal.setAppElement(renderResult.container);
  return { ...renderResult, user };
};

export const actWait = (amount?: number) => act(() => wait(amount));

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
