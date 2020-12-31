import * as React from 'react';
import * as reduxFuncs from 'react-redux';

import {
  fakeOrganisations,
  fakePerson,
} from '../../../../../utils/mockDataUtils';
import { render, screen, userEvent } from '../../../../../utils/testUtils';
import { ORGANISATION_ACTIONS } from '../../../../organisation/constants';
import { ROUTES } from '../../../routes/constants';
import UserDropdown from '../UserDropdown';

const personName = 'Testi Testaaja';
const organisationId = 'organisationId1';

const profileMock = fakePerson({
  organisations: fakeOrganisations(3, [
    { name: 'Organisaatio 1' },
    { name: 'Organisaatio 2' },
    { name: 'Organisaatio 3', id: organisationId },
  ]),
  name: personName,
});

it('matches snapshot', () => {
  const { container } = render(
    <UserDropdown myProfileData={{ myProfile: profileMock }} />
  );

  userEvent.click(
    screen.getByRole('button', { name: 'Avaa käyttäjän valikko' })
  );

  expect(container).toMatchSnapshot();
});

it('renders dropdown correctly', () => {
  const dispatchMock = jest.fn();
  jest.spyOn(reduxFuncs, 'useDispatch').mockReturnValue(dispatchMock);

  const { history } = render(
    <UserDropdown myProfileData={{ myProfile: profileMock }} />
  );

  const push = jest.spyOn(history, 'push');

  userEvent.click(
    screen.getByRole('button', { name: 'Avaa käyttäjän valikko' })
  );

  expect(
    screen.getByRole('menuitem', {
      name: 'Organisaatio 1',
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('menuitem', {
      name: 'Organisaatio 2',
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('menuitem', {
      name: 'Organisaatio 3',
    })
  ).toBeInTheDocument();

  expect(
    screen.queryByRole('menuitem', {
      name: 'Kirjaudu ulos',
    })
  ).toBeInTheDocument();

  userEvent.click(
    screen.getByRole('menuitem', {
      name: 'Organisaatio 3',
    })
  );

  expect(dispatchMock).toHaveBeenCalledWith({
    payload: organisationId,
    type: ORGANISATION_ACTIONS.SET_ACTIVE_ORGANISATION,
  });

  userEvent.click(
    screen.getByRole('menuitem', {
      name: 'Omat tiedot',
    })
  );

  expect(push).toHaveBeenCalledWith(`/fi${ROUTES.MY_PROFILE}`);
});
