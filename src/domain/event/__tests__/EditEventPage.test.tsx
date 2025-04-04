import { MockedResponse } from '@apollo/client/testing';
import { screen, waitFor, within } from '@testing-library/react';
import * as React from 'react';
import * as Router from 'react-router-dom';
import { vi } from 'vitest';

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
  personName,
  photoAltText,
  photographerName,
  shortDescription,
} from '../../../test/EventPageTestUtil';
import { Language } from '../../../types';
import { renderWithRoute } from '../../../utils/testUtils';
import { ROUTES } from '../../app/routes/constants';
import EditEventPage, { NAVIGATED_FROM } from '../EditEventPage';

vi.mock('../../../hooks/useLocale', async () => {
  const actual = await vi.importActual('../../../hooks/useLocale');
  return { ...actual };
});
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual };
});

afterEach(() => {
  vi.resetAllMocks();
});
vi.setSystemTime(new Date(2020, 7, 5));
const renderComponent = ({
  path = `/fi${ROUTES.EDIT_EVENT}`,
  routes = [`/fi${ROUTES.EDIT_EVENT.replace(':id', eventId)}`],
  mocks = editMocks,
}: {
  mocks?: MockedResponse[];
  routes?: string[];
  path?: string;
} = {}) => {
  return renderWithRoute(<EditEventPage />, {
    mocks,
    routes,
    path,
  });
};

test('edit event form initializes and submits correctly', async () => {
  const navigate = vi.fn();
  vi.spyOn(Router, 'useNavigate').mockImplementation(() => navigate);
  const { user } = renderComponent();

  await waitFor(() =>
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
  );
  await waitFor(() => {
    expect(screen.getByTestId('event-form')).toHaveFormValues({
      'name.fi': eventName,
      'shortDescription.fi': shortDescription,
      'infoUrl.fi': infoUrl,
      contactEmail: contactEmail,
      contactPhoneNumber: contactPhoneNumber,
      imagePhotographerName: photographerName,
      imageAltText: photoAltText,
    });
  });
  await screen.findByText(defaultOrganizationName);
  await screen.findByText(keyword);
  const nameField = await screen.findByRole('textbox', {
    name: /tapahtuman nimi \(fi\)/i,
  });
  await waitFor(() => expect(nameField).toHaveValue(eventName));

  await waitFor(() =>
    expect(screen.getByLabelText(/Kuvaus/)).toHaveTextContent(description)
  );

  await waitFor(() => {
    expect(
      screen.getByLabelText(
        /Lisätietojen syöttäminen on ilmoittautujalle pakollista/
      )
    ).toBeChecked();
  });

  const contactInfo = await screen.findByTestId('contact-info');
  await waitFor(() => {
    expect(
      within(contactInfo).getByLabelText(/Nimi/, { selector: 'button' })
    ).toHaveTextContent(personName);
  });

  await user.clear(nameField);
  await waitFor(() => expect(nameField).toHaveValue(''));
  await user.type(nameField, 'Testinimi');
  await waitFor(() => expect(nameField).toHaveValue('Testinimi'));

  await screen.findByText('Sivulla on tallentamattomia muutoksia');

  await user.click(
    await screen.findByRole('button', {
      name: 'Päivitä tiedot',
    })
  );

  await waitFor(
    () => {
      expect(navigate).toHaveBeenCalled();
    },
    { timeout: 5_000 }
  );
}, 20_000);

test('returns to create occurrences page when it should after saving', async () => {
  const navigate = vi.fn();
  vi.spyOn(Router, 'useNavigate').mockImplementation(() => navigate);

  const { user } = renderComponent({
    routes: [
      `/fi${ROUTES.EDIT_EVENT.replace(':id', eventId)}?navigatedFrom=${
        NAVIGATED_FROM.OCCURRENCES
      }`,
    ],
  });
  await waitFor(() =>
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
  );

  await screen.findByText(defaultOrganizationName);
  const nameField = await screen.findByRole('textbox', {
    name: /tapahtuman nimi \(fi\)/i,
  });
  await user.type(nameField, 'fixme'); // FIXME: https://github.com/testing-library/user-event/discussions/970
  await user.clear(nameField);
  await waitFor(() => expect(nameField).toHaveValue(''));
  await user.type(nameField, 'Testinimi');
  await waitFor(() => expect(nameField).toHaveValue('Testinimi'));

  await screen.findByText('Sivulla on tallentamattomia muutoksia');

  await user.click(
    await screen.findByRole('button', {
      name: 'Päivitä tiedot',
    })
  );
  await waitFor(
    () => {
      expect(navigate).toHaveBeenCalledWith(
        `/fi/events/${eventId}/occurrences/create`,
        expect.anything()
      );
    },
    { timeout: 5_000 }
  );
}, 20_000);

describe('Event price section', () => {
  test('price field is accessible only when isFree field is not checked', async () => {
    const { user } = renderComponent();

    const isFree = await screen.findByLabelText(/Tapahtuma on ilmainen/);
    await waitFor(() => expect(isFree).toBeChecked());
    const price = await screen.findByLabelText(/Hinta/);
    await waitFor(() => expect(price).toBeDisabled());
    const extraInfo = await screen.findByLabelText(/Lisätiedot/);
    await waitFor(() => expect(extraInfo).toBeDisabled());

    await user.click(isFree);

    await waitFor(() => expect(price).toBeEnabled());
    await waitFor(() => expect(extraInfo).toBeEnabled());
    await waitFor(() => expect(isFree).not.toBeChecked());
  });
});

describe('Language selection', () => {
  const translatableFieldLabels = [
    /^Tapahtuman nimi/,
    /^Lyhyt kuvaus \(korkeintaan 160 merkkiä\)/,
    /^Kuvaus/,
    /^WWW-osoite, josta saa lisätietoja tapahtumasta/,
    /^Lisätiedot/,
  ];

  const fiLabel = (label: RegExp) => new RegExp(`${label.source} \\(FI\\)`);
  const svLabel = (label: RegExp) => new RegExp(`${label.source} \\(SV\\)`);

  const getLanguageCheckboxes = async () => {
    const languageSelector = await screen.findByTestId(
      formLanguageSelectorTestId
    );
    await within(languageSelector).findByText(
      /Valitse lomakkeen kieliversiot/i
    );
    const fi = await within(languageSelector).findByRole('checkbox', {
      name: /suomi/i,
    });
    const sv = await within(languageSelector).findByRole('checkbox', {
      name: /ruotsi/i,
    });
    const en = await within(languageSelector).findByRole('checkbox', {
      name: /englanti/i,
    });
    return { fi, sv, en };
  };

  beforeEach(() => {
    vi.resetModules();
  });

  it('has Finnish, Swedish and English as language options', async () => {
    renderComponent();
    const { fi, sv, en } = await getLanguageCheckboxes();

    // Only Finnish should be selected by default
    await waitFor(() => expect(fi).toBeChecked());
    await waitFor(() => expect(sv).not.toBeChecked());
    await waitFor(() => expect(en).not.toBeChecked());
  });

  test('translatable fields appear in selected languages', async () => {
    const timeout = { timeout: 2_000 } as const;
    const { user } = renderComponent();
    const { fi, sv } = await getLanguageCheckboxes();

    // Select Swedish (with Finnish that is already selected)
    await user.click(sv);
    await waitFor(() => expect(fi).toBeChecked(), timeout);
    await waitFor(() => expect(sv).toBeChecked(), timeout);

    for (const label of translatableFieldLabels) {
      await screen.findByLabelText(fiLabel(label));
      await screen.findByLabelText(svLabel(label));
    }

    // Unselect Finnish
    await user.click(fi);
    await waitFor(() => expect(fi).not.toBeChecked(), timeout);
    await waitFor(() => expect(sv).toBeChecked(), timeout);

    for (const label of translatableFieldLabels) {
      await waitFor(() => {
        expect(screen.queryByLabelText(fiLabel(label))).not.toBeInTheDocument();
      }, timeout);
      await screen.findByLabelText(svLabel(label));
    }
  }, 30_000);

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
    NOTE: CreateEventPAge testes this too, but there all the fields are newly filled and not presaved.
  */
  test.skip('filled fields for unselected languages are cleared when submitting the form', async () => {
    const navigate = vi.fn();
    vi.spyOn(Router, 'useNavigate').mockImplementation(() => navigate);
    const genericSwedishValue = 'SV translation';

    const { user } = renderComponent();
    await waitFor(() =>
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
    );
    const nameField = await screen.findByRole('textbox', {
      name: /tapahtuman nimi \(fi\)/i,
    });
    const languageSelector = await screen.findByTestId(
      formLanguageSelectorTestId
    );
    const sv = await within(languageSelector).findByRole('checkbox', {
      name: /ruotsi/i,
    });

    await user.clear(nameField);
    await waitFor(() => expect(nameField).toHaveValue(''));
    await user.type(nameField, 'Testinimi');
    await waitFor(() => expect(nameField).toHaveValue('Testinimi'));

    await waitFor(() => expect(sv).not.toBeChecked());

    // Select Swedish (with Finnish that is already selected)
    await user.click(sv);
    await waitFor(() => expect(sv).toBeChecked());

    // Populate Swedish fields
    for (const labelText of translatableFieldLabels) {
      const field = await screen.findByLabelText(
        new RegExp(labelText.source + / \(SV\)/.source)
      );
      await user.type(field, genericSwedishValue);
    }
    // Unselect Swedish which was a newly filled field
    await user.click(sv);

    await waitFor(() => expect(sv).not.toBeChecked());

    await user.click(
      await screen.findByRole('button', {
        name: 'Päivitä tiedot',
      })
    );

    // Test against mocked return value
    // that filling the Swedish fields did not change the posted variables.
    // Unselecting the language after filling should have cleared the input values.
    await waitFor(() => expect(navigate).toHaveBeenCalled());
  });

  it.each([
    ['fi', ['fi', 'en', 'sv']],
    ['sv', ['sv', 'fi', 'en']],
    ['en', ['en', 'fi', 'sv']],
  ])(
    `renders current UI language (%s) first when translatable fields are rendered`,
    async (locale, languageOrder) => {
      // mock ui language
      vi.spyOn(useLocale, 'default').mockReturnValue(locale as Language);
      const { user } = renderComponent();
      const { fi, sv, en } = await getLanguageCheckboxes();

      // Select all 3 languages. Note, Finnish is always selected, and others are not mandatory
      await waitFor(() => expect(fi).toBeChecked());
      await waitFor(() => expect(sv).not.toBeChecked());
      await waitFor(() => expect(en).not.toBeChecked());
      await user.click(en);
      await waitFor(() => expect(en).toBeChecked());
      await user.click(sv);
      await waitFor(() => expect(sv).toBeChecked());

      for (const labelText of translatableFieldLabels) {
        const labels = await screen.findAllByText(labelText);
        await waitFor(() => {
          const inputNames = labels.map((label) => label.getAttribute('for'));
          const inputLangOrder = inputNames.map((name) =>
            name?.split('.').pop()
          );
          expect(inputLangOrder).toEqual(languageOrder);
        });
      }
    }
  );
});
