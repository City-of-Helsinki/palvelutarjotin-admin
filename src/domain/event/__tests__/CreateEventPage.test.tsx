import userEvent from '@testing-library/user-event';
import parseDate from 'date-fns/parse';
import { advanceTo } from 'jest-date-mock';
import * as React from 'react';
import Modal from 'react-modal';
import Router from 'react-router';

import { AUTOSUGGEST_OPTIONS_AMOUNT } from '../../../common/components/autoSuggest/contants';
import { LINKEDEVENTS_CONTENT_TYPE } from '../../../constants';
import {
  CreateEventDocument,
  ImageDocument,
  KeywordsDocument,
  KeywordSetDocument,
  KeywordSetType,
  Language,
  MyProfileDocument,
  PersonDocument,
  PlaceDocument,
  PlacesDocument,
  UploadSingleImageDocument,
  VenueDocument,
} from '../../../generated/graphql';
import getLinkedEventsInternalId from '../../../utils/getLinkedEventsInternalId';
import {
  fakeEvent,
  fakeImage,
  fakeKeyword,
  fakeKeywords,
  fakeKeywordSet,
  fakeLocalizedObject,
  fakeOrganisations,
  fakePerson,
  fakePersons,
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

configure({ defaultHidden: true });
advanceTo(new Date(2020, 7, 8));

const keywordId = 'yso:p4363';
const placeId = 'tprek:15417';
const organisationId = 'T3JnYW5pc2F0aW9uTm9kZToy';
const contactPersonId =
  'UGVyc29uTm9kZTo0MGZmYTIwMS1mOWJhLTQyZTYtYjY3Ny01MWQyM2Q4OGQ4ZDk=';
const contactName = 'Testaaja2';
const imageId = '48584';
const imageFile = new File(['(⌐□_□)'], 'palvelutarjotin.png', {
  type: 'image/png',
});
const imageAltText = 'AltText';
const venueDescription = 'Testitapahtuman kuvaus';

const categoryId1 = 'categoryId1';
const categoryId2 = 'categoryId2';
const criteriaId1 = 'criteriaId1';
const criteriaId2 = 'criteriaId2';
const targetGroupId1 = 'targetGroupId1';
const targetGroupId2 = 'targetGroupId2';

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

const getKeywordId = (keywordId: string) => {
  return getLinkedEventsInternalId(
    LINKEDEVENTS_CONTENT_TYPE.KEYWORD,
    keywordId
  );
};

const createEventVariables = {
  event: {
    name: { fi: 'Testitapahtuma' },
    startTime: '2020-08-07T21:00:00.000Z',
    offers: [
      {
        price: {
          fi: '',
        },
        description: {
          fi: '',
        },
        isFree: true,
      },
    ],
    shortDescription: { fi: 'Testikuvaus' },
    description: { fi: 'Pidempi kuvaus' },
    images: [{ internalId: '/image/48584/' }],
    infoUrl: { fi: 'https://www.palvelutarjotin.fi' },
    audience: [
      {
        internalId: getKeywordId(targetGroupId1),
      },
      {
        internalId: getKeywordId(targetGroupId2),
      },
    ],
    inLanguage: [
      { internalId: '/language/en/' },
      { internalId: '/language/fi/' },
    ],
    keywords: [
      {
        internalId: getKeywordId(keywordId),
      },
      {
        internalId: getKeywordId(criteriaId1),
      },
      {
        internalId: getKeywordId(criteriaId2),
      },
      {
        internalId: getKeywordId(categoryId1),
      },
      {
        internalId: getKeywordId(categoryId2),
      },
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
    },
    organisationId: organisationId,
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
        name: fakeLocalizedObject('perheet'),
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
      { name: fakeLocalizedObject('Sellon kirjasto'), id: placeId },
    ]),
  },
};

const profileResponse = {
  data: {
    myProfile: fakePerson({
      organisations: fakeOrganisations(1, [
        {
          id: organisationId,
          persons: fakePersons(1, [
            {
              /* eslint-disable @typescript-eslint/no-explicit-any */
              organisations: [] as any,
              name: contactName,
              id: contactPersonId,
            },
          ]),
          name: 'Kulttuuri- ja vapaa-aikalautakunnan kulttuurijaosto',
        },
      ]),
    }),
  },
};

const venueResponse = {
  data: {
    venue: fakeVenue({
      outdoorActivity: true,
      hasClothingStorage: true,
      hasSnackEatingPlace: true,
      translations: [
        {
          languageCode: Language.Fi,
          description: 'Testitapahtuman kuvaus',
          __typename: 'VenueTranslationType',
        },
      ],
    }),
  },
};

const categories = ['Liikunta', 'Musiikki'];

const categoriesResponse = {
  data: {
    keywordSet: fakeKeywordSet({
      keywords: [
        fakeKeyword({
          id: categoryId1,
          name: fakeLocalizedObject(categories[0]),
        }),
        fakeKeyword({
          id: categoryId2,
          name: fakeLocalizedObject(categories[1]),
        }),
      ],
    }),
  },
};

const additionalCriteria = ['Työpaja', 'Luontokoulu'];

const additionalCriteriaResponse = {
  data: {
    keywordSet: fakeKeywordSet({
      keywords: [
        fakeKeyword({
          id: criteriaId1,
          name: fakeLocalizedObject(additionalCriteria[0]),
        }),
        fakeKeyword({
          id: criteriaId2,
          name: fakeLocalizedObject(additionalCriteria[1]),
        }),
      ],
    }),
  },
};

const targetGroups = ['Muu ryhmä', 'Esiopetus'];

const targetGroupsResponse = {
  data: {
    keywordSet: fakeKeywordSet({
      keywords: [
        fakeKeyword({
          id: targetGroupId1,
          name: fakeLocalizedObject(targetGroups[0]),
        }),
        fakeKeyword({
          id: targetGroupId2,
          name: fakeLocalizedObject(targetGroups[1]),
        }),
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
      query: KeywordSetDocument,
      variables: {
        setType: KeywordSetType.Category,
      },
    },
    result: categoriesResponse,
  },
  {
    request: {
      query: KeywordSetDocument,
      variables: {
        setType: KeywordSetType.AdditionalCriteria,
      },
    },
    result: additionalCriteriaResponse,
  },
  {
    request: {
      query: KeywordSetDocument,
      variables: {
        setType: KeywordSetType.TargetGroup,
      },
    },
    result: targetGroupsResponse,
  },
];

jest.spyOn(apolloClient, 'query').mockImplementation(({ query }) => {
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
  /* eslint-disable @typescript-eslint/no-explicit-any */
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
    expect(screen.queryByAltText(imageAltText)).toBeInTheDocument();
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

  userEvent.click(contactInfoPart.getByRole('option', { name: contactName }));

  // email and name should automatically populate after choosing name from dropdown
  await waitFor(() => {
    expect(screen.getByLabelText('Sähköpostiosoite')).toHaveValue(
      'testi123@testi123.fi'
    );
    expect(screen.getByLabelText('Puhelinnumero')).toHaveValue('123321123');
  });

  await testMultiDropdownValues({
    dropdownLabel: /tapahtuman kielet/i,
    dropdownTestId: 'in-language-dropdown',
    values: ['Englanti', 'Suomi'],
  });

  await testMultiDropdownValues({
    dropdownLabel: /kategoriat/i,
    dropdownTestId: 'categories-dropdown',
    values: categories,
  });

  await testMultiDropdownValues({
    dropdownLabel: /muu luokittelu/i,
    dropdownTestId: 'additional-criteria-dropdown',
    values: additionalCriteria,
  });

  await testMultiDropdownValues({
    dropdownLabel: /kohderyhmät/i,
    dropdownTestId: 'audience-dropdown',
    values: targetGroups,
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
      pathname: '/fi/events/palvelutarjotin:afz52lpyta/occurrences/createfirst',
      search: `date=${encodedUrlDate}&startsAt=12%3A00&endsAt=13%3A00`,
    });
  });
});

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

  await waitFor(() => {
    values.forEach((value) => {
      expect(dropdown.queryByText(value)).toBeInTheDocument();
    });
  });
};
