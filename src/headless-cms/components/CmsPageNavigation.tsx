/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import Container from '../../domain/app/layout/Container';
import { getCmsPath } from '../../domain/app/routes/utils';
import useLocale from '../../hooks/useLocale';
import { uriToBreadcrumbs } from '../utils';
import { NavigationObject } from './CmsPage';
import styles from './cmsPage.module.scss';

export const cmsNavigationContainerTestId = 'cms-navigation-container';

const CmsPageNavigation: React.FC<{
  navigation?: NavigationObject[][];
}> = ({ navigation }): JSX.Element => {
  const router = useLocation();
  const locale = useLocale();

  const isActiveLink = (uri: string) => {
    const breadcrumbs = uriToBreadcrumbs(`${router.pathname}/`);
    return breadcrumbs.some((b) => b === uri);
  };

  return (
    <nav data-testid={cmsNavigationContainerTestId}>
      {navigation?.map((navigationArray, index) => {
        return (
          <div className={styles.navigationRowContainer} key={index}>
            <Container className={styles.container}>
              <div className={styles.navigationRow} key={index}>
                {navigationArray
                  ?.sort((a, b) => a.title.localeCompare(b.title))
                  .map((n) => {
                    const uri = getCmsPath(n.uri);
                    return (
                      <Link
                        key={n.uri}
                        className={classNames({
                          [styles.activeLink]: isActiveLink(uri),
                        })}
                        to={`/${locale}${uri}`}
                      >
                        <span>{n.title}</span>
                      </Link>
                    );
                  })}
              </div>
            </Container>
          </div>
        );
      })}
    </nav>
  );
};

export default CmsPageNavigation;
