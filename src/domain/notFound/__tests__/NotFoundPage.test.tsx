import userEvent from '@testing-library/user-event';
import * as React from 'react';
import * as Router from 'react-router-dom';

import { render, screen } from '../../../utils/testUtils';
import messages from '../../app/i18n/fi.json';
import NotFoundPage from '../NotFoundPage';
const navigate = jest.fn();
jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...(jest.requireActual('react-router-dom') as any),
}));
test('it matches snapshot', async () => {
  const { container } = render(<NotFoundPage />);

  // const result = await axe(container);
  // expect(result).toHaveNoViolations();
  expect(container).toMatchSnapshot();
});

test('it renders correct texts and handle back button click', async () => {
  jest.spyOn(Router, 'useNavigate').mockImplementation(() => navigate);
  render(<NotFoundPage />);

  expect(
    screen.queryByRole('heading', { name: 'Etsimääsi sivua ei löytynyt' })
  ).toBeVisible();

  expect(screen.queryByText(messages.errorPage.description)).toBeVisible();

  const returnHomeButton = screen.getByRole('button', {
    name: messages.errorPage.returnToHome,
  });

  await userEvent.click(returnHomeButton);

  expect(navigate).toHaveBeenCalledTimes(1);
  expect(navigate).toHaveBeenCalledWith('/fi', expect.anything());
});
