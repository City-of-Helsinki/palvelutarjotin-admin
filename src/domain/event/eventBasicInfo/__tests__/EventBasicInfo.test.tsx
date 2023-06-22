import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { ImageDocument } from '../../../../generated/graphql';
import {
  fakeEvent,
  fakeImage,
  fakeLocalizedObject,
} from '../../../../utils/mockDataUtils';
import EventBasicInfo from '../EventBasicInfo';

const event = fakeEvent({
  name: fakeLocalizedObject('Tapahtuma 13.7.2020'),
  shortDescription: fakeLocalizedObject('Testitapahtuma 13.7.2020'),
  description: fakeLocalizedObject('Tapahtuman kuvaus'),
  infoUrl: fakeLocalizedObject('www.testi.fi'),
  images: [
    fakeImage({
      altText: 'Testikuva',
      id: '48566',
      photographerName: 'Testi Kuvaaja',
    }),
  ],
});

const mocks = [
  {
    request: {
      query: ImageDocument,
      variables: {
        id: '48566',
      },
    },
    result: {
      data: {
        image: fakeImage({
          altText: 'Testikuva',
          id: '48566',
          photographerName: 'Testi Kuvaaja',
        }),
      },
    },
  },
];

it('matches snapshot', async () => {
  const { container } = render(
    <MockedProvider mocks={mocks}>
      <EventBasicInfo eventData={{ event }} language="fi" />
    </MockedProvider>
  );

  await screen.findByAltText('Testikuva');

  expect(container).toMatchSnapshot();
});

it('renders and shows all the event details', async () => {
  render(
    <MockedProvider mocks={mocks}>
      <EventBasicInfo eventData={{ event }} language="fi" />
    </MockedProvider>
  );

  const displayedTexts: string[] = [
    event.description.fi!,
    event.shortDescription.fi!,
    event.pEvent.enrolmentEndDays!.toString(),
  ];

  const localizedTexts = [
    'Lyhyt kuvaus (korkeintaan 160 merkkiä)',
    'Tapahtuman perustiedot',
    'Tapahtuman nimi',
    'Kuvaus',
    'Ilmoittautuminen sulkeutuu, päivää',
    'Ilmoittautuminen alkaa',
  ];

  localizedTexts.forEach((text) =>
    expect(screen.getByText(text)).toBeInTheDocument()
  );

  displayedTexts.forEach((text) =>
    expect(screen.getByText(text)).toBeInTheDocument()
  );

  const eventImage = await screen.findByAltText(event.images[0].altText!);

  expect(eventImage).toHaveProperty('src', event.images[0].url);
});
