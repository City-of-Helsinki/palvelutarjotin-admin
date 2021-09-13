import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import Container from '../../domain/app/layout/Container';
import { getCmsPath } from '../../domain/app/routes/utils';
import { Page } from '../../generated/graphql-cms';
import useLocale from '../../hooks/useLocale';
import { Breadcrumb, useCmsNavigation } from '../hooks';
import { usePageQuery } from '../usePageQuery';
import { stripLocaleFromUri } from '../utils';
import styles from './cmsPage.module.scss';
import CmsPageContent from './CmsPageContent';
import CmsPageNavigation from './CmsPageNavigation';
import CmsPageSearch from './CmsPageSearch/CmsPageSearch';

export const SEARCH_PANEL_TRESHOLD = 5;

const CmsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: pageData, loading: loadingPage } = usePageQuery(slug);
  const {
    navigation,
    breadcrumbs,
    loading: loadingNavigation,
  } = useCmsNavigation(slug);
  const page = pageData?.page;

  const showSearch =
    (page?.children?.nodes?.length ?? 0) > SEARCH_PANEL_TRESHOLD;

  return (
    <LoadingSpinner isLoading={loadingPage || loadingNavigation}>
      <div>
        {navigation && <CmsPageNavigation navigation={navigation} />}
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
      <ul className={styles.breadcrumbList}>
        {!!breadcrumbs.length && (
          <li>
            <Link to="/">{t('cms.linkFrontPage')}</Link>
          </li>
        )}
        {breadcrumbs.map((breadcrumb, index, all) => {
          const uriWithoutLocale = stripLocaleFromUri(breadcrumb.uri);
          const to = `/${locale}${getCmsPath(uriWithoutLocale)}`;
          const isLastItem = all.length === index + 1;
          return (
            <li>
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
