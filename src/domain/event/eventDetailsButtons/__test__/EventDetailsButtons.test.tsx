import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { advanceTo, clear } from 'jest-date-mock';
import React from 'react';

import { fakeEvent } from '../../../../utils/mockDataUtils';
import { render, screen } from '../../../../utils/testUtils';
import EventDetailsButtons from '../EventDetailsButtons';

const eventId = 'palvelutarjotin:afzunowba4';

const event = fakeEvent({
  id: eventId,
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
      eventData={{ event }}
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

  const clickLanguageMock = jest.fn();
  const { history } = render(
    <EventDetailsButtons
      eventData={{ event }}
      onClickLanguage={clickLanguageMock}
      selectedLanguage="fi"
    />
  );

  const pushSpy = jest.spyOn(history, 'push');

  const backButton = screen.getByRole('button', { name: 'Tapahtumat' });
  userEvent.click(backButton);

  expect(pushSpy).toHaveBeenCalledTimes(1);
  expect(pushSpy).toHaveBeenCalledWith('/');

  const editButton = screen.getByRole('button', { name: 'Muokkaa tapahtumaa' });
  userEvent.click(editButton);

  expect(pushSpy).toHaveBeenCalledTimes(2);
  expect(pushSpy).toHaveBeenCalledWith({
    pathname: `/fi/events/${eventId}/edit`,
    search: '?language=fi',
  });

  expect(screen.queryByText('Tapahtumat')).toBeVisible();
  expect(screen.queryByText('Suomi')).toBeVisible();
  expect(screen.queryByText('Englanti')).toBeVisible();
  expect(screen.queryByText('Ruotsi')).toBeVisible();
});
