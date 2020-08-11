import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import React from 'react';
import Router from 'react-router';

import messages from '../../app/i18n/fi.json';
import NotFoundPage from '../NotFoundPage';

expect.extend(toHaveNoViolations);

beforeEach(() => {
  jest.spyOn(Router, 'useHistory').mockReturnValue({});
});

test('it matches snapshot', async () => {
  const { container } = render(<NotFoundPage />);

  const result = await axe(container);
  expect(result).toHaveNoViolations();
  expect(container).toMatchSnapshot();
});

test('it renders correct texts and handle back button click', () => {
  const pushMock = jest.fn();
  jest.spyOn(Router, 'useHistory').mockReturnValue({
    push: pushMock,
  } as any);
  render(<NotFoundPage />);

  expect(
    screen.queryByRole('heading', { name: 'Etsimääsi sivua ei löytynyt' })
  ).toBeVisible();

  expect(screen.queryByText(messages.errorPage.description)).toBeVisible();

  const returnHomeButton = screen.getByRole('button', {
    name: messages.errorPage.returnToHome,
  });

  userEvent.click(returnHomeButton);

  expect(pushMock).toHaveBeenCalledTimes(1);
  expect(pushMock).toHaveBeenCalledWith('/fi');
});
