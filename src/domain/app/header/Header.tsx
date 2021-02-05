import * as React from 'react';
import { useTranslation } from 'react-i18next';

import useIsSmallScreen from '../../../hooks/useIsSmallScreen';
import { MAIN_CONTENT_ID } from '../layout/PageLayout';
import styles from './header.module.scss';
import MobileNavbar from './MobileNavbar';
import Navbar from './Navbar';

const Header: React.FC = () => {
  const isSmallScreen = useIsSmallScreen();
  const { t } = useTranslation();

  return (
    <header className={styles.headerWrapper}>
      <a
        className={styles.skipToContent}
        href={`#${MAIN_CONTENT_ID}`}
        aria-label={t('common.linkSkipToContent')}
      >
        {t('common.linkSkipToContent')}
      </a>
      {isSmallScreen ? <MobileNavbar /> : <Navbar />}
    </header>
  );
};

export default Header;
