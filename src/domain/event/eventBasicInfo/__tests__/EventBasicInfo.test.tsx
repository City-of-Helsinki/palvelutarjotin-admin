import { MockedProvider } from '@apollo/react-testing';
import { render, screen } from '@testing-library/react';
import React from 'react';

import eventData from '../__mocks__/event.json';
import imageMock from '../__mocks__/image.json';
import { EventQuery, ImageDocument } from '../../../../generated/graphql';
import EventBasicInfo from '../EventBasicInfo';

const event = eventData.event;

const mocks = [
  {
    request: {
      query: ImageDocument,
      variables: {
        id: eventData.event.images[0].id,
      },
    },
    result: imageMock,
  },
];

it('matches snapshot', async () => {
  const { container } = render(
    <MockedProvider mocks={mocks}>
      <EventBasicInfo eventData={eventData as EventQuery} language="fi" />
    </MockedProvider>
  );

  await screen.findByAltText(event.images[0].altText);

  expect(container).toMatchSnapshot();
});

it('renders and shows all the event details', async () => {
  render(
    <MockedProvider mocks={mocks}>
      <EventBasicInfo eventData={eventData as EventQuery} language="fi" />
    </MockedProvider>
  );

  const displayedTexts: string[] = [
    event.description.fi,
    event.shortDescription.fi,
    event.pEvent.duration.toString(),
    event.pEvent.enrolmentEndDays.toString(),
  ];

  const localizedTexts = [
    'Lyhyt kuvaus (korkeintaan 160 merkkiä)',
    'Tapahtuman perustiedot',
    'Tapahtuman nimi',
    'Kuvaus',
    'Tapahtuman kesto, min',
    'Ilmoittautuminen sulkeutuu, päivää',
    'Ilmoittautuminen alkaa',
  ];

  localizedTexts.forEach((text) =>
    expect(screen.queryByText(text)).toBeVisible()
  );

  displayedTexts.forEach((text) =>
    expect(screen.queryByText(text)).toBeVisible()
  );

  const eventImage = await screen.findByAltText(event.images[0].altText);

  expect(eventImage).toHaveProperty('src', event.images[0].url);
});
