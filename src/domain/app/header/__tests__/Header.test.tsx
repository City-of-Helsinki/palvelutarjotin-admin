import { graphql } from 'msw';
import * as React from 'react';
import { vi } from 'vitest';
import {
  LanguagesDocument,
  MenuDocument,
} from 'react-helsinki-headless-cms/apollo';
import { MockedResponse } from '@apollo/client/testing';

import languagesResponse from '../../../../test/apollo-mocks/queryResponses/languages.json';
import headerMenuResponse from '../../../../test/apollo-mocks/queryResponses/headerMenu.json';
import { MyProfileDocument } from '../../../../generated/graphql';
import { initCmsMenuItemsMocks } from '../../../../test/cmsMocks';
import { server } from '../../../../test/msw/server';
import { fakePage } from '../../../../utils/cmsMockDataUtils';
import { fakePerson } from '../../../../utils/mockDataUtils';
import {
  render,
  screen,
  userEvent,
  waitFor,
} from '../../../../utils/testUtils';
import * as selectors from '../../../auth/selectors';
import Header from '../Header';
import { HEADER_MENU_NAME } from '../../../../headless-cms/constants';

vi.mock('../../../auth/selectors', async () => {
  const actual = await vi.importActual('../../../auth/selectors');
  return {
    ...actual,
    isAuthenticatedSelector: vi.fn(),
  };
});
vi.mock('hds-react', async () => {
  const actual = await vi.importActual('hds-react');
  return {
    ...actual,
    logoFi: 'mocked hds-react logoFi',
  };
});

const profileResponse = {
  data: {
    myProfile: fakePerson({ name: 'John Doe' }),
  },
};

const mocks: MockedResponse[] = [
  {
    request: {
      query: MyProfileDocument,
    },
    result: profileResponse,
  },
  {
    request: {
      query: MenuDocument,
      variables: {
        id: HEADER_MENU_NAME['fi'],
        menuIdentifiersOnly: true,
      },
    },
    result: headerMenuResponse,
  },
  {
    request: {
      query: LanguagesDocument,
    },
    result: languagesResponse,
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
});

it('Header matches snapshot', async () => {
  vi.spyOn(selectors, 'isAuthenticatedSelector').mockReturnValue(true);
  const { container } = render(<Header />, { mocks });
  await screen.findByText('Kulttuurikasvatus');
  expect(container.firstChild).toMatchSnapshot();
});

it('focuses skip link first', async () => {
  vi.spyOn(selectors, 'isAuthenticatedSelector').mockReturnValue(true);
  render(<Header />, { mocks });
  await userEvent.tab();
  const skipToContent = await screen.findByText('Siirry sisältöön');
  expect(skipToContent.tagName).toBe('SPAN');
  expect(skipToContent.parentElement?.tagName).toBe('A');
  expect(skipToContent.parentElement).toHaveFocus();
  expect(skipToContent.parentElement).toHaveAttribute('href', '#main-content');
});

test('header renders cms menu items', async () => {
  vi.spyOn(selectors, 'isAuthenticatedSelector').mockReturnValue(true);
  const { menuItems } = initCmsMenuItemsMocks();
  render(<Header />, { mocks });
  await waitFor(() => {
    expect(
      screen.getByRole('button', {
        name: 'Suomi',
      })
    ).toBeInTheDocument();
  });
  await screen.findByText('Kulttuurikasvatus');

  for (const menuItem of menuItems) {
    if (menuItem.children) {
      const dropdownButton = await screen.findByRole(
        'button',
        {
          name: menuItem.title,
        },
        { timeout: 2000 }
      );
      await userEvent.click(dropdownButton);
      for (const childItem of menuItem.children) {
        await screen.findByRole('link', {
          name: childItem.title,
          hidden: true,
        });
      }
    } else {
      const link = await screen.findByRole('link', { name: menuItem.title });
      expect(link).toHaveAttribute('href', `/fi/cms-page/${menuItem.slug}`);
    }
  }
});
