import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../domain/app/routes/constants';
import { Page } from '../../generated/graphql-cms';

const CmsPageNavigation: React.FC<{
  page: Page | undefined | null;
}> = ({ page }): JSX.Element => {
  const parentPage = page?.parent?.node as Page;
  const childrenPages = (page?.children?.nodes as Page[]) ?? [];

  return (
    <div>
      <p>CmsPageNavigation {page?.id}</p>
      Parent:
      <ul>
        {parentPage && (
          <li>
            <Link
              to={`${ROUTES.CMS_PAGE.replace(
                ':id',
                parentPage.translation?.id as string
              )}`}
            >
              {parentPage.translation?.title}
            </Link>
          </li>
        )}
      </ul>
      Children:
      <ul>
        {childrenPages
          .filter((subPage) => subPage != null)
          .map((subPage) => (
            <li>
              <Link
                to={`${ROUTES.CMS_PAGE.replace(
                  ':id',
                  subPage?.translation?.id as string
                )}`}
              >
                {subPage?.translation?.title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CmsPageNavigation;
