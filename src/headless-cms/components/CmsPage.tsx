import React from 'react';
import { useParams } from 'react-router';

import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import { Page } from '../../generated/graphql-cms';
import { useCmsNavigation } from '../hooks';
import { usePageQuery } from '../usePageQuery';
import CmsPageContent from './CmsPageContent';
import CmsPageNavigation from './CmsPageNavigation';
import CmsPageSearch from './CmsPageSearch/CmsPageSearch';

const SEARCH_PANEL_TRESHOLD = 1;

const CmsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: pageData, loading: loadingPage } = usePageQuery(slug);
  const { navigation, loading: loadingNavigation } = useCmsNavigation(slug);
  const page = pageData?.page;

  const showSearch =
    (page?.children?.nodes?.length ?? 0) > SEARCH_PANEL_TRESHOLD;

  return (
    <LoadingSpinner isLoading={loadingPage || loadingNavigation}>
      <div>
        {navigation && <CmsPageNavigation navigation={navigation} />}
        {page && <CmsPageContent page={page} />}
        {showSearch && <CmsPageSearch page={page as Page} />}
      </div>
    </LoadingSpinner>
  );
};

export type NavigationObject = {
  uri: string;
  locale: string;
  title: string;
};

export default CmsPage;
