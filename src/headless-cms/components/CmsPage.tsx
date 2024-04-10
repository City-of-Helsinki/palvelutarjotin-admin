import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import Container from '../../domain/app/layout/Container';
import { getCmsPath } from '../../domain/app/routes/utils';
import { Page } from '../../generated/graphql-cms';
import useLocale from '../../hooks/useLocale';
import { Breadcrumb, useCmsNavigation } from '../hooks';
import { usePageQuery } from '../usePageQuery';
import { stripLocaleFromUri, unescapeDash } from '../utils';
import styles from './cmsPage.module.scss';
import CmsPageContent from './CmsPageContent';
import CmsPageSearch from './CmsPageSearch/CmsPageSearch';

export const SEARCH_PANEL_TRESHOLD = 5;
export const breadcrumbsContainerTestId = 'breadcrumbs-container';

/**
 * In React router V6 there is no chance to create a dynamic RegExp URL pattern,
 * so all the stages must be handled explicitly.
 * https://reactrouter.com/en/main/upgrading/v5.
 * https://github.com/remix-run/react-router/discussions/8132
 */
const useReactRouterV6Uri = () => {
  const { slug, subslug, subsubslug, subsubsubslug } = useParams<{
    slug: string;
    subslug: string;
    subsubslug: string;
    subsubsubslug: string;
  }>();
  let uri = `/${slug}`;
  if (subslug) {
    uri += `/${subslug}`;
  }
  if (subsubslug) {
    uri += `/${subsubslug}`;
  }
  if (subsubsubslug) {
    uri += `/${subsubsubslug}`;
  }
  return uri;
};

const CmsPage: React.FC = () => {
  const uri = useReactRouterV6Uri();
  const locale = useLocale();
  const { pathname } = useLocation();
  const { data: pageData, loading: loadingPage } = usePageQuery(uri ?? '', {
    skip: !uri,
  });
  const { breadcrumbs, loading: loadingNavigation } = useCmsNavigation(
    uri ?? ''
  );
  const page = pageData?.page;

  const showSearch =
    (page?.children?.nodes?.length ?? 0) > SEARCH_PANEL_TRESHOLD;

  let path = pathname.replace(`/${locale}`, '');
  path = path.startsWith('/') ? path.slice(1) : path;

  const title = pageData?.page?.seo?.title;

  return (
    <LoadingSpinner isLoading={loadingPage || loadingNavigation}>
      <Helmet>
        <html lang={locale} />
        {title && <title>{unescapeDash(title)}</title>}
        <link rel="alternate" hrefLang="fi" href={'/fi/' + path} />
        <link rel="alternate" hrefLang="sv" href={'/sv/' + path} />
        <link rel="alternate" hrefLang="en" href={'/en/' + path} />
      </Helmet>
      <div className={styles.cmsPageContainer}>
        {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
        {page && <CmsPageContent page={page} />}
        {showSearch && <CmsPageSearch page={page as Page} />}
      </div>
    </LoadingSpinner>
  );
};

const Breadcrumbs: React.FC<{ breadcrumbs: Breadcrumb[] }> = ({
  breadcrumbs,
}) => {
  const locale = useLocale();
  const { t } = useTranslation();
  return (
    <Container className={styles.container}>
      <ul
        className={styles.breadcrumbList}
        data-testid={breadcrumbsContainerTestId}
      >
        {!!breadcrumbs.length && (
          <li key="front-page">
            <Link to="/">{t('cms.linkFrontPage')}</Link>
          </li>
        )}
        {breadcrumbs.map((breadcrumb, index, all) => {
          const uriWithoutLocale = stripLocaleFromUri(breadcrumb.uri);
          const to = `/${locale}${getCmsPath(uriWithoutLocale)}`;
          const isLastItem = all.length === index + 1;
          return (
            <li key={breadcrumb.title}>
              {isLastItem ? (
                breadcrumb.title
              ) : (
                <Link to={to}>{breadcrumb.title}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

export type NavigationObject = {
  uri: string;
  locale: string;
  title: string;
};

export default CmsPage;
