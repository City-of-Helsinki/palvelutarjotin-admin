import * as React from 'react';
import { useTranslation } from 'react-i18next';

import HeroBackground from '../heroBackground/HeroBackground';
import Container from '../layout/Container';
import PageWrapper from '../layout/PageWrapper';
import styles from './RegistrationPendingPage.module.scss';

const RegistrationPendingPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageWrapper
      className={styles.registerNotificationPage}
      title="registrationPendingPage.title1"
    >
      <HeroBackground />
      <Container className={styles.contentContainer}>
        <h1>{t('registrationPendingPage.title1')}</h1>
        <div className={styles.content}>
          <div>
            <h2>{t('registrationPendingPage.title2')}</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </Container>
    </PageWrapper>
  );
};

export default RegistrationPendingPage;
