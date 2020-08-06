import { MockedProvider } from '@apollo/react-testing';
import { render, screen } from '@testing-library/react';
import React from 'react';

import eventData from '../__mocks__/eventData.json';
import personData from '../__mocks__/personData.json';
import { EventQuery, PersonDocument } from '../../../../generated/graphql';
import EventContactPersonInfo from '../EventContactPersonInfo';

const mocks = [
  {
    request: {
      query: PersonDocument,
      variables: {
        id: eventData.event?.pEvent?.contactPerson?.id,
      },
    },
    result: personData,
  },
];

test('matches snapshot', async () => {
  const { container } = render(
    <MockedProvider mocks={mocks}>
      <EventContactPersonInfo eventData={eventData as EventQuery} />
    </MockedProvider>
  );

  await screen.findByText('Testi Testinen');

  expect(container).toMatchSnapshot();
});

test('renders correct contact information and titles', async () => {
  render(
    <MockedProvider mocks={mocks}>
      <EventContactPersonInfo eventData={eventData as EventQuery} />
    </MockedProvider>
  );

  await screen.findByText('Testi Testinen');

  expect(screen.queryByText('testi@testinen.fi')).toBeVisible();
  expect(screen.queryByText('Testi Testinen')).toBeVisible();
  expect(screen.queryByText('12345678')).toBeVisible();
  expect(screen.queryByText('Yhteyshenkilö')).toBeVisible();
  expect(screen.queryByText('Nimi')).toBeVisible();
  expect(screen.queryByText('Sähköpostiosoite')).toBeVisible();
  expect(screen.queryByText('Puhelinnumero')).toBeVisible();
});
