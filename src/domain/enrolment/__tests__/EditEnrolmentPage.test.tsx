/* eslint-disable import/no-duplicates */
import { MockedResponse } from '@apollo/client/testing';
import cloneDeep from 'lodash/cloneDeep';
import * as React from 'react';
import wait from 'waait';

import { EnrolmentDocument } from '../../../generated/graphql';
import * as graphqlFns from '../../../generated/graphql';
import { createPlaceQueryMock } from '../../../test/apollo-mocks/placeMocks';
import { createSchoolsAndKindergartensListQueryMock } from '../../../test/apollo-mocks/schoolsAndKindergartensListMock';
import {
  fakeEnrolment,
  fakeLocalizedObject,
  fakeOccurrence,
  fakeOrganisation,
  fakePerson,
  fakePEvent,
  fakeStudyGroup,
  fakeStudyLevels,
} from '../../../utils/mockDataUtils';
import {
  act,
  renderWithRoute,
  screen,
  userEvent,
  waitFor,
} from '../../../utils/testUtils';
import messages from '../../app/i18n/fi.json';
import { ROUTES } from '../../app/routes/constants';
import { store } from '../../app/store';
import EditEnrolmentPage from '../EditEnrolmentPage';

const eventId = 'palvelutarjotin:afzunowba4';
const enrolmentId = 'RW5yb2xtZW50Tm9kZToyNw==';
const personId = '123123';
const notificationType = graphqlFns.NotificationType.Email;
const amountOfAdult = 1;
const groupName = 'groupName';
const studyGroupId = '';
const studyGroupName = 'studyGroupName';
const personEmailAddress = 'testi@hotmail.com';
const personName = 'Testi Testinen';
const groupSize = 10;
const extraNeeds = 'lisätarpeet';
const personPhoneNumber = '123321123';
const studyLevels = fakeStudyLevels(2);
const occurrenceId = '3453yrgdsgh3y';

const enrolmentResponse = {
  data: {
    enrolment: fakeEnrolment({
      id: enrolmentId,
      occurrence: fakeOccurrence({
        id: occurrenceId,
        pEvent: fakePEvent({ organisation: fakeOrganisation() }),
      }),
      person: fakePerson({
        id: personId,
        // emailAddress: personEmailAddress,
        // phoneNumber: personPhoneNumber,
      }),
      studyGroup: fakeStudyGroup({
        person: fakePerson({
          id: personId,
          emailAddress: personEmailAddress,
          name: personName,
          phoneNumber: personPhoneNumber,
        }),
        unitId: studyGroupId,
        unitName: studyGroupName,
        groupName: groupName,
        groupSize,
        amountOfAdult,
        extraNeeds: extraNeeds,
        studyLevels,
      }),
      notificationType,
    }),
  },
};

const enrolment = enrolmentResponse.data.enrolment;

const originalUseUpdateEnrolmentMutation =
  graphqlFns.useUpdateEnrolmentMutation;

// act errors from formik that I couldn't resolve
jest.spyOn(console, 'error').mockImplementation(jest.fn());

const apolloMocks = [
  {
    request: {
      query: EnrolmentDocument,
      variables: {
        id: enrolmentId,
      },
    },
    result: enrolmentResponse,
  },
];

// TODO: Use normal ApolloMockProvider mock
afterEach(() => {
  // copy the original back so we can modify it in the tests
  (graphqlFns.useUpdateEnrolmentMutation as any) =
    originalUseUpdateEnrolmentMutation;
  jest.clearAllMocks();
});

const renderPage = ({ mocks }: { mocks?: any } = {}) => {
  return renderWithRoute(<EditEnrolmentPage />, {
    mocks: mocks || apolloMocks,
    store,
    routes: [
      ROUTES.EDIT_ENROLMENT.replace(':eventId', eventId).replace(
        ':enrolmentId',
        enrolmentId
      ),
    ],
    path: ROUTES.EDIT_ENROLMENT,
  });
};

it('initializes edit form correctly', async () => {
  renderPage();

  await screen.findByRole('heading', {
    name: messages.enrolment.editEnrolmentTitle,
  });

  expect(
    screen.queryByRole('heading', {
      name: messages.enrolmentForm.studyGroup.titleNotifier,
    })
  ).toBeInTheDocument();

  expect(
    screen.queryByLabelText(messages.enrolmentForm.studyGroup.person.labelName)
  ).toHaveValue(enrolment.studyGroup.person.name);
  expect(
    screen.queryByLabelText(
      messages.enrolmentForm.studyGroup.person.labelEmailAddress
    )
  ).toHaveValue(enrolment.studyGroup.person.emailAddress);
  expect(
    screen.queryByLabelText(
      messages.enrolmentForm.studyGroup.person.labelPhoneNumber
    )
  ).toHaveValue(enrolment.studyGroup.person.phoneNumber);

  await waitFor(() => {
    expect(
      screen.getByRole('checkbox', {
        name: /paikka ei ole listalla/i,
      })
    ).toBeChecked();
  });

  await waitFor(() => {
    expect(
      screen.getByRole('textbox', {
        name: /päiväkoti \/ koulu \/ oppilaitos \*/i,
      })
    ).toHaveValue(enrolment.studyGroup.unitName);
  });

  expect(
    screen.queryByLabelText(messages.enrolmentForm.studyGroup.labelGroupName)
  ).toHaveValue(enrolment.studyGroup.groupName);
  expect(
    screen.queryByText(messages.enrolmentForm.studyGroup.helperGroupName)
  ).toBeInTheDocument();
  expect(
    screen.queryByLabelText(messages.enrolmentForm.studyGroup.labelGroupSize)
  ).toHaveValue(enrolment.studyGroup.groupSize);
  expect(
    screen.queryByLabelText(
      messages.enrolmentForm.studyGroup.labelAmountOfAdult
    )
  ).toHaveValue(enrolment.studyGroup.amountOfAdult);
  expect(
    screen.queryByLabelText(messages.enrolmentForm.labelIsSameResponsiblePerson)
  ).toBeChecked();
  expect(
    screen.queryByLabelText(messages.enrolmentForm.labelHasEmailNotification)
  ).toBeChecked();
  expect(
    screen.queryByLabelText(messages.enrolmentForm.labelHasSmsNotification)
  ).not.toBeChecked();
  expect(
    screen.queryByLabelText(messages.enrolmentForm.labelLanguage, {
      selector: 'button',
    })
  ).toHaveTextContent('suomi');

  expect(
    screen.queryByLabelText(messages.enrolmentForm.studyGroup.labelExtraNeeds)
  ).toHaveValue(enrolment.studyGroup.extraNeeds);
});

it('shows notification type checkbox correctly', async () => {
  const enrolmentMockData = {
    data: { enrolment: cloneDeep(enrolment) },
  };

  const apolloMocks = [
    {
      request: {
        query: EnrolmentDocument,
        variables: {
          id: 'RW5yb2xtZW50Tm9kZToyNw==',
        },
      },
      result: enrolmentMockData,
    },
  ];

  enrolmentMockData.data.enrolment.notificationType =
    graphqlFns.NotificationType.Sms;

  renderPage({ mocks: apolloMocks });

  await screen.findByRole('heading', {
    name: messages.enrolment.editEnrolmentTitle,
  });

  expect(
    screen.queryByLabelText(messages.enrolmentForm.labelHasSmsNotification)
  ).toBeChecked();
});

it('calls update enrolment function with correct parameters when form is submitted', async () => {
  // TODO: Use normal ApolloMockProvider mock
  const updateEnrolmentMock = jest.fn();
  (graphqlFns.useUpdateEnrolmentMutation as any) = jest.fn(() => [
    updateEnrolmentMock,
  ]);

  const { history } = renderPage();

  const pushSpy = jest.spyOn(history, 'push');

  await screen.findByRole('heading', {
    name: messages.enrolment.editEnrolmentTitle,
  });

  userEvent.click(
    screen.getByRole('button', {
      name: messages.enrolmentForm.buttonUpdateEnrolment,
    })
  );

  await waitFor(() => {
    expect(updateEnrolmentMock).toHaveBeenCalled();
    expect(pushSpy).toHaveBeenCalled();
  });

  expect(updateEnrolmentMock).toHaveBeenCalledTimes(1);
  expect(updateEnrolmentMock.mock.calls[0]).toEqual([
    {
      variables: {
        input: {
          enrolmentId: enrolmentId,
          notificationType: notificationType,
          person: undefined,
          studyGroup: {
            amountOfAdult: amountOfAdult,
            groupSize: groupSize,
            groupName: groupName,
            unitId: studyGroupId,
            unitName: studyGroupName,
            studyLevels: studyLevels.edges.map((e) => e.node.id),
            person: {
              name: personName,
              emailAddress: personEmailAddress,
              phoneNumber: personPhoneNumber,
              language: 'FI',
            },
            extraNeeds,
          },
        },
      },
    },
  ]);
  expect(pushSpy).toHaveBeenCalledTimes(1);
  expect(pushSpy.mock.calls[0]).toEqual([
    {
      pathname: `/fi/events/${eventId}/occurrences/${occurrenceId}`,
      search: 'enrolmentUpdated=true',
    },
  ]);
});

describe('UnitField', () => {
  const setupUnitFieldTest = async (testMocks: MockedResponse[] = []) => {
    const enrolmentWithoutUnit = {
      ...enrolment,
      studyGroup: {
        ...enrolment.studyGroup,
        unitName: '',
      },
    };

    const apolloMocks = [
      ...testMocks,
      {
        request: {
          query: EnrolmentDocument,
          variables: {
            id: 'RW5yb2xtZW50Tm9kZToyNw==',
          },
        },
        result: {
          data: { enrolment: enrolmentWithoutUnit },
        },
      },
      createSchoolsAndKindergartensListQueryMock(10, [
        { id: 'test:place1', name: fakeLocalizedObject('place1') },
        { id: 'test:place2', name: fakeLocalizedObject('place2') },
        { id: 'test:place12', name: fakeLocalizedObject('place12') },
        { id: 'test:place123', name: fakeLocalizedObject('place123') },
      ]),
    ];

    renderPage({ mocks: apolloMocks });

    await screen.findByRole('heading', {
      name: messages.enrolment.editEnrolmentTitle,
    });
  };

  it('renders properly', async () => {
    await setupUnitFieldTest();

    // First it renders the autosuggest field
    expect(
      screen.getByRole('textbox', {
        name: /päiväkoti \/ koulu \/ oppilaitos/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/etsi helsinkiläistä toimipistettä/i)
    ).toBeInTheDocument();

    expect(
      screen.queryByText(/kirjoita toimipaikan nimi/i)
    ).not.toBeInTheDocument();

    // When checkbox is checked
    act(() => {
      userEvent.click(
        screen.getByRole('checkbox', {
          name: /paikka ei ole listalla/i,
        })
      );
    });

    // It renders the freetext input field
    expect(
      screen.queryByText(/etsi helsinkiläistä toimipistettä/i)
    ).not.toBeInTheDocument();

    expect(screen.getByText(/kirjoita toimipaikan nimi/i)).toBeInTheDocument();

    userEvent.type(
      screen.getByRole('textbox', {
        name: /päiväkoti \/ koulu \/ oppilaitos/i,
      }),
      'Testikoulu'
    );

    userEvent.tab();

    expect(
      screen.getByRole('textbox', {
        name: /päiväkoti \/ koulu \/ oppilaitos/i,
      })
    ).toHaveValue('Testikoulu');
  });

  it('renders a list of schools and kindergartens in unit id field', async () => {
    await setupUnitFieldTest();

    // Type to unit id field
    userEvent.type(
      screen.getByRole('textbox', {
        name: /päiväkoti \/ koulu \/ oppilaitos/i,
      }),
      'place'
    );

    // wait for debounce to trigger and populate localStorage
    await act(() => wait(500));

    // The inserted text should filter autosuggest field options
    expect(screen.getByText('place12')).toBeInTheDocument();
    expect(screen.getByText('place123')).toBeInTheDocument();
    expect(screen.queryByText('place1')).toBeInTheDocument();
    expect(screen.queryByText('place2')).toBeInTheDocument();

    // Type to unit id field
    userEvent.clear(
      screen.getByRole('textbox', {
        name: /päiväkoti \/ koulu \/ oppilaitos/i,
      })
    );
    userEvent.type(
      screen.getByRole('textbox', {
        name: /päiväkoti \/ koulu \/ oppilaitos/i,
      }),
      'place12'
    );

    // wait for debounce to trigger and populate localStorage
    await act(() => wait(500));

    // The inserted text should filter autosuggest field options
    expect(screen.getByText('place12')).toBeInTheDocument();
    expect(screen.getByText('place123')).toBeInTheDocument();
    expect(screen.queryByText('place1')).not.toBeInTheDocument();
    expect(screen.queryByText('place2')).not.toBeInTheDocument();
  });

  it('renders prefilled unit id', async () => {
    const enrolmentWithoutUnit = {
      ...enrolment,
      studyGroup: {
        ...enrolment.studyGroup,
        unitId: 'test:place12',
        unitName: 'place12',
      },
    };

    const apolloMocks = [
      createPlaceQueryMock({
        id: 'test:place12',
        name: fakeLocalizedObject('place12'),
      }),
      {
        request: {
          query: EnrolmentDocument,
          variables: {
            id: 'RW5yb2xtZW50Tm9kZToyNw==',
          },
        },
        result: {
          data: { enrolment: enrolmentWithoutUnit },
        },
      },
      createSchoolsAndKindergartensListQueryMock(10, [
        { id: 'test:place1', name: fakeLocalizedObject('place1') },
        { id: 'test:place2', name: fakeLocalizedObject('place2') },
        { id: 'test:place12', name: fakeLocalizedObject('place12') },
        { id: 'test:place123', name: fakeLocalizedObject('place123') },
      ]),
    ];

    renderPage({ mocks: apolloMocks });

    await screen.findByRole('heading', {
      name: messages.enrolment.editEnrolmentTitle,
    });

    expect(screen.getByText(/place12/i)).toBeInTheDocument();
  });

  it.each<MockedResponse[] | undefined>([
    [
      createPlaceQueryMock({
        id: 'test:place12',
        name: fakeLocalizedObject('place12'),
      }),
    ],
    undefined,
  ])(
    'shows the unit text in a autosuggest div next to the input (%p)',
    async (placeMocks) => {
      await setupUnitFieldTest(placeMocks);

      userEvent.type(
        screen.getByRole('textbox', {
          name: /päiväkoti \/ koulu \/ oppilaitos/i,
        }),
        'place12'
      );

      // wait for debounce to trigger and populate localStorage
      await act(() => wait(500));

      expect(screen.getByText('place12')).toBeInTheDocument();

      // Select an unit
      userEvent.click(screen.getByText('place12'));

      await act(() => wait(500));

      expect(
        screen.getByRole('textbox', {
          name: /päiväkoti \/ koulu \/ oppilaitos/i,
        }).nextElementSibling
      ).toHaveTextContent(
        placeMocks ? 'place12' : 'unitPlaceSelector.noPlaceFoundError'
      );
    }
  );

  it('clears the unit id value when a clear button is clicked', async () => {
    await setupUnitFieldTest();

    userEvent.type(
      screen.getByRole('textbox', {
        name: /päiväkoti \/ koulu \/ oppilaitos/i,
      }),
      'place12'
    );

    // wait for debounce to trigger and populate localStorage
    await act(() => wait(500));

    expect(screen.getByText('place12')).toBeInTheDocument();

    // Select an unit
    userEvent.click(screen.getByText('place12'));

    expect(
      screen.getByRole('textbox', {
        name: /päiväkoti \/ koulu \/ oppilaitos/i,
      }).nextElementSibling
    ).not.toBe(null);

    // clear the selection
    userEvent.click(
      screen.getByRole('button', {
        name: /poista arvo/i,
      })
    );
    // No sibling anymore when the value is cleared
    expect(
      screen.getByRole('textbox', {
        name: /päiväkoti \/ koulu \/ oppilaitos/i,
      }).nextElementSibling
    ).toBe(null);
  });
});
