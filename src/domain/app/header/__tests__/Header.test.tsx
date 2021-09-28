import { graphql } from 'msw';
import * as React from 'react';

import { MyProfileDocument } from '../../../../generated/graphql';
import { initCmsMenuItemsMocks } from '../../../../test/cmsMocks';
import { server } from '../../../../test/msw/server';
import { fakePage } from '../../../../utils/cmsMockDataUtils';
import { fakePerson } from '../../../../utils/mockDataUtils';
import { render, screen, userEvent } from '../../../../utils/testUtils';
import Header from '../Header';

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

it('focuses skip link first', () => {
  render(<Header />);
  userEvent.tab();
  expect(screen.getByText('Siirry sisältöön')).toHaveFocus();
});

describe('cimode in language selector', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  test('cimode is rendered in a list of languages when feature flag is on', async () => {
    process.env.REACT_APP_LANGUAGE_CIMODE_VISIBLE = 'true';
    render(<Header />);
    await screen.findAllByText(/CIMODE/);
  });

  test('cimode is not rendered in a list of languages when feature flag is off', async () => {
    process.env.REACT_APP_LANGUAGE_CIMODE_VISIBLE = 'false';
    render(<Header />);
    expect(screen.queryAllByText(/CIMODE/).length).toBe(0);
  });
});

test('header renders cms menu items', async () => {
  const { menuItems } = initCmsMenuItemsMocks();
  render(<Header />, { mocks });

  for (const menuItem of menuItems) {
    const link = await screen.findByRole('link', { name: menuItem.title });
    expect(link).toHaveAttribute('href', `/fi/cms-page/${menuItem.slug}`);
  }
});
