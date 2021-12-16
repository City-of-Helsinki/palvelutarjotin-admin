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
              Käsittelemme rekisteröitymisesi viimeistään seuraavana
              arkipäivänä. Saat sähköpostiisi ilmoituksen, kun käyttäjätilisi on
              aktivoitu.
            </p>
            <h3>Lisätietoja</h3>
            <address>
              Katri Aikio
              <br />
              katri.aikio@hel.fi
              <br />
              0404866869
              <br />
              Kultus
            </address>
          </div>
        </div>
      </Container>
    </PageWrapper>
  );
};

export default RegistrationPendingPage;
