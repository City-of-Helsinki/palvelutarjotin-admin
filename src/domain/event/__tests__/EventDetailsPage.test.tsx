import { MockedResponse } from '@apollo/react-testing';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import Modal from 'react-modal';

import * as graphql from '../../../generated/graphql';
import {
  fakeEvent,
  fakeImage,
  fakeLocalizedObject,
  fakeOrganisations,
  fakePerson,
  fakePEvent,
  fakePlace,
  fakeVenue,
} from '../../../utils/mockDataUtils';
import {
  renderWithRoute,
  screen,
  waitFor,
  within,
} from '../../../utils/testUtils';
import { ROUTES } from '../../app/routes/constants';
import EventDetailsPage from '../EventDetailsPage';

const personId = 'personId1';
const personName = 'Nimi niminen';

const eventMock = fakeEvent({
  name: fakeLocalizedObject('Testitapahtuma'),
  description: fakeLocalizedObject('Tapahtuman testikuvaus'),
  images: [fakeImage({ altText: 'moi' })],
  pEvent: fakePEvent({
    contactEmail: 'test@email.com',
    contactPerson: fakePerson({ id: personId, name: personName }),
  }),
});
const profileMock = fakePerson({
  id: personId,
  organisations: fakeOrganisations(),
  name: 'Nimi niminen',
});
const venueMock = fakeVenue({
  hasSnackEatingPlace: true,
  hasClothingStorage: true,
  outdoorActivity: true,
  hasToiletNearby: true,
  hasAreaForGroupWork: true,
  hasIndoorPlayingArea: true,
  hasOutdoorPlayingArea: true,
});

const apolloMocks: MockedResponse[] = [
  {
    request: {
      query: graphql.EventDocument,
      variables: {
        id: 'palvelutarjotin:afzunowba4',
        include: ['audience', 'in_language', 'keywords', 'location'],
      },
    },
    result: {
      data: {
        event: eventMock,
      },
    },
  },
  {
    request: {
      query: graphql.ImageDocument,
      variables: {
        id: eventMock.images[0].id,
      },
    },
    result: {
      data: {
        image: fakeImage({ altText: 'Kuvan vaihtoehtoinen teksti' }),
      },
    },
  },
  {
    request: {
      query: graphql.MyProfileDocument,
      variables: {},
    },
    result: {
      data: {
        myProfile: profileMock,
      },
    },
  },
  {
    request: {
      query: graphql.PersonDocument,
      variables: {
        id: personId,
      },
    },
    result: {
      data: {
        person: fakePerson({ name: personName }),
      },
    },
  },
  {
    request: {
      query: graphql.PlaceDocument,
      variables: { id: eventMock.location.id },
    },
    result: {
      data: {
        place: fakePlace(),
      },
    },
  },
  {
    request: {
      query: graphql.VenueDocument,
      variables: { id: eventMock.location.id },
    },
    result: {
      data: {
        venue: venueMock,
      },
    },
  },
];

test('renders correct information and delete works', async () => {
  const deleteMock = jest.fn();
  jest
    .spyOn(graphql, 'useDeleteSingleEventMutation')
    .mockReturnValue([deleteMock] as any);
  const { container } = renderWithRoute(<EventDetailsPage />, {
    routes: ['/events/palvelutarjotin:afzunowba4'],
    path: ROUTES.EVENT_DETAILS,
    mocks: apolloMocks,
  });

  Modal.setAppElement(container);

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.queryByText('TestiVenue')).toBeInTheDocument();
  });

  // Suomi language is active
  expect(screen.getByTestId('eventLanguageSelector-suomi')).toHaveClass(
    'isSelected'
  );

  expect(
    screen.queryByRole('heading', { name: 'Testitapahtuma' })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('heading', { name: 'Tapahtuman perustiedot' })
  ).toBeInTheDocument();

  expect(screen.queryByText('Tapahtuman testikuvaus')).toBeInTheDocument();

  expect(
    screen.queryByRole('heading', { name: 'Yhteyshenkilö' })
  ).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByText(personName)).toBeInTheDocument();
  });

  expect(screen.queryByText('test@email.com')).toBeInTheDocument();
  expect(screen.queryByText('1233211234')).toBeInTheDocument();

  expect(screen.queryByText('TestiVenue')).toBeInTheDocument();
  expect(screen.queryByText('Eväidensyöntipaikka')).toBeInTheDocument();
  expect(screen.queryByText('Vaatesäilytys')).toBeInTheDocument();

  const eventImage = screen.getByAltText('Kuvan vaihtoehtoinen teksti');
  expect(eventImage).toHaveAttribute(
    'src',
    'https://api.hel.fi/linkedevents-test/media/images/test.png'
  );

  const deleteButton = screen.getByRole('button', { name: 'Poista tapahtuma' });
  userEvent.click(deleteButton);

  const modal = within(screen.getByRole('dialog'));
  expect(
    modal.queryByText('Poista tapahtuma', { selector: 'div' })
  ).toBeInTheDocument();

  const modalTexts = [
    /Muista lähettää ilmoittautuneille peruutusviesti, ennen kuin poistat tapahtuman/i,
    /Oletko varma että haluat poistaa tapahtuman/i,
  ];

  modalTexts.forEach((t) => {
    expect(modal.queryByText(t)).toBeInTheDocument();
  });

  userEvent.click(modal.getByRole('button', { name: 'Poista tapahtuma' }));

  expect(deleteMock).toHaveBeenCalledWith({
    variables: {
      eventId: eventMock.id,
    },
  });
});
