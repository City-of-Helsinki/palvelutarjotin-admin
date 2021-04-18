import userEvent from '@testing-library/user-event';
import parseDate from 'date-fns/parse';
import { advanceTo } from 'jest-date-mock';
import * as React from 'react';
import Modal from 'react-modal';
import Router from 'react-router';

import { AUTOSUGGEST_OPTIONS_AMOUNT } from '../../../common/components/autoSuggest/contants';
import { EMPTY_LOCALISED_OBJECT } from '../../../constants';
import {
  CreateEventDocument,
  ImageDocument,
  KeywordsDocument,
  KeywordSetType,
  Language,
  MyProfileDocument,
  PersonDocument,
  PlaceDocument,
  PlacesDocument,
  UploadSingleImageDocument,
  VenueDocument,
} from '../../../generated/graphql';
import { getKeywordSetsMockResponses } from '../../../test/apollo-mocks/keywordSetMocks';
import {
  audienceKeywords,
  basicKeywords,
  categoryKeywords,
  contactEmail,
  contactPersonId,
  contactPhoneNumber,
  createFinnishLocalisedObject,
  criteriaKeywords,
  defaultOrganizationName,
  description,
  editMocks,
  eventId,
  eventName,
  eventOrganizationName,
  eventOrganizationPersonName,
  getKeywordId,
  infoUrl,
  keyword,
  keywordId,
  keywordMockResponse,
  organisationId,
  personName,
  photoAltText,
  photographerName,
  placeId,
  placeName,
  profileResponse,
  shortDescription,
  venueDescription,
  venueQueryResponse,
} from '../../../test/EventPageTestUtil';
import {
  fakeEvent,
  fakeImage,
  fakeKeyword,
  fakeKeywords,
  fakeLocalizedObject,
  fakePlace,
  fakePlaces,
  fakeVenue,
} from '../../../utils/mockDataUtils';
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
import { EventFormFields } from '../types';
configure({ defaultHidden: true });
advanceTo(new Date(2020, 7, 8));

const imageId = '48584';
const imageFile = new File(['(⌐□_□)'], 'palvelutarjotin.png', {
  type: 'image/png',
});
const imageAltText = 'AltText';

const defaultFormData = {
  name: createFinnishLocalisedObject(eventName, true),
  shortDescription: createFinnishLocalisedObject(shortDescription, true),
  description: createFinnishLocalisedObject(description, true),
  infoUrl: createFinnishLocalisedObject(infoUrl, true),
  contactEmail: 'testi@testi.fi',
  contactPhoneNumber: '123123123',
  enrolmentStart: '13.08.2020 03:45',
  enrolmentEndDays: '3',
  neededOccurrences: '3',
  imagePhotographerName: 'Valo Valokuvaaja',
  imageAltText: 'Vaihtoehtoinen kuvateksti',
  firstOccurrenceDate: '20.11.2020',
};

const createEventVariables = {
  event: {
    name: defaultFormData.name,
    startTime: '2020-08-07T21:00:00.000Z',
    offers: [
      {
        price: EMPTY_LOCALISED_OBJECT,
        description: EMPTY_LOCALISED_OBJECT,
        isFree: true,
      },
    ],
    shortDescription: defaultFormData.shortDescription,
    description: defaultFormData.description,
    images: [{ internalId: '/image/48584/' }],
    infoUrl: defaultFormData.infoUrl,
    audience: audienceKeywords.map((k) => ({ internalId: getKeywordId(k.id) })),
    inLanguage: [],
    keywords: [
      {
        internalId: getKeywordId(keywordId),
      },
      ...basicKeywords.map((k) => ({ internalId: getKeywordId(k.id) })),
    ],
    location: { internalId: `/place/${placeId}/` },
    pEvent: {
      contactEmail: 'testi123@testi123.fi',
      contactPersonId: contactPersonId,
      contactPhoneNumber: '123321123',
      enrolmentEndDays: 3,
      enrolmentStart: '2020-08-13T00:45:00.000Z',
      neededOccurrences: 3,
      autoAcceptance: true,
      mandatoryAdditionalInformation: false,
    },
    organisationId,
    draft: true,
  },
};

const addEventResponse = {
  data: {
    addEventMutation: {
      response: {
        statusCode: 201,
        body: fakeEvent({
          id: 'palvelutarjotin:afz52lpyta',
        }),
        __typename: 'EventMutationResponse',
      },
      __typename: 'AddEventMutation',
    },
  },
};

const imageMutationResponse = {
  data: {
    uploadImageMutation: {
      response: {
        statusCode: 201,
        body: fakeImage({ id: imageId }),
        __typename: 'ImageMutationResponse',
      },
      __typename: 'UploadImageMutation',
    },
  },
};

const imageResponse = {
  data: {
    image: fakeImage({
      altText: imageAltText,
    }),
  },
};

const keywordResponse = {
  data: {
    keyword: fakeKeyword(),
  },
};

const keywordsResponse = {
  data: {
    keywords: fakeKeywords(1, [
      {
        name: fakeLocalizedObject(keyword),
        id: keywordId,
      },
    ]),
  },
};

const placeResponse = {
  data: {
    place: fakePlace(),
  },
};

const placesResponse = {
  data: {
    places: fakePlaces(1, [
      { name: fakeLocalizedObject(placeName), id: placeId },
    ]),
  },
};

const venueResponse = {
  data: {
    venue: fakeVenue({
      outdoorActivity: true,
      hasClothingStorage: true,
      hasSnackEatingPlace: true,
      hasToiletNearby: true,
      hasAreaForGroupWork: true,
      hasIndoorPlayingArea: true,
      hasOutdoorPlayingArea: true,
      translations: [
        {
          languageCode: Language.Fi,
          description: venueDescription,
          __typename: 'VenueTranslationType',
        },
      ],
    }),
  },
};

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
        id: imageId,
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
        text: keyword,
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
        showAllPlaces: true,
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
  {
    request: {
      query: CreateEventDocument,
      variables: {
        event: {
          ...createEventVariables.event,
          location: {
            internalId: '/place/helsinki:internet/',
          },
        },
      },
    },
    result: addEventResponse,
  },
  ...getKeywordSetsMockResponses([
    {
      setType: KeywordSetType.TargetGroup,
      keywords: audienceKeywords,
    },
    {
      setType: KeywordSetType.Category,
      keywords: categoryKeywords,
    },
    {
      setType: KeywordSetType.AdditionalCriteria,
      keywords: criteriaKeywords,
    },
  ]),
];

jest.spyOn(apolloClient, 'query').mockImplementation(({ query }): any => {
  if (query === PersonDocument) {
    return {
      data: {
        person: {
          emailAddress: 'testi123@testi123.fi',
          phoneNumber: '123321123',
        },
      },
    };
  }

  if (query === VenueDocument) {
    return venueResponse;
  }
});

const mockUseHistory = () => {
  const pushMock = jest.fn();
  /* eslint-disable @typescript-eslint/no-explicit-any */
  jest.spyOn(Router, 'useHistory').mockReturnValue({
    push: pushMock,
  } as any);
  return pushMock;
};

// test('page is accessible', async () => {
//   const { container } = render(<CreateEventPage />, { mocks });

//   await waitFor(() => {
//     expect(
//       screen.queryByText('Kulttuuri- ja vapaa-aikalautakunnan kulttuurijaosto')
//     ).toBeInTheDocument();
//   });

//   const result = await axe(container);
//   expect(result).toHaveNoViolations();
// });

test('modal opens when trying to change language', async () => {
  const { container } = render(<CreateEventPage />, { mocks });

  Modal.setAppElement(container);

  await screen.findByText(defaultOrganizationName);

  userEvent.type(
    screen.getByLabelText(/Tapahtuman nimi/),
    defaultFormData.name.fi
  );

  expect(screen.getByTestId('event-form')).toHaveFormValues({
    'name.fi': defaultFormData.name.fi,
  });

  // should open modal when trying to change event language
  userEvent.click(screen.getByRole('button', { name: 'ruotsi' }));
  expect(screen.getByRole('dialog')).toHaveTextContent(/vaihda kieli/i);

  const modal = within(screen.getByRole('dialog', {}));

  const cancelButton = modal.getByRole('button', {
    name: 'Peruuta',
  });
  userEvent.click(cancelButton);

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  await screen.findByText('Sivulla on tallentamattomia muutoksia');
});

test('event can be created with form', async () => {
  advanceTo(new Date(2020, 7, 8));
  const pushMock = mockUseHistory();
  const { container } = render(<CreateEventPage />, { mocks });

  Modal.setAppElement(container);

  await fillForm({ ...defaultFormData, startTime: '12:00', endTime: '13:00' });

  await waitFor(() => {
    expect(
      screen.queryByText('Sivulla on tallentamattomia muutoksia')
    ).toBeInTheDocument();
  });

  userEvent.click(
    screen.getByRole('button', {
      name: 'Tallenna ja siirry tapahtuma-aikoihin',
    })
  );

  const parsedOccurrenceDate = parseDate(
    defaultFormData.firstOccurrenceDate,
    'dd.MM.yyyy',
    new Date()
  );

  const encodedUrlDate = encodeURIComponent(parsedOccurrenceDate.toISOString());
  await waitFor(() => {
    expect(pushMock).toHaveBeenCalledWith({
      pathname: '/fi/events/palvelutarjotin:afz52lpyta/occurrences/createfirst',
      search: `date=${encodedUrlDate}&startsAt=12%3A00&endsAt=13%3A00`,
    });
  });
}, /* it seems that running test takes over 100 seconds and fails, let's override the default timeout with 150 seconds */ 150_000);

test('price field is accessible only when isFree field is not checked', async () => {
  render(<CreateEventPage />, { mocks });
  await screen.findByLabelText(/Tapahtuma on ilmainen/);

  expect(screen.getByLabelText(/Tapahtuma on ilmainen/)).toBeChecked();
  expect(screen.getByLabelText(/Hinta/)).toHaveAttribute('disabled');
  expect(screen.getByLabelText(/Lisätiedot/)).toHaveAttribute('disabled');

  userEvent.click(screen.getByLabelText(/Tapahtuma on ilmainen/));

  expect(screen.getByLabelText(/Tapahtuma on ilmainen/)).not.toBeChecked();
  expect(screen.getByLabelText(/Hinta/)).not.toHaveAttribute('disabled');
  expect(screen.getByLabelText(/Lisätiedot/)).not.toHaveAttribute('disabled');
});

test('virtual event checkbox sets internet location correctly', async () => {
  advanceTo(new Date(2020, 7, 8));
  const pushMock = mockUseHistory();
  const { container } = render(<CreateEventPage />, { mocks });

  Modal.setAppElement(container);

  await fillForm({ ...defaultFormData, startTime: '12:00', endTime: '13:00' });

  const defaultLocationInput = screen.getByRole('textbox', {
    name: /oletustapahtumapaikka/i,
  });
  expect(defaultLocationInput).not.toBeDisabled();

  const virtualEventCheckbox = screen.getByRole('checkbox', {
    name: /tapahtuma järjestetään virtuaalisesti/i,
  });
  userEvent.click(virtualEventCheckbox);

  expect(defaultLocationInput).toBeDisabled();

  userEvent.click(
    screen.getByRole('button', {
      name: 'Tallenna ja siirry tapahtuma-aikoihin',
    })
  );

  const parsedOccurrenceDate = parseDate(
    defaultFormData.firstOccurrenceDate,
    'dd.MM.yyyy',
    new Date()
  );

  const encodedUrlDate = encodeURIComponent(parsedOccurrenceDate.toISOString());
  await waitFor(() => {
    expect(pushMock).toHaveBeenCalledWith({
      pathname: '/fi/events/palvelutarjotin:afz52lpyta/occurrences/createfirst',
      search: `date=${encodedUrlDate}&startsAt=12%3A00&endsAt=13%3A00`,
    });
  });
});

const fillForm = async (
  eventFormData: Omit<Partial<EventFormFields>, 'enrolmentStart'> & {
    enrolmentStart: string;
    firstOccurrenceDate: string;
    startTime: string;
    endTime: string;
  }
) => {
  await screen.findByText(defaultOrganizationName);

  userEvent.type(
    screen.getByLabelText(/Tapahtuman nimi/),
    eventFormData.name.fi
  );

  expect(screen.getByTestId('event-form')).toHaveFormValues({
    'name.fi': eventFormData.name.fi,
  });

  userEvent.type(
    screen.getByLabelText(/lyhyt kuvaus/i),
    eventFormData.shortDescription.fi
  );

  expect(screen.getByTestId('event-form')).toHaveFormValues({
    'name.fi': eventFormData.name.fi,
    'shortDescription.fi': eventFormData.shortDescription.fi,
  });

  userEvent.type(screen.getByLabelText(/Kuvaus/), eventFormData.description.fi);
  userEvent.type(
    screen.getByLabelText('WWW-osoite, josta saa lisätietoja tapahtumasta'),
    eventFormData.infoUrl.fi
  );

  // image input should disappear after adding image
  const imageInput = await screen.findByLabelText('Tapahtuman kuva');
  await screen.findByRole('button', { name: 'Lisää kuva' });

  fireEvent.change(imageInput, { target: { files: [imageFile] } });
  await screen.findByAltText(imageAltText);

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
  userEvent.type(dateInput, eventFormData.firstOccurrenceDate);

  const startsAtInput = screen.getByLabelText(/Alkaa klo/i, {
    selector: 'input',
  });
  userEvent.type(startsAtInput, eventFormData.startTime);
  userEvent.click(
    screen.getByRole('option', {
      name: eventFormData.startTime,
    })
  );

  const endsAtInput = screen.getByLabelText(/Loppuu klo/i, {
    selector: 'input',
  });
  userEvent.type(endsAtInput, eventFormData.endTime);
  userEvent.click(
    screen.getByRole('option', {
      name: eventFormData.endTime,
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

  userEvent.click(contactInfoPart.getByRole('option', { name: personName }));

  // email and name should automatically populate after choosing name from dropdown
  await waitFor(() => {
    expect(screen.getByLabelText('Sähköpostiosoite')).toHaveValue(
      'testi123@testi123.fi'
    );
    expect(screen.getByLabelText('Puhelinnumero')).toHaveValue('123321123');
  });

  await testMultiDropdownValues({
    dropdownLabel: /kategoriat/i,
    dropdownTestId: 'categories-dropdown',
    values: categoryKeywords.map((k) => k.name),
  });

  await testMultiDropdownValues({
    dropdownLabel: /aktiviteetit/i,
    dropdownTestId: 'additional-criteria-dropdown',
    values: criteriaKeywords.map((k) => k.name),
  });

  await testMultiDropdownValues({
    dropdownLabel: /kohderyhmät/i,
    dropdownTestId: 'audience-dropdown',
    values: audienceKeywords.map((k) => k.name),
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

  // jest.spyOn(apolloClient, 'query').mockResolvedValue(venueResponse as any);

  const place = await screen.findByText(/Sellon kirjasto/i);
  userEvent.click(place);

  await waitFor(() =>
    expect(screen.getByLabelText('Tapahtumapaikan kuvaus')).toHaveTextContent(
      venueDescription
    )
  );

  expect(screen.getByLabelText('Ulkovaatesäilytys')).toBeChecked();
  expect(screen.getByLabelText('Eväidensyöntipaikka')).toBeChecked();

  // Venue mutation mock
  jest.spyOn(apolloClient, 'mutate').mockResolvedValue({});
};

const testMultiDropdownValues = async ({
  dropdownTestId,
  dropdownLabel,
  values,
}: {
  dropdownTestId: string;
  dropdownLabel: RegExp | string;
  values: string[];
}) => {
  userEvent.click(screen.getByLabelText(dropdownLabel, { selector: 'button' }));

  values.forEach((value) => {
    userEvent.click(screen.getByRole('option', { name: value }));
  });
  userEvent.click(screen.getByLabelText(dropdownLabel, { selector: 'button' }));

  const dropdown = within(screen.getByTestId(dropdownTestId));

  await Promise.all(values.map((value) => dropdown.findByText(value)));
};

describe('Copy event', () => {
  beforeEach(() => {
    jest.spyOn(Router, 'useParams').mockReturnValue({
      id: eventId,
    });
    jest
      .spyOn(apolloClient, 'readQuery')
      .mockImplementation(({ variables }: any) => {
        if (variables.id === keywordId) {
          return keywordMockResponse;
        }
      });
    jest
      .spyOn(apolloClient, 'query')
      .mockResolvedValue(venueQueryResponse as any);

    jest
      .spyOn(apolloClient, 'readQuery')
      .mockReturnValue(venueQueryResponse as any);

    advanceTo(new Date(2020, 7, 5));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('initializes copied event correctly', async () => {
    render(<CreateEventPage />, {
      mocks: editMocks,
    });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    await screen.findByText(eventOrganizationName);
    await screen.findByText(keyword);

    expect(screen.getByLabelText(/Tapahtuman nimi/i)).toHaveValue(eventName);
    expect(screen.getByLabelText(/Tapahtumapaikan kuvaus/i)).toHaveTextContent(
      venueDescription
    );

    expect(screen.getByTestId('event-form')).toHaveFormValues({
      'name.fi': eventName,
      'shortDescription.fi': shortDescription,
      'infoUrl.fi': infoUrl,
      contactEmail,
      contactPhoneNumber,
      enrolmentStart: '',
      enrolmentEndDays: 3,
      neededOccurrences: 3,
      imagePhotographerName: photographerName,
      imageAltText: photoAltText,
    });

    expect(screen.getByLabelText(/Kuvaus/)).toHaveTextContent(description);

    await waitFor(() => {
      expect(
        within(screen.getByTestId('contact-info')).getByLabelText(/Nimi/, {
          selector: 'button',
        })
      ).toHaveTextContent(eventOrganizationPersonName);
    });

    await waitFor(() => {
      expect(screen.getAllByText(placeName)).toHaveLength(2);
    });

    expect(screen.getByLabelText('Ulkovaatesäilytys')).toBeChecked();
    expect(screen.getByLabelText('Eväidensyöntipaikka')).toBeChecked();

    userEvent.type(screen.getByLabelText(/Tapahtuman nimi/), 'Testinimi');

    await screen.findByText('Sivulla on tallentamattomia muutoksia');
    await screen.findByRole('button', {
      name: /tallenna ja siirry tapahtuma-aikoihin/i,
    });
  });
});
