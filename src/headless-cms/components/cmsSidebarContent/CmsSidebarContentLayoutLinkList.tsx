import { IconArrowRight } from 'hds-react';
import React from 'react';
import { HtmlToReact } from 'react-helsinki-headless-cms';

import ExternalLink from '../../../common/components/externalLink/ExternalLink';
import styles from './cmsSidebarContentLayoutLinkList.module.scss';

type Link = {
  target?: string | null;
  title?: string | null;
  url?: string | null;
};

type Props = {
  anchor?: string | null;
  title?: string | null;
  description?: string | null;
  links?: Array<{
    target?: string | null;
    title?: string | null;
    url?: string | null;
  } | null> | null;
};

const CmsSidebarContentLayoutLinkList: React.FC<Props> = ({
  anchor,
  title,
  description,
  links,
}) => {
  return (
    // I assumed that the anchor references the ID that an anchor element may
    // target with href="#anchor"
    <div id={anchor || undefined}>
      <h2>{title}</h2>
      {description && (
        <div className={styles.descriptionContainer}>
          <HtmlToReact>{description}</HtmlToReact>
        </div>
      )}
      <ul className={styles.linkList}>
        {links
          ?.filter((item): item is Link => Boolean(item))
          .map((link) => (
            <li key={link.title}>
              {link.target === '_blank' ? (
                <ExternalLink
                  href={link.url || '#'}
                  className={styles.link}
                  iconPosition="left"
                >
                  {link.title}
                </ExternalLink>
              ) : (
                <a href={link.url || '#'} className={styles.link}>
                  <IconArrowRight aria-hidden="true" />
                  {link.title}
                </a>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CmsSidebarContentLayoutLinkList;
