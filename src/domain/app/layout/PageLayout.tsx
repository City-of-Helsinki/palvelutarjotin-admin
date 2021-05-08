import classNames from 'classnames';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import LoadingSpinner from '../../../common/components/loadingSpinner/LoadingSpinner';
import { useMyProfileQuery } from '../../../generated/graphql';
import {
  isAuthenticatedSelector,
  isLoadingUserSelector,
} from '../../auth/selectors';
import MyProfileWrapper from '../../myProfile/MyProfileWrapper';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import LoginPage from '../login/LoginPage';
import { useMobileMenuContext } from '../mobileMenu/MobileMenu';
import { ROUTES } from '../routes/constants';
import styles from './pageLayout.module.scss';

export const MAIN_CONTENT_ID = 'main-content';

const PageLayout: React.FC = ({ children }) => {
  const { pathname } = useLocation();
  const { isMobileMenuOpen } = useMobileMenuContext();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const isLoadingUser = useSelector(isLoadingUserSelector);
  const { loading: loadingMyProfile } = useMyProfileQuery({
    skip: !isAuthenticated,
  });

  return (
    <div className={styles.pageLayout}>
      <Header />
      <div
        aria-hidden={isMobileMenuOpen}
        className={classNames(styles.pageBody, {
          [styles.mobileMenuOpen]: isMobileMenuOpen,
        })}
        id={MAIN_CONTENT_ID}
      >
        {/* Make sure that loading spinner is not restarted on callback page */}
        <LoadingSpinner
          isLoading={
            (isLoadingUser && !isAuthenticated) ||
            loadingMyProfile ||
            pathname === ROUTES.CALLBACK
          }
        >
          {isAuthenticated || pathname === ROUTES.SILENT_CALLBACK ? (
            <MyProfileWrapper>{children}</MyProfileWrapper>
          ) : (
            <LoginPage />
          )}
        </LoadingSpinner>
        {/* Render oidc callback */}
        {pathname === ROUTES.CALLBACK && children}
      </div>
      <Footer />
    </div>
  );
};

export default PageLayout;
