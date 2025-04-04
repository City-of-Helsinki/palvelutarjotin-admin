import classNames from 'classnames';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import styles from './pageWrapper.module.scss';
import useLocale from '../../../hooks/useLocale';

interface Props {
  className?: string;
  title?: string;
  children?: React.ReactNode;
}

const PageWrapper: React.FC<Props> = ({
  children,
  className,
  title = 'appName',
}) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { pathname } = useLocation();

  const translatedTitle =
    title !== 'appName' ? `${t(title)} - ${t('appName')}` : t('appName');

  let path = pathname.replace(`/${locale}`, '');
  path = path.startsWith('/') ? path.slice(1) : path;

  return (
    <div className={classNames(styles.pageWrapper, className)}>
      <Helmet>
        <html lang={locale} />
        <title>{translatedTitle}</title>
        <link rel="alternate" hrefLang="fi" href={'/fi/' + path} />
        <link rel="alternate" hrefLang="sv" href={'/sv/' + path} />
        <link rel="alternate" hrefLang="en" href={'/en/' + path} />
      </Helmet>
      {children}
    </div>
  );
};

export default PageWrapper;
