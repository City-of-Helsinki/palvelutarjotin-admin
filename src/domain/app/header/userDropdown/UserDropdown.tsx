import { IconArrowRight, IconUser } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import MenuDropdown from '../../../../common/components/menuDropdown/MenuDropdown';
import { MyProfileQuery } from '../../../../generated/graphql';
import useLocale from '../../../../hooks/useLocale';
import { logoutTunnistamo } from '../../../auth/authenticate';
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
  const history = useHistory();
  const locale = useLocale();

  const goToEditMyProfile = () => {
    history.push(`/${locale}${ROUTES.MY_PROFILE}`);
  };

  const logout = () => {
    logoutTunnistamo();
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
