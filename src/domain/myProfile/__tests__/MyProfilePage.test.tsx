import { MockedResponse } from '@apollo/client/testing';
import { waitFor, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import * as HdsReact from 'hds-react';
import * as React from 'react';
import { vi } from 'vitest';

import * as graphql from '../../../generated/graphql';
import { OrganisationsOrganisationTypeChoices } from '../../../generated/graphql';
import {
  fakeOrganisationProposals,
  fakeOrganisations,
  fakePerson,
} from '../../../utils/mockDataUtils';
import { renderWithRoute } from '../../../utils/testUtils';
import { ROUTES } from '../../app/routes/constants';
import MyProfilePage from '../MyProfilePage';

vi.mock('../../../generated/graphql', async () => {
  const actual = await vi.importActual('../../../generated/graphql');
  return { ...actual };
});

const organisationMocks1 = fakeOrganisations(2, [
  {
    name: 'Organisaatio 1',
    id: 'organisation1',
    type: graphql.OrganisationsOrganisationTypeChoices.Provider,
  },
  {
    name: 'Organisaatio 2',
    id: 'organisation2',
    type: graphql.OrganisationsOrganisationTypeChoices.Provider,
  },
]);

const organisationMocks2 = fakeOrganisations(3, [
  {
    name: 'Organisaatio 1',
    id: 'organisation1',
    type: graphql.OrganisationsOrganisationTypeChoices.Provider,
  },
  {
    name: 'Organisaatio 2',
    id: 'organisation2',
    type: graphql.OrganisationsOrganisationTypeChoices.Provider,
  },
  {
    name: 'Organisaatio 3',
    id: 'organisation3',
    type: graphql.OrganisationsOrganisationTypeChoices.Provider,
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
      variables: { type: OrganisationsOrganisationTypeChoices.Provider },
    },
    result: {
      data: {
        organisations: organisationMocks2,
      },
    },
  },
];

vi.mock('hds-react', async () => {
  const actual = await vi.importActual('hds-react');
  return {
    ...actual,
  };
});

beforeEach(() => {
  vi.spyOn(HdsReact, 'useOidcClient').mockImplementation(
    () =>
      ({
        isAuthenticated: () => true,
        isRenewing: () => false,
        getUser: () => {
          return {
            profile: {
              email: 'test@test.fi',
            },
          };
        },
      }) as any
  );
});

test('render profile page correctly', async () => {
  renderWithRoute(<MyProfilePage />, {
    mocks: apolloMocks,
    path: ROUTES.MY_PROFILE,
    routes: ['/profile'],
  });

  await waitFor(() =>
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
  );

  expect(
    screen.getByRole('heading', { name: 'Omat tiedot' })
  ).toBeInTheDocument();

  expect(screen.getByLabelText('Nimi')).toHaveValue('Testi Testaaja');
  expect(screen.getByLabelText('Puhelinnumero')).toHaveValue('123321123');
  expect(screen.getByText(/suomi/i)).toBeInTheDocument();
});

test('profile can be edited', async () => {
  const updateProfileMock = vi.fn();
  vi.spyOn(graphql, 'useUpdateMyProfileMutation').mockReturnValue([
    updateProfileMock,
  ] as any);
  renderWithRoute(<MyProfilePage />, {
    mocks: apolloMocks,
    path: ROUTES.MY_PROFILE,
    routes: ['/profile'],
  });

  await waitFor(() =>
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
  );

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
}, 20_000);
