import { MockedProvider } from '@apollo/react-testing';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { PersonDocument } from '../../../../generated/graphql';
import {
  fakeEvent,
  fakePerson,
  fakePEvent,
} from '../../../../utils/mockDataUtils';
import EventContactPersonInfo from '../EventContactPersonInfo';

const contactPersonName = 'Testi Testinen';
const contactPersonEmail = 'testi@testinen.fi';
const contactPersonPhoneNumber = '12345678';

const event = fakeEvent({
  pEvent: fakePEvent({
    contactPerson: fakePerson({
      id: '123',
    }),
    contactEmail: contactPersonEmail,
    contactPhoneNumber: contactPersonPhoneNumber,
  }),
});

const mocks = [
  {
    request: {
      query: PersonDocument,
      variables: {
        id: event?.pEvent?.contactPerson?.id,
      },
    },
    result: {
      data: {
        person: fakePerson({
          name: contactPersonName,
        }),
      },
    },
  },
];

test('matches snapshot', async () => {
  const { container } = render(
    <MockedProvider mocks={mocks}>
      <EventContactPersonInfo eventData={{ event }} />
    </MockedProvider>
  );

  await screen.findByText(contactPersonName);

  expect(container).toMatchSnapshot();
});

test('renders correct contact information and titles', async () => {
  render(
    <MockedProvider mocks={mocks}>
      <EventContactPersonInfo eventData={{ event }} />
    </MockedProvider>
  );

  await screen.findByText(contactPersonName);

  expect(screen.queryByText(contactPersonName)).toBeVisible();
  expect(screen.queryByText(contactPersonEmail)).toBeVisible();

  expect(screen.queryByText(contactPersonPhoneNumber)).toBeVisible();
  expect(screen.queryByText('Yhteyshenkilö')).toBeVisible();
  expect(screen.queryByText('Nimi')).toBeVisible();
  expect(screen.queryByText('Sähköpostiosoite')).toBeVisible();
  expect(screen.queryByText('Puhelinnumero')).toBeVisible();
});
