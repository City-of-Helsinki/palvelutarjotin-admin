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
import * as authSelectors from '../../../auth/selectors';
import { store } from '../../store';
import PageLayout from '../PageLayout';

const profileResponse = {
  data: {
    myProfile: fakePerson(),
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

it('Pagelayout renders Profile page', async () => {
  const createProfileMock = jest.fn();
  jest
    .spyOn(graphql, 'useCreateMyProfileMutation')
    .mockReturnValue([createProfileMock] as any);
  jest.spyOn(authSelectors, 'isAuthenticatedSelector').mockReturnValue(true);
  jest
    .spyOn(authSelectors, 'userSelector')
    .mockReturnValue({ profile: { email: 'test@test.fi' } } as any);
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
  ];
  renderWithRoute(<PageLayout>Test</PageLayout>, { routes: ['/'], mocks });

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

  await waitFor(() => {
    expect(createProfileMock).toHaveBeenCalledWith({
      variables: {
        myProfile: {
          emailAddress: 'test@test.fi',
          name: 'Testi Testaaja',
          organisations: ['organisation1', 'organisation2'],
          organisationProposals: [],
          phoneNumber: '123321123',
        },
      },
    });
  });
});

it('renders staff notification if user is not staff', async () => {
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

  jest.spyOn(authSelectors, 'isAuthenticatedSelector').mockReturnValue(true);
  jest
    .spyOn(authSelectors, 'userSelector')
    .mockReturnValue({ profile: { email: 'test@test.fi' } } as any);

  const testText = 'testText';
  renderWithRoute(<PageLayout>{testText}</PageLayout>, {
    routes: ['/'],
    mocks,
  });

  await screen.findByText(testText);

  // Notification should be visible when user is not staff
  expect(screen.queryByText('Ilmoitus')).toBeInTheDocument();
  expect(
    screen.queryByText('Hanki oikeus tapahtumien julkaisuun tällä')
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('link', {
      name: /lomakkeella \(avataan uudessa välilehdessä\)/i,
    })
  ).toBeInTheDocument();
});
