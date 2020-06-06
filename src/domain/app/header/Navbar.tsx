import { IconPerson } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useMyProfileQuery } from '../../../generated/graphql';
import { logoutTunnistamo } from '../../auth/authenticate';
import { isAuthenticatedSelector } from '../../auth/selectors';
import Container from '../layout/Container';
import LanguageDropdown from './languageDropdown/LanguageDropdown';
import styles from './navbar.module.scss';
import UserDropdown from './userDropdown/UserDropdown';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { data: myProfileData } = useMyProfileQuery({ skip: !isAuthenticated });

  const logout = () => {
    logoutTunnistamo();
  };

  const hasProfile = Boolean(myProfileData?.myProfile);
  return (
    <Container>
      <div className={styles.navbarTop}>
        <div className={styles.logoWrapper}>
          <Link aria-label={t('header.ariaLabelLogo')} to={'/'}>
            <div className={styles.logo} />
            <div className={styles.appName}>{t('appName')}</div>
          </Link>
        </div>
        {myProfileData && !hasProfile && (
          <button onClick={logout} className={styles.logoutButton}>
            {t('header.userMenu.logout')}
            <IconPerson />
          </button>
        )}

        {myProfileData && hasProfile && (
          <UserDropdown myProfileData={myProfileData} />
        )}

        <LanguageDropdown />
      </div>
    </Container>
  );
};

export default Navbar;
