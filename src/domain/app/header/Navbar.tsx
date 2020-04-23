import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import styles from './navbar.module.scss';

const Navbar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.navbarTop}>
      <div className={styles.logoWrapper}>
        <Link aria-label={t('header.ariaLabelLogo')} to={'/'}>
          <div className={styles.logo} />
          <div className={styles.appName}>{t('appName')}</div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
