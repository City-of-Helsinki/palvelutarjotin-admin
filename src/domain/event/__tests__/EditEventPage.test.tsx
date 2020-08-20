import { MockedProvider } from '@apollo/react-testing';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { advanceTo } from 'jest-date-mock';
import React from 'react';
import { Provider } from 'react-redux';
import Router from 'react-router';

import eventResponse from '../__mocks__/eventResponse.json';
import keywordResponse from '../__mocks__/keywordResponse.json';
import placeResponse from '../__mocks__/placeResponse.json';
import profileResponse from '../__mocks__/profileResponse.json';
import updateEventResponse from '../__mocks__/updateEventResponse.json';
import {
  EditEventDocument,
  EventDocument,
  KeywordDocument,
  MyProfileDocument,
  PlaceDocument,
} from '../../../generated/graphql';
import apolloClient from '../../app/apollo/apolloClient';
import { store } from '../../app/store';
import EditEventPage from '../EditEventPage';

beforeEach(() => {
  jest.spyOn(Router, 'useParams').mockReturnValue({
    id: '123',
  });
  jest.spyOn(Router, 'useHistory').mockReturnValue({});
  jest
    .spyOn(Router, 'useLocation')
    .mockReturnValue({ pathname: '/', search: '', state: '', hash: '' });
});

const keywordMockResponse = {
  keyword: {
    id: 'yso:p4363',
    name: {
      en: 'families',
      fi: 'perheet',
      sv: 'familjer',
      __typename: 'LocalisedObject',
    },
    internalId: 'https://api.hel.fi/linkedevents-test/v1/keyword/yso:p4363/',
    __typename: 'Keyword',
  },
};

const venueQueryResponse = {
  data: {
    venue: {
      id: 'tprek:15417',
      hasClothingStorage: true,
      hasSnackEatingPlace: true,
      translations: [
        {
          languageCode: 'FI',
          description: 'Testitapahtuman kuvaus',
          __typename: 'VenueTranslationType',
        },
      ],
      __typename: 'VenueNode',
    },
  },
};

const venueQueryResponseMock = {
  data: {
    venue: {
      id: 'tprek:15417',
      hasClothingStorage: true,
      hasSnackEatingPlace: true,
      translations: [
        {
          languageCode: 'FI',
          description: 'Testitapahtuman kuvaus',
          __typename: 'VenueTranslationType',
        },
      ],
      __typename: 'VenueNode',
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
          location: { internalId: '/place/tprek:15417/' },
          pEvent: {
            contactEmail: 'testi@testi.fi',
            contactPersonId:
              'UGVyc29uTm9kZTo0MGZmYTIwMS1mOWJhLTQyZTYtYjY3Ny01MWQyM2Q4OGQ4ZDk=',
            contactPhoneNumber: '123123123',
            duration: 10,
            enrolmentEndDays: 3,
            enrolmentStart: '2020-08-13T00:45:00.000Z',
            neededOccurrences: 3,
          },
          organisationId: 'T3JnYW5pc2F0aW9uTm9kZTox',
          draft: false,
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
        id: 'tprek:15417',
      },
    },
    result: placeResponse,
  },
];

test('edit event form initializes and submits correctly', async () => {
  const pushMock = jest.fn();
  jest.spyOn(Router, 'useHistory').mockReturnValue({
    push: pushMock,
  } as any);
  advanceTo(new Date(2020, 7, 5));
  jest
    .spyOn(apolloClient, 'readQuery')
    .mockImplementation(({ variables }: any) => {
      if (variables.id === 'yso:p4363') {
        return keywordMockResponse;
      }
    });
  jest
    .spyOn(apolloClient, 'query')
    .mockResolvedValueOnce(venueQueryResponseMock as any);
  render(
    <Provider store={store}>
      <MockedProvider mocks={mocks}>
        <EditEventPage />
      </MockedProvider>
    </Provider>
  );

  expect(screen.queryByTestId('loading-spinner')).toBeInTheDocument();

  await waitFor(() => {
    expect(
      screen.queryByText('Kulttuurin ja vapaa-ajan toimiala')
    ).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByLabelText('Tapahtuman nimi')).toHaveValue(
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
    duration: 10,
    enrolmentStart: '13.08.2020 03:45',
    enrolmentEndDays: 3,
    neededOccurrences: 3,
    imagePhotographerName: 'Valo Valokuvaaja',
    imageAltText: 'Vaihtoehtoinen kuvateksti',
  });

  expect(screen.getByLabelText('Kuvaus')).toHaveTextContent('Pidempi kuvaus');

  const contactInfo = within(screen.getByTestId('contact-info'));
  expect(
    contactInfo.getByLabelText('Nimi', { selector: 'button' })
  ).toHaveTextContent('Testaaja2');

  expect(
    screen.getByLabelText('Tapahtuman kielet', { selector: 'button' })
  ).toHaveTextContent('Suomi, Englanti');

  await waitFor(() => {
    expect(screen.getAllByText('Sellon kirjasto')).toHaveLength(2);
  });

  expect(screen.getByLabelText('Ulkovaatesäilytys')).toBeChecked();
  expect(screen.getByLabelText('Eväidensyöntipaikka')).toBeChecked();

  userEvent.type(screen.getByLabelText('Tapahtuman nimi'), 'Testinimi');

  jest
    .spyOn(apolloClient, 'readQuery')
    .mockReturnValue(venueQueryResponse as any);

  // Venue mutation mock
  jest.spyOn(apolloClient, 'mutate').mockResolvedValueOnce({});

  userEvent.click(
    screen.getByRole('button', { name: 'Tallenna', hidden: true })
  );

  await waitFor(() => {
    expect(pushMock).toHaveBeenCalledWith('/fi/events/123');
  });

  await waitFor(() => {
    expect(
      screen.queryByText('Sivulla on tallentamattomia muutoksia')
    ).toBeInTheDocument();
  });
});
