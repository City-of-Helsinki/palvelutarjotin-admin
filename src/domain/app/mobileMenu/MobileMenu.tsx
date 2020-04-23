import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { SUPPORT_LANGUAGES } from '../../../constants';
import useLocale from '../../../hooks/useLocale';
import updateLocaleParam from '../../../utils/updateLocaleParam';
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
  const locale = useLocale();
  const location = useLocation();

  const getUrl = (newLanguage: string) => {
    return `${updateLocaleParam(location.pathname, locale, newLanguage)}${
      location.search
    }`;
  };

  // const onLinkClick = () => {
  //   onClose();
  // };

  return (
    <div
      aria-hidden={!isMenuOpen}
      className={classNames(styles.mobileMenu, {
        [styles.menuOpen]: isMenuOpen,
      })}
      style={{ visibility: isMenuOpen ? undefined : 'hidden' }}
    >
      <div className={styles.linkWrapper}>
        {/* <ul>
          <li className={styles.link}>
            <Link onClick={onLinkClick} to={`/${locale}/events`}>
              {t('header.searchEvents')}
            </Link>
          </li>
        </ul> */}
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
