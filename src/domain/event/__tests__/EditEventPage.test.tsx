/* eslint-disable @typescript-eslint/no-explicit-any */
import userEvent from '@testing-library/user-event';
import { advanceTo } from 'jest-date-mock';
import React from 'react';
import Router from 'react-router';

import {
  EditEventDocument,
  EventDocument,
  KeywordDocument,
  MyProfileDocument,
  PlaceDocument,
} from '../../../generated/graphql';
import {
  fakeEvent,
  fakeImage,
  fakeInLanguage,
  fakeKeyword,
  fakeLocalizedObject,
  fakeOffer,
  fakeOrganisation,
  fakeOrganisations,
  fakePerson,
  fakePersons,
  fakePEvent,
  fakePlace,
  fakeVenue,
} from '../../../utils/mockDataUtils';
import { render, screen, waitFor, within } from '../../../utils/testUtils';
import apolloClient from '../../app/apollo/apolloClient';
import EditEventPage, { NAVIGATED_FROM } from '../EditEventPage';

beforeEach(() => {
  jest.spyOn(Router, 'useParams').mockReturnValue({
    id: '123',
  });
});

const placeId = 'tprek:15417';

const keywordMockResponse = {
  keyword: fakeKeyword({
    id: 'yso:p4363',
    name: fakeLocalizedObject('perheet'),
  }),
};

const venueQueryResponse = {
  data: {
    venue: fakeVenue({
      id: placeId,
      hasClothingStorage: true,
      hasSnackEatingPlace: true,
      translations: [
        {
          languageCode: 'FI' as any,
          description: 'Testitapahtuman kuvaus',
          __typename: 'VenueTranslationType',
        },
      ],
    }),
  },
};

const keywordResponse = {
  data: {
    keyword: fakeKeyword({
      id: 'yso:p4363',
      name: fakeLocalizedObject('perheet'),
    }),
  },
};

const placeResponse = {
  data: {
    place: fakePlace({ name: fakeLocalizedObject('Sellon kirjasto') }),
  },
};

const profileResponse = {
  data: {
    myProfile: fakePerson({
      organisations: fakeOrganisations(1, [
        {
          id: 'T3JnYW5pc2F0aW9uTm9kZTox',
          persons: fakePersons(1, [
            {
              organisations: [] as any,
              name: 'Testaaja2',
              id:
                'UGVyc29uTm9kZTo0MGZmYTIwMS1mOWJhLTQyZTYtYjY3Ny01MWQyM2Q4OGQ4ZDk=',
            },
          ]),
          name: 'Kulttuurin ja vapaa-ajan toimiala',
        },
      ]),
    }),
  },
};

const eventResponse = {
  data: {
    event: fakeEvent({
      id: 'palvelutarjotin:afz56bfiaq',
      shortDescription: fakeLocalizedObject('Testitapahtuman kuvaus'),
      description: fakeLocalizedObject('Pidempi kuvaus'),
      name: fakeLocalizedObject('Testitapahtuma'),
      startTime: '2020-08-04T21:00:00.000Z',
      endTime: '',
      offers: [fakeOffer()],
      images: [
        fakeImage({
          id: '48598',
          altText: 'Vaihtoehtoinen kuvateksti',
          photographerName: 'Valo Valokuvaaja',
        }),
      ],
      location: fakePlace({
        name: fakeLocalizedObject('Sellon kirjasto'),
        id: placeId,
      }),
      infoUrl: fakeLocalizedObject('https://www.palvelutarjotin.fi'),
      inLanguage: [
        fakeInLanguage({ id: 'fi', name: fakeLocalizedObject('suomi') }),
        fakeInLanguage({ id: 'en', name: fakeLocalizedObject('englanti') }),
      ],
      keywords: [fakeKeyword({ id: 'yso:p4363' })],
      pEvent: fakePEvent({
        organisation: fakeOrganisation({ id: 'T3JnYW5pc2F0aW9uTm9kZTox' }),
        contactEmail: 'testi@testi.fi',
        contactPhoneNumber: '123123123',
        enrolmentEndDays: 3,
        enrolmentStart: '2020-08-13T00:45:00.000Z',
        neededOccurrences: 3,
        autoAcceptance: true,
        contactPerson: fakePerson({
          id:
            'UGVyc29uTm9kZTo0MGZmYTIwMS1mOWJhLTQyZTYtYjY3Ny01MWQyM2Q4OGQ4ZDk=',
        }),
      }),
    }),
  },
};

const updateEventResponse = {
  data: {
    updateEventMutation: {
      response: {
        statusCode: 200,
        body: fakeEvent({ id: 'palvelutarjotin:afz52lpyta' }),
        __typename: 'EventMutationResponse',
      },
      __typename: 'UpdateEventMutation',
    },
  },
};

const mocks = [
  {
    request: {
      query: EditEventDocument,
      variables: {
        event: {
          id: 'palvelutarjotin:afz56bfiaq',
          name: { fi: 'TestitapahtumaTestinimi' },
          startTime: '2020-08-04T21:00:00.000Z',
          endTime: '',
          offers: [{ isFree: true }],
          shortDescription: { fi: 'Testitapahtuman kuvaus' },
          description: { fi: 'Pidempi kuvaus' },
          images: [{ internalId: '/image/48598/' }],
          infoUrl: { fi: 'https://www.palvelutarjotin.fi' },
          audience: [],
          inLanguage: [
            { internalId: '/language/fi/' },
            { internalId: '/language/en/' },
          ],
          keywords: [{ internalId: '/keyword/yso:p4363/' }],
          location: { internalId: `/place/${placeId}/` },
          pEvent: {
            contactEmail: 'testi@testi.fi',
            contactPersonId:
              'UGVyc29uTm9kZTo0MGZmYTIwMS1mOWJhLTQyZTYtYjY3Ny01MWQyM2Q4OGQ4ZDk=',
            contactPhoneNumber: '123123123',
            enrolmentEndDays: 3,
            enrolmentStart: '2020-08-13T00:45:00.000Z',
            neededOccurrences: 3,
            autoAcceptance: true,
          },
          organisationId: 'T3JnYW5pc2F0aW9uTm9kZTox',
          draft: true,
        },
      },
    },
    result: updateEventResponse,
  },
  {
    request: {
      query: EventDocument,
      variables: {
        id: '123',
        include: ['audience', 'in_language', 'keywords', 'location'],
      },
    },
    result: eventResponse,
  },
  {
    request: {
      query: MyProfileDocument,
    },
    result: {
      ...profileResponse,
    },
  },
  {
    request: {
      query: KeywordDocument,
      variables: {
        id: 'yso:p4363',
      },
    },
    result: keywordResponse,
  },
  {
    request: {
      query: PlaceDocument,
      skip: false,
      variables: {
        id: placeId,
      },
    },
    result: placeResponse,
  },
];

jest
  .spyOn(apolloClient, 'readQuery')
  .mockImplementation(({ variables }: any) => {
    if (variables.id === 'yso:p4363') {
      return keywordMockResponse;
    }
  });
jest.spyOn(apolloClient, 'query').mockResolvedValue(venueQueryResponse as any);

jest
  .spyOn(apolloClient, 'readQuery')
  .mockReturnValue(venueQueryResponse as any);

// Venue mutation mock
jest.spyOn(apolloClient, 'mutate').mockResolvedValue({});

advanceTo(new Date(2020, 7, 5));

test('edit event form initializes and submits correctly', async () => {
  const { history } = render(<EditEventPage />, { mocks });

  const goBack = jest.spyOn(history, 'goBack');

  expect(screen.queryByTestId('loading-spinner')).toBeInTheDocument();

  await waitFor(() => {
    expect(
      screen.queryByText('Kulttuurin ja vapaa-ajan toimiala')
    ).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByLabelText(/Tapahtuman nimi/i)).toHaveValue(
      'Testitapahtuma'
    );
    expect(screen.queryByText('perheet')).toBeInTheDocument();
    expect(screen.getByLabelText('Tapahtumapaikan kuvaus')).toHaveTextContent(
      'Testitapahtuman kuvaus'
    );
  });

  expect(screen.getByTestId('event-form')).toHaveFormValues({
    name: 'Testitapahtuma',
    shortDescription: 'Testitapahtuman kuvaus',
    infoUrl: 'https://www.palvelutarjotin.fi',
    contactEmail: 'testi@testi.fi',
    contactPhoneNumber: '123123123',
    enrolmentStart: '13.08.2020 03:45',
    enrolmentEndDays: 3,
    neededOccurrences: 3,
    imagePhotographerName: 'Valo Valokuvaaja',
    imageAltText: 'Vaihtoehtoinen kuvateksti',
  });

  expect(screen.getByLabelText(/Kuvaus/)).toHaveTextContent('Pidempi kuvaus');

  const contactInfo = within(screen.getByTestId('contact-info'));
  expect(
    contactInfo.getByLabelText(/Nimi/, { selector: 'button' })
  ).toHaveTextContent('Testaaja2');

  expect(
    screen.getByLabelText('Tapahtuman kielet', { selector: 'button' })
  ).toHaveTextContent('Suomi, Englanti');

  await waitFor(() => {
    expect(screen.getAllByText('Sellon kirjasto')).toHaveLength(2);
  });

  expect(screen.getByLabelText('Ulkovaatesäilytys')).toBeChecked();
  expect(screen.getByLabelText('Eväidensyöntipaikka')).toBeChecked();

  userEvent.type(screen.getByLabelText(/Tapahtuman nimi/), 'Testinimi');

  userEvent.click(
    screen.getByRole('button', {
      name: 'Tallenna',
    })
  );

  await waitFor(() => {
    expect(goBack).toHaveBeenCalled();
  });

  await waitFor(() => {
    expect(
      screen.queryByText('Sivulla on tallentamattomia muutoksia')
    ).toBeInTheDocument();
  });
});

test('returns to create occurrences page when it should after saving', async () => {
  jest
    .spyOn(apolloClient, 'query')
    .mockResolvedValue(venueQueryResponse as any);
  const { history } = render(<EditEventPage />, {
    mocks,
    routes: [`/moi?navigationFrom=${NAVIGATED_FROM.OCCURRENCES}`],
  });

  const historyPush = jest.spyOn(history, 'push');

  await waitFor(() => {
    expect(
      screen.queryByText('Kulttuurin ja vapaa-ajan toimiala')
    ).toBeInTheDocument();
  });

  userEvent.type(screen.getByLabelText(/Tapahtuman nimi/), 'Testinimi');

  userEvent.click(
    screen.getByRole('button', {
      name: 'Tallenna',
    })
  );

  await waitFor(() => {
    expect(historyPush).toHaveBeenCalledWith(
      '/fi/events/123/occurrences/create'
    );
  });

  await waitFor(() => {
    expect(
      screen.queryByText('Sivulla on tallentamattomia muutoksia')
    ).toBeInTheDocument();
  });
});
