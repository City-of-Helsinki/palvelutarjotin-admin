import * as React from 'react';

import useIsSmallScreen from '../../../hooks/useIsSmallScreen';
import styles from './header.module.scss';
import MobileNavbar from './MobileNavbar';
import Navbar from './Navbar';

const Header: React.FC = () => {
  const isSmallScreen = useIsSmallScreen();

  return (
    <header className={styles.headerWrapper}>
      {isSmallScreen ? <MobileNavbar /> : <Navbar />}
    </header>
  );
};

export default Header;
