import { screen, waitFor } from '@testing-library/react';
import { graphql, HttpResponse } from 'msw';
import * as React from 'react';

import { initCmsMenuItemsMocks } from '../../../test/cmsMocks';
import { server } from '../../../test/msw/server';
import { fakePage } from '../../../utils/cmsMockDataUtils';
import { customRender } from '../../../utils/testUtils';
import AppRoutes from '../routes/AppRoutes';
import ScrollToTop, { resetFocusId } from '../ScrollToTop';

beforeEach(() => {
  initCmsMenuItemsMocks();
  server.use(
    graphql.query('Page', () => {
      return HttpResponse.json({
        data: {
          page: fakePage(),
        },
      });
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

// FIXME: change the history to navigate
test.skip('focuses and scrolls to top when route changes', async () => {
  const scrollSpy = vi.spyOn(window, 'scrollTo');
  customRender(<TestComponent />, { routes: ['/fi'] });

  const loginButton = await screen.findByRole('button', {
    name: 'Kirjaudu sisään',
  });

  loginButton.focus();
  expect(loginButton).toHaveFocus();

  expect(screen.getByTestId(resetFocusId)).not.toHaveFocus();

  expect(scrollSpy).toHaveBeenCalledTimes(1);

  // FIXME: chnage the history to navigate
  // history.push('/fi/random');

  await waitFor(() => expect(screen.getByTestId(resetFocusId)).toHaveFocus());

  expect(scrollSpy).toHaveBeenCalledTimes(2);
});
