/* eslint-disable @typescript-eslint/no-explicit-any */
import userEvent from '@testing-library/user-event';
import parseDate from 'date-fns/parse';
import { axe } from 'jest-axe';
import { advanceTo } from 'jest-date-mock';
import React from 'react';
import Modal from 'react-modal';
import Router from 'react-router';

import addEventResponse from '../__mocks__/addEventResponse.json';
import imageMutationResponse from '../__mocks__/imageMutationResponse.json';
import imageResponse from '../__mocks__/imageResponse.json';
import keywordResponse from '../__mocks__/keywordResponse.json';
import keywordsResponse from '../__mocks__/keywordsResponse.json';
import placeResponse from '../__mocks__/placeResponse.json';
import placesResponse from '../__mocks__/placesResponse.json';
import profileResponse from '../__mocks__/profileResponse.json';
import venueResponse from '../__mocks__/venueResponse.json';
import { AUTOSUGGEST_OPTIONS_AMOUNT } from '../../../common/components/autoSuggest/contants';
import {
  CreateEventDocument,
  ImageDocument,
  KeywordsDocument,
  MyProfileDocument,
  PlaceDocument,
  PlacesDocument,
  UploadSingleImageDocument,
} from '../../../generated/graphql';
import {
  configure,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '../../../utils/testUtils';
import apolloClient from '../../app/apollo/apolloClient';
import CreateEventPage from '../CreateEventPage';

configure({ defaultHidden: true });
advanceTo(new Date(2020, 7, 8));

const eventFormData = {
  name: 'Testitapahtuma',
  shortDescription: 'Testikuvaus',
  description: 'Pidempi kuvaus',
  infoUrl: 'https://www.palvelutarjotin.fi',
  contactEmail: 'testi@testi.fi',
  contactPhoneNumber: '123123123',
  enrolmentStart: '13.08.2020 03:45',
  enrolmentEndDays: '3',
  neededOccurrences: '3',
  imagePhotographerName: 'Valo Valokuvaaja',
  imageAltText: 'Vaihtoehtoinen kuvateksti',
};

const createEventVariables = {
  event: {
    name: { fi: 'Testitapahtuma' },
    startTime: '2020-08-07T21:00:00.000Z',
    offers: [{ isFree: true }],
    shortDescription: { fi: 'Testikuvaus' },
    description: { fi: 'Pidempi kuvaus' },
    images: [{ internalId: '/image/48584/' }],
    infoUrl: { fi: 'https://www.palvelutarjotin.fi' },
    audience: [],
    inLanguage: [
      { internalId: '/language/en/' },
      { internalId: '/language/fi/' },
    ],
    keywords: [{ internalId: '/keyword/yso:p4363/' }],
    location: { internalId: '/place/tprek:15417/' },
    pEvent: {
      contactEmail: 'testi123@testi123.fi',
      contactPersonId:
        'UGVyc29uTm9kZTo0MGZmYTIwMS1mOWJhLTQyZTYtYjY3Ny01MWQyM2Q4OGQ4ZDk=',
      contactPhoneNumber: '123321123',
      enrolmentEndDays: 3,
      enrolmentStart: '2020-08-13T00:45:00.000Z',
      neededOccurrences: 3,
      autoAcceptance: true,
    },
    organisationId: 'T3JnYW5pc2F0aW9uTm9kZToy',
    draft: true,
  },
};

const imageFile = new File(['(⌐□_□)'], 'palvelutarjotin.png', {
  type: 'image/png',
});

const mocks = [
  {
    request: {
      query: MyProfileDocument,
    },
    result: profileResponse,
  },
  {
    request: {
      query: UploadSingleImageDocument,
      variables: {
        image: {
          name: '',
          image: imageFile,
        },
      },
    },
    result: imageMutationResponse,
  },
  {
    request: {
      query: ImageDocument,
      variables: {
        id: '48584',
      },
    },
    result: imageResponse,
  },
  {
    request: {
      query: KeywordsDocument,
      skip: false,
      variables: {
        pageSize: AUTOSUGGEST_OPTIONS_AMOUNT,
        text: 'perheet',
      },
    },
    result: keywordsResponse,
  },
  {
    request: {
      query: PlacesDocument,
      skip: false,
      variables: {
        dataSource: 'tprek',
        pageSize: AUTOSUGGEST_OPTIONS_AMOUNT,
        text: 'Sellon',
      },
    },
    result: placesResponse,
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
  {
    request: {
      query: CreateEventDocument,
      variables: createEventVariables,
    },
    result: addEventResponse,
  },
];

test('page is accessible', async () => {
  const { container } = render(<CreateEventPage />, { mocks });

  await waitFor(() => {
    expect(
      screen.queryByText('Kulttuuri- ja vapaa-aikalautakunnan kulttuurijaosto')
    ).toBeInTheDocument();
  });

  const result = await axe(container);
  expect(result).toHaveNoViolations();
});

test('modal opens when trying to change language', async () => {
  const { container } = render(<CreateEventPage />, { mocks });

  Modal.setAppElement(container);

  await waitFor(() => {
    expect(
      screen.queryByText('Kulttuuri- ja vapaa-aikalautakunnan kulttuurijaosto')
    ).toBeInTheDocument();
  });

  userEvent.type(screen.getByLabelText(/Tapahtuman nimi/), eventFormData.name);

  expect(screen.getByTestId('event-form')).toHaveFormValues({
    name: eventFormData.name,
  });

  // should open modal when trying to change event language
  userEvent.click(screen.getByRole('button', { name: 'Ruotsi' }));
  expect(screen.getByRole('dialog')).toHaveTextContent(/vaihda kieli/i);

  const modal = within(screen.getByRole('dialog', {}));

  const cancelButton = modal.getByRole('button', {
    name: 'Peruuta',
  });
  userEvent.click(cancelButton);

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  await waitFor(() => {
    expect(
      screen.queryByText('Sivulla on tallentamattomia muutoksia')
    ).toBeInTheDocument();
  });
});

test('event can be created with form', async () => {
  advanceTo(new Date(2020, 7, 8));
  const pushMock = jest.fn();
  jest.spyOn(Router, 'useHistory').mockReturnValue({
    push: pushMock,
  } as any);
  const { container } = render(<CreateEventPage />, { mocks });

  Modal.setAppElement(container);

  await waitFor(() => {
    expect(
      screen.queryByText('Kulttuuri- ja vapaa-aikalautakunnan kulttuurijaosto')
    ).toBeInTheDocument();
  });

  userEvent.type(screen.getByLabelText(/Tapahtuman nimi/), eventFormData.name);

  expect(screen.getByTestId('event-form')).toHaveFormValues({
    name: eventFormData.name,
  });

  userEvent.type(
    screen.getByLabelText(/lyhyt kuvaus/i),
    eventFormData.shortDescription
  );

  expect(screen.getByTestId('event-form')).toHaveFormValues({
    name: eventFormData.name,
    shortDescription: eventFormData.shortDescription,
  });

  userEvent.type(screen.getByLabelText(/Kuvaus/), eventFormData.description);
  userEvent.type(
    screen.getByLabelText('WWW-osoite, josta saa lisätietoja tapahtumasta'),
    eventFormData.infoUrl
  );

  // image input should disappear after adding image
  const imageInput = screen.getByLabelText('Tapahtuman kuva');
  expect(
    screen.queryByRole('button', { name: 'Lisää kuva' })
  ).toBeInTheDocument();

  fireEvent.change(imageInput, { target: { files: [imageFile] } });

  await waitFor(() => {
    expect(screen.queryByAltText('Preview')).toBeInTheDocument();
  });

  expect(
    screen.queryByRole('button', { name: 'Lisää kuva' })
  ).not.toBeInTheDocument();

  userEvent.type(
    screen.getByLabelText(/Valokuvaaja/),
    eventFormData.imagePhotographerName
  );
  userEvent.type(
    screen.getByLabelText(/Kuvan alt-teksti/),
    eventFormData.imageAltText
  );

  userEvent.type(
    screen.getByLabelText(/Sähköpostiosoite/),
    eventFormData.contactEmail
  );
  userEvent.type(
    screen.getByLabelText(/Puhelinnumero/),
    eventFormData.contactPhoneNumber
  );

  expect(screen.getByTestId('event-form')).toHaveFormValues({
    contactPhoneNumber: eventFormData.contactPhoneNumber,
    contactEmail: eventFormData.contactEmail,
  });

  const dateInput = screen.getByLabelText(/Päivämäärä/i);
  // click first so focus is kept
  userEvent.click(dateInput);
  const firstOccurrenceDate = '20.11.2020';
  userEvent.type(dateInput, '20.11.2020');

  const startsAtInput = screen.getByLabelText(/Alkaa klo/i, {
    selector: 'input',
  });
  userEvent.type(startsAtInput, '12:00');
  userEvent.click(
    screen.getByRole('option', {
      name: '12:00',
    })
  );

  const endsAtInput = screen.getByLabelText(/Loppuu klo/i, {
    selector: 'input',
  });
  userEvent.type(endsAtInput, '13:00');
  userEvent.click(
    screen.getByRole('option', {
      name: '13:00',
    })
  );

  const enrolmentStartsAtInput = screen.getByLabelText(
    /ilmoittautuminen alkaa/i
  );
  userEvent.click(enrolmentStartsAtInput);
  userEvent.type(enrolmentStartsAtInput, eventFormData.enrolmentStart);
  userEvent.type(
    screen.getByLabelText(/ilmoittautuminen sulkeutuu/i),
    eventFormData.enrolmentEndDays
  );

  const neededOccurrencesInput = screen.getByLabelText(
    /tarvittavat käyntikerrat/i
  );

  userEvent.clear(neededOccurrencesInput);
  userEvent.type(neededOccurrencesInput, eventFormData.neededOccurrences);

  expect(screen.getByTestId('event-form')).toHaveFormValues({
    enrolmentStart: eventFormData.enrolmentStart,
    enrolmentEndDays: Number(eventFormData.enrolmentEndDays),
    neededOccurrences: Number(eventFormData.neededOccurrences),
  });

  const contactInfoPart = within(screen.getByTestId('contact-info'));

  userEvent.click(
    contactInfoPart.getByLabelText(/Nimi/, {
      selector: 'button',
    })
  );

  jest.spyOn(apolloClient, 'query').mockResolvedValueOnce({
    data: {
      person: {
        emailAddress: 'testi123@testi123.fi',
        phoneNumber: '123321123',
      },
    },
  } as any);

  userEvent.click(contactInfoPart.getByRole('option', { name: 'Testaaja2' }));

  // email and name should automatically populate after choosing name from dropdown
  await waitFor(() => {
    expect(screen.getByLabelText('Sähköpostiosoite')).toHaveValue(
      'testi123@testi123.fi'
    );
    expect(screen.getByLabelText('Puhelinnumero')).toHaveValue('123321123');
  });

  userEvent.click(
    screen.getByLabelText(/Tapahtuman kielet/, { selector: 'button' })
  );
  userEvent.click(screen.getByRole('option', { name: 'Englanti' }));
  userEvent.click(screen.getByRole('option', { name: 'Suomi' }));
  userEvent.click(
    screen.getByLabelText('Tapahtuman kielet', { selector: 'button' })
  );

  await waitFor(() => {
    expect(
      screen.getByLabelText('Tapahtuman kielet', {
        selector: 'button',
      })
    ).toHaveTextContent('Englanti, Suomi');
  });

  jest.spyOn(apolloClient, 'readQuery').mockReturnValue(keywordResponse);

  const keywordsInput = screen.getByLabelText(/Tapahtuman avainsanat/);
  userEvent.click(keywordsInput);
  userEvent.type(keywordsInput, 'perheet');

  const familyCategory = await screen.findByText(/perheet/i);
  userEvent.click(familyCategory);

  const placeInput = screen.getByLabelText(/Oletustapahtumapaikka/);
  userEvent.click(placeInput);
  userEvent.type(placeInput, 'Sellon');

  jest.spyOn(apolloClient, 'query').mockResolvedValue(venueResponse as any);

  const place = await screen.findByText(/Sellon kirjasto/i);
  userEvent.click(place);

  await waitFor(() =>
    expect(screen.getByLabelText('Tapahtumapaikan kuvaus')).toHaveTextContent(
      'Testitapahtuman kuvaus'
    )
  );

  expect(screen.getByLabelText('Ulkovaatesäilytys')).toBeChecked();
  expect(screen.getByLabelText('Eväidensyöntipaikka')).toBeChecked();

  // Venue mutation mock
  jest.spyOn(apolloClient, 'mutate').mockResolvedValue({});

  userEvent.click(
    screen.getByRole('button', {
      name: 'Tallenna ja siirry tapahtuma-aikoihin',
    })
  );

  await waitFor(() => {
    expect(
      screen.queryByText('Sivulla on tallentamattomia muutoksia')
    ).toBeInTheDocument();
  });

  const parsedOccurrenceDate = parseDate(
    firstOccurrenceDate,
    'dd.MM.yyyy',
    new Date()
  );

  const encodedUrlDate = encodeURIComponent(parsedOccurrenceDate.toISOString());
  await waitFor(() => {
    expect(pushMock).toHaveBeenCalledWith({
      pathname: '/fi/events/palvelutarjotin:afz52lpyta/occurrences/create',
      search: `date=${encodedUrlDate}&startsAt=12%3A00&endsAt=13%3A00`,
    });
  });
});
