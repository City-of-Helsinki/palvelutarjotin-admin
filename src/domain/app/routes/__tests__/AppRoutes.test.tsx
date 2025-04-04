/* eslint-disable @typescript-eslint/no-explicit-any */
import i18n from 'i18next';
import { graphql } from 'msw';
import * as React from 'react';
import { MenuDocument } from 'react-helsinki-headless-cms/apollo';
import { act, waitFor } from '@testing-library/react';

import { MyProfileDocument } from '../../../../generated/graphql';
import { initCmsMenuItemsMocks } from '../../../../test/cmsMocks';
import { server } from '../../../../test/msw/server';
import { fakePage } from '../../../../utils/cmsMockDataUtils';
import { fakePerson } from '../../../../utils/mockDataUtils';
import { customRender } from '../../../../utils/testUtils';
import AppRoutes from '../AppRoutes';
import { languagesMock } from '../../../../test/apollo-mocks/languagesMock';
import {
  emptyFooterMenuQueryResponse,
  footerMenuMock,
} from '../../../../test/apollo-mocks/footerMenuMock';
import {
  emptyHeaderMenuQueryResponse,
  headerMenuMock,
} from '../../../../test/apollo-mocks/headerMenuMock';
import {
  FOOTER_MENU_NAME,
  HEADER_MENU_NAME,
} from '../../../../headless-cms/constants';

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
  { ...languagesMock },
  { ...headerMenuMock },
  { ...footerMenuMock },
  // Just to make sure all queries are matched with mocks—even empty mocks:
  {
    request: {
      query: MenuDocument,
      variables: {
        id: HEADER_MENU_NAME['en'],
        menuIdentifiersOnly: false,
      },
    },
    result: emptyHeaderMenuQueryResponse,
  },
  {
    request: {
      query: MenuDocument,
      variables: {
        id: HEADER_MENU_NAME['en'],
        menuIdentifiersOnly: true,
      },
    },
    result: emptyHeaderMenuQueryResponse,
  },
  {
    request: {
      query: MenuDocument,
      variables: {
        id: FOOTER_MENU_NAME['en'],
        menuIdentifiersOnly: true,
      },
    },
    result: emptyFooterMenuQueryResponse,
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

const wrapperCreator = async (route: string) =>
  // FIXME: Remove this workaround and see if warning can be fixed in better way:
  await act(async () => {
    customRender(<AppRoutes />, { routes: [route], mocks });
  });

afterEach(() => {
  vi.clearAllMocks();
});

it('redirect user from root to /fi by default', async () => {
  await wrapperCreator('/');
  await waitFor(() => expect(window.location.pathname).toBe('/fi'));
});

test('user from supported locale will be redirect to LocaleRoutes with that locale', async () => {
  await wrapperCreator('/en/');
  await waitFor(() => expect(window.location.pathname).toBe('/en/'));
});

test('user from unsupported locale prefix will be redirect to route with support prefix', async () => {
  await wrapperCreator('/vi/');
  await waitFor(() => expect(window.location.pathname).toContain('/fi/vi/'));
});

it('user without locale prefix will be redirect to route with support prefix', async () => {
  await wrapperCreator('/foo-url');
  await waitFor(() =>
    expect(window.location.pathname).toContain('/fi/foo-url')
  );
});

it('user with route with unsupport locale will be redirect to LocaleRoutes anyway, with supported locale', async () => {
  await wrapperCreator('/dk/foo');
  await waitFor(() => expect(window.location.pathname).toContain('/fi/dk/foo'));
});
