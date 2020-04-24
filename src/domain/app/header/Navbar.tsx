import { IconPerson } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { SUPPORT_LANGUAGES } from '../../../constants';
import useLocale from '../../../hooks/useLocale';
import { Language } from '../../../types';
import updateLocaleParam from '../../../utils/updateLocaleParam';
import { loginTunnistamo, logoutTunnistamo } from '../../auth/authenticate';
import { userSelector } from '../../auth/selectors';
import Container from '../layout/Container';
import LanguageDropdown from './LanguageDropdown';
import styles from './navbar.module.scss';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();
  const { pathname, search } = useLocation();
  const user = useSelector(userSelector);

  const languageOptions = Object.values(SUPPORT_LANGUAGES).map((language) => {
    return {
      label: t(`header.languages.${language}`),
      value: language as Language,
    };
  });

  const changeLanguage = (newLanguage: Language) => {
    history.push({
      pathname: updateLocaleParam(pathname, locale, newLanguage),
      search,
    });
  };

  const login = () => {
    loginTunnistamo();
  };

  const logout = () => {
    logoutTunnistamo();
  };

  return (
    <Container>
      <div className={styles.navbarTop}>
        <div className={styles.logoWrapper}>
          <Link aria-label={t('header.ariaLabelLogo')} to={'/'}>
            <div className={styles.logo} />
            <div className={styles.appName}>{t('appName')}</div>
          </Link>
        </div>
        {!!user ? (
          <button onClick={logout} className={styles.loginButton}>
            {t('header.logout')}
            <IconPerson />
          </button>
        ) : (
          <button onClick={login} className={styles.loginButton}>
            {t('header.login')}
            <IconPerson />
          </button>
        )}

        <LanguageDropdown
          languageOptions={languageOptions}
          onChange={changeLanguage}
          value={locale}
        />
      </div>
    </Container>
  );
};

export default Navbar;
