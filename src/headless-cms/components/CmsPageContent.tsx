import React from 'react';
import { useParams } from 'react-router';

import { usePageQuery } from '../../generated/graphql-cms';
import apolloClient from '../client';

const CmsPageContent = (): JSX.Element => {
  const { id: pageId } = useParams<{ id: string }>();
  const { data: page, loading } = usePageQuery({
    client: apolloClient,
    variables: {
      id: pageId,
    },
  });
  return (
    <div>
      {!loading && !!page?.page && (
        <div>
          <p>CmsPageContent {pageId}</p>
          <div
            dangerouslySetInnerHTML={{
              __html: page?.page?.content ?? '',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CmsPageContent;
