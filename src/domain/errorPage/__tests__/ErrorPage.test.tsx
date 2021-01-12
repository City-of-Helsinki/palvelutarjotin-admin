import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import Router from 'react-router';

import messages from '../../app/i18n/fi.json';
import ErrorPage from '../ErrorPage';

beforeEach(() => {
  jest.spyOn(Router, 'useHistory').mockReturnValue({});
});

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

it('render correct default texts', () => {
  const pushMock = jest.fn();
  jest.spyOn(Router, 'useHistory').mockReturnValue({ push: pushMock });
  render(<ErrorPage />);

  expect(screen.queryByText(messages.errorPage.description)).toBeVisible();
  expect(screen.queryByText(messages.errorPage.returnToHome)).toBeVisible();
  expect(screen.queryByText(messages.errorPage.title)).toBeVisible();

  userEvent.click(
    screen.getByRole('button', { name: messages.errorPage.returnToHome })
  );

  expect(pushMock).toHaveBeenCalledTimes(1);
  expect(pushMock).toHaveBeenCalledWith('/fi');
});
