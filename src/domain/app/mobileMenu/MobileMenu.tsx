import classNames from 'classnames';
import { IconPerson } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import { SUPPORT_LANGUAGES } from '../../../constants';
import { useMyProfileQuery } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import updateLocaleParam from '../../../utils/updateLocaleParam';
import { logoutTunnistamo } from '../../auth/authenticate';
import { isAuthenticatedSelector } from '../../auth/selectors';
import { ROUTES } from '../routes/constants';
import styles from './mobileMenu.module.scss';

interface MobileMenuContext {
  closeMobileMenu: () => void;
  isMobileMenuOpen: boolean;
  openMobileMenu: () => void;
}

export const MobileMenuContext = React.createContext<MobileMenuContext>({
  closeMobileMenu: () => null,
  isMobileMenuOpen: false,
  openMobileMenu: () => null,
});

export const MobileMenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const closeMobileMenu = React.useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const openMobileMenu = React.useCallback(() => {
    setIsMobileMenuOpen(true);
  }, []);

  return (
    <MobileMenuContext.Provider
      value={{
        closeMobileMenu,
        isMobileMenuOpen,
        openMobileMenu,
      }}
    >
      {children}
    </MobileMenuContext.Provider>
  );
};

export const useMobileMenuContext = (): MobileMenuContext =>
  React.useContext(MobileMenuContext);

interface Props {
  isMenuOpen: boolean;
  onClose: () => void;
}

const MobileMenuModal: React.FC<Props> = ({ isMenuOpen, onClose }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const locale = useLocale();
  const location = useLocation();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { data: myProfileData } = useMyProfileQuery({ skip: !isAuthenticated });

  const getUrl = (newLanguage: string) => {
    return `${updateLocaleParam(location.pathname, locale, newLanguage)}${
      location.search
    }`;
  };

  const goToEditMyProfile = () => {
    history.push(`/${locale}${ROUTES.MY_PROFILE}`);
    onClose();
  };

  const logout = () => {
    logoutTunnistamo();
    onClose();
  };

  const hasProfile = Boolean(myProfileData?.myProfile);

  return (
    <div
      aria-hidden={!isMenuOpen}
      className={classNames(styles.mobileMenu, {
        [styles.menuOpen]: isMenuOpen,
      })}
      style={{ visibility: isMenuOpen ? undefined : 'hidden' }}
    >
      <div className={styles.linkWrapper}>
        <ul>
          {!!hasProfile && (
            <li className={styles.link}>
              <Link onClick={goToEditMyProfile} to="#">
                <IconPerson />
                {t('header.userMenu.openMyProfile')}
              </Link>
            </li>
          )}
          {!!isAuthenticated && (
            <li className={styles.link}>
              <Link onClick={logout} to="#">
                <IconPerson />
                {t('header.userMenu.logout')}
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className={styles.languageSelectWrapper}>
        <ul>
          {Object.values(SUPPORT_LANGUAGES).map((language) => (
            <li
              key={language}
              className={classNames(styles.languageLink, {
                [styles.isSelected]: locale === language,
              })}
            >
              <Link lang={language} onClick={onClose} to={getUrl(language)}>
                {t(`header.languages.${language}`)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileMenuModal;
