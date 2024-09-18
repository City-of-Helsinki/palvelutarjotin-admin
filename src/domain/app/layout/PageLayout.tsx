import { useOidcClient } from 'hds-react';
import * as React from 'react';
import { useLocation } from 'react-router-dom';

import LoadingSpinner from '../../../common/components/loadingSpinner/LoadingSpinner';
import { TERMS_OF_SERVICE_SLUGS } from '../../../constants';
import { useMyProfileQuery } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import LoginPage from '../login/LoginPage';
import { getCmsPath } from '../routes/utils';
import styles from './pageLayout.module.scss';
import ProtectedPageWrapper from './ProtectedPageWrapper';

export const MAIN_CONTENT_ID = 'main-content';

const PageLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation() ?? { pathname: '' };
  const { isAuthenticated } = useOidcClient();
  const isLoggedIn = isAuthenticated();
  const { loading: loadingMyProfile } = useMyProfileQuery({
    skip: !isLoggedIn,
  });
  const locale = useLocale();
  const isTermsOfServicePath = pathname.endsWith(
    `${getCmsPath('/' + TERMS_OF_SERVICE_SLUGS[locale])}`
  );

  return (
    <div className={styles.pageLayout}>
      <Header />
      <div className={styles.pageBody} id={MAIN_CONTENT_ID}>
        <LoadingSpinner isLoading={loadingMyProfile}>
          {isTermsOfServicePath ? (
            <> {children}</>
          ) : isLoggedIn ? (
            <ProtectedPageWrapper>{children}</ProtectedPageWrapper>
          ) : (
            <LoginPage />
          )}
        </LoadingSpinner>
      </div>
      <Footer />
    </div>
  );
};

export default PageLayout;
