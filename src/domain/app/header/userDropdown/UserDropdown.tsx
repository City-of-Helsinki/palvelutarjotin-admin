import { IconAngleRight, IconArrowRight, IconUser } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import MenuDropdown from '../../../../common/components/menuDropdown/MenuDropdown';
import {
  MyProfileQuery,
  OrganisationNodeFieldsFragment,
} from '../../../../generated/graphql';
import useHistory from '../../../../hooks/useHistory';
import { logoutTunnistamo } from '../../../auth/authenticate';
import { setActiveOrganisation } from '../../../organisation/actions';
import { activeOrganisationSelector } from '../../../organisation/selector';
import { ROUTES } from '../../routes/constants';
import styles from './userDropdown.module.scss';

const MENU_ITEM_VALUES = {
  LOGOUT: 'logout',
  OPEN_MY_PROFILE: 'open_my_profile',
};

interface Props {
  myProfileData: MyProfileQuery;
}

const UserDropdown: React.FC<Props> = ({ myProfileData }) => {
  const { t } = useTranslation();
  const activeOrganisation = useSelector(activeOrganisationSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  const organisations: OrganisationNodeFieldsFragment[] =
    myProfileData.myProfile?.organisations.edges.map((edge) => ({
      ...(edge?.node as OrganisationNodeFieldsFragment),
    })) || [];

  const goToEditMyProfile = () => {
    history.pushWithLocale(ROUTES.MY_PROFILE);
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
          className:
            activeOrganisation === organisation.id
              ? styles.activeOrganisation
              : undefined,
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
