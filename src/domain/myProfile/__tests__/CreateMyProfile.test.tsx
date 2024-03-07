import { MockedResponse } from '@apollo/client/testing';
import * as React from 'react';
import { vi } from 'vitest';

import { AUTOSUGGEST_OPTIONS_AMOUNT } from '../../../common/components/autoSuggest/contants';
import * as graphql from '../../../generated/graphql';
import {
  fakeLocalizedObject,
  fakeOrganisationProposals,
  fakeOrganisations,
  fakePerson,
  fakePlaces,
} from '../../../utils/mockDataUtils';
import {
  renderWithRoute,
  screen,
  userEvent,
  waitFor,
} from '../../../utils/testUtils';
import { ROUTES } from '../../app/routes/constants';
import CreateMyProfile from '../CreateMyProfile';

vi.mock('../../../generated/graphql', async () => {
  const actual = await vi.importActual('../../../generated/graphql');
  return { ...actual };
});
const places = [
  {
    placeSearchString: 'Sellon',
    placeId: 'placeId',
    placeName: 'Sellon kirjasto',
  },
  {
    placeSearchString: 'Entresse',
    placeId: 'placeId2',
    placeName: 'Entressen kirjasto',
  },
];

const placesMockResponses: MockedResponse[] = places.map((place) => ({
  request: {
    query: graphql.PlacesDocument,
    variables: {
      dataSource: 'tprek',
      showAllPlaces: true,
      pageSize: AUTOSUGGEST_OPTIONS_AMOUNT,
      text: place.placeSearchString,
    },
  },
  result: {
    data: {
      places: fakePlaces(1, [
        { name: fakeLocalizedObject(place.placeName), id: place.placeId },
      ]),
    },
  },
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

const myProfile = fakePerson({
  organisations: organisationMocks1,
  isStaff: true,
  name: 'Testi Testaaja',
  emailAddress: 'testi@testaaja.com',
  phoneNumber: '123321123',
  language: graphql.Language.Fi,
  organisationproposalSet: fakeOrganisationProposals(),
});

const apolloMocks: MockedResponse[] = [
  {
    request: {
      query: graphql.MyProfileDocument,
      variables: {},
    },
    result: {
      data: {
        myProfile: myProfile,
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
  ...placesMockResponses,
];

const refetch = vi.fn();

const renderComponent = () => {
  return renderWithRoute(<CreateMyProfile refetch={refetch} />, {
    mocks: apolloMocks,
    path: ROUTES.MY_PROFILE,
    routes: ['/profile'],
  });
};

test('can create profile with all the information', async () => {
  const createProfileMock = vi.fn();
  vi.spyOn(graphql, 'useCreateMyProfileMutation').mockReturnValue([
    createProfileMock,
  ] as any);

  renderComponent();

  await waitFor(() =>
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
  );
  expect(
    screen.getByRole('heading', { name: 'Täydennä tietosi' })
  ).toBeInTheDocument();

  const name = screen.getByLabelText('Nimi');
  const phone = screen.getByLabelText('Puhelinnumero');
  const email = screen.getByLabelText('Sähköpostiosoite yhteydenotoille');
  expect(name).toHaveValue('');
  expect(phone).toHaveValue('');
  expect(email).toHaveValue(''); // No auth mocked, so the input stays empty
  expect(screen.getByText(/suomi/i)).toBeInTheDocument();

  await userEvent.type(name, myProfile.name);
  await userEvent.type(phone, myProfile.phoneNumber);
  await userEvent.type(email, myProfile.emailAddress);

  // Add location
  const locationField = screen.getByRole('textbox', {
    name: /tapahtumapaikat/i,
  });
  await userEvent.click(locationField);

  await userEvent.type(locationField, places[0].placeSearchString);
  const locationOption = await screen.findByRole('option', {
    name: new RegExp(places[0].placeName, 'i'),
  });
  expect(locationField).toHaveValue(places[0].placeSearchString);
  await userEvent.click(locationOption);
  expect(locationField).toHaveValue('');

  // Add second location
  await userEvent.type(locationField, places[1].placeSearchString);

  const locationOption2 = await screen.findByRole(
    'option',
    {
      name: new RegExp(places[1].placeName, 'i'),
    },
    { timeout: 20000 }
  );
  expect(locationField).toHaveValue(places[1].placeSearchString);
  await userEvent.click(locationOption2);
  expect(locationField).toHaveValue('');

  // places should be listed below location input
  places.forEach((p) =>
    expect(screen.getByText(p.placeName)).toBeInTheDocument()
  );
  await userEvent.click(
    screen.getByRole('button', {
      name: /organisaatio organisaatio, jonka tapahtumia hallinnoit/i,
    })
  );
  await waitFor(() => {
    expect(
      screen.getByText('Organisaatio 1', { selector: 'li' })
    ).toBeInTheDocument();
  });

  await userEvent.click(screen.getByText('Organisaatio 1', { selector: 'li' }));
  await userEvent.click(screen.getByText('Organisaatio 2', { selector: 'li' }));

  await userEvent.click(screen.getByText(/olen hyväksynyt palvelut/i));
  await userEvent.click(
    screen.getByText(
      /annan luvan antamieni tietojen käyttämiseen tapahtumien tiedoissa\./i
    )
  );

  await userEvent.click(
    screen.getByRole('button', {
      name: /tallenna ja jatka/i,
    })
  );

  await waitFor(() => {
    expect(createProfileMock).toHaveBeenCalledWith({
      variables: {
        myProfile: {
          name: 'Testi Testaaja',
          emailAddress: 'testi@testaaja.com',
          phoneNumber: '123321123',
          language: 'FI',
          organisations: ['organisation1', 'organisation2'],
          placeIds: ['placeId', 'placeId2'],
          organisationProposals: [],
        },
      },
    });
  });

  expect(refetch).toBeCalled();
}, 50_000);

test('create profile with organisation proposal', async () => {
  const createProfileMock = vi.fn();
  vi.spyOn(graphql, 'useCreateMyProfileMutation').mockReturnValue([
    createProfileMock,
  ] as any);
  renderComponent();

  await waitFor(() =>
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
  );

  await userEvent.type(screen.getByLabelText('Nimi'), 'Testi Testaaja');
  await userEvent.type(screen.getByLabelText('Puhelinnumero'), '123321123');
  await userEvent.clear(
    screen.getByLabelText('Sähköpostiosoite yhteydenotoille')
  );
  await userEvent.type(
    screen.getByLabelText('Sähköpostiosoite yhteydenotoille'),
    'changed@testaaja.fi'
  );

  await userEvent.type(
    screen.getByLabelText('Lähetä uusi organisaatio pyyntö'),
    'Org1'
  );

  await waitFor(() => {
    expect(
      screen.queryByText('Organisaatio 2', { selector: 'span' })
    ).not.toBeInTheDocument();
  });
  expect(
    screen.queryByText('Organisaatio 1', { selector: 'span' })
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole('button', {
      name: /Organisaatio Organisaatio, jonka tapahtumia hallinnoit/i,
    })
  ).toBeDisabled();

  await userEvent.click(screen.getByText(/olen hyväksynyt palvelut/i));
  await userEvent.click(
    screen.getByText(
      /annan luvan antamieni tietojen käyttämiseen tapahtumien tiedoissa\./i
    )
  );

  await userEvent.click(
    screen.getByRole('button', {
      name: /tallenna ja jatka/i,
    })
  );

  await waitFor(() => {
    expect(createProfileMock).toHaveBeenCalledWith({
      variables: {
        myProfile: {
          name: 'Testi Testaaja',
          emailAddress: 'changed@testaaja.fi',
          language: 'FI',
          phoneNumber: '123321123',
          organisations: [],
          placeIds: [],
          organisationProposals: [{ name: 'Org1' }],
        },
      },
    });
  });

  expect(refetch).toBeCalled();
});
