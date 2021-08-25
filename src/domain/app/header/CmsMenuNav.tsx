import * as React from 'react';
import { Link } from 'react-router-dom';

import SkeletonLoader from '../../../common/components/skeletonLoader/SkeletonLoader';
import {
  LanguageCodeEnum,
  MenuNodeIdTypeEnum,
  Page,
  useMenuQuery,
} from '../../../generated/graphql-cms';
import apolloClient from '../../../headless-cms/client';
import { MENU_NAME } from '../../../headless-cms/constants';
import useHistory from '../../../hooks/useHistory';
import useLocale from '../../../hooks/useLocale';
import { ROUTES } from '../routes/constants';
import styles from './navbar.module.scss';

const CmsMenuNav = () => {
  const locale = useLocale();
  const history = useHistory();

  const { data: navigationItems, loading } = useMenuQuery({
    client: apolloClient,
    skip: !locale,
    variables: {
      id: MENU_NAME.Header,
      idType: MenuNodeIdTypeEnum.Name,
      language: locale.toString().toUpperCase() as LanguageCodeEnum,
    },
  });

  return loading || !navigationItems ? (
    <SkeletonLoader />
  ) : (
    <div>
      {navigationItems?.menu?.menuItems?.nodes
        ?.map((node, index) => {
          const page = node?.connectedNode?.node as Page;
          const item = page?.translation;
          if (!item) return null;
          const translatedPageId = item.id as string;
          return (
            <Link
              key={`headless-cms-header-${index}`}
              className={styles.navigationItem}
              to={`${ROUTES.CMS_PAGE.replace(':id', translatedPageId)}`}
            >
              {item.title}
            </Link>
          );
        })
        .filter((item) => item != null)}
    </div>
  );
};

export default CmsMenuNav;
