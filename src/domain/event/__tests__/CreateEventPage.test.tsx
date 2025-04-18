import { ApolloClient } from '@apollo/client';
import {
  configure,
  fireEvent,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as HdsReact from 'hds-react';
import * as React from 'react';
import * as Router from 'react-router';
import { vi } from 'vitest';

import { AUTOSUGGEST_OPTIONS_AMOUNT } from '../../../common/components/autoSuggest/contants';
import { formLanguageSelectorTestId } from '../../../common/components/formLanguageSelector/FormLanguageSelector';
import {
  createEmptyLocalizedObject,
  LINKEDEVENTS_CONTENT_TYPE,
} from '../../../constants';
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
import { footerMenuMock } from '../../../test/apollo-mocks/footerMenuMock';
import { headerMenuMock } from '../../../test/apollo-mocks/headerMenuMock';
import { getKeywordSetsMockResponses } from '../../../test/apollo-mocks/keywordSetMocks';
import { languagesMock } from '../../../test/apollo-mocks/languagesMock';
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
  eventOrganizationPersonName,
  getKeywordId,
  infoUrl,
  keyword,
  keywordId,
  organisationId,
  personName,
  photoAltText,
  photographerName,
  placeId,
  placeName,
  profileResponse,
  shortDescription,
} from '../../../test/EventPageTestUtil';
import { Language } from '../../../types';
import getLinkedEventsInternalId from '../../../utils/getLinkedEventsInternalId';
import {
  fakeEvent,
  fakeImage,
  fakeKeyword,
  fakeKeywords,
  fakeLocalizedObject,
  fakePlace,
  fakePlaces,
} from '../../../utils/mockDataUtils';
import { pasteToTextEditor, customRender } from '../../../utils/testUtils';
import { ROUTES } from '../../app/routes/constants';
import CreateEventPage from '../CreateEventPage';
import { CreateEventFormFields } from '../types';

vi.mock('hds-react', async () => {
  const actual = await vi.importActual('hds-react');
  return {
    ...actual,
  };
});

vi.mock('../../../hooks/useLocale', async () => {
  const actual = await vi.importActual('../../../hooks/useLocale');
  return {
    ...actual,
    default: () => 'fi',
  };
});

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return { ...actual };
});

afterEach(() => {
  vi.clearAllMocks();
});

const navigate = vi.fn();
beforeEach(() => {
  vi.spyOn(Router, 'useParams').mockImplementation(() => ({}) as any);
  vi.spyOn(Router, 'useNavigate').mockImplementation(() => navigate);
});
configure({ defaultHidden: true });
vi.setSystemTime(new Date(2020, 7, 8));

const imageId = '48584';
const imageFile = new File(['(⌐□_□)'], 'palvelutarjotin.png', {
  type: 'image/png',
});
const imageAltText = 'AltText';

const partialDefaultFormData: Omit<
  CreateEventFormFields,
  | 'additionalCriteria'
  | 'audience'
  | 'categories'
  | 'contactPersonId'
  | 'image'
  | 'inLanguage'
  | 'isFree'
  | 'isQueueingAllowed'
  | 'keywords'
  | 'mandatoryAdditionalInformation'
  | 'price'
  | 'priceDescription'
> = {
  name: createFinnishLocalisedObject(eventName, true),
  shortDescription: createFinnishLocalisedObject(shortDescription, true),
  description: createFinnishLocalisedObject(description, true),
  infoUrl: createFinnishLocalisedObject(infoUrl, true),
  contactEmail: 'testi@testi.fi',
  contactPhoneNumber: '123123123',
  imagePhotographerName: 'Valo Valokuvaaja',
  imageAltText: 'Vaihtoehtoinen kuvateksti',
};

const createEventVariables = {
  event: {
    name: partialDefaultFormData.name,
    startTime: '2020-08-07T21:00:00.000Z',
    offers: [
      {
        price: createEmptyLocalizedObject(),
        description: createEmptyLocalizedObject(),
        isFree: true,
      },
    ],
    shortDescription: partialDefaultFormData.shortDescription,
    description: createFinnishLocalisedObject(descriptionEditorHTML, true),
    images: [
      {
        internalId: getLinkedEventsInternalId(
          LINKEDEVENTS_CONTENT_TYPE.IMAGE,
          imageId
        ),
      },
    ],
    infoUrl: partialDefaultFormData.infoUrl,
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
    pEvent: {
      contactEmail: partialDefaultFormData.contactEmail,
      contactPersonId: contactPersonId,
      contactPhoneNumber: contactPhoneNumber,
      neededOccurrences: 1,
      mandatoryAdditionalInformation: true,
      isQueueingAllowed: true,
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
  { ...footerMenuMock },
  { ...headerMenuMock },
  { ...languagesMock },
];

const testMultiDropdownValues = async ({
  dropdownTestId,
  dropdownLabel,
  values,
}: {
  dropdownTestId: string;
  dropdownLabel: RegExp | string;
  values: string[];
}) => {
  await userEvent.click(
    await screen.findByLabelText(dropdownLabel, { selector: 'button' })
  );

  for (const value of values) {
    await userEvent.click(await screen.findByRole('option', { name: value }));
  }
  await userEvent.click(
    await screen.findByLabelText(dropdownLabel, { selector: 'button' })
  );

  const dropdown = within(await screen.findByTestId(dropdownTestId));

  for (const value of values) {
    await dropdown.findByText(value);
  }
};

const fillForm = async (eventFormData: typeof partialDefaultFormData) => {
  await screen.findByText(defaultOrganizationName);

  await userEvent.type(
    await screen.findByLabelText(/Tapahtuman nimi/),
    eventFormData.name.fi!
  );

  const eventForm = await screen.findByTestId('event-form');
  await waitFor(() => {
    expect(eventForm).toHaveFormValues({
      'name.fi': eventFormData.name.fi,
    });
  });

  await userEvent.type(
    await screen.findByLabelText(/lyhyt kuvaus/i),
    eventFormData.shortDescription.fi!
  );

  await waitFor(() => {
    expect(eventForm).toHaveFormValues({
      'name.fi': eventFormData.name.fi,
      'shortDescription.fi': eventFormData.shortDescription.fi,
    });
  });
  const editor = await screen.findByRole('textbox', { name: /Kuvaus/ });
  pasteToTextEditor(editor, eventFormData.description.fi!);
  editor.blur();

  await userEvent.type(
    await screen.findByLabelText(
      'WWW-osoite, josta saa lisätietoja tapahtumasta (FI)'
    ),
    eventFormData.infoUrl.fi!
  );

  await userEvent.click(
    await screen.findByLabelText(
      /Lisätietojen syöttäminen on ilmoittautujalle pakollista/
    )
  );

  // image input should disappear after adding image
  const imageInput = await screen.findByLabelText('Tapahtuman kuva');
  await screen.findByRole('button', { name: 'Lisää kuva' });

  fireEvent.change(imageInput, { target: { files: [imageFile] } });
  await screen.findByAltText(imageAltText);

  await waitFor(() => {
    expect(
      screen.queryByRole('button', { name: 'Lisää kuva' })
    ).not.toBeInTheDocument();
  });

  await userEvent.type(
    await screen.findByLabelText(/Valokuvaaja/),
    eventFormData.imagePhotographerName
  );
  await userEvent.type(
    await screen.findByLabelText(/Kuvan alt-teksti/),
    eventFormData.imageAltText
  );
  await userEvent.type(
    await screen.findByLabelText(/Sähköpostiosoite/),
    eventFormData.contactEmail
  );
  await userEvent.type(
    await screen.findByLabelText(/Puhelinnumero/),
    eventFormData.contactPhoneNumber
  );

  await waitFor(() => {
    expect(eventForm).toHaveFormValues({
      contactPhoneNumber: eventFormData.contactPhoneNumber,
      contactEmail: eventFormData.contactEmail,
    });
  });

  const contactInfoPart = within(await screen.findByTestId('contact-info'));

  await userEvent.click(
    await contactInfoPart.findByLabelText(/Nimi/, {
      selector: 'button',
    })
  );

  await userEvent.click(
    await contactInfoPart.findByRole('option', { name: personName })
  );

  // email and name should automatically populate after choosing name from dropdown
  const emailElement = await screen.findByLabelText('Sähköpostiosoite');
  await waitFor(() => expect(emailElement).toHaveValue(contactEmail));
  const phoneElement = await screen.findByLabelText('Puhelinnumero');
  await waitFor(() => expect(phoneElement).toHaveValue(contactPhoneNumber));

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

  vi.spyOn(ApolloClient.prototype, 'readQuery').mockReturnValueOnce(
    keywordResponse
  );

  const keywordsInput = await screen.findByLabelText(/Tapahtuman avainsanat/);
  await userEvent.click(keywordsInput);
  await userEvent.type(keywordsInput, 'perheet');

  const familyCategory = await screen.findByText(/perheet/i);
  await userEvent.click(familyCategory);
};

test('event can be created with form', async () => {
  vi.spyOn(HdsReact, 'useOidcClient').mockImplementation(
    () =>
      ({
        isAuthenticated: () => true,
        isRenewing: () => false,
      }) as any
  );
  vi.spyOn(Router, 'useParams').mockReturnValue({});
  vi.setSystemTime(new Date(2020, 7, 8));
  customRender(<CreateEventPage />, { mocks });

  await fillForm(partialDefaultFormData);
  await screen.findByText('Sivulla on tallentamattomia muutoksia');

  const saveButton = await screen.findByRole('button', {
    name: 'Tallenna ja siirry tapahtuma-aikoihin',
  });

  expect(saveButton.getAttribute('disabled')).toBeFalsy();
  await userEvent.click(saveButton);

  await waitFor(() => {
    expect(navigate).toHaveBeenCalledWith(
      {
        pathname: `/fi${ROUTES.CREATE_OCCURRENCE.replace(
          ':id',
          'palvelutarjotin:afz52lpyta'
        )}`,
      },
      expect.anything()
    );
  });
}, /* seems 100s wasn't enough, let's try 150s */ 150_000);

describe('Event price section', () => {
  test('price field is accessible only when isFree field is not checked', async () => {
    customRender(<CreateEventPage />, { mocks });
    await screen.findByLabelText(/Tapahtuma on ilmainen/);

    expect(screen.getByLabelText(/Tapahtuma on ilmainen/)).toBeChecked();
    expect(screen.getByLabelText(/Hinta/)).toBeDisabled();
    expect(screen.getByLabelText(/Lisätiedot/)).toBeDisabled();

    await userEvent.click(screen.getByLabelText(/Tapahtuma on ilmainen/));

    expect(screen.getByLabelText(/Tapahtuma on ilmainen/)).not.toBeChecked();
    expect(screen.getByLabelText(/Hinta/)).toBeEnabled();
    expect(screen.getByLabelText(/Lisätiedot/)).toBeEnabled();

    // to avoid "An update to Formik inside a test was not wrapped in act(...).""
    await screen.findByLabelText(/Tapahtuma on ilmainen/);
  });

  test.each(['15 euroa', 'kysy tarjousta', '9.99', '9,99'])(
    'price field allows a free text',
    async (testText) => {
      customRender(<CreateEventPage />, { mocks });
      await screen.findByLabelText(/Tapahtuma on ilmainen/);
      await userEvent.click(screen.getByLabelText(/Tapahtuma on ilmainen/));
      await userEvent.type(screen.getByLabelText(/Hinta/), testText);
      await userEvent.tab();
      await waitFor(() => {
        expect(screen.getByTestId('event-form')).toHaveFormValues({
          price: testText,
        });
      });
    }
  );

  test('price field in a required field when is free is not checked', async () => {
    customRender(<CreateEventPage />, { mocks });
    const freeEvent = await screen.findByLabelText(/Tapahtuma on ilmainen/);
    await userEvent.click(freeEvent);
    expect(
      screen.queryByText(/Tämä kenttä on pakollinen/i)
    ).not.toBeInTheDocument();
    await userEvent.clear(screen.getByLabelText(/Hinta/));
    await userEvent.tab();
    expect(
      await screen.findByText(/Tämä kenttä on pakollinen/i)
    ).toBeInTheDocument();
  });
});

describe('Language selection', () => {
  const translatableFieldLabels = [
    /^Tapahtuman nimi/,
    /^Lyhyt kuvaus \(korkeintaan 160 merkkiä\)/,
    // /^Kuvaus/, // FIXME: Not working since changed to a TextEditor
    /^WWW-osoite, josta saa lisätietoja tapahtumasta/,
    /^Lisätiedot/,
  ];

  beforeEach(() => {
    vi.resetModules();
  });

  it('has Finnish, Swedish and English as language options', async () => {
    customRender(<CreateEventPage />, { mocks });
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

  test('translatable fields appears in selected languages', async () => {
    customRender(<CreateEventPage />, { mocks });
    const languageSelector = await screen.findByTestId(
      formLanguageSelectorTestId
    );
    // Select Swedish (with Finnish that is already selected)
    await userEvent.click(within(languageSelector).getByLabelText(/ruotsi/i));

    for (const labelText of translatableFieldLabels) {
      await screen.findByLabelText(
        new RegExp(labelText.source + / \(FI\)/.source)
      );
      await screen.findByLabelText(
        new RegExp(labelText.source + / \(SV\)/.source)
      );
    }
    // Unselect Finnish
    await userEvent.click(within(languageSelector).getByLabelText(/suomi/i));
    for (const labelText of translatableFieldLabels) {
      await waitFor(() => {
        expect(
          screen.queryByLabelText(
            new RegExp(labelText.source + / \(FI\)/.source)
          )
        ).not.toBeInTheDocument();
      });
    }
  });

  /*
    FIXME: It would be better to spy on method that manipulates values
    and check that the values of unselect language are empty.
    Doing so would make the unit test faster and smaller
    and it would test the right spot.
    It could be achieved by doing something like this:
    ```
      const omitUnselectedLanguagesFromValuesSpy = vi.spyOn(
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
  test.skip('filled fields for unselected languages are cleared when submitting the form', async () => {
    const genericSwedishValue = 'SV translation';

    customRender(<CreateEventPage />, {
      mocks: mocks,
    });

    await fillForm(partialDefaultFormData);

    const languageSelector = await screen.findByTestId(
      formLanguageSelectorTestId
    );
    // Select Swedish (with Finnish that is already selected)
    await userEvent.click(within(languageSelector).getByLabelText(/ruotsi/i));

    // Populate Swedish fields
    for (const labelText of translatableFieldLabels) {
      const field = await screen.findByLabelText(
        new RegExp(labelText.source + / \(SV\)/.source)
      );
      await userEvent.type(field, genericSwedishValue);
    }

    // Unselect Swedish which was a newly filled field
    await userEvent.click(within(languageSelector).getByLabelText(/ruotsi/i));

    // Submit the form and the Swedish values should not be sent
    await userEvent.click(
      screen.getByRole('button', {
        name: 'Tallenna ja siirry tapahtuma-aikoihin',
      })
    );
    // Test that filling the Swedish fields did not change the posted variables.
    // Unselecting the language after filling should have cleared the input values.
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith({
        pathname: `/fi${ROUTES.CREATE_OCCURRENCE.replace(
          ':id',
          'palvelutarjotin:afz52lpyta'
        )}`,
      });
    });
  }, 100_000);

  it.each([
    ['fi', ['fi', 'en', 'sv']],
    ['sv', ['sv', 'fi', 'en']],
    ['en', ['en', 'fi', 'sv']],
  ])(
    `renders current UI language (%s) first when translatable fields are rendered`,
    async (locale, languageOrder) => {
      // mock ui language
      vi.spyOn(useLocale, 'default').mockImplementation(
        () => locale as Language
      );
      customRender(<CreateEventPage />, {
        mocks: mocks,
      });
      const languageSelector = await screen.findByTestId(
        formLanguageSelectorTestId
      );
      // Select all 3 languages
      await userEvent.click(
        await within(languageSelector).findByLabelText(/ruotsi/i)
      );
      await userEvent.click(
        await within(languageSelector).findByLabelText(/englanti/i)
      );

      for (const labelText of translatableFieldLabels) {
        const labels = await screen.findAllByText(labelText);
        await waitFor(() => {
          const inputNames = labels.map((label) => label.getAttribute('for'));
          const inputLangOrder = inputNames.map((name) =>
            name!.split('.').pop()
          );
          expect(inputLangOrder).toEqual(languageOrder);
        });
      }
    }
  );
});

describe('Copy event', () => {
  beforeEach(() => {
    vi.spyOn(Router, 'useParams').mockReturnValue({
      id: eventId,
    });
    vi.setSystemTime(new Date(2020, 7, 5));
  });

  it('initializes copied event correctly', async () => {
    customRender(<CreateEventPage />, {
      mocks: editMocks,
    });

    await waitFor(() =>
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
    );
    await screen.findByText(defaultOrganizationName);
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

    await userEvent.type(screen.getByLabelText(/Tapahtuman nimi/), 'Testinimi');

    await screen.findByText('Sivulla on tallentamattomia muutoksia');
    await screen.findByRole('button', {
      name: /tallenna ja siirry tapahtuma-aikoihin/i,
    });
  });
});
