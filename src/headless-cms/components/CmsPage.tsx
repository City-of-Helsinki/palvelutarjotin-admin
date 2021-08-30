import React from 'react';
import { useParams } from 'react-router';

import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import {
  LanguageCodeEnum,
  Page,
  usePageQuery,
} from '../../generated/graphql-cms';
import useLocale from '../../hooks/useLocale';
import apolloClient from '../client';
import CmsPageContent from './CmsPageContent';
import CmsPageNavigation from './CmsPageNavigation';

const CmsPage: React.FC = () => {
  const locale = useLocale();
  const { id: pageId } = useParams<{ id: string }>();
  const { data: pageData, loading } = usePageQuery({
    client: apolloClient,
    variables: {
      id: pageId,
      language: locale.toString().toUpperCase() as LanguageCodeEnum,
    },
  });

  return (
    <LoadingSpinner isLoading={loading}>
      <CmsPageNavigation page={pageData?.page as Page} />
      <CmsPageContent page={pageData?.page as Page} />
    </LoadingSpinner>
  );
};

export default CmsPage;
