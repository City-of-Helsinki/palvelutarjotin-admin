import { MockedProvider } from '@apollo/react-testing';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import wait from 'waait';

import {
  MyProfileDocument,
  OrganisationsDocument,
} from '../../../../generated/graphql';
import * as grpahqlFns from '../../../../generated/graphql';
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
  { name: 'Organisaatio 1', id: 'organisation1' },
  { name: 'Organisaatio 2', id: 'organisation2' },
  { name: 'Organisaatio 3', id: 'organisation3' },
]);

const mocks = [
  {
    request: {
      query: MyProfileDocument,
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
    .spyOn(grpahqlFns, 'useCreateMyProfileMutation')
    .mockReturnValue([createProfileMock] as any);
  jest.spyOn(authSelectors, 'isAuthenticatedSelector').mockReturnValue(true);
  jest
    .spyOn(authSelectors, 'userSelector')
    .mockReturnValue({ profile: { email: 'test@test.fi' } } as any);
  const mocks = [
    {
      request: {
        query: MyProfileDocument,
      },
      result: {},
    },
    {
      request: {
        query: OrganisationsDocument,
        variables: {},
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

  expect(
    screen.queryByRole('heading', { name: 'Täydennä tietosi' })
  ).toBeInTheDocument();
  expect(
    screen.queryByText('Hei, tervetuloa Palvelutarjottimeen!')
  ).toBeInTheDocument();

  expect(screen.queryByText('test@test.fi')).toBeInTheDocument();

  userEvent.type(screen.getByLabelText('Nimi'), 'Testi Testaaja');
  userEvent.type(screen.getByLabelText('Puhelinnumero'), '123321123');

  // wait for organisation to load
  await act(wait);

  userEvent.click(
    screen.getByLabelText('Organisaatio', { selector: 'button' })
  );

  userEvent.click(screen.getByLabelText('Organisaatio 1'));
  userEvent.click(screen.getByLabelText('Organisaatio 2'));

  // close the dropdown
  userEvent.click(
    screen.getByLabelText('Organisaatio', { selector: 'button' })
  );

  await waitFor(() => {
    expect(screen.queryByLabelText('Organisaatio 1')).not.toBeInTheDocument();
  });

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
          phoneNumber: '123321123',
        },
      },
    });
  });
});
