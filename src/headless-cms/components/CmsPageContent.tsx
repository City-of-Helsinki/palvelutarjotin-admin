import React from 'react';
import { HtmlToReact } from 'react-helsinki-headless-cms';

import styles from './cmsPage.module.scss';
import CmsSidebarContent from './cmsSidebarContent/CmsSidebarContent';
import Container from '../../domain/app/layout/Container';
import { PageFieldsFragment } from '../../generated/graphql-cms';

const CmsPageContent: React.FC<{
  page?: PageFieldsFragment | null;
}> = ({ page }) => {
  const title = page?.title || '';
  const content = page?.content || '';
  const sidebar = page?.sidebar || [];

  return (
    <Container>
      {page && (
        <div className={styles.cmsSidebarLayout}>
          <div className={styles.cmsSidebarLayoutMain}>
            <h1>{title}</h1>
            <HtmlToReact>{content}</HtmlToReact>
          </div>
          <aside
            className={styles.cmsSidebarLayoutAside}
            data-testid="cms-sidebar-layout-sidebar"
          >
            <CmsSidebarContent content={sidebar} />
          </aside>
        </div>
      )}
    </Container>
  );
};

export default CmsPageContent;
