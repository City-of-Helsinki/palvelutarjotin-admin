import React from 'react';

import HtmlToReact from '../../common/components/htmlToReact/HtmlToReact';
import Container from '../../domain/app/layout/Container';
import { PageFieldsFragment } from '../../generated/graphql-cms';

const CmsPageContent: React.FC<{
  page?: PageFieldsFragment | null;
}> = ({ page }) => {
  const title = page?.title || '';
  const content = page?.content || '';

  return (
    <Container>
      <h1>{title}</h1>
      <HtmlToReact>{content}</HtmlToReact>
    </Container>
  );
};

export default CmsPageContent;
