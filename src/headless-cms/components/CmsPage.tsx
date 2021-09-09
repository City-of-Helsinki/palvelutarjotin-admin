import React from 'react';
import { useParams } from 'react-router';

import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import { useCmsNavigation } from '../hooks';
import { usePageQuery } from '../usePageQuery';
import CmsPageContent from './CmsPageContent';
import CmsPageNavigation from './CmsPageNavigation';

const CmsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: pageData, loading: loadingPage } = usePageQuery(slug);
  const { navigation, loading: loadingNavigation } = useCmsNavigation(slug);

  const page = pageData?.page;

  return (
    <LoadingSpinner isLoading={loadingPage || loadingNavigation}>
      <div>
        {navigation && <CmsPageNavigation navigation={navigation} />}
        {page && <CmsPageContent page={page} />}
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
