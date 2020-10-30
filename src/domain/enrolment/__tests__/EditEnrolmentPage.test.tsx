/* eslint-disable import/no-duplicates */
import userEvent from '@testing-library/user-event';
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';

import { EnrolmentDocument } from '../../../generated/graphql';
import * as graphqlFns from '../../../generated/graphql';
import {
  fakeEnrolment,
  fakeOccurrence,
  fakeOrganisation,
  fakePerson,
  fakePEvent,
  fakeStudyGroup,
} from '../../../utils/mockDataUtils';
import { renderWithRoute, screen, waitFor } from '../../../utils/testUtils';
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
const studyGroupName = 'studyGroupName';
const personEmailAddress = 'testi@hotmail.com';
const personName = 'Testi Testinen';
const groupSize = 10;
const extraNeeds = 'lisätarpeet';
const personPhoneNumber = '123321123';
const studyLevel = graphqlFns.StudyLevel.Grade_4;
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
        name: studyGroupName,
        groupName: groupName,
        groupSize,
        amountOfAdult,
        extraNeeds: extraNeeds,
        studyLevel,
      }),
      notificationType,
    }),
  },
};

const enrolment = enrolmentResponse.data.enrolment;

const originalUseUpdateEnrolmentMutation =
  graphqlFns.useUpdateEnrolmentMutation;

// act errors from formik that I couldn't resolve
// eslint-disable-next-line @typescript-eslint/no-empty-function
jest.spyOn(console, 'error').mockImplementation(() => {});

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

afterEach(() => {
  // copy the original back so we can modify it in the tests
  (graphqlFns.useUpdateEnrolmentMutation as any) = originalUseUpdateEnrolmentMutation;
  jest.clearAllMocks();
});

const renderPage = ({ mocks }: { mocks?: any } = {}) => {
  return renderWithRoute(<EditEnrolmentPage />, {
    mocks: mocks || apolloMocks,
    store,
    routes: [`/events/${eventId}/enrolments/${enrolmentId}/edit`],
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
  expect(
    screen.queryByLabelText(messages.enrolmentForm.studyGroup.labelName)
  ).toHaveValue(enrolment.studyGroup.name);
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
  ).toHaveTextContent('Suomi');

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

  enrolmentMockData.data.enrolment.notificationType = 'SMS';

  renderPage({ mocks: apolloMocks });

  await screen.findByRole('heading', {
    name: messages.enrolment.editEnrolmentTitle,
  });

  expect(
    screen.queryByLabelText(messages.enrolmentForm.labelHasSmsNotification)
  ).toBeChecked();
});

it('calls update enrolment function with correct parameters when form is submitted', async () => {
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
          studyGroup: {
            amountOfAdult: amountOfAdult,
            groupSize: groupSize,
            groupName: groupName,
            name: studyGroupName,
            studyLevel: studyLevel,
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
