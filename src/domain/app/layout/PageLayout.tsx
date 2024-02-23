import * as React from 'react';
import { useLocation } from 'react-router-dom';

import LoadingSpinner from '../../../common/components/loadingSpinner/LoadingSpinner';
import { TERMS_OF_SERVICE_SLUGS } from '../../../constants';
import { useMyProfileQuery } from '../../../generated/graphql';
import { useAppSelector } from '../../../hooks/useAppSelector';
import useLocale from '../../../hooks/useLocale';
import {
  isAuthenticatedSelector,
  isLoadingUserSelector,
} from '../../auth/selectors';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import LoginPage from '../login/LoginPage';
import { ROUTES } from '../routes/constants';
import { getCmsPath } from '../routes/utils';
import styles from './pageLayout.module.scss';
import ProtectedPageWrapper from './ProtectedPageWrapper';

export const MAIN_CONTENT_ID = 'main-content';

const PageLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation() ?? { pathname: '' };
  const isAuthenticated = useAppSelector(isAuthenticatedSelector);
  const isLoadingUser = useAppSelector(isLoadingUserSelector);
  const { loading: loadingMyProfile } = useMyProfileQuery({
    skip: !isAuthenticated,
  });
  const locale = useLocale();
  const isTermsOfServicePath = pathname.endsWith(
    `${getCmsPath('/' + TERMS_OF_SERVICE_SLUGS[locale])}`
  );

  return (
    <div className={styles.pageLayout}>
      <Header />
      <div className={styles.pageBody} id={MAIN_CONTENT_ID}>
        {/* Make sure that loading spinner is not restarted on callback page */}
        <LoadingSpinner
          isLoading={
            (isLoadingUser && !isAuthenticated) ||
            loadingMyProfile ||
            pathname === ROUTES.CALLBACK
          }
        >
          {isTermsOfServicePath ? (
            <>{children}</>
          ) : isAuthenticated || pathname === ROUTES.SILENT_CALLBACK ? (
            <ProtectedPageWrapper>{children}</ProtectedPageWrapper>
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
