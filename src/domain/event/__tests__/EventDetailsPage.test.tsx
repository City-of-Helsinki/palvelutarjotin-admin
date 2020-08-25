import { MockedResponse } from '@apollo/react-testing';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Modal from 'react-modal';

import {
  EventDocument,
  ImageDocument,
  MyProfileDocument,
  PersonDocument,
  PlaceDocument,
  VenueDocument,
} from '../../../generated/graphql';
import * as graphqlFns from '../../../generated/graphql';
import {
  fakeEvent,
  fakeImage,
  fakeLocalizedObject,
  fakeLocation,
  fakeOrganisations,
  fakePerson,
  fakePEvent,
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

const eventMock = fakeEvent({
  name: fakeLocalizedObject('Testitapahtuma'),
  description: fakeLocalizedObject('Tapahtuman testikuvaus'),
  images: [fakeImage({ altText: 'moi' })],
  pEvent: fakePEvent({ contactEmail: 'test@email.com' }),
});
const profileMock = fakePerson({ organisations: fakeOrganisations() });
const venueMock = fakeVenue({
  hasSnackEatingPlace: true,
  hasClothingStorage: true,
});

const apolloMocks: MockedResponse[] = [
  {
    request: {
      query: EventDocument,
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
      query: ImageDocument,
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
      query: MyProfileDocument,
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
      query: PersonDocument,
      variables: {
        id: eventMock.pEvent.contactPerson?.id,
      },
    },
    result: {
      data: {
        person: fakePerson({ name: 'Nimi niminen' }),
      },
    },
  },
  {
    request: {
      query: PlaceDocument,
      variables: { id: eventMock.location.id },
    },
    result: {
      data: {
        place: fakeLocation(),
      },
    },
  },
  {
    request: {
      query: VenueDocument,
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
    .spyOn(graphqlFns, 'useDeleteSingleEventMutation')
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
  expect(screen.getByText('Suomi').parentElement).toHaveClass('isSelected');

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
  expect(screen.queryByText('Nimi niminen')).toBeInTheDocument();
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

  userEvent.click(modal.getByRole('button', { name: 'Poista tapahtuma' }));

  expect(deleteMock).toHaveBeenCalledWith({
    variables: {
      eventId: eventMock.id,
    },
  });
});
