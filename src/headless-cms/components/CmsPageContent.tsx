import React from 'react';

import { Page } from '../../generated/graphql-cms';

const CmsPageContent: React.FC<{
  page: Page | undefined | null;
}> = ({ page }): JSX.Element => {
  if (!page) {
    // toast(t('cmspage.notFound'), {
    //   type: toast.TYPE.ERROR,
    // });
    return <div></div>;
  }

  return (
    <div>
      <h1>{page.translation?.title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: page?.translation?.content ?? '',
        }}
      />
    </div>
  );
};

export default CmsPageContent;