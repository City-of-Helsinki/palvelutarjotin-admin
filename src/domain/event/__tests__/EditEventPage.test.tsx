/* eslint-disable @typescript-eslint/no-explicit-any */
import userEvent from '@testing-library/user-event';
import { advanceTo } from 'jest-date-mock';
import * as React from 'react';
import Router from 'react-router';

import { formLanguageSelectorTestId } from '../../../common/components/formLanguageSelector/FormLanguageSelector';
import * as useLocale from '../../../hooks/useLocale';
import {
  contactEmail,
  contactPhoneNumber,
  defaultOrganizationName,
  description,
  editMocks,
  eventId,
  eventName,
  infoUrl,
  keyword,
  keywordId,
  keywordMockResponse,
  personName,
  photoAltText,
  photographerName,
  shortDescription,
  venueQueryResponse,
} from '../../../test/EventPageTestUtil';
import { Language } from '../../../types';
import { render, screen, waitFor, within } from '../../../utils/testUtils';
import apolloClient from '../../app/apollo/apolloClient';
import EditEventPage, { NAVIGATED_FROM } from '../EditEventPage';

beforeEach(() => {
  jest.spyOn(Router, 'useParams').mockReturnValue({
    id: eventId,
  });
});

jest
  .spyOn(apolloClient, 'readQuery')
  .mockImplementation(({ variables }: any) => {
    if (variables.id === keywordId) {
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
  const { history } = render(<EditEventPage />, { mocks: editMocks });

  const goBack = jest.spyOn(history, 'goBack');

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });
  await screen.findByText(defaultOrganizationName);
  await screen.findByText(keyword);

  expect(screen.getByLabelText(/Tapahtuman nimi/i)).toHaveValue(eventName);

  expect(screen.getByTestId('event-form')).toHaveFormValues({
    'name.fi': eventName,
    'shortDescription.fi': shortDescription,
    'infoUrl.fi': infoUrl,
    contactEmail: contactEmail,
    contactPhoneNumber: contactPhoneNumber,
    imagePhotographerName: photographerName,
    imageAltText: photoAltText,
  });

  expect(screen.getByLabelText(/Kuvaus/)).toHaveTextContent(description);

  expect(
    screen.getByLabelText(
      /Lisätietojen syöttäminen on ilmoittautujalle pakollista/
    )
  ).toBeChecked();

  const contactInfo = within(screen.getByTestId('contact-info'));
  expect(
    contactInfo.getByLabelText(/Nimi/, { selector: 'button' })
  ).toHaveTextContent(personName);

  userEvent.type(screen.getByLabelText(/Tapahtuman nimi/), 'Testinimi');

  await screen.findByText('Sivulla on tallentamattomia muutoksia');

  userEvent.click(
    screen.getByRole('button', {
      name: 'Päivitä tiedot',
    })
  );

  await waitFor(
    () => {
      expect(goBack).toHaveBeenCalled();
    },
    { timeout: 5000 }
  );
});

test('returns to create occurrences page when it should after saving', async () => {
  jest
    .spyOn(apolloClient, 'query')
    .mockResolvedValue(venueQueryResponse as any);
  const { history } = render(<EditEventPage />, {
    mocks: editMocks,
    routes: [`/moi?navigatedFrom=${NAVIGATED_FROM.OCCURRENCES}`],
  });
  const historyPush = jest.spyOn(history, 'push');

  await screen.findByText(defaultOrganizationName);

  userEvent.type(screen.getByLabelText(/Tapahtuman nimi/), 'Testinimi');

  await screen.findByText('Sivulla on tallentamattomia muutoksia');

  userEvent.click(
    screen.getByRole('button', {
      name: 'Päivitä tiedot',
    })
  );

  await waitFor(() => {
    expect(historyPush).toHaveBeenCalledWith(
      `/fi/events/${eventId}/occurrences/create`
    );
  });
});

describe('Event price section', () => {
  test('price field is accessible only when isFree field is not checked', async () => {
    render(<EditEventPage />, { mocks: editMocks });
    await screen.findByLabelText(/Tapahtuma on ilmainen/);

    expect(screen.getByLabelText(/Tapahtuma on ilmainen/)).toBeChecked();
    expect(screen.getByLabelText(/Hinta/)).toBeDisabled();
    expect(screen.getByLabelText(/Lisätiedot/)).toBeDisabled();

    userEvent.click(screen.getByLabelText(/Tapahtuma on ilmainen/));

    expect(screen.getByLabelText(/Tapahtuma on ilmainen/)).not.toBeChecked();
    expect(screen.getByLabelText(/Hinta/)).not.toBeDisabled();
    expect(screen.getByLabelText(/Lisätiedot/)).not.toBeDisabled();
  });
});

describe('Language selection', () => {
  const transletableFieldLabels = [
    /^Tapahtuman nimi/,
    /^Lyhyt kuvaus \(korkeintaan 160 merkkiä\)/,
    /^Kuvaus/,
    /^WWW-osoite, josta saa lisätietoja tapahtumasta/,
    /^Lisätiedot/,
  ];

  beforeEach(() => {
    jest.resetModules();
  });
  it('has Finnish, Swedish and English as language options', async () => {
    render(<EditEventPage />, { mocks: editMocks });
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
    render(<EditEventPage />, { mocks: editMocks });
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
    NOTE: CreateEventPAge testes this too, but there all the fields are newly filled and not presaved.
  */
  test('filled fields for unselected languages are cleared when submitting the form', async () => {
    const { history } = render(<EditEventPage />, { mocks: editMocks });
    const genericSwedishValue = 'SV translation';

    const goBack = jest.spyOn(history, 'goBack');

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
    userEvent.type(screen.getByLabelText(/Tapahtuman nimi/), 'Testinimi');

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

    userEvent.click(
      screen.getByRole('button', {
        name: 'Päivitä tiedot',
      })
    );

    // Test against mocked return value
    // that filling the Swedish fields did not change the posted variables.
    // Unselecting the language after filling should have cleared the input values.
    await waitFor(
      () => {
        expect(goBack).toHaveBeenCalled();
      },
      { timeout: 5000 }
    );
  });

  Object.entries({
    fi: ['fi', 'en', 'sv'],
    sv: ['sv', 'fi', 'en'],
    en: ['en', 'fi', 'sv'],
  }).forEach(([locale, languageOrder]) => {
    it(`renders current UI language (${locale}) first when translatable fields are rendered`, async () => {
      // mock ui language
      jest.spyOn(useLocale, 'default').mockReturnValue(locale as Language);
      render(<EditEventPage />, { mocks: editMocks });
      const languageSelector = await screen.findByTestId(
        formLanguageSelectorTestId
      );
      // Select all 3 languages
      userEvent.click(within(languageSelector).getByLabelText(/ruotsi/i));
      userEvent.click(within(languageSelector).getByLabelText(/englanti/i));

      transletableFieldLabels.forEach((labelText) => {
        const labels = screen.getAllByLabelText(labelText);
        const inputNames = labels.map((label) => label.getAttribute('id'));
        const inputLangOrder = inputNames.map((name) => name.split('.').pop());
        expect(inputLangOrder).toEqual(languageOrder);
      });
    });
  });
});
