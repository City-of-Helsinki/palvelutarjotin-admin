import { IconAngleRight, IconArrowRight, IconUser } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import MenuDropdown from '../../../../common/components/menuDropdown/MenuDropdown';
import {
  MyProfileQuery,
  OrganisationNodeFieldsFragment,
} from '../../../../generated/graphql';
import useLocale from '../../../../hooks/useLocale';
import { logoutTunnistamo } from '../../../auth/authenticate';
import { setActiveOrganisation } from '../../../organisation/actions';
import { ROUTES } from '../../routes/constants';

const MENU_ITEM_VALUES = {
  LOGOUT: 'logout',
  OPEN_MY_PROFILE: 'open_my_profile',
};

interface Props {
  myProfileData: MyProfileQuery;
}

const UserDropdown: React.FC<Props> = ({ myProfileData }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const locale = useLocale();

  const organisations: OrganisationNodeFieldsFragment[] =
    myProfileData.myProfile?.organisations.edges.map((edge) => ({
      ...(edge?.node as OrganisationNodeFieldsFragment),
    })) || [];

  const goToEditMyProfile = () => {
    history.push(`/${locale}${ROUTES.MY_PROFILE}`);
  };

  const logout = () => {
    logoutTunnistamo();
  };

  const changeActiveOrganisation = (id: string) => {
    dispatch(setActiveOrganisation(id));
  };

  return (
    <MenuDropdown
      buttonAriaLabel={t('header.userMenu.ariaLabelButton')}
      buttonText={myProfileData.myProfile?.name || ''}
      icon={<IconUser />}
      items={[
        {
          icon: <IconUser />,
          onClick: goToEditMyProfile,
          text: t('header.userMenu.openMyProfile'),
          value: MENU_ITEM_VALUES.OPEN_MY_PROFILE,
        },
        ...organisations?.map((organisation) => ({
          icon: <IconAngleRight />,
          onClick: changeActiveOrganisation,
          text: organisation.name || '',
          value: organisation.id || '',
        })),
        {
          icon: <IconArrowRight />,
          onClick: logout,
          text: t('header.userMenu.logout'),
          value: MENU_ITEM_VALUES.LOGOUT,
        },
      ]}
    />
  );
};

export default UserDropdown;
