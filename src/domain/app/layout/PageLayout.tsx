import classNames from 'classnames';
import React from 'react';

import Footer from '../footer/Footer';
import Header from '../header/Header';
import { useMobileMenuContext } from '../mobileMenu/MobileMenu';
import styles from './pageLayout.module.scss';

const PageLayout: React.FC = ({ children }) => {
  const { isMobileMenuOpen } = useMobileMenuContext();
  return (
    <div className={styles.pageLayout}>
      <Header />

      <div
        aria-hidden={isMobileMenuOpen}
        className={classNames(styles.pageBody, {
          [styles.mobileMenuOpen]: isMobileMenuOpen,
        })}
      >
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default PageLayout;
