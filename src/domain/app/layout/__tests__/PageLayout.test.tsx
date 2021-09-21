import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import wait from 'waait';

import * as graphql from '../../../../generated/graphql';
import { fakeOrganisations, fakePerson } from '../../../../utils/mockDataUtils';
import {
  act,
  renderWithRoute,
  screen,
  userEvent,
  waitFor,
} from '../../../../utils/testUtils';
import { store } from '../../store';
import PageLayout from '../PageLayout';

const profileResponse = {
  data: {
    myProfile: fakePerson(),
  },
};

afterEach(() => {
  jest.restoreAllMocks();
});

const authenticatedInitialState = {
  authentication: {
    tunnistamo: {
      user: { profile: { email: 'test@test.fi' } },
    },
    token: { apiToken: 'token' },
  },
};

const organisationMocks = fakeOrganisations(3, [
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

const mocks = [
  {
    request: {
      query: graphql.MyProfileDocument,
    },
    result: profileResponse,
  },
];

it('PageLayout matches snapshot', () => {
  const { container } = render(
    <MockedProvider mocks={mocks} addTypename={true}>
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <PageLayout>
            <div>Page layout children</div>
          </PageLayout>
        </MemoryRouter>
      </Provider>
    </MockedProvider>
  );
  expect(container.firstChild).toMatchSnapshot();
});

it('Pagelayout renders profile page and registration pending page after submitting (for 3rd party providers)', async () => {
  const mocks = [
    {
      request: {
        query: graphql.MyProfileDocument,
      },
      result: {
        data: {
          myProfile: null,
        },
      },
    },
    {
      request: {
        query: graphql.MyProfileDocument,
      },
      result: {
        data: {
          myProfile: fakePerson({
            organisations: fakeOrganisations(0),
            isStaff: false,
          }),
        },
      },
    },
    {
      request: {
        query: graphql.OrganisationsDocument,
        variables: {
          type: 'provider',
        },
      },
      result: {
        data: {
          organisations: organisationMocks,
        },
      },
    },
    {
      request: {
        query: graphql.CreateMyProfileDocument,
        variables: {
          myProfile: {
            emailAddress: 'test@test.fi',
            name: 'Testi Testaaja',
            organisations: ['organisation1', 'organisation2'],
            phoneNumber: '123321123',
            language: 'FI',
            placeIds: [],
            organisationProposals: [],
          },
        },
      },
      result: {
        data: {
          createMyProfile: {
            myProfile: fakePerson(),
          },
        },
      },
    },
  ];

  renderWithRoute(<PageLayout>Test</PageLayout>, {
    routes: ['/'],
    mocks,
    initialState: authenticatedInitialState,
  });

  await act(wait);

  expect(screen.queryByText('Ilmoitus')).not.toBeInTheDocument();
  expect(
    screen.queryByText('Hanki oikeus tapahtumien julkaisuun tällä')
  ).not.toBeInTheDocument();

  expect(
    screen.queryByRole('heading', { name: 'Täydennä tietosi' })
  ).toBeInTheDocument();
  expect(
    screen.queryByText('Hei, tervetuloa Kultus betaan!')
  ).toBeInTheDocument();

  expect(screen.queryByText('test@test.fi')).toBeInTheDocument();

  await fillAndSubmitProfileForm();

  await screen.findByRole(
    'heading',
    { name: 'Kiitos rekisteröitymisestä' },
    { timeout: 20000 }
  );
  expect(
    screen.queryByRole('heading', {
      name: 'Rekisteröitymisesi odottaa käsittelyä',
    })
  ).toBeInTheDocument();
});

it('Pagelayout renders children when user has profile, organisations and has staff role', async () => {
  const mocks = [
    {
      request: {
        query: graphql.MyProfileDocument,
      },
      result: {
        data: {
          myProfile: fakePerson({
            organisations: fakeOrganisations(1),
            isStaff: true,
          }),
        },
      },
    },
  ];

  renderWithRoute(<PageLayout>TextChildren</PageLayout>, {
    routes: ['/'],
    mocks,
    initialState: authenticatedInitialState,
  });

  await waitFor(() => {
    expect(screen.queryByText('TextChildren')).toBeInTheDocument();
  });
});

it('render registration pending page', async () => {
  const mocks = [
    {
      request: {
        query: graphql.MyProfileDocument,
      },
      result: {
        data: {
          myProfile: fakePerson({
            isStaff: false,
            organisations: fakeOrganisations(0),
          }),
        },
      },
    },
  ];

  const testText = 'testText';
  renderWithRoute(<PageLayout>{testText}</PageLayout>, {
    routes: ['/'],
    mocks,
    initialState: {
      authentication: {
        tunnistamo: {
          user: {},
        },
        token: { apiToken: 'token' },
      },
    },
  });

  await screen.findByRole('heading', { name: 'Kiitos rekisteröitymisestä' });

  expect(
    screen.queryByRole('heading', {
      name: 'Rekisteröitymisesi odottaa käsittelyä',
    })
  ).toBeInTheDocument();

  expect(screen.queryByText(testText)).not.toBeInTheDocument();
});

async function fillAndSubmitProfileForm() {
  userEvent.type(screen.getByLabelText('Nimi'), 'Testi Testaaja');
  userEvent.type(screen.getByLabelText('Puhelinnumero'), '123321123');

  // wait for organisation to load
  await act(wait);

  const languageSelectorButton = screen.getByLabelText(/Organisaatio/i, {
    selector: 'button',
  });
  userEvent.click(languageSelectorButton);
  userEvent.click(screen.getByText(/organisaatio 1/i));
  userEvent.click(screen.getByText(/organisaatio 2/i));

  userEvent.click(
    screen.getByLabelText(/Organisaatio/i, { selector: 'button' })
  );

  expect(screen.queryByLabelText('Organisaatio 1')).toBeInTheDocument();
  expect(screen.queryByLabelText('Organisaatio 2')).toBeInTheDocument();

  userEvent.click(
    screen.getByLabelText('Olen hyväksynyt palvelut käyttöehdot')
  );

  userEvent.click(
    screen.getByLabelText(
      'Annan luvan antamieni tietojen käyttämiseen tapahtumien tiedoissa. Tietosuojaseloste'
    )
  );

  userEvent.click(screen.getByRole('button', { name: 'Tallenna ja jatka' }));
}
