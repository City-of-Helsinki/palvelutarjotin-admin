/* eslint-disable @typescript-eslint/no-explicit-any */
import { MockedResponse } from '@apollo/client/testing';
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
import {
  renderWithRoute,
  screen,
  waitFor,
  within,
} from '../../../utils/testUtils';
import { ROUTES } from '../../app/routes/constants';
import EditEventPage, { NAVIGATED_FROM } from '../EditEventPage';

const navigate = vi.fn();
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
  vi.spyOn(Router, 'useNavigate').mockImplementation(() => navigate);
  const { user } = renderComponent();

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });
  await screen.findByText(defaultOrganizationName);
  await screen.findByText(keyword);
  const nameField = await screen.findByRole('textbox', {
    name: /tapahtuman nimi \(fi\)/i,
  });
  expect(nameField).toHaveValue(eventName);

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

  await user.type(nameField, 'fixme'); // FIXME: https://github.com/testing-library/user-event/discussions/970
  await user.clear(nameField);
  expect(nameField).toHaveValue('');
  await user.type(nameField, 'Testinimi');
  expect(nameField).toHaveValue('Testinimi');

  await screen.findByText('Sivulla on tallentamattomia muutoksia');

  await user.click(
    await screen.findByRole('button', {
      name: 'Päivitä tiedot',
    })
  );

  await waitFor(() => {
    expect(navigate).toHaveBeenCalled();
  });
});

test('returns to create occurrences page when it should after saving', async () => {
  vi.spyOn(Router, 'useNavigate').mockImplementation(() => navigate);

  const { user } = renderComponent({
    routes: [
      `/fi${ROUTES.EDIT_EVENT.replace(':id', eventId)}?navigatedFrom=${
        NAVIGATED_FROM.OCCURRENCES
      }`,
    ],
  });

  await screen.findByText(defaultOrganizationName);
  const nameField = await screen.findByRole('textbox', {
    name: /tapahtuman nimi \(fi\)/i,
  });
  await user.type(nameField, 'fixme'); // FIXME: https://github.com/testing-library/user-event/discussions/970
  await user.clear(nameField);
  expect(nameField).toHaveValue('');
  await user.type(nameField, 'Testinimi');
  expect(nameField).toHaveValue('Testinimi');

  await screen.findByText('Sivulla on tallentamattomia muutoksia');

  await user.click(
    screen.getByRole('button', {
      name: 'Päivitä tiedot',
    })
  );

  await waitFor(() => {
    expect(navigate).toHaveBeenCalledWith(
      `/fi/events/${eventId}/occurrences/create`,
      expect.anything()
    );
  });
});

describe('Event price section', () => {
  test('price field is accessible only when isFree field is not checked', async () => {
    const { user } = renderComponent();

    await screen.findByLabelText(/Tapahtuma on ilmainen/);

    expect(await screen.findByLabelText(/Tapahtuma on ilmainen/)).toBeChecked();
    expect(await screen.findByLabelText(/Hinta/)).toBeDisabled();
    expect(await screen.findByLabelText(/Lisätiedot/)).toBeDisabled();

    await user.click(await screen.findByLabelText(/Tapahtuma on ilmainen/));

    expect(await screen.findByLabelText(/Hinta/)).not.toBeDisabled();
    expect(await screen.findByLabelText(/Lisätiedot/)).not.toBeDisabled();
    expect(
      await screen.findByLabelText(/Tapahtuma on ilmainen/)
    ).not.toBeChecked();
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
    vi.resetModules();
  });

  it('has Finnish, Swedish and English as language options', async () => {
    renderComponent();
    const languageSelector = await screen.findByTestId(
      formLanguageSelectorTestId
    );
    within(languageSelector).getByText(/Valitse lomakkeen kieliversiot/i);
    // Finnish should be selected by default
    expect(within(languageSelector).getByLabelText(/suomi/i)).toBeChecked();
    // Rest of the langauges should be unchecked by default
    expect(
      within(languageSelector).getByRole('checkbox', {
        name: /ruotsi/i,
      })
    ).not.toBeChecked();
    expect(
      within(languageSelector).getByRole('checkbox', {
        name: /englanti/i,
      })
    ).not.toBeChecked();
  });

  test('transletable fields appears in selected languages', async () => {
    const { user } = renderComponent();
    const languageSelector = await screen.findByTestId(
      formLanguageSelectorTestId
    );

    // Select Swedish (with Finnish that is already selected)
    const sv = within(languageSelector).getByRole('checkbox', {
      name: /ruotsi/i,
    });
    const fi = within(languageSelector).getByRole('checkbox', {
      name: /suomi/i,
    });
    await user.click(sv);
    expect(sv).toBeChecked();

    transletableFieldLabels.forEach((labelText) => {
      expect(
        screen.getByLabelText(new RegExp(labelText.source + / \(FI\)/.source))
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText(new RegExp(labelText.source + / \(SV\)/.source))
      ).toBeInTheDocument();
    });

    // Unselect Finnish
    await user.click(fi);
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
    vi.spyOn(Router, 'useNavigate').mockImplementation(() => navigate);
    const genericSwedishValue = 'SV translation';

    const { user } = renderComponent();
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
    const nameField = await screen.findByRole('textbox', {
      name: /tapahtuman nimi \(fi\)/i,
    });
    const languageSelector = await screen.findByTestId(
      formLanguageSelectorTestId
    );
    const sv = within(languageSelector).getByRole('checkbox', {
      name: /ruotsi/i,
    });

    await user.clear(nameField);
    expect(nameField).toHaveValue('');
    await user.type(nameField, 'Testinimi');
    expect(nameField).toHaveValue('Testinimi');

    expect(sv).not.toBeChecked();

    // Select Swedish (with Finnish that is already selected)
    await user.click(sv);
    expect(sv).toBeChecked();

    // Populate Swedish fields
    transletableFieldLabels.forEach(async (labelText) => {
      const field = screen.getByLabelText(
        new RegExp(labelText.source + / \(SV\)/.source)
      );
      await user.type(field, genericSwedishValue);
    });
    // Unselect Swedish which was a newly filled field
    await user.click(sv);

    expect(sv).not.toBeChecked();

    await user.click(
      screen.getByRole('button', {
        name: 'Päivitä tiedot',
      })
    );

    // Test against mocked return value
    // that filling the Swedish fields did not change the posted variables.
    // Unselecting the language after filling should have cleared the input values.
    await waitFor(() => {
      expect(navigate).toHaveBeenCalled();
    });
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

      await waitFor(() => {
        expect(
          screen.getByTestId(formLanguageSelectorTestId)
        ).toBeInTheDocument();
      });

      // Select all 3 languages. Note, Finnish is alays selected. ant others are not mandatory
      const sv = screen.getByRole('checkbox', {
        name: /ruotsi/i,
      });
      const en = screen.getByRole('checkbox', {
        name: /englanti/i,
      });
      expect(sv).not.toBeChecked();
      expect(en).not.toBeChecked();
      await user.click(en);
      expect(en).toBeChecked();
      await user.click(sv);
      expect(sv).toBeChecked();

      transletableFieldLabels.forEach((labelText) => {
        const labels = screen.getAllByText(labelText);
        const inputNames = labels.map((label) => label.getAttribute('for'));
        const inputLangOrder = inputNames.map((name) => name?.split('.').pop());
        expect(inputLangOrder).toEqual(languageOrder);
      });
    }
  );
});
