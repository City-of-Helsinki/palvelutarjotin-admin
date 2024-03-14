import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { graphql } from 'msw';
import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import wait from 'waait';
import {
  LanguagesDocument,
  MenuDocument,
} from 'react-helsinki-headless-cms/apollo';
import { vi } from 'vitest';

import languagesResponse from '../../../../test/apollo-mocks/queryResponses/languages.json';
import headerMenuResponse from '../../../../test/apollo-mocks/queryResponses/headerMenu.json';
import footerMenuResponse from '../../../../test/apollo-mocks/queryResponses/footerMenu.json';
import {
  CreateMyProfileDocument,
  MyProfileDocument,
  OrganisationsDocument,
  OrganisationType,
} from '../../../../generated/graphql';
import { initCmsMenuItemsMocks } from '../../../../test/cmsMocks';
import { server } from '../../../../test/msw/server';
import { fakePage } from '../../../../utils/cmsMockDataUtils';
import { fakeOrganisations, fakePerson } from '../../../../utils/mockDataUtils';
import {
  act,
  renderWithRoute,
  RHHCConfigProviderWithProvidedApolloClient,
  screen,
  userEvent,
  waitFor,
} from '../../../../utils/testUtils';
import { store } from '../../store';
import PageLayout from '../PageLayout';
import {
  FOOTER_MENU_NAME,
  HEADER_MENU_NAME,
} from '../../../../headless-cms/constants';
import * as selectors from '../../../auth/selectors';

vi.mock('../../../auth/selectors', async () => {
  const actual = await vi.importActual('../../../auth/selectors');
  return {
    ...actual,
    isAuthenticatedSelector: vi.fn(),
  };
});
vi.mock('hds-react', async () => {
  const actual = await vi.importActual('hds-react');
  return {
    ...actual,
    logoFi: 'mocked hds-react logoFi',
  };
});

const userEmail = 'test@test.fi';
const profileResponse = {
  data: {
    myProfile: fakePerson({ name: 'John Doe' }),
  },
};

beforeEach(() => {
  initCmsMenuItemsMocks();
  vi.spyOn(selectors, 'isAuthenticatedSelector').mockReturnValue(true);
  server.use(
    graphql.query('Page', (req, res, ctx) => {
      return res(
        ctx.data({
          page: fakePage(),
        })
      );
    })
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

const authenticatedInitialState = {
  authentication: {
    tunnistamo: {
      user: { profile: { email: userEmail } },
    },
    token: { apiToken: 'token' },
  },
};

const organisationMocks = fakeOrganisations(3, [
  {
    name: 'Organisaatio 1',
    id: 'organisation1',
    type: OrganisationType.Provider,
  },
  {
    name: 'Organisaatio 2',
    id: 'organisation2',
    type: OrganisationType.Provider,
  },
  {
    name: 'Organisaatio 3',
    id: 'organisation3',
    type: OrganisationType.Provider,
  },
]);

const footerMenuMock = {
  request: {
    query: MenuDocument,
    variables: {
      id: FOOTER_MENU_NAME['fi'],
      menuIdentifiersOnly: true,
    },
  },
  result: footerMenuResponse,
};

const headerMenuMock = {
  request: {
    query: MenuDocument,
    variables: {
      id: HEADER_MENU_NAME['fi'],
      menuIdentifiersOnly: true,
    },
  },
  result: headerMenuResponse,
};

const languagesMock = {
  request: {
    query: LanguagesDocument,
  },
  result: languagesResponse,
};

const mocks = [
  {
    request: {
      query: MyProfileDocument,
    },
    result: profileResponse,
  },
  { ...footerMenuMock },
  { ...headerMenuMock },
  { ...languagesMock },
];

it('PageLayout matches snapshot', async () => {
  const { container } = render(
    <MockedProvider mocks={mocks} addTypename={true}>
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <RHHCConfigProviderWithProvidedApolloClient>
            <PageLayout>
              <div>Page layout children</div>
            </PageLayout>
          </RHHCConfigProviderWithProvidedApolloClient>
        </MemoryRouter>
      </Provider>
    </MockedProvider>
  );
  await screen.findByText('Kulttuurikasvatus'); // Wait for Header
  await screen.findByText('Kouluille ja päiväkodeille'); // Wait for Footer
  expect(container.firstChild).toMatchSnapshot();
});

it(
  'Pagelayout renders profile page and registration pending page after submitting' +
    ' (for 3rd party providers)',
  async () => {
    const mocks = [
      {
        request: {
          query: MyProfileDocument,
        },
        result: {
          data: {
            myProfile: null,
          },
        },
      },
      {
        request: {
          query: MyProfileDocument,
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
          query: OrganisationsDocument,
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
          query: CreateMyProfileDocument,
          variables: {
            myProfile: {
              emailAddress: userEmail,
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
      { ...footerMenuMock },
      { ...headerMenuMock },
      { ...languagesMock },
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
      screen.getByRole('heading', { name: 'Täydennä tietosi' })
    ).toBeInTheDocument();
    expect(screen.getByText('Hei, tervetuloa Kultukseen!')).toBeInTheDocument();

    expect(screen.getByText(userEmail)).toBeInTheDocument();

    await fillAndSubmitProfileForm();

    await screen.findByRole(
      'heading',
      { name: 'Kiitos rekisteröitymisestä' },
      { timeout: 20000 }
    );
    expect(
      screen.getByRole('heading', {
        name: 'Rekisteröitymisesi odottaa käsittelyä',
      })
    ).toBeInTheDocument();
  }
);

it('Pagelayout renders children when user has profile, organisations and has staff role', async () => {
  const mocks = [
    {
      request: {
        query: MyProfileDocument,
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
    { ...footerMenuMock },
    { ...headerMenuMock },
    { ...languagesMock },
  ];

  renderWithRoute(<PageLayout>TextChildren</PageLayout>, {
    routes: ['/'],
    mocks,
    initialState: authenticatedInitialState,
  });

  await waitFor(() => {
    expect(screen.getByText('TextChildren')).toBeInTheDocument();
  });
});

it('render registration pending page', async () => {
  const mocks = [
    {
      request: {
        query: MyProfileDocument,
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
    { ...footerMenuMock },
    { ...headerMenuMock },
    { ...languagesMock },
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
    screen.getByRole('heading', {
      name: 'Rekisteröitymisesi odottaa käsittelyä',
    })
  ).toBeInTheDocument();

  expect(screen.queryByText(testText)).not.toBeInTheDocument();
});

async function fillAndSubmitProfileForm() {
  await userEvent.type(screen.getByLabelText('Nimi'), 'Testi Testaaja');
  await userEvent.type(screen.getByLabelText('Puhelinnumero'), '123321123');

  // wait for organisation to load
  await act(wait);

  const languageSelectorButton = screen.getByLabelText(/Organisaatio/i, {
    selector: 'button',
  });
  await userEvent.click(languageSelectorButton);
  await userEvent.click(screen.getByText(/organisaatio 1/i));
  await userEvent.click(screen.getByText(/organisaatio 2/i));

  await userEvent.click(
    screen.getByLabelText(/Organisaatio/i, { selector: 'button' })
  );

  expect(screen.getByLabelText('Organisaatio 1')).toBeInTheDocument();
  expect(screen.getByLabelText('Organisaatio 2')).toBeInTheDocument();

  await userEvent.click(
    screen.getByLabelText('Olen hyväksynyt palvelut käyttöehdot')
  );

  await userEvent.click(
    screen.getByLabelText(
      'Annan luvan antamieni tietojen käyttämiseen tapahtumien tiedoissa. Tietosuojaseloste'
    )
  );

  await userEvent.click(
    screen.getByRole('button', { name: 'Tallenna ja jatka' })
  );
}
