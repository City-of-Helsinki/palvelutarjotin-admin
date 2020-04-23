import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { SUPPORT_LANGUAGES } from '../../../constants';
import useLocale from '../../../hooks/useLocale';
import { Language } from '../../../types';
import updateLocaleParam from '../../../utils/updateLocaleParam';
import Container from '../layout/Container';
import LanguageDropdown from './LanguageDropdown';
import styles from './navbar.module.scss';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();
  const { pathname, search } = useLocation();

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

  return (
    <Container>
      <div className={styles.navbarTop}>
        <div className={styles.logoWrapper}>
          <Link aria-label={t('header.ariaLabelLogo')} to={'/'}>
            <div className={styles.logo} />
            <div className={styles.appName}>{t('appName')}</div>
          </Link>
        </div>

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
