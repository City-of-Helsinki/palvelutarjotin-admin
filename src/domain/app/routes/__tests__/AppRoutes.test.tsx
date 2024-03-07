/* eslint-disable @typescript-eslint/no-explicit-any */
import i18n from 'i18next';
import { graphql } from 'msw';
import * as React from 'react';

import { MyProfileDocument } from '../../../../generated/graphql';
import { initCmsMenuItemsMocks } from '../../../../test/cmsMocks';
import { server } from '../../../../test/msw/server';
import { fakePage } from '../../../../utils/cmsMockDataUtils';
import { fakePerson } from '../../../../utils/mockDataUtils';
import { act, render, waitFor } from '../../../../utils/testUtils';
import AppRoutes from '../AppRoutes';

const profileResponse = {
  data: {
    myProfile: fakePerson(),
  },
};

const mocks = [
  {
    request: {
      query: MyProfileDocument,
    },
    result: profileResponse,
  },
];

beforeEach(() => {
  initCmsMenuItemsMocks();
  server.use(
    graphql.query('Page', (req, res, ctx) => {
      return res(
        ctx.data({
          page: fakePage(),
        })
      );
    })
  );

  // eslint-disable-next-line import/no-named-as-default-member
  (async () => await act(() => i18n.changeLanguage('fi')))();
});

const wrapperCreator = (route: string) =>
  render(<AppRoutes />, { routes: [route], mocks });

afterEach(() => {
  vi.clearAllMocks();
});

it('redirect user from root to /fi by default', async () => {
  wrapperCreator('/');
  await waitFor(() => {
    expect(window.location.pathname).toBe('/fi');
  });
});

test('user from supported locale will be redirect to LocaleRoutes with that locale', async () => {
  wrapperCreator('/en/');
  await waitFor(() => {
    expect(window.location.pathname).toBe('/en/');
  });
});

test('user from unsupported locale prefix will be redirect to route with support prefix', async () => {
  wrapperCreator('/vi/');
  await waitFor(() => {
    expect(window.location.pathname).toContain('/fi/vi/');
  });
});

it('user without locale prefix will be redirect to route with support prefix', async () => {
  wrapperCreator('/foo-url');
  await waitFor(() => {
    expect(window.location.pathname).toContain('/fi/foo-url');
  });
});

it('user with route with unsupport locale will be redirect to LocaleRoutes anyway, with supported locale', async () => {
  wrapperCreator('/dk/foo');
  await waitFor(() => {
    expect(window.location.pathname).toContain('/fi/dk/foo');
  });
});
