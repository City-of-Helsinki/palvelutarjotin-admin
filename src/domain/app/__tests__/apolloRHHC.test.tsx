import { vi } from 'vitest';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { render, renderHook } from '@testing-library/react';
import React from 'react';
import { ConfigProvider, useConfig } from 'react-helsinki-headless-cms';
import { Navigation } from 'react-helsinki-headless-cms/apollo';

import useRHHCConfig from '../../../hooks/useRHHCConfig';
import {
  render as customRender,
  renderHook as customRenderHook,
  RHHCConfigProviderWithProvidedApolloClient,
} from '../../../utils/testUtils';

describe('test issues in connection between the apollo client and the RHHC-lib', () => {
  describe('apollo client should work with RHHC-lib', () => {
    it('has apollo client initialized properly in the config', () => {
      const { result } = customRenderHook(() => useConfig());
      expect(result.current.apolloClient).not.toBeNull();
    });

    it('renders any component that needs the apollo client', () => {
      const { container } = customRender(
        <Navigation
          onTitleClick={function (): void {
            throw new Error('Function not implemented.');
          }}
          menuName={''}
          getPathnameForLanguage={function (): string {
            throw new Error('Function not implemented.');
          }}
        />
      );
      expect(container).toBeInTheDocument();
    });

    const ApolloClientFromUseApolloClient = () => {
      const apolloClient = useApolloClient();
      return <div>{apolloClient.version}</div>;
    };

    const ApolloClientFromUseConfig = () => {
      const { apolloClient } = useConfig();
      return <div>{apolloClient?.version}</div>;
    };

    const ApolloNavigationComponent = () => (
      <Navigation
        onTitleClick={vi.fn()}
        menuName={''}
        getPathnameForLanguage={vi.fn()}
      />
    );

    it.each([
      ApolloClientFromUseApolloClient,
      ApolloClientFromUseConfig,
      ApolloNavigationComponent,
    ])(
      'renders component that needs the apollo client with a custom wrapper %p',
      (Component) => {
        const { container } = render(<Component />, {
          wrapper: ({ children }) => (
            <MockedProvider>
              <RHHCConfigProviderWithProvidedApolloClient>
                {children}
              </RHHCConfigProviderWithProvidedApolloClient>
            </MockedProvider>
          ),
        });
        expect(container).toMatchSnapshot();
      }
    );
  });

  describe('mockedProvider', () => {
    it('offers apollo client', () => {
      const { result } = renderHook(() => useApolloClient(), {
        wrapper: MockedProvider,
      });
      expect(result.current).not.toBeNull();
    });
    it('apollo client is usable with useConfig', () => {
      const {
        result: { current: apolloClient },
      } = renderHook(() => useApolloClient(), {
        wrapper: MockedProvider,
      });
      const { result } = renderHook(() =>
        useRHHCConfig({
          apolloClient: apolloClient as ApolloClient<NormalizedCacheObject>,
        })
      );
      expect(result.current.apolloClient).not.toBeNull();
    });
    describe('useRHHCConfig', () => {
      it('works with apollo provider', () => {
        const {
          result: { current: apolloClient },
        } = renderHook(() => useApolloClient(), {
          wrapper: MockedProvider,
        });
        const {
          result: { current: rhhcConfig },
        } = renderHook(() =>
          useRHHCConfig({
            apolloClient: apolloClient as ApolloClient<NormalizedCacheObject>,
          })
        );
        const wrapper = ({ children }) => (
          <ConfigProvider config={rhhcConfig}>{children}</ConfigProvider>
        );

        render(
          <Navigation
            onTitleClick={function (): void {
              throw new Error('Function not implemented.');
            }}
            menuName={''}
            getPathnameForLanguage={function (): string {
              throw new Error('Function not implemented.');
            }}
          />,
          { wrapper }
        );
      });
    });
  });
});
