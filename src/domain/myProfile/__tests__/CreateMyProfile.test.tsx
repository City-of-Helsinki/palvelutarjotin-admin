import { MockedResponse } from '@apollo/client/testing';
import * as React from 'react';

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
  act,
  renderWithRoute,
  screen,
  userEvent,
  waitFor,
} from '../../../utils/testUtils';
import { ROUTES } from '../../app/routes/constants';
import CreateMyProfile from '../CreateMyProfile';

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

const refetch = jest.fn();

const renderComponent = () => {
  return renderWithRoute(<CreateMyProfile refetch={refetch} />, {
    mocks: apolloMocks,
    path: ROUTES.MY_PROFILE,
    routes: ['/profile'],
  });
};

test('can create profile with all the information', async () => {
  const createProfileMock = jest.fn();
  jest
    .spyOn(graphql, 'useCreateMyProfileMutation')
    .mockReturnValue([createProfileMock] as any);

  renderComponent();

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });
  expect(
    screen.queryByRole('heading', { name: 'Täydennä tietosi' })
  ).toBeInTheDocument();

  const name = screen.getByLabelText('Nimi');
  const phone = screen.getByLabelText('Puhelinnumero');
  expect(name).toHaveValue('');
  expect(phone).toHaveValue('');
  expect(screen.getByText(/suomi/i)).toBeInTheDocument();

  userEvent.type(name, 'Testi Testaaja');
  userEvent.type(phone, '123321123');

  // Add location
  const locationField = screen.getByRole('textbox', {
    name: /tapahtumapaikat/i,
  });
  act(() => userEvent.click(locationField));

  userEvent.type(locationField, places[0].placeSearchString);
  const locationOption = await screen.findByRole('option', {
    name: new RegExp(places[0].placeName, 'i'),
  });
  expect(locationField).toHaveValue(places[0].placeSearchString);
  userEvent.click(locationOption);
  expect(locationField).toHaveValue('');

  // Add second location
  userEvent.type(locationField, places[1].placeSearchString);

  // this has failed couple of times in commit tests
  // if it fails again, try adding these lines
  // await act(() => new Promise((res) => setTimeout(res, 500)));
  // screen.logTestingPlaygroundURL();
  // and try to commit again
  const locationOption2 = await screen.findByRole(
    'option',
    {
      name: new RegExp(places[1].placeName, 'i'),
    },
    { timeout: 20000 }
  );
  expect(locationField).toHaveValue(places[1].placeSearchString);
  userEvent.click(locationOption2);
  expect(locationField).toHaveValue('');

  // places should be listed below location input
  places.forEach((p) =>
    expect(screen.queryByText(p.placeName)).toBeInTheDocument()
  );

  act(() =>
    userEvent.click(
      screen.getByRole('button', {
        name: /organisaatio organisaatio, jonka tapahtumia hallinnoit/i,
      })
    )
  );
  await waitFor(() => {
    expect(
      screen.getByText('Organisaatio 1', { selector: 'li' })
    ).toBeInTheDocument();
  });

  userEvent.click(screen.getByText('Organisaatio 1', { selector: 'li' }));
  userEvent.click(screen.getByText('Organisaatio 2', { selector: 'li' }));

  act(() => {
    userEvent.click(screen.getByText(/olen hyväksynyt palvelut/i));
  });
  act(() => {
    userEvent.click(
      screen.getByText(
        /annan luvan antamieni tietojen käyttämiseen tapahtumien tiedoissa\./i
      )
    );
  });

  userEvent.click(
    screen.getByRole('button', {
      name: /tallenna ja jatka/i,
    })
  );

  await waitFor(() => {
    expect(createProfileMock).toHaveBeenCalledWith({
      variables: {
        myProfile: {
          name: 'Testi Testaaja',
          emailAddress: '',
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
}, 20000);

test('create profile with organisation proposal', async () => {
  const createProfileMock = jest.fn();
  jest
    .spyOn(graphql, 'useCreateMyProfileMutation')
    .mockReturnValue([createProfileMock] as any);
  renderComponent();

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  userEvent.type(screen.getByLabelText('Nimi'), 'Testi Testaaja');
  userEvent.type(screen.getByLabelText('Puhelinnumero'), '123321123');

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
        name: /Organisaatio Organisaatio, jonka tapahtumia hallinnoit/i,
      })
    ).toBeDisabled();
  });

  act(() => {
    userEvent.click(screen.getByText(/olen hyväksynyt palvelut/i));
  });
  act(() => {
    userEvent.click(
      screen.getByText(
        /annan luvan antamieni tietojen käyttämiseen tapahtumien tiedoissa\./i
      )
    );
  });

  userEvent.click(
    screen.getByRole('button', {
      name: /tallenna ja jatka/i,
    })
  );

  await waitFor(() => {
    expect(createProfileMock).toHaveBeenCalledWith({
      variables: {
        myProfile: {
          name: 'Testi Testaaja',
          emailAddress: '',
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
