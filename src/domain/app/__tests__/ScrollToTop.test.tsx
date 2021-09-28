import { graphql } from 'msw';
import * as React from 'react';

import { initCmsMenuItemsMocks } from '../../../test/cmsMocks';
import { server } from '../../../test/msw/server';
import { fakePage } from '../../../utils/cmsMockDataUtils';
import { render, screen, waitFor } from '../../../utils/testUtils';
import AppRoutes from '../routes/AppRoutes';
import ScrollToTop, { resetFocusId } from '../ScrollToTop';

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

const TestComponent = () => {
  return (
    <div>
      <ScrollToTop ignoredPaths={[]} forceScrollToTopPaths={[]} />
      <AppRoutes />
    </div>
  );
};

test('focuses and scrolls to top when route changes', async () => {
  const scrollSpy = jest.spyOn(window, 'scrollTo');
  const { history } = render(<TestComponent />, { routes: ['/fi'] });

  const loginButton = await screen.findByRole('button', {
    name: 'Kirjaudu sisään',
  });

  loginButton.focus();
  expect(loginButton).toHaveFocus();

  expect(screen.getByTestId(resetFocusId)).not.toHaveFocus();

  expect(scrollSpy).toHaveBeenCalledTimes(1);

  history.push('/fi/random');

  await waitFor(() => {
    expect(screen.getByTestId(resetFocusId)).toHaveFocus();
  });

  expect(scrollSpy).toHaveBeenCalledTimes(2);
});
