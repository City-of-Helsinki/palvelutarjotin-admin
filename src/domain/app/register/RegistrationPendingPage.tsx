import { Koros } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Container from '../layout/Container';
import PageWrapper from '../layout/PageWrapper';
import styles from './RegistrationPendingPage.module.scss';

const BANNER_IMAGE = '/images/Paperboat.png';

const RegistrationPendingPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageWrapper
      className={styles.registerNotificationPage}
      title="registrationPendingPage.title1"
    >
      <div
        className={styles.bannerHeroContainer}
        test-id="banner-hero-image"
        style={{
          backgroundImage: `url(${BANNER_IMAGE})`,
        }}
      >
        <div style={{ height: '300px' }} />
        <Koros className={styles.koros} />
      </div>
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
