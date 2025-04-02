import { MockedResponse } from '@apollo/client/testing';
import { faker } from '@faker-js/faker';
import parseDate from 'date-fns/parse';
import { screen, waitFor, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { AUTOSUGGEST_OPTIONS_AMOUNT } from '../common/components/autoSuggest/contants';
import { LINKEDEVENTS_CONTENT_TYPE } from '../constants';
import { enrolmentInfoFormTestId } from '../domain/occurrence/enrolmentInfoFormPart/EnrolmentInfoFormPart';
import { occurrencesFormTestId } from '../domain/occurrence/occurrencesFormPart/OccurrencesFormPart';
import {
  AddOccurrenceDocument,
  DeleteOccurrenceDocument,
  EditEventDocument,
  EditVenueDocument,
  EventDocument,
  Language,
  MyProfileDocument,
  OccurrenceNodeConnection,
  OccurrencesOccurrenceSeatTypeChoices,
  PalvelutarjotinEventTranslationsInput,
  Place,
  PlaceDocument,
  PlacesDocument,
  VenueDocument,
} from '../generated/graphql';
import getLinkedEventsInternalId from '../utils/getLinkedEventsInternalId';
import {
  fakeEvent,
  fakeKeyword,
  fakeLanguages,
  fakeLocalizedObject,
  fakeOccurrence,
  fakeOccurrences,
  fakeOffer,
  fakeOrganisation,
  fakeOrganisations,
  fakePerson,
  fakePersons,
  fakePEvent,
  fakePlace,
  fakePlaces,
  fakeVenue,
} from '../utils/mockDataUtils';
import { DATETIME_FORMAT } from '../utils/time/format';

type Languages = 'fi' | 'en' | 'sv';
type LanguagesObject = { [key in Languages]: string };

export const eventName = 'Testitapahtuma';
export const eventId = 'event-id';
export const eventStartTime = '2020-08-04T21:00:00.000Z';
export const pEventId = 'pEventId';
export const keywordId = 'yso:p4363';
export const placeName = 'Sellon kirjasto';
export const placeId = 'placeId1';
export const shortDescription = 'Testitapahtuman kuvaus';
export const description = 'Pidempi kuvaus';
export const photographerName = 'Valo Valokuvaaja';
export const photoAltText = 'Vaihtoehtoinen kuvateksti';
export const infoUrl = 'https://www.palvelutarjotin.fi';
export const contactEmail = 'testi@testi.fi';
export const contactPhoneNumber = '123123123';
export const contactPersonId = 'contactPersonId';
export const eventContactPersonId = 'contactPersonId';
export const organisationId = 'T3JnYW5pc2F0aW9uTm9kZToy';
export const personName = 'Testaaja2';
export const eventOrganizationPersonName = 'Event Testaaja';
export const defaultOrganizationName =
  'Kulttuuri- ja vapaa-aikalautakunnan kulttuurijaosto';
export const eventOrganizationName = 'Kulttuurin ja vapaa-ajan toimiala';
export const keyword = 'perheet';
export const venueDescription = 'Test venue description';

export const occurrenceFormData = {
  date: '13.8.2020',
  startsAt: '12:00',
  endsAt: '13:00',
  amountOfSeats: '30',
  minGroupSize: '10',
  maxGroupSize: '20',
};

export const audienceKeywords = [
  { id: 'targetGroupId1', name: 'Muu ryhmä' },
  { id: 'targetGroupId2', name: 'Esiopetus' },
];

export const criteriaKeywords = [
  { id: 'criteriaId1', name: 'Työpaja' },
  { id: 'criteriaId2', name: 'Luontokoulu' },
];

export const categoryKeywords = [
  { id: 'categoryId1', name: 'Liikunta' },
  { id: 'categoryId2', name: 'Musiikki' },
];

export const basicKeywords = [...criteriaKeywords, ...categoryKeywords];

export const getKeywordId = (keywordId: string) => {
  return getLinkedEventsInternalId(
    LINKEDEVENTS_CONTENT_TYPE.KEYWORD,
    keywordId
  );
};

const fakeLanguagesObject = (name: string, languages: Languages[]) => {
  const languagesArray: Languages[] = ['en', 'fi', 'sv'];
  return languagesArray.reduce<LanguagesObject>((prev, next) => {
    return {
      ...prev,
      [next]: languages.includes(next) ? name : '',
    };
  }, {} as LanguagesObject);
};

const fakeLocalizedObjectWithMultipleLanguages = (
  name: string,
  languages: Languages[]
) => {
  return fakeLocalizedObject(name, fakeLanguagesObject(name, languages));
};

export const placeMock = fakePlace({
  streetAddress: fakeLocalizedObject('Testikatu'),
});

export const selloVenueMockResponse: MockedResponse = {
  request: {
    query: VenueDocument,
    variables: {
      id: placeId,
    },
  },
  result: {
    data: {
      venue: fakeVenue({
        id: placeId,
        outdoorActivity: true,
        hasClothingStorage: true,
        hasSnackEatingPlace: true,
        hasToiletNearby: false,
        hasAreaForGroupWork: true,
        hasIndoorPlayingArea: true,
        hasOutdoorPlayingArea: false,
        translations: [
          {
            languageCode: Language.Fi,
            description: venueDescription,
            __typename: 'VenueTranslationType',
          },
          {
            languageCode: Language.En,
            description: venueDescription,
            __typename: 'VenueTranslationType',
          },
          {
            languageCode: Language.Sv,
            description: venueDescription,
            __typename: 'VenueTranslationType',
          },
        ],
      }),
    },
  },
};

export const placeMockResponse: MockedResponse = {
  request: {
    query: PlaceDocument,
    variables: {
      id: placeId,
    },
  },
  result: {
    data: {
      place: fakePlace({
        name: fakeLocalizedObject(placeName),
        streetAddress: fakeLocalizedObject('Test street'),
        addressLocality: fakeLocalizedObject('Test city'),
        id: placeId,
      }),
    },
  },
};

export const placesMockResponse = {
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
  result: {
    data: {
      places: fakePlaces(1, [
        { name: fakeLocalizedObject(placeName), id: placeId },
      ]),
    },
  },
};

export const myProfileMockResponse: MockedResponse = {
  request: {
    query: MyProfileDocument,
    variables: {},
  },
  result: {
    data: { myProfile: fakePerson({ organisations: fakeOrganisations() }) },
  },
};

export const editVenueMockResponse: MockedResponse = {
  request: {
    query: EditVenueDocument,
    variables: {
      venue: {
        id: placeId,
        hasClothingStorage: true,
        hasSnackEatingPlace: true,
        outdoorActivity: true,
        hasToiletNearby: true,
        hasAreaForGroupWork: true,
        hasIndoorPlayingArea: true,
        hasOutdoorPlayingArea: true,
        translations: [
          {
            languageCode: 'FI',
            description: venueDescription,
          },
          {
            languageCode: 'EN',
            description: 'Changed venue description',
          },
          {
            languageCode: 'SV',
            description: venueDescription,
          },
        ],
      },
    },
  },
  result: {
    data: {
      updateVenue: {
        venue: {
          id: placeId,
          hasClothingStorage: true,
          hasSnackEatingPlace: true,
          outdoorActivity: true,
          hasToiletNearby: true,
          hasAreaForGroupWork: true,
          hasIndoorPlayingArea: true,
          hasOutdoorPlayingArea: true,
          translations: [
            {
              languageCode: 'FI',
              description: venueDescription,
              __typename: 'VenueTranslationType',
            },
            {
              languageCode: 'SV',
              description: venueDescription,
              __typename: 'VenueTranslationType',
            },
            {
              languageCode: 'EN',
              description: 'Changed venue description',
              __typename: 'VenueTranslationType',
            },
          ],
          __typename: 'VenueNode',
        },
        __typename: 'UpdateVenueMutationPayload',
      },
    },
  },
};

export const getDeleteOccurrenceMockResponse = (
  id: string
): MockedResponse => ({
  request: {
    query: DeleteOccurrenceDocument,
    variables: {
      input: {
        id,
      },
    },
  },
  result: {
    data: {
      deleteOccurrence: {
        clientMutationId: null,
        __typename: 'DeleteOccurrenceMutationPayload',
      },
    },
  },
});

export const getAddOccurrenceMockResponse = ({
  id = faker.string.uuid(),
  amountOfSeats,
  endTime,
  languages,
  maxGroupSize,
  minGroupSize,
  seatType = OccurrencesOccurrenceSeatTypeChoices.ChildrenCount,
  startTime,
}: {
  startTime: string;
  endTime: string;
  languages: string[];
  amountOfSeats: number;
  minGroupSize: number | null;
  maxGroupSize: number | null;
  seatType: OccurrencesOccurrenceSeatTypeChoices;
  placeId?: string;
  id?: string;
}): MockedResponse => ({
  request: {
    query: AddOccurrenceDocument,
    variables: {
      input: {
        startTime: parseDate(startTime, DATETIME_FORMAT, new Date()),
        endTime: parseDate(endTime, DATETIME_FORMAT, new Date()),
        languages: languages.map((lang) => ({ id: lang })),
        pEventId,
        placeId,
        amountOfSeats,
        minGroupSize,
        maxGroupSize,
        seatType,
      },
    },
  },
  result: {
    data: {
      addOccurrence: {
        occurrence: fakeOccurrence({
          id,
          pEvent: fakePEvent({
            id: pEventId,
            __typename: 'PalvelutarjotinEventNode',
          }),
          amountOfSeats,
          minGroupSize,
          maxGroupSize,
          seatsTaken: 0,
          seatsApproved: 0,
          seatType,
          remainingSeats: amountOfSeats,
          languages: fakeLanguages(
            languages.map((lang) => ({ id: lang, name: 'lang' }))
          ),
          startTime,
          endTime,
          placeId,
          cancelled: false,
        }),
        __typename: 'AddOccurrenceMutationPayload',
      },
    },
  },
});

const getEditEventVariables = ({
  placeId,
  autoAcceptance,
  translations,
  enrolmentEndDays,
  enrolmentStart,
  neededOccurrences,
  externalEnrolmentUrl = null,
  languages = ['fi'],
}: {
  placeId: string;
  autoAcceptance: boolean;
  translations: PalvelutarjotinEventTranslationsInput[];
  enrolmentEndDays: number | null;
  enrolmentStart: string | null;
  neededOccurrences: number;
  externalEnrolmentUrl?: string | null;
  languages?: Languages[];
}) => ({
  event: {
    id: eventId,
    name: fakeLanguagesObject(eventName, languages),
    startTime: eventStartTime,
    endTime: '',
    offers: [
      {
        description: fakeLanguagesObject('description', languages),
        infoUrl: null,
        isFree: true,
        price: fakeLanguagesObject('99,9', languages),
      },
    ],
    shortDescription: fakeLanguagesObject(shortDescription, languages),
    description: fakeLanguagesObject(description, languages),
    images: [],
    infoUrl: fakeLanguagesObject(infoUrl, languages),
    audience: audienceKeywords.map((k) => ({
      internalId: getKeywordId(k.id),
    })),
    inLanguage: [],
    keywords: [
      {
        internalId: getKeywordId(keywordId),
      },
      ...basicKeywords.map((k) => ({ internalId: getKeywordId(k.id) })),
    ],
    location: {
      internalId: getLinkedEventsInternalId(
        LINKEDEVENTS_CONTENT_TYPE.PLACE,
        placeId
      ),
    },
    draft: true,
    organisationId: organisationId,
    pEvent: {
      contactEmail: contactEmail,
      contactPersonId: contactPersonId,
      contactPhoneNumber: contactPhoneNumber,
      enrolmentEndDays,
      enrolmentStart: enrolmentStart ? new Date(enrolmentStart) : null,
      externalEnrolmentUrl,
      neededOccurrences,
      autoAcceptance,
      translations,
      mandatoryAdditionalInformation: false,
    },
  },
});

export const getUpdateEventMockResponse = ({
  autoAcceptance,
  autoAcceptanceMessage = null,
  enrolmentEndDays,
  enrolmentStart,
  neededOccurrences,
  externalEnrolmentUrl = null,
  languages = ['fi'],
  occurrences,
}: {
  autoAcceptance: boolean;
  autoAcceptanceMessage?: string | null;
  enrolmentEndDays: number | null;
  enrolmentStart: string | null;
  neededOccurrences: number;
  externalEnrolmentUrl?: string | null;
  languages?: Languages[];
  occurrences?: OccurrenceNodeConnection;
}): MockedResponse => ({
  request: {
    query: EditEventDocument,
    variables: getEditEventVariables({
      languages,
      placeId,
      autoAcceptance,
      neededOccurrences,
      enrolmentEndDays,
      externalEnrolmentUrl,
      enrolmentStart, // '2021-05-03T21:00:00.000Z',
      translations:
        autoAcceptance && autoAcceptanceMessage
          ? [
              {
                languageCode: Language.Fi,
                autoAcceptanceMessage,
              } as PalvelutarjotinEventTranslationsInput,
            ]
          : ([] as PalvelutarjotinEventTranslationsInput[]),
    }),
  },
  result: {
    data: {
      updateEventMutation: {
        response: {
          statusCode: 200,
          body: fakeEvent({
            id: 'palvelutarjotin:afz52lpyta',
            venue: fakeVenue({ id: placeId }),
            pEvent: fakePEvent({
              occurrences: occurrences ?? fakeOccurrences(1, [{ placeId }]),
            }),
          }),
          __typename: 'EventMutationResponse',
        },
        __typename: 'UpdateEventMutation',
      },
    },
  },
});

const getEventResponse = ({
  location,
  autoAcceptance,
  autoAcceptanceMessage = null,
  enrolmentEndDays,
  enrolmentStart,
  externalEnrolmentUrl,
  neededOccurrences,
  languages = ['fi'],
  occurrences,
}: {
  location: Place | null;
  autoAcceptance: boolean;
  autoAcceptanceMessage: string | null;
  enrolmentEndDays: number | null;
  enrolmentStart: string | null;
  externalEnrolmentUrl: string | null;
  neededOccurrences: number;
  languages?: Languages[];
  occurrences?: OccurrenceNodeConnection;
}) => ({
  data: {
    event: fakeEvent({
      id: eventId,
      shortDescription: fakeLocalizedObjectWithMultipleLanguages(
        shortDescription,
        languages
      ),
      description: fakeLocalizedObjectWithMultipleLanguages(
        description,
        languages
      ),
      name: fakeLocalizedObjectWithMultipleLanguages(eventName, languages),
      startTime: eventStartTime,
      endTime: '',
      additionalCriteria: criteriaKeywords.map((k) =>
        fakeKeyword({ id: k.id })
      ),
      categories: categoryKeywords.map((k) => fakeKeyword({ id: k.id })),
      offers: [
        fakeOffer({
          description: fakeLocalizedObjectWithMultipleLanguages(
            'description',
            languages
          ),
          price: fakeLocalizedObjectWithMultipleLanguages('99,9', languages),
          isFree: true,
          infoUrl: null,
        }),
      ],
      images: [],
      infoUrl: fakeLocalizedObjectWithMultipleLanguages(infoUrl, languages),
      inLanguage: [],
      audience: audienceKeywords.map((k) => fakeKeyword({ id: k.id })),
      keywords: [
        fakeKeyword({ id: keywordId }),
        ...basicKeywords.map((k) => fakeKeyword({ id: k.id })),
      ],
      location,
      pEvent: fakePEvent({
        id: pEventId,
        organisation: fakeOrganisation({
          id: organisationId,
          name: eventOrganizationName,
          persons: fakePersons(1, [
            {
              organisations: [] as never,
              name: eventOrganizationPersonName,
              id: contactPersonId,
            },
          ]),
        }),
        contactEmail: contactEmail,
        contactPhoneNumber: contactPhoneNumber,
        autoAcceptance,
        autoAcceptanceMessage,
        enrolmentEndDays,
        enrolmentStart,
        externalEnrolmentUrl,
        neededOccurrences,
        mandatoryAdditionalInformation: false,
        occurrences: occurrences ?? fakeOccurrences(1, [{ placeId }]),
        contactPerson: fakePerson({
          id: contactPersonId,
        }),
      }),
    }),
  },
});

export const getEventMockedResponse = ({
  location = false,
  autoAcceptance = true,
  autoAcceptanceMessage = null,
  enrolmentEndDays = null,
  enrolmentStart = null,
  externalEnrolmentUrl = null,
  neededOccurrences = 1,
  languages = ['fi'],
  occurrences,
}: {
  location?: boolean;
  autoAcceptance?: boolean;
  autoAcceptanceMessage?: string | null;
  enrolmentEndDays?: number | null;
  enrolmentStart?: string | null;
  externalEnrolmentUrl?: string | null;
  neededOccurrences?: number;
  languages?: Languages[];
  occurrences?: OccurrenceNodeConnection;
}): MockedResponse => ({
  request: {
    query: EventDocument,
    variables: {
      id: eventId,
      include: ['location', 'keywords', 'audience', 'in_language'],
    },
  },
  result: getEventResponse({
    languages,
    autoAcceptance,
    autoAcceptanceMessage,
    enrolmentEndDays,
    enrolmentStart,
    externalEnrolmentUrl,
    location: location
      ? fakePlace({
          id: placeId,
          name: fakeLocalizedObject(placeName),
        })
      : null,
    neededOccurrences,
    occurrences,
  }),
});

export const getVenueCheckbox = (
  key: 'hasToiletNearby' | 'hasOutdoorPlayingArea'
) => {
  switch (key) {
    case 'hasToiletNearby':
      return screen.getByRole('checkbox', {
        name: /wc lähellä tilaa/i,
      });
    case 'hasOutdoorPlayingArea':
      return screen.getByRole('checkbox', {
        name: /leikkitilaa ulkona/i,
      });
  }
};

export const getOccurrenceFormElement = (
  key:
    | 'location'
    | 'startDate'
    | 'startHours'
    | 'startMinutes'
    | 'endDate'
    | 'endHours'
    | 'endMinutes'
    | 'language'
    | 'seats'
    | 'min'
    | 'max'
    | 'oneGroupFills'
    | 'submit'
    | 'multidayOccurrence'
) => {
  const occurrencesForm = within(screen.getByTestId(occurrencesFormTestId));
  switch (key) {
    case 'location':
      return occurrencesForm.getByRole('textbox', {
        name: 'Tapahtumapaikka',
      });
    case 'startDate':
      return occurrencesForm.getByRole('textbox', {
        name: 'Päivämäärä',
      });
    case 'startHours':
      return occurrencesForm.getByRole('textbox', {
        name: /Alkamisajankohdan tuntivalitsin/i,
      });
    case 'startMinutes':
      return occurrencesForm.getByRole('textbox', {
        name: /Alkamisajankohdan minuuttivalitsin/i,
      });
    case 'endHours':
      return occurrencesForm.getByRole('textbox', {
        name: /Loppumisajankohdan tuntivalitsin/i,
      });
    case 'endMinutes':
      return occurrencesForm.getByRole('textbox', {
        name: /Loppumisajankohdan minuuttivalitsin/i,
      });
    case 'endDate':
      return occurrencesForm.getByRole('textbox', {
        name: 'Päättyy',
      });
    case 'language':
      return occurrencesForm.getByRole('button', {
        name: 'Tapahtuman kieli',
      });
    case 'seats':
      return occurrencesForm.queryByRole('spinbutton', {
        name: 'Paikkoja',
      });
    case 'min':
      return screen.queryByRole('spinbutton', {
        name: /minimi henkilömäärä/i,
      });
    case 'max':
      return screen.queryByRole('spinbutton', {
        name: /maksimi henkilömäärä/i,
      });
    case 'oneGroupFills':
      return screen.getByRole('checkbox', {
        name: /yksi ryhmä täyttää tapahtuman/i,
      });
    case 'submit':
      return screen.getByRole('button', {
        name: /lisää uusi tapahtuma-aika/i,
      });

    case 'multidayOccurrence':
      return screen.getByRole('checkbox', {
        name: /Tapahtuma-aika on monipäiväinen/i,
      });
  }
};

export const getFormElement = (
  key:
    | 'location'
    | 'enrolmentStartDate'
    | 'enrolmentStartHours'
    | 'enrolmentStartMinutes'
    | 'enrolmentEndDays'
    | 'neededOccurrences'
    | 'autoAcceptance'
    | 'autoAcceptanceMessage'
    | 'virtualEvent'
    | 'saveButton'
    | 'goToPublishing'
    | 'noEnrolmentButton'
    | 'externalEnrolmentButton'
    | 'enrolmentUrl'
    | 'orderableEvent'
) => {
  const enrolmentForm = within(screen.getByTestId(enrolmentInfoFormTestId));
  switch (key) {
    case 'location':
      return screen.getByRole('textbox', {
        name: /oletustapahtumapaikka \*/i,
      });
    case 'enrolmentStartDate':
      return enrolmentForm.getByRole('textbox', {
        name: /ilmoittautuminen alkaa \*/i,
      });
    case 'enrolmentStartHours':
      return enrolmentForm.getByRole('textbox', {
        name: /alkamisajankohdan tuntivalitsin/i,
      });
    case 'enrolmentStartMinutes':
      return enrolmentForm.getByRole('textbox', {
        name: /alkamisajankohdan minuuttivalitsin/i,
      });
    case 'enrolmentEndDays':
      return enrolmentForm.getByRole('spinbutton', {
        name: /ilmoittautuminen sulkeutuu X päivää ennen tapahtuma-aikaa/i,
      });
    case 'neededOccurrences':
      return enrolmentForm.getByRole('spinbutton', {
        name: /tarvittavat käyntikerrat/i,
      });
    case 'autoAcceptance':
      return enrolmentForm.getByRole('checkbox', {
        name: /vahvista ilmoittautumiset automaattisesti osallistujamäärän puitteissa/i,
      });
    case 'autoAcceptanceMessage':
      return screen.getByRole('textbox', {
        name: /mahdolliset lisätiedot vahvistusviestiin/i,
      });
    case 'virtualEvent':
      return screen.getByRole('checkbox', {
        name: /tapahtuma järjestetään virtuaalisesti/i,
      });
    case 'orderableEvent':
      return screen.getByRole('checkbox', {
        name: /Tilattavissa omaan toimipaikkaan/i,
      });
    case 'saveButton':
      return screen.getByRole('button', {
        name: /tallenna tiedot/i,
      });
    case 'goToPublishing':
      return screen.getByRole('button', {
        name: /siirry julkaisuun/i,
      });
    case 'noEnrolmentButton':
      return screen.getByRole('radio', {
        name: /ei ilmoittautumista/i,
      });
    case 'externalEnrolmentButton':
      return screen.getByRole('radio', {
        name: /lmoittautuminen muulla sivustolla/i,
      });
    case 'enrolmentUrl':
      return screen.getByRole('textbox', {
        name: /Sähköposti- tai www-osoite ilmoittautumiseen/i,
      });
  }
};

export const selectLocation = async () => {
  const locationInput = getFormElement('location');

  await userEvent.click(locationInput);
  await userEvent.type(locationInput, 'Sellon');
  const places = await screen.findAllByText(/Sellon kirjasto/i);
  await userEvent.click(places[0]);
};

export const fillAndSubmitOccurrenceForm = async ({
  occurrenceStartDate,
  occurrenceStartTime,
  occurrenceEndDate,
  occurrenceEndTime,
  submit = true,
  seatsInputs = true,
}: {
  occurrenceStartDate: string;
  occurrenceStartTime: string;
  occurrenceEndDate?: string;
  occurrenceEndTime: string;
  submit?: boolean;
  seatsInputs?: boolean;
}) => {
  await selectLocation();

  const occurrenceLocationInput = getOccurrenceFormElement('location')!;

  await waitFor(() => {
    expect(occurrenceLocationInput.parentElement).toHaveTextContent(
      'Sellon kirjasto'
    );
  });

  const occurrenceStartsDateInput = getOccurrenceFormElement('startDate')!;
  const occurrenceStartHoursInput = getOccurrenceFormElement('startHours')!;
  const occurrenceStartMinutesInput = getOccurrenceFormElement('startMinutes')!;

  const [startHours, startMinutes] = occurrenceStartTime.split(':');
  const [endHours, endMinutes] = occurrenceEndTime.split(':');

  // avoid act warning from react testing library (caused by autosuggest component)
  await userEvent.click(occurrenceStartsDateInput);

  // get end date input visible by clicking multiday occurrence checkbox
  if (occurrenceEndDate) {
    await userEvent.click(getOccurrenceFormElement('multidayOccurrence')!);
  }

  await userEvent.type(occurrenceStartsDateInput, occurrenceStartDate);
  expect(occurrenceStartsDateInput).toHaveValue(occurrenceStartDate);

  await userEvent.type(occurrenceStartHoursInput, startHours);
  await userEvent.type(occurrenceStartMinutesInput, startMinutes);
  expect(occurrenceStartHoursInput).toHaveValue(startHours);
  expect(occurrenceStartMinutesInput).toHaveValue(startMinutes);

  if (occurrenceEndDate) {
    const endDateInput = getOccurrenceFormElement('endDate')!;
    await userEvent.type(endDateInput, occurrenceEndDate);
  }

  await userEvent.type(getOccurrenceFormElement('endHours')!, endHours);
  await userEvent.type(getOccurrenceFormElement('endMinutes')!, endMinutes);
  expect(getOccurrenceFormElement('endHours')).toHaveValue(endHours);
  expect(getOccurrenceFormElement('endMinutes')).toHaveValue(endMinutes);

  expect(occurrenceStartHoursInput).toHaveValue(startHours);

  const languageSelector = getOccurrenceFormElement('language')!;
  await userEvent.click(languageSelector);
  const withinLanguageSelector = within(languageSelector.parentElement!);

  const optionFi = withinLanguageSelector.getByRole('option', {
    name: /suomi/i,
    hidden: true,
  });
  const optionEn = withinLanguageSelector.getByRole('option', {
    name: /englanti/i,
    hidden: true,
  });

  // select languages
  await userEvent.click(optionFi);
  await userEvent.click(optionEn);
  await userEvent.click(languageSelector);

  if (seatsInputs) {
    const seatsInput = getOccurrenceFormElement('seats')!;
    const minGroupSizeInput = getOccurrenceFormElement('min')!;
    const maxGroupSizeInput = getOccurrenceFormElement('max')!;

    await userEvent.type(seatsInput, '30');
    await userEvent.type(minGroupSizeInput, '10');
    await userEvent.type(maxGroupSizeInput, '20');

    await waitFor(() => expect(seatsInput).toHaveValue(30));

    expect(minGroupSizeInput).toHaveValue(10);
    expect(maxGroupSizeInput).toHaveValue(20);
  }

  if (submit) {
    const submitButton = getOccurrenceFormElement('submit')!;
    await userEvent.click(submitButton);

    const goToPublishingButton = getFormElement('goToPublishing');
    const saveEventDataButton = getFormElement('saveButton');
    const addNewOccurrenceButton = getOccurrenceFormElement('submit');

    await waitFor(() => expect(goToPublishingButton).toBeEnabled());
    await waitFor(() => expect(saveEventDataButton).toBeDisabled());
    await waitFor(() => expect(addNewOccurrenceButton).toBeEnabled());
  }
};

export const getLanguageCheckboxes = () => {
  const finnishLanguageCheckbox = screen.getByRole('checkbox', {
    name: 'Suomi',
  });

  const englishLanguageCheckbox = screen.getByRole('checkbox', {
    name: 'Englanti',
  });
  const swedishLanguageCheckbox = screen.getByRole('checkbox', {
    name: 'Ruotsi',
  });

  return {
    finnishLanguageCheckbox,
    englishLanguageCheckbox,
    swedishLanguageCheckbox,
  };
};

export const checkThatOnlyFinnishLanguageIsSelectedAndDisabled = () => {
  const {
    finnishLanguageCheckbox,
    englishLanguageCheckbox,
    swedishLanguageCheckbox,
  } = getLanguageCheckboxes();

  expect(finnishLanguageCheckbox).toBeChecked();
  expect(finnishLanguageCheckbox).toBeDisabled();
  expect(englishLanguageCheckbox).not.toBeChecked();
  expect(swedishLanguageCheckbox).not.toBeChecked();
};

export const baseApolloMocks = [
  myProfileMockResponse,

  // mocked when place input is given search term (Sello)
  placesMockResponse,

  // Mock for single place query
  placeMockResponse,

  // mocked when place is selected and venue data fetched
  selloVenueMockResponse,
];

export const getDefaultOccurrenceValues = ({
  isMultiday = false,
}: { isMultiday?: boolean } = {}) => {
  const occurrenceStartDate = '10.5.2021';
  const occurrenceStartTime = '10:00';
  const occurrenceEndDate = '12.5.2021';
  const occurrenceEndTime = '11:00';
  type OccurrenceEndDateTime =
    `${typeof occurrenceEndDate | typeof occurrenceStartDate} ${typeof occurrenceEndTime}`;
  return {
    occurrenceStartDate,
    occurrenceStartTime,
    occurrenceEndDate,
    occurrenceEndTime,
    occurrenceStartDateTime: `${occurrenceStartDate} ${occurrenceStartTime}`,
    occurrenceEndDateTime: (isMultiday
      ? `${occurrenceEndDate} ${occurrenceEndTime}`
      : `${occurrenceStartDate} ${occurrenceEndTime}`) satisfies OccurrenceEndDateTime,
  } as const;
};
