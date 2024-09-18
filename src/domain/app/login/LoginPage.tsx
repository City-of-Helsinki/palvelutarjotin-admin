import { Button, useOidcClient } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Container from '../layout/Container';
import PageWrapper from '../layout/PageWrapper';
import styles from './loginPage.module.scss';

const LoginPage = () => {
  const { t } = useTranslation();
  const { login } = useOidcClient();

  const handleLogin = () => {
    login();
  };

  return (
    <PageWrapper title="login.pageTitle">
      <div className={styles.loginPage}>
        <Container>
          <div className={styles.contentWrapper}>
            <h1>{t('login.title')}</h1>
            <Button onClick={handleLogin} variant="secondary">
              {t('login.buttonLogin')}
            </Button>
          </div>
        </Container>
      </div>
    </PageWrapper>
  );
};

export default LoginPage;
