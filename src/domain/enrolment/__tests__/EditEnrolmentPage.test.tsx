import { MockedProvider } from '@apollo/react-testing';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';
import { Provider } from 'react-redux';
import Router from 'react-router';

import enrolmentData from '../__mocks__/enrolment.json';
import { EnrolmentDocument } from '../../../generated/graphql';
import * as graphqlFns from '../../../generated/graphql';
import messages from '../../app/i18n/fi.json';
import { store } from '../../app/store';
import EditEnrolmentPage from '../EditEnrolmentPage';

const enrolment = enrolmentData.data.enrolment;

const originalUseUpdateEnrolmentMutation =
  graphqlFns.useUpdateEnrolmentMutation;

// act errors from formik that I couldn't resolve
jest.spyOn(console, 'error').mockImplementation(() => {});

const apolloMocks = [
  {
    request: {
      query: EnrolmentDocument,
      variables: {
        id: 'RW5yb2xtZW50Tm9kZToyNw==',
      },
    },
    result: enrolmentData,
  },
];

beforeEach(() => {
  jest.spyOn(Router, 'useParams').mockReturnValue({
    enrolmentId: 'RW5yb2xtZW50Tm9kZToyNw==',
    eventId: 'palvelutarjotin:afzunowba4',
  });
  jest
    .spyOn(Router, 'useLocation')
    .mockReturnValue({ pathname: '/', search: '', state: '', hash: '' });
  jest.spyOn(Router, 'useHistory').mockReturnValue({});
});

afterEach(() => {
  // copy the original back so we can modify it in the tests
  (graphqlFns.useUpdateEnrolmentMutation as any) = originalUseUpdateEnrolmentMutation;
  jest.clearAllMocks();
});

const renderPage = ({ mocks }: { mocks?: any } = {}) => {
  render(
    <Provider store={store}>
      <MockedProvider mocks={mocks || apolloMocks}>
        <EditEnrolmentPage />
      </MockedProvider>
    </Provider>
  );
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
  const pushMock = jest.fn();
  jest.spyOn(Router, 'useHistory').mockReturnValue({
    push: pushMock as any,
  } as any);
  const updateEnrolmentMock = jest.fn();
  (graphqlFns.useUpdateEnrolmentMutation as any) = jest.fn(() => [
    updateEnrolmentMock,
  ]);

  renderPage();

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
    expect(pushMock).toHaveBeenCalled();
  });

  expect(updateEnrolmentMock).toHaveBeenCalledTimes(1);
  expect(updateEnrolmentMock.mock.calls[0]).toEqual([
    {
      variables: {
        input: {
          enrolmentId: 'RW5yb2xtZW50Tm9kZToyOQ==',
          notificationType: 'EMAIL',
          studyGroup: {
            amountOfAdult: 3,
            groupSize: 6,
            groupName: '4a',
            name: 'AS',
            studyLevel: 'GRADE_4',
            person: {
              name: 'Testi Testinen',
              emailAddress: 'testi@hotmail.com',
              phoneNumber: '123123123',
              language: 'FI',
            },
            extraNeeds: 'Moikkaaa lol',
          },
        },
      },
    },
  ]);
  expect(pushMock).toHaveBeenCalledTimes(1);
  expect(pushMock.mock.calls[0]).toEqual([
    {
      pathname:
        '/fi/events/palvelutarjotin:afzunowba4/occurrences/T2NjdXJyZW5jZU5vZGU6OTQ=',
      search: 'enrolmentUpdated=true',
    },
  ]);
});
