import { MockedResponse } from '@apollo/react-testing';
import React from 'react';

import {
  MyProfileDocument,
  OrganisationsDocument,
} from '../../../generated/graphql';
import * as graphqlFns from '../../../generated/graphql';
import { fakeOrganisations, fakePerson } from '../../../utils/mockDataUtils';
import {
  renderWithRoute,
  screen,
  userEvent,
  waitFor,
} from '../../../utils/testUtils';
import { ROUTES } from '../../app/routes/constants';
import MyProfilePage from '../MyProfilePage';

const organisationMocks1 = fakeOrganisations(2, [
  { name: 'Organisaatio 1', id: 'organisation1' },
  { name: 'Organisaatio 2', id: 'organisation2' },
]);

const organisationMocks2 = fakeOrganisations(3, [
  { name: 'Organisaatio 1', id: 'organisation1' },
  { name: 'Organisaatio 2', id: 'organisation2' },
  { name: 'Organisaatio 3', id: 'organisation3' },
]);

const apolloMocks: MockedResponse[] = [
  {
    request: {
      query: MyProfileDocument,
      variables: {},
    },
    result: {
      data: {
        myProfile: fakePerson({
          organisations: organisationMocks1,
          name: 'Testi Testaaja',
          emailAddress: 'testi@testaaja.com',
          phoneNumber: '123321123',
        }),
      },
    },
  },
  {
    request: {
      query: OrganisationsDocument,
      variables: {},
    },
    result: {
      data: {
        organisations: organisationMocks2,
      },
    },
  },
];

test('render profile page correctly', async () => {
  renderWithRoute(<MyProfilePage />, {
    mocks: apolloMocks,
    path: ROUTES.MY_PROFILE,
    routes: ['/profile'],
  });

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  await waitFor(() => {
    expect(
      screen.getByLabelText('Organisaatio', { selector: 'button' })
    ).toHaveTextContent('Organisaatio 1, Organisaatio 2');
  });

  expect(
    screen.queryByRole('heading', { name: 'Omat tiedot' })
  ).toBeInTheDocument();

  expect(screen.getByLabelText('Nimi')).toHaveValue('Testi Testaaja');
  expect(screen.getByLabelText('Puhelinnumero')).toHaveValue('123321123');

  const dropdownButton = screen.getByLabelText('Organisaatio', {
    selector: 'button',
  });

  userEvent.click(dropdownButton);

  expect(screen.getByLabelText('Organisaatio 1')).toBeChecked();
  expect(screen.getByLabelText('Organisaatio 2')).toBeChecked();

  // wait to avoid act() errors
  await waitFor(() => {
    expect(screen.getByLabelText('Organisaatio 3')).not.toBeChecked();
  });
});

test('profile can be edited', async () => {
  const updateProfileMock = jest.fn();
  jest
    .spyOn(graphqlFns, 'useUpdateMyProfileMutation')
    .mockReturnValue([updateProfileMock] as any);
  renderWithRoute(<MyProfilePage />, {
    mocks: apolloMocks,
    path: ROUTES.MY_PROFILE,
    routes: ['/profile'],
  });

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  await waitFor(() => {
    expect(
      screen.getByLabelText('Organisaatio', { selector: 'button' })
    ).toHaveTextContent('Organisaatio 1, Organisaatio 2');
  });

  expect(
    screen.queryByRole('heading', { name: 'Omat tiedot' })
  ).toBeInTheDocument();

  userEvent.clear(screen.getByLabelText('Nimi'));
  userEvent.type(screen.getByLabelText('Nimi'), 'Changed Name');
  userEvent.clear(screen.getByLabelText('Puhelinnumero'));
  userEvent.type(screen.getByLabelText('Puhelinnumero'), '321123321');

  const dropdownButton = screen.getByLabelText('Organisaatio', {
    selector: 'button',
  });

  userEvent.click(dropdownButton);
  userEvent.click(screen.getByLabelText('Organisaatio 3'));
  userEvent.click(screen.getByLabelText('Organisaatio 2'));

  userEvent.click(dropdownButton);

  userEvent.click(
    screen.getByRole('button', { name: 'Tallenna päivitetyt tiedot' })
  );

  await waitFor(() => {
    expect(updateProfileMock).toHaveBeenCalledWith({
      variables: {
        myProfile: {
          emailAddress: '',
          name: 'Changed Name',
          organisations: ['organisation1', 'organisation3'],
          phoneNumber: '321123321',
        },
      },
    });
  });

  await waitFor(() => {
    expect(
      screen.queryByText('Omat tiedot tallennettu onnistuneesti')
    ).toBeVisible();
  });
});