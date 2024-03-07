import { graphql } from 'msw';
import * as React from 'react';

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

vi.mock('../../../auth/selectors', () => ({
  __esModule: true,
  ...vi.importActual('../../../auth/selectors'),
  isAuthenticatedSelector: vi.fn(),
}));
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
});

it('Header matches snapshot', () => {
  const { container } = render(<Header />, { mocks });
  expect(container.firstChild).toMatchSnapshot();
});

it('focuses skip link first', async () => {
  render(<Header />);
  await userEvent.tab();
  expect(screen.getByText('Siirry sisältöön')).toHaveFocus();
});

test('header renders cms menu items', async () => {
  vi.spyOn(selectors, 'isAuthenticatedSelector').mockReturnValue(true);
  const { menuItems } = initCmsMenuItemsMocks();
  render(<Header />, { mocks });
  await waitFor(() => {
    expect(
      screen.getByRole('button', {
        name: /fi kielivalikko/i,
      })
    ).toBeInTheDocument();
  });
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
