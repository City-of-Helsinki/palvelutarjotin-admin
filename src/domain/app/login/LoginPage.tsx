import React from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../../../common/components/button/Button';
import { loginTunnistamo } from '../../auth/authenticate';
import Container from '../layout/Container';
import PageWrapper from '../layout/PageWrapper';
import styles from './loginPage.module.scss';

const LoginPage = () => {
  const { t } = useTranslation();

  const login = () => {
    loginTunnistamo();
  };

  return (
    <PageWrapper title="login.pageTitle">
      <div className={styles.loginPage}>
        <Container>
          <div className={styles.contentWrapper}>
            <h1>{t('login.title')}</h1>
            <Button onClick={login} color="secondary">
              {t('login.buttonLogin')}
            </Button>
          </div>
        </Container>
      </div>
    </PageWrapper>
  );
};

export default LoginPage;
