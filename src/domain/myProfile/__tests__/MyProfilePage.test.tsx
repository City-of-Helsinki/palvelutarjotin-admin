import { MockedResponse } from '@apollo/react-testing';
import * as React from 'react';

import * as graphql from '../../../generated/graphql';
import {
  fakeOrganisationProposals,
  fakeOrganisations,
  fakePerson,
} from '../../../utils/mockDataUtils';
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
      query: graphql.MyProfileDocument,
      variables: {},
    },
    result: {
      data: {
        myProfile: fakePerson({
          organisations: organisationMocks1,
          name: 'Testi Testaaja',
          emailAddress: 'testi@testaaja.com',
          phoneNumber: '123321123',
          organisationproposalSet: fakeOrganisationProposals(),
        }),
      },
    },
  },
  {
    request: {
      query: graphql.OrganisationsDocument,
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

  // wait for organisations
  // await wait();

  expect(
    screen.queryByRole('heading', { name: 'Omat tiedot' })
  ).toBeInTheDocument();

  expect(screen.getByLabelText('Nimi')).toHaveValue('Testi Testaaja');
  expect(screen.getByLabelText('Puhelinnumero')).toHaveValue('123321123');

  await waitFor(() => {
    expect(
      screen.getByText('Organisaatio 1', { selector: 'span' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Organisaatio 2', { selector: 'span' })
    ).toBeInTheDocument();
  });
});

test('profile can be edited', async () => {
  const updateProfileMock = jest.fn();
  jest
    .spyOn(graphql, 'useUpdateMyProfileMutation')
    .mockReturnValue([updateProfileMock] as any);
  renderWithRoute(<MyProfilePage />, {
    mocks: apolloMocks,
    path: ROUTES.MY_PROFILE,
    routes: ['/profile'],
  });

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
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
  const org1 = await screen.findByText('Organisaatio 3', { selector: 'li' });
  const org2 = await screen.findByText('Organisaatio 2', { selector: 'li' });
  userEvent.click(org1);
  userEvent.click(org2);

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
          organisationProposals: [],
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

test('create profile with organisation proposal', async () => {
  const createProfileMock = jest.fn();
  jest
    .spyOn(graphql, 'useUpdateMyProfileMutation')
    .mockReturnValue([createProfileMock] as any);
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
      screen.getByText('Organisaatio 1', { selector: 'span' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Organisaatio 2', { selector: 'span' })
    ).toBeInTheDocument();
  });

  userEvent.type(
    screen.getByLabelText('Lähetä uusi organisaatio pyyntö'),
    'Org1'
  );

  await waitFor(() => {
    expect(
      screen.queryByText('Organisaatio 1', { selector: 'span' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('Organisaatio 2', { selector: 'span' })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /organisaatio organisaatio, jonka tapahtumia hallinnoit valitse organisaatio/i,
      })
    ).toBeDisabled();
  });

  userEvent.click(
    screen.getByRole('button', { name: 'Tallenna päivitetyt tiedot' })
  );

  await waitFor(() => {
    expect(createProfileMock).toHaveBeenCalledWith({
      variables: {
        myProfile: {
          name: 'Testi Testaaja',
          emailAddress: '',
          phoneNumber: '123321123',
          organisations: [],
          organisationProposals: [{ name: 'Org1' }],
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
