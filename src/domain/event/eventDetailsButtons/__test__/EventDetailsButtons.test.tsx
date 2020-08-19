import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { advanceTo, clear } from 'jest-date-mock';
import React from 'react';
import Router from 'react-router';

import eventData from '../__mocks__/eventData.json';
import EventDetailsButtons from '../EventDetailsButtons';

beforeEach(() => {
  jest.spyOn(Router, 'useHistory').mockReturnValue({});
});

afterAll(() => {
  clear();
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('is accessible and matches snapshot', async () => {
  const { container } = render(
    <EventDetailsButtons
      eventData={eventData as any}
      onClickLanguage={jest.fn()}
      selectedLanguage="fi"
    />
  );

  const result = await axe(container);

  expect(result).toHaveNoViolations();
  expect(container).toMatchSnapshot();
});

test('it renders correct texts and click events work', () => {
  advanceTo(new Date(2020, 6, 10));
  const pushMock = jest.fn();
  jest.spyOn(Router, 'useHistory').mockReturnValue({
    push: pushMock,
  } as any);
  const clickLanguageMock = jest.fn();
  render(
    <EventDetailsButtons
      eventData={eventData as any}
      onClickLanguage={clickLanguageMock}
      selectedLanguage="fi"
    />
  );

  const backButton = screen.getByRole('button', { name: 'Tapahtumat' });
  userEvent.click(backButton);

  expect(pushMock).toHaveBeenCalledTimes(1);
  expect(pushMock).toHaveBeenCalledWith('/');

  const editButton = screen.getByRole('button', { name: 'Muokkaa tapahtumaa' });
  userEvent.click(editButton);

  expect(pushMock).toHaveBeenCalledTimes(2);
  expect(pushMock).toHaveBeenCalledWith({
    pathname: '/fi/events/palvelutarjotin:afzunowba4/edit',
    search: '?language=fi',
  });

  expect(screen.queryByText('Tapahtumat')).toBeVisible();
  expect(screen.queryByText('Suomi')).toBeVisible();
  expect(screen.queryByText('Englanti')).toBeVisible();
  expect(screen.queryByText('Ruotsi')).toBeVisible();
});
