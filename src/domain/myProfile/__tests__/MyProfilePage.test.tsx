import { MockedResponse } from '@apollo/client/testing';
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

jest.mock('../../../generated/graphql', () => ({
  __esModule: true,
  ...jest.requireActual('../../../generated/graphql'),
}));

const organisationMocks1 = fakeOrganisations(2, [
  {
    name: 'Organisaatio 1',
    id: 'organisation1',
    type: graphql.OrganisationType.Provider,
  },
  {
    name: 'Organisaatio 2',
    id: 'organisation2',
    type: graphql.OrganisationType.Provider,
  },
]);

const organisationMocks2 = fakeOrganisations(3, [
  {
    name: 'Organisaatio 1',
    id: 'organisation1',
    type: graphql.OrganisationType.Provider,
  },
  {
    name: 'Organisaatio 2',
    id: 'organisation2',
    type: graphql.OrganisationType.Provider,
  },
  {
    name: 'Organisaatio 3',
    id: 'organisation3',
    type: graphql.OrganisationType.Provider,
  },
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
          language: graphql.Language.Fi,
          organisationproposalSet: fakeOrganisationProposals(),
        }),
      },
    },
  },
  {
    request: {
      query: graphql.OrganisationsDocument,
      variables: { type: 'provider' },
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

  expect(
    screen.getByRole('heading', { name: 'Omat tiedot' })
  ).toBeInTheDocument();

  expect(screen.getByLabelText('Nimi')).toHaveValue('Testi Testaaja');
  expect(screen.getByLabelText('Puhelinnumero')).toHaveValue('123321123');
  expect(screen.getByText(/suomi/i)).toBeInTheDocument();
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
    screen.getByRole('heading', { name: 'Omat tiedot' })
  ).toBeInTheDocument();

  await userEvent.clear(screen.getByLabelText('Nimi'));
  await userEvent.type(screen.getByLabelText('Nimi'), 'Changed Name');
  await userEvent.clear(
    screen.getByLabelText('Sähköpostiosoite yhteydenotoille')
  );
  await userEvent.type(
    screen.getByLabelText('Sähköpostiosoite yhteydenotoille'),
    'changed@testaaja.com'
  );
  await userEvent.clear(screen.getByLabelText('Puhelinnumero'));
  await userEvent.type(screen.getByLabelText('Puhelinnumero'), '321123321');
  await userEvent.click(screen.getByText(/suomi/i));
  await userEvent.click(screen.getByText(/englanti/i));

  await userEvent.click(
    screen.getByRole('button', { name: 'Tallenna päivitetyt tiedot' })
  );

  await waitFor(() => {
    expect(updateProfileMock).toHaveBeenCalledWith({
      variables: {
        myProfile: {
          emailAddress: 'changed@testaaja.com',
          name: 'Changed Name',
          phoneNumber: '321123321',
          language: 'EN',
          placeIds: [],
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
