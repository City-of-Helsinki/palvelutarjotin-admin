import userEvent from '@testing-library/user-event';
import { advanceTo } from 'jest-date-mock';
import * as React from 'react';
// eslint-disable-next-line import/default, import/no-named-as-default
import Router from 'react-router';

import { AUTOSUGGEST_OPTIONS_AMOUNT } from '../../../common/components/autoSuggest/contants';
import { formLanguageSelectorTestId } from '../../../common/components/formLanguageSelector/FormLanguageSelector';
import { createEmptyLocalizedObject } from '../../../constants';
import {
  CreateEventDocument,
  ImageDocument,
  KeywordsDocument,
  KeywordSetType,
  MyProfileDocument,
  PlaceDocument,
  PlacesDocument,
  UploadSingleImageDocument,
} from '../../../generated/graphql';
import * as useLocale from '../../../hooks/useLocale';
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
  descriptionEditorHTML,
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
  venueQueryResponse,
} from '../../../test/EventPageTestUtil';
import { Language } from '../../../types';
import {
  fakeEvent,
  fakeImage,
  fakeKeyword,
  fakeKeywords,
  fakeLocalizedObject,
  fakePlace,
  fakePlaces,
} from '../../../utils/mockDataUtils';
import {
  configure,
  fireEvent,
  pasteToTextEditor,
  render,
  screen,
  waitFor,
  within,
} from '../../../utils/testUtils';
import apolloClient from '../../app/apollo/apolloClient';
import { ROUTES } from '../../app/routes/constants';
import CreateEventPage from '../CreateEventPage';
import { CreateEventFormFields } from '../types';
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
  enrolmentStart: '13.8.2020 03:45',
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
        price: createEmptyLocalizedObject(),
        description: createEmptyLocalizedObject(),
        isFree: true,
      },
    ],
    shortDescription: defaultFormData.shortDescription,
    description: createFinnishLocalisedObject(descriptionEditorHTML, true),
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
    pEvent: {
      contactEmail: defaultFormData.contactEmail,
      contactPersonId: contactPersonId,
      contactPhoneNumber: contactPhoneNumber,
      neededOccurrences: 1,
      mandatoryAdditionalInformation: true,
      translations: [],
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
        event: createEventVariables,
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

test('event can be created with form', async () => {
  advanceTo(new Date(2020, 7, 8));

  const { history } = render(<CreateEventPage />, { mocks });
  const historyPush = jest.spyOn(history, 'push');

  await fillForm(defaultFormData as unknown as CreateEventFormFields);

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

  await waitFor(() => {
    expect(historyPush).toHaveBeenCalledWith({
      pathname: `/fi${ROUTES.CREATE_OCCURRENCE.replace(
        ':id',
        'palvelutarjotin:afz52lpyta'
      )}`,
    });
  });
}, /* it seems that running test takes over 100 seconds and fails, let's override the default timeout with 150 seconds */ 150_000);

describe('Event price section', () => {
  test('price field is accessible only when isFree field is not checked', async () => {
    render(<CreateEventPage />, { mocks });
    await screen.findByLabelText(/Tapahtuma on ilmainen/);

    expect(screen.getByLabelText(/Tapahtuma on ilmainen/)).toBeChecked();
    expect(screen.getByLabelText(/Hinta/)).toBeDisabled();
    expect(screen.getByLabelText(/Lisätiedot/)).toBeDisabled();

    userEvent.click(screen.getByLabelText(/Tapahtuma on ilmainen/));

    expect(screen.getByLabelText(/Tapahtuma on ilmainen/)).not.toBeChecked();
    expect(screen.getByLabelText(/Hinta/)).not.toBeDisabled();
    expect(screen.getByLabelText(/Lisätiedot/)).not.toBeDisabled();

    // to avoid "An update to Formik inside a test was not wrapped in act(...).""
    await screen.findByLabelText(/Tapahtuma on ilmainen/);
  });

  test.each(['15 euroa', 'kysy tarjousta', '9.99', '9,99'])(
    'price field allows a free text',
    async (testText) => {
      render(<CreateEventPage />, { mocks });
      await screen.findByLabelText(/Tapahtuma on ilmainen/);
      userEvent.click(screen.getByLabelText(/Tapahtuma on ilmainen/));
      userEvent.type(screen.getByLabelText(/Hinta/), testText);
      userEvent.tab();
      await waitFor(() => {
        expect(screen.getByTestId('event-form')).toHaveFormValues({
          price: testText,
        });
      });
    }
  );

  test('price field in a required field when is free is not checked', async () => {
    render(<CreateEventPage />, { mocks });
    await screen.findByLabelText(/Tapahtuma on ilmainen/);
    userEvent.click(screen.getByLabelText(/Tapahtuma on ilmainen/));
    expect(
      screen.queryByText(/Tämä kenttä on pakollinen/i)
    ).not.toBeInTheDocument();
    userEvent.type(screen.getByLabelText(/Hinta/), '');
    userEvent.tab();
    await waitFor(() => {
      expect(
        screen.getByText(/Tämä kenttä on pakollinen/i)
      ).toBeInTheDocument();
    });
  });
});

describe('Language selection', () => {
  const transletableFieldLabels = [
    /^Tapahtuman nimi/,
    /^Lyhyt kuvaus \(korkeintaan 160 merkkiä\)/,
    // /^Kuvaus/, // FIXME: Not working since changed to a TextEditor
    /^WWW-osoite, josta saa lisätietoja tapahtumasta/,
    /^Lisätiedot/,
  ];

  beforeEach(() => {
    jest.resetModules();
  });

  it('has Finnish, Swedish and English as language options', async () => {
    render(<CreateEventPage />, { mocks });
    const languageSelector = await screen.findByTestId(
      formLanguageSelectorTestId
    );
    within(languageSelector).getByText(/Valitse lomakkeen kieliversiot/i);
    // Finnish should be selected by default
    expect(within(languageSelector).getByLabelText(/suomi/i)).toBeChecked();
    // Rest of the langauges should be unchecked by default
    expect(
      within(languageSelector).getByLabelText(/ruotsi/i)
    ).not.toBeChecked();
    expect(
      within(languageSelector).getByLabelText(/englanti/i)
    ).not.toBeChecked();
  });

  test('transletable fields appears in selected languages', async () => {
    render(<CreateEventPage />, { mocks });
    const languageSelector = await screen.findByTestId(
      formLanguageSelectorTestId
    );
    // Select Swedish (with Finnish that is already selected)
    userEvent.click(within(languageSelector).getByLabelText(/ruotsi/i));

    transletableFieldLabels.forEach((labelText) => {
      screen.getByLabelText(new RegExp(labelText.source + / \(FI\)/.source));
      screen.getByLabelText(new RegExp(labelText.source + / \(SV\)/.source));
    });

    // Unselect Finnish
    userEvent.click(within(languageSelector).getByLabelText(/suomi/i));
    transletableFieldLabels.forEach((labelText) => {
      expect(
        screen.queryByLabelText(new RegExp(labelText.source + / \(FI\)/.source))
      ).not.toBeInTheDocument();
    });
  });

  /*
    FIXME: It would be better to spy on method that manipulates values 
    and check that the values of unselect language are empty.
    Doing so would make the unit test faster and smaller 
    and it would test the right spot.
    It could be achieved by doing something like this:
    ```
      const omitUnselectedLanguagesFromValuesSpy = jest.spyOn(
        Utils,
        'omitUnselectedLanguagesFromValues'
      );
      // ...
      // Check the spyOn return values https://github.com/facebook/jest/issues/3821
      expect(omitUnselectedLanguagesFromValuesSpy).toHaveBeenCalled();
      expect(
        omitUnselectedLanguagesFromValuesSpy.results[0].name.fi
      ).toHaveValue();
      expect(omitUnselectedLanguagesFromValuesSpy.results[0].name.sv).toHaveValue(
        ''
      );
    ```
  */
  test('filled fields for unselected languages are cleared when submitting the form', async () => {
    const genericSwedishValue = 'SV translation';

    const { history } = render(<CreateEventPage />, {
      mocks: mocks,
    });

    const historyPush = jest.spyOn(history, 'push');

    await fillForm(defaultFormData as unknown as CreateEventFormFields);

    const languageSelector = await screen.findByTestId(
      formLanguageSelectorTestId
    );
    // Select Swedish (with Finnish that is already selected)
    userEvent.click(within(languageSelector).getByLabelText(/ruotsi/i));

    // Populate Swedish fields
    transletableFieldLabels.forEach((labelText) => {
      userEvent.type(
        screen.getByLabelText(new RegExp(labelText.source + / \(SV\)/.source)),
        genericSwedishValue
      );
    });

    // Unselect Swedish which was a newly filled field
    userEvent.click(within(languageSelector).getByLabelText(/ruotsi/i));

    // Submit the form and the Swedish values should not be sent
    userEvent.click(
      screen.getByRole('button', {
        name: 'Tallenna ja siirry tapahtuma-aikoihin',
      })
    );

    // Test that filling the Swedish fields did not change the posted variables.
    // Unselecting the language after filling should have cleared the input values.
    await waitFor(() => {
      expect(historyPush).toHaveBeenCalledWith({
        pathname: `/fi${ROUTES.CREATE_OCCURRENCE.replace(
          ':id',
          'palvelutarjotin:afz52lpyta'
        )}`,
      });
    });
  }, 100_000);

  Object.entries({
    fi: ['fi', 'en', 'sv'],
    sv: ['sv', 'fi', 'en'],
    en: ['en', 'fi', 'sv'],
  }).forEach(([locale, languageOrder]) => {
    it(`renders current UI language (${locale}) first when translatable fields are rendered`, async () => {
      // mock ui language
      jest.spyOn(useLocale, 'default').mockReturnValue(locale as Language);
      render(<CreateEventPage />, {
        mocks: mocks,
      });
      const languageSelector = await screen.findByTestId(
        formLanguageSelectorTestId
      );
      // Select all 3 languages
      userEvent.click(within(languageSelector).getByLabelText(/ruotsi/i));
      userEvent.click(within(languageSelector).getByLabelText(/englanti/i));

      transletableFieldLabels.forEach((labelText) => {
        const labels = screen.getAllByText(labelText);
        const inputNames = labels.map((label) => label.getAttribute('for'));
        const inputLangOrder = inputNames.map((name) => name!.split('.').pop());
        expect(inputLangOrder).toEqual(languageOrder);
      });
    });
  });
});

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

    expect(screen.getByTestId('event-form')).toHaveFormValues({
      'name.fi': eventName,
      'shortDescription.fi': shortDescription,
      'infoUrl.fi': infoUrl,
      contactEmail,
      contactPhoneNumber,
      imagePhotographerName: photographerName,
      imageAltText: photoAltText,
    });

    expect(screen.getByRole('textbox', { name: /Kuvaus/ })).toHaveTextContent(
      description
    );

    await waitFor(() => {
      expect(
        within(screen.getByTestId('contact-info')).getByLabelText(/Nimi/, {
          selector: 'button',
        })
      ).toHaveTextContent(eventOrganizationPersonName);
    });

    userEvent.type(screen.getByLabelText(/Tapahtuman nimi/), 'Testinimi');

    await screen.findByText('Sivulla on tallentamattomia muutoksia');
    await screen.findByRole('button', {
      name: /tallenna ja siirry tapahtuma-aikoihin/i,
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

  for (const value of values) {
    await dropdown.findByText(value);
  }
};

const fillForm = async (eventFormData: CreateEventFormFields) => {
  await screen.findByText(defaultOrganizationName);

  userEvent.type(
    screen.getByLabelText(/Tapahtuman nimi/),
    eventFormData.name.fi!
  );

  expect(screen.getByTestId('event-form')).toHaveFormValues({
    'name.fi': eventFormData.name.fi,
  });

  userEvent.type(
    screen.getByLabelText(/lyhyt kuvaus/i),
    eventFormData.shortDescription.fi!
  );

  expect(screen.getByTestId('event-form')).toHaveFormValues({
    'name.fi': eventFormData.name.fi,
    'shortDescription.fi': eventFormData.shortDescription.fi,
  });
  const editor = screen.getByRole('textbox', { name: /Kuvaus/ });
  pasteToTextEditor(editor, eventFormData.description.fi!);
  editor.blur();

  userEvent.type(
    screen.getByLabelText(
      'WWW-osoite, josta saa lisätietoja tapahtumasta (FI)'
    ),
    eventFormData.infoUrl.fi!
  );

  userEvent.click(
    screen.getByLabelText(
      /Lisätietojen syöttäminen on ilmoittautujalle pakollista/
    )
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

  const contactInfoPart = within(screen.getByTestId('contact-info'));

  userEvent.click(
    contactInfoPart.getByLabelText(/Nimi/, {
      selector: 'button',
    })
  );

  userEvent.click(contactInfoPart.getByRole('option', { name: personName }));

  // email and name should automatically populate after choosing name from dropdown
  await waitFor(() => {
    expect(screen.getByLabelText('Sähköpostiosoite')).toHaveValue(contactEmail);
    expect(screen.getByLabelText('Puhelinnumero')).toHaveValue(
      contactPhoneNumber
    );
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
};
