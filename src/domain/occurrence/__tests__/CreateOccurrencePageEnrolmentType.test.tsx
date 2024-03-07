import { MockedResponse } from '@apollo/client/testing';
import * as React from 'react';
import { toast } from 'react-toastify';
import { vi } from 'vitest';

import {
  baseApolloMocks,
  eventId,
  getEventMockedResponse,
  getFormElement,
  getUpdateEventMockResponse,
  placeId,
} from '../../../test/CreateOccurrencePageTestUtils';
import { fakeOccurrences } from '../../../utils/mockDataUtils';
import {
  configure,
  renderWithRoute,
  screen,
  userEvent,
  waitFor,
  within,
} from '../../../utils/testUtils';
import { ROUTES } from '../../app/routes/constants';
import { EnrolmentType } from '../constants';
import CreateOccurrencePage from '../CreateOccurrencePage';
import { enrolmentInfoFormTestId } from '../enrolmentInfoFormPart/EnrolmentInfoFormPart';
import * as Utils from '../utils';

vi.mock('../utils', async () => {
  const actual = await vi.importActual('../utils');
  return { ...actual };
});

configure({ defaultHidden: true });

afterAll(() => {
  vi.setSystemTime(vi.getRealSystemTime());
  vi.useRealTimers();
});

afterEach(() => {
  vi.restoreAllMocks();
});

const renderComponent = ({ mocks = [] }: { mocks?: MockedResponse[] } = {}) => {
  return renderWithRoute(<CreateOccurrencePage />, {
    mocks: [...baseApolloMocks, ...mocks],
    routes: [ROUTES.CREATE_OCCURRENCE.replace(':id', eventId)],
    path: ROUTES.CREATE_OCCURRENCE,
  });
};

vi.setSystemTime('2021-04-02');

describe('enrolment type selector', () => {
  const radiosByType = {
    [EnrolmentType.Internal]: /ilmoittautuminen kultuksessa/i,
    [EnrolmentType.External]: /ilmoittautuminen muulla sivustolla/i,
    [EnrolmentType.Unenrollable]: /ei ilmoittautumista/i,
  } as const;

  const fieldSetsByType = {
    [EnrolmentType.Internal]: [
      /ilmoittautuminen alkaa/i,
      /klo/i,
      /ilmoittautuminen sulkeutuu x päivää ennen tapahtuma-aikaa/i,
      /tarvittavat käyntikerrat/i,
      /vahvista ilmoittautumiset automaattisesti osallistujamäärän puitteissa/i,
    ],
    [EnrolmentType.External]: [/Sähköposti- tai www-osoite ilmoittautumiseen/i],
    [EnrolmentType.Unenrollable]: [] as RegExp[],
  } as const;

  it('renders proper event types', async () => {
    renderComponent({
      mocks: [getEventMockedResponse({})],
    });

    await screen.findByRole('heading', {
      name: /ilmoittautuminen/i,
    });

    for (const label of Object.values(radiosByType)) {
      expect(await screen.findByText(label)).toBeInTheDocument();
    }
  });

  it.each((Object.keys(fieldSetsByType) as EnrolmentType[]).reverse())(
    'renders a proper fieldset when a type is changed to %s',
    async (type) => {
      renderComponent({
        mocks: [getEventMockedResponse({})],
      });

      expect(await screen.findByText(radiosByType[type])).toBeInTheDocument();
      await userEvent.click(await screen.findByText(radiosByType[type]));

      const visibleFieldLabels = fieldSetsByType[type];
      const hiddenFieldLabels = Object.values({
        ...fieldSetsByType,
        [type]: [],
      }).flat();

      const enrolmentInfoForm = within(
        await screen.findByTestId(enrolmentInfoFormTestId)
      );

      for (const label of visibleFieldLabels) {
        expect(await enrolmentInfoForm.findByText(label)).toBeInTheDocument();
      }

      for (const label of hiddenFieldLabels) {
        await waitFor(() =>
          expect(enrolmentInfoForm.queryByText(label)).not.toBeInTheDocument()
        );
      }

      // avoid redundant "Warning: An update to Formik inside a test was not wrapped in act(...)." errors
    }
  );
});

describe('auto acceptance for enrolments', () => {
  const customMessage =
    'Näytöksen ensi-iltana pyydetään saapumaan paikalle väh. puolituntia ennen näytöksen alkua.';

  it('renders auto acceptance message when auto accept is set on', async () => {
    renderComponent({
      mocks: [getEventMockedResponse({ autoAcceptance: false })],
    });
    // Wait for form to have been initialized
    await screen.findByRole('textbox', {
      name: /ilmoittautuminen alkaa/i,
    });
    // set as checked
    await userEvent.click(getFormElement('autoAcceptance'));
    await waitFor(() =>
      expect(getFormElement('autoAcceptanceMessage')).toBeInTheDocument()
    );
    expect(
      await screen.findByRole('heading', {
        name: /vahvistusviesti sisältää automaattisesti seuraavat tiedot/i,
      })
    ).toBeInTheDocument();
    const columnsRegExp = new RegExp(
      [
        'personoitu tervehdys',
        'ilmoittautuminen vahvistettu',
        'tapahtuman tiedot',
        'aika',
        'varattujen paikkojen lukumäärä',
        'kieli',
        'paikka',
        'osoite',
        'järjestäjän yhteystiedot',
      ].join(', ') + '\\.',
      'i'
    );
    expect(await screen.findByText(columnsRegExp)).toBeInTheDocument();
  });

  it('submits the auto acceptance message right', async () => {
    const spyGetEditEventPayload = vi.spyOn(Utils, 'getEditEventPayload');
    const toastSuccess = vi.spyOn(toast, 'success');
    const enrolmentStart = '2021-05-03T21:00:00.000Z';
    const enrolmentEndDays = 1;
    const neededOccurrences = 1;
    const occurrences = fakeOccurrences(1, [{ placeId }]);
    renderComponent({
      mocks: [
        getEventMockedResponse({
          location: true,
          autoAcceptance: false,
          enrolmentEndDays,
          enrolmentStart,
          neededOccurrences,
          occurrences,
        }),
        getUpdateEventMockResponse({
          autoAcceptance: true,
          autoAcceptanceMessage: customMessage,
          enrolmentEndDays,
          enrolmentStart,
          neededOccurrences,
          occurrences,
        }),
        getEventMockedResponse({
          location: true,
          autoAcceptance: true,
          autoAcceptanceMessage: customMessage,
          enrolmentEndDays,
          enrolmentStart,
          neededOccurrences,
          occurrences,
        }),
      ],
    });
    // Wait for form to have been initialized
    await screen.findByRole('textbox', {
      name: /ilmoittautuminen alkaa/i,
    });
    // set as checked
    await userEvent.click(getFormElement('autoAcceptance'));
    await waitFor(() =>
      expect(getFormElement('autoAcceptanceMessage')).toBeInTheDocument()
    );
    await userEvent.type(
      getFormElement('autoAcceptanceMessage'),
      customMessage
    );
    expect(getFormElement('autoAcceptanceMessage')).toHaveValue(customMessage);
    await userEvent.click(getFormElement('saveButton'));
    await waitFor(
      () => {
        expect(toastSuccess).toHaveBeenCalledWith('Tiedot tallennettu');
      },
      { timeout: 10000 }
    );
    await waitFor(() => {
      expect(spyGetEditEventPayload).toHaveBeenCalledWith({
        event: expect.anything(),
        formValues: expect.objectContaining({
          autoAcceptance: true,
          autoAcceptanceMessage: customMessage,
        }),
      });
    });
    await waitFor(() => {
      expect(spyGetEditEventPayload).toHaveReturnedWith(
        expect.objectContaining({
          pEvent: expect.objectContaining({
            translations: [
              { languageCode: 'FI', autoAcceptanceMessage: customMessage },
            ],
          }),
        })
      );
    });
  }, 30_000);

  it('clears the auto acceptance message on submit when auto acceptance is set off', async () => {
    const spyGetEditEventPayload = vi.spyOn(Utils, 'getEditEventPayload');
    const toastSuccess = vi.spyOn(toast, 'success');
    const enrolmentStart = '2021-05-03T21:00:00.000Z';
    const enrolmentEndDays = 1;
    const neededOccurrences = 1;
    const occurrences = fakeOccurrences(1, [{ placeId }]);
    renderComponent({
      mocks: [
        getEventMockedResponse({
          location: true,
          autoAcceptance: true,
          autoAcceptanceMessage: customMessage,
          enrolmentEndDays,
          enrolmentStart,
          neededOccurrences,
          occurrences,
        }),
        getUpdateEventMockResponse({
          autoAcceptance: false,
          autoAcceptanceMessage: '',
          enrolmentEndDays,
          enrolmentStart,
          neededOccurrences,
          occurrences,
        }),
        getEventMockedResponse({
          location: true,
          autoAcceptance: true,
          autoAcceptanceMessage: customMessage,
          enrolmentEndDays,
          enrolmentStart,
          neededOccurrences,
          occurrences,
        }),
      ],
    });
    // Wait for form to have been initialized
    await screen.findByRole('textbox', {
      name: /ilmoittautuminen alkaa/i,
    });
    expect(getFormElement('autoAcceptanceMessage')).toHaveValue(customMessage);
    // set as unchecked
    await userEvent.click(getFormElement('autoAcceptance'));
    await waitFor(() => {
      expect(
        screen.queryByRole('textbox', {
          name: /mahdolliset lisätiedot vahvistusviestiin/i,
        })
      ).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.queryByRole('heading', {
          name: /vahvistusviesti sisältää automaattisesti seuraavat tiedot/i,
        })
      ).not.toBeInTheDocument();
    });

    await userEvent.click(getFormElement('saveButton'));
    await waitFor(
      () => {
        expect(toastSuccess).toHaveBeenCalledWith('Tiedot tallennettu');
      },
      { timeout: 10000 }
    );
    await waitFor(() => {
      expect(spyGetEditEventPayload).toHaveBeenCalledWith({
        event: expect.anything(),
        formValues: expect.objectContaining({
          autoAcceptance: false,
          autoAcceptanceMessage: customMessage,
        }),
      });
    });
    await waitFor(() => {
      expect(spyGetEditEventPayload).toHaveReturnedWith(
        expect.objectContaining({
          pEvent: expect.objectContaining({ translations: [] }),
        })
      );
    });
  }, 20_000);
});
