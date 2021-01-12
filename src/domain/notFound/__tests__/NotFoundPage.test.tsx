import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { render, screen } from '../../../utils/testUtils';
import messages from '../../app/i18n/fi.json';
import NotFoundPage from '../NotFoundPage';

test('it matches snapshot', async () => {
  const { container } = render(<NotFoundPage />);

  // const result = await axe(container);
  // expect(result).toHaveNoViolations();
  expect(container).toMatchSnapshot();
});

test('it renders correct texts and handle back button click', () => {
  const { history } = render(<NotFoundPage />);
  const pushSpy = jest.spyOn(history, 'push');

  expect(
    screen.queryByRole('heading', { name: 'Etsimääsi sivua ei löytynyt' })
  ).toBeVisible();

  expect(screen.queryByText(messages.errorPage.description)).toBeVisible();

  const returnHomeButton = screen.getByRole('button', {
    name: messages.errorPage.returnToHome,
  });

  userEvent.click(returnHomeButton);

  expect(pushSpy).toHaveBeenCalledTimes(1);
  expect(pushSpy).toHaveBeenCalledWith('/fi');
});
