import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IconSignin } from 'hds-react/icons';
import { useOidcClient } from 'hds-react';
import React from 'react';

// import InfoPageLayout from '../app/layout/InfoPageLayout';
import styles from './unauthorized.module.scss';
import adultFaceHappyIcon from '../../assets/icons/svg/adultFaceHappyTransparent.svg';
import useGetPathname from './utils/useGetPathname';

const LoginButton = () => {
  const { t } = useTranslation();
  return (
    <>
      {t('authentication.login.shortText')} <IconSignin size="s" />
    </>
  );
};

// todo: is that component needed with our protected routing?
const Unauthorized = () => {
  const { isAuthenticated, login } = useOidcClient();
  const navigate = useNavigate();
  const getPathname = useGetPathname();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const nextPath = searchParams.get('next');

  const isLoggedIn = isAuthenticated()

  const handleCallToActionClick = () => {
    login({ url_state: `next=${nextPath}` });
  };

  React.useEffect(() => {
    if (isLoggedIn) {
      // todo: test if localized path is needed
      navigate(nextPath || getPathname('/'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line no-console
  console.log("11111 Unauthorized");
  return null
  /* return (
    <InfoPageLayout
      icon={adultFaceHappyIcon}
      classes={styles.loginButtonTemplate}
      title={t('authentication.login.text')}
      callToAction={{
        label: <LoginButton />,
        onClick: handleCallToActionClick,
      }}
    />
  ); */
};

export default Unauthorized;
