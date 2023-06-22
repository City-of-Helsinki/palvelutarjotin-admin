import userEvent from '@testing-library/user-event';
import * as React from 'react';
// eslint-disable-next-line import/no-named-as-default
import * as Router from 'react-router-dom';

import { render, screen } from '../../../utils/testUtils';
import messages from '../../app/i18n/fi.json';
import ErrorPage from '../ErrorPage';
jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
}));
const navigate = jest.fn();
it('matches snapshot', () => {
  const { container } = render(<ErrorPage />);

  expect(container).toMatchSnapshot();
});

it('renders correct texts when props are provided', () => {
  const title = 'Title';
  const description = 'Description';
  render(<ErrorPage description={description} title={title} />);

  expect(screen.queryByRole('heading', { name: title })).toBeVisible();
  expect(screen.queryByText(description)).toBeVisible();
});

it('render correct default texts', async () => {
  jest.spyOn(Router, 'useNavigate').mockImplementation(() => navigate);
  render(<ErrorPage />);

  expect(screen.queryByText(messages.errorPage.description)).toBeVisible();
  expect(screen.queryByText(messages.errorPage.returnToHome)).toBeVisible();
  expect(screen.queryByText(messages.errorPage.title)).toBeVisible();

  await userEvent.click(
    screen.getByRole('button', { name: messages.errorPage.returnToHome })
  );

  expect(navigate).toHaveBeenCalledTimes(1);
  expect(navigate).toHaveBeenCalledWith('/fi', expect.anything());
});
