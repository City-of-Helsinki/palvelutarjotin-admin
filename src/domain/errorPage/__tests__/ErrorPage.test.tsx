import userEvent from '@testing-library/user-event';
import * as React from 'react';
// eslint-disable-next-line import/no-named-as-default
import Router from 'react-router';

import { render, screen } from '../../../utils/testUtils';
import messages from '../../app/i18n/fi.json';
import ErrorPage from '../ErrorPage';

beforeEach(() => {
  jest.spyOn(Router, 'useHistory').mockReturnValue({} as any);
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
  jest.spyOn(Router, 'useHistory').mockReturnValue({ push: pushMock } as any);
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
