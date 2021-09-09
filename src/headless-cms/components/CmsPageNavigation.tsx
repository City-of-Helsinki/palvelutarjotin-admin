/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import Container from '../../domain/app/layout/Container';
import { ROUTES } from '../../domain/app/routes/constants';
import useLocale from '../../hooks/useLocale';
import { uriToBreadcrumbs } from '../utils';
import { NavigationObject } from './CmsPage';
import styles from './cmsPage.module.scss';

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
    <>
      {navigation?.map((navigationArray, index) => {
        return (
          <div className={styles.navigationRowContainer} key={index}>
            <Container className={styles.container}>
              <nav>
                <div className={styles.navigationRow} key={index}>
                  {navigationArray
                    ?.sort((a, b) => a.title.localeCompare(b.title))
                    .map((n) => {
                      const uri = ROUTES.CMS_PAGE.replace('/:slug', n.uri);
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
              </nav>
            </Container>
          </div>
        );
      })}
    </>
  );
};

export default CmsPageNavigation;
