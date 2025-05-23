import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import * as Router from 'react-router';
import { vi } from 'vitest';

import { customRender } from '../../../utils/testUtils';
import messages from '../../app/i18n/fi.json';
import ErrorPage from '../ErrorPage';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return { ...actual };
});
const navigate = vi.fn();
it('matches snapshot', () => {
  const { container } = customRender(<ErrorPage />);

  expect(container).toMatchSnapshot();
});

it('renders correct texts when props are provided', () => {
  const title = 'Title';
  const description = 'Description';
  customRender(<ErrorPage description={description} title={title} />);

  expect(screen.queryByRole('heading', { name: title })).toBeVisible();
  expect(screen.queryByText(description)).toBeVisible();
});

it('render correct default texts', async () => {
  vi.spyOn(Router, 'useNavigate').mockImplementation(() => navigate);
  customRender(<ErrorPage />);

  expect(screen.queryByText(messages.errorPage.description)).toBeVisible();
  expect(screen.queryByText(messages.errorPage.returnToHome)).toBeVisible();
  expect(screen.queryByText(messages.errorPage.title)).toBeVisible();

  await userEvent.click(
    screen.getByRole('button', { name: messages.errorPage.returnToHome })
  );

  expect(navigate).toHaveBeenCalledTimes(1);
  expect(navigate).toHaveBeenCalledWith('/fi', expect.anything());
});
