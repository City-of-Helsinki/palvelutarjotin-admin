import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import * as Router from 'react-router-dom';
import { vi } from 'vitest';

import { customRender } from '../../../utils/testUtils';
import messages from '../../app/i18n/fi.json';
import NotFoundPage from '../NotFoundPage';

const navigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual };
});
test('it matches snapshot', async () => {
  const { container } = customRender(<NotFoundPage />);

  // const result = await axe(container);
  // expect(result).toHaveNoViolations();
  expect(container).toMatchSnapshot();
});

test('it renders correct texts and handle back button click', async () => {
  vi.spyOn(Router, 'useNavigate').mockImplementation(() => navigate);
  customRender(<NotFoundPage />);

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
