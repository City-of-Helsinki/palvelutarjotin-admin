import { IconClose, IconMenu } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Container from '../layout/Container';
import MobileMenu, { useMobileMenuContext } from '../mobileMenu/MobileMenu';
import styles from './mobileNavbar.module.scss';

const MobileNavbar: React.FC = () => {
  const { t } = useTranslation();
  const {
    closeMobileMenu,
    isMobileMenuOpen,
    openMobileMenu,
  } = useMobileMenuContext();

  const handleCloseMenu = () => {
    closeMobileMenu();
  };

  const handleOpenMenu = () => {
    openMobileMenu();
  };

  return (
    <>
      <Container>
        <div className={styles.mobileNavbar}>
          <Link
            aria-label={t('header.ariaLabelLogo')}
            onClick={handleCloseMenu}
            to={'/'}
            className={styles.logoWrapper}
          >
            <div className={styles.logo} />
            <div className={styles.appName}>{t('appName')}</div>
          </Link>
          <div className={styles.buttonWrapper}>
            {isMobileMenuOpen ? (
              <button
                className={styles.closeButton}
                onClick={handleCloseMenu}
                aria-label={t('header.ariaButtonCloseMenu')}
              >
                <IconClose />
              </button>
            ) : (
              <button
                className={styles.menuButton}
                onClick={handleOpenMenu}
                aria-label={t('header.ariaButtonOpenMenu')}
              >
                <IconMenu />
              </button>
            )}
          </div>
        </div>
      </Container>
      <MobileMenu isMenuOpen={isMobileMenuOpen} onClose={handleCloseMenu} />
    </>
  );
};

export default MobileNavbar;
