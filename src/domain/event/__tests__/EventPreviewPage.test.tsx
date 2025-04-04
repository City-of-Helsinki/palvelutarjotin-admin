import { screen, waitFor } from '@testing-library/react';
import * as React from 'react';

import { EventDocument } from '../../../generated/graphql';
import {
  fakeEvent,
  fakeImage,
  fakeKeyword,
  fakeLocalizedObject,
  fakeOccurrences,
  fakeOffer,
  fakeOrganisation,
  fakePerson,
  fakePEvent,
} from '../../../utils/mockDataUtils';
import { renderWithRoute } from '../../../utils/testUtils';
import { ROUTES } from '../../app/routes/constants';
import { PUBLICATION_STATUS } from '../../events/constants';
import EventPreviewPage from '../EventPreviewPage';

const eventId1 = 'eventMockId';
const eventName = 'Tapahtuma123456';
const eventDescription = 'Tapahtuman kuvaus';
const eventShortDescription = 'Tapahtuman lyhyt kuvaus';
const organisationName = 'Testiorganisaatio';
const organisationId = 'organisationId';
const contactPersonName = 'Testi Testaaja';
const contactPersonEmail = 'testi@test.fi';
const contactPersonPhoneNumber = '1233454587543542';
const photoAltText = 'Vaihtoehtoinen teksti';
const photographerName = 'Valokuvaajan nimi';

const keyword1 = 'aikuiset';
const keyword2 = 'lapset';

const eventMock1 = fakeEvent({
  id: eventId1,
  name: fakeLocalizedObject(eventName),
  description: fakeLocalizedObject(eventDescription),
  shortDescription: fakeLocalizedObject(eventShortDescription),
  publicationStatus: PUBLICATION_STATUS.DRAFT,
  keywords: [
    fakeKeyword({ name: fakeLocalizedObject(keyword1) }),
    fakeKeyword({ name: fakeLocalizedObject(keyword2) }),
  ],
  images: [
    fakeImage({ altText: photoAltText, photographerName: photographerName }),
  ],
  offers: [fakeOffer({ isFree: true })],
  pEvent: fakePEvent({
    organisation: fakeOrganisation({
      id: organisationId,
      name: organisationName,
    }),
    occurrences: fakeOccurrences(3, [
      { startTime: new Date(2020, 11, 11).toISOString() },
      { startTime: new Date(2020, 11, 12).toISOString() },
      { startTime: new Date(2020, 11, 13).toISOString() },
    ]),
    contactEmail: contactPersonEmail,
    contactPhoneNumber: contactPersonPhoneNumber,
    contactPerson: fakePerson({ name: contactPersonName }),
  }),
});

const mocks = [
  {
    request: {
      query: EventDocument,
      variables: {
        id: eventId1,
        include: ['keywords', 'location'],
      },
    },
    result: {
      data: {
        event: eventMock1,
      },
    },
  },
];

it('renders correct information', async () => {
  renderWithRoute(<EventPreviewPage />, {
    mocks,
    path: ROUTES.EVENT_PREVIEW,
    routes: [`/events/${eventId1}/preview`],
  });

  await waitFor(() => expect(screen.getByText(eventName)).toBeInTheDocument());

  expect(screen.getByAltText(photoAltText)).toBeInTheDocument();
  expect(screen.getByText(`Kuva: ${photographerName}`)).toBeInTheDocument();

  expect(screen.getByText(eventDescription)).toBeInTheDocument();
  expect(screen.getByText(eventShortDescription)).toBeInTheDocument();

  expect(screen.getByText(keyword1)).toBeInTheDocument();
  expect(screen.getByText(keyword2)).toBeInTheDocument();

  expect(screen.getByText(organisationName)).toBeInTheDocument();

  expect(screen.queryAllByText('Maksuton')).toHaveLength(2);

  expect(screen.getByText(contactPersonEmail)).toBeInTheDocument();
  expect(screen.getByText(contactPersonName)).toBeInTheDocument();
  expect(screen.getByText(contactPersonPhoneNumber)).toBeInTheDocument();

  expect(
    screen.getByRole('button', { name: 'Takaisin tapahtuman julkaisuun' })
  ).toBeInTheDocument();
});
