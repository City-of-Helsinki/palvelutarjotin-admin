import React from 'react';

import { getCmsPath } from '../../../domain/app/routes/utils';
import { PageFieldsFragment } from '../../../generated/graphql-cms';
import { stripLocaleFromUri } from '../../utils';
import styles from './cmsSidebarContent.module.scss';
import CmsSidebarContentCard from './CmsSidebarContentCard';
import CmsSidebarContentLayoutLinkList from './CmsSidebarContentLayoutLinkList';

type Props = {
  content?: PageFieldsFragment['sidebar'];
};

type PostListItemProps = {
  id?: string | null;
  title?: string | null;
  uri?: string | null;
  featuredImage?: {
    node?: {
      mediaItemUrl?: string | null;
      altText?: string | null;
    } | null;
  } | null;
};

const PostListItem = ({ id, title, uri, featuredImage }: PostListItemProps) => {
  if (!title || !uri) {
    return null;
  }

  return (
    <li key={id}>
      <CmsSidebarContentCard
        title={title}
        // Remove language parameter uri because it's in the incorrect
        // position
        url={getCmsPath(stripLocaleFromUri(uri))}
        image={featuredImage?.node?.mediaItemUrl || undefined}
        imageAlt={featuredImage?.node?.altText || undefined}
      />
    </li>
  );
};

const CmsSidebarContent: React.FC<Props> = ({ content }) => {
  return (
    <ul className={styles.container}>
      {content?.map((item) => {
        if (item?.__typename === 'LayoutLinkList') {
          return (
            <li key={item.title}>
              <CmsSidebarContentLayoutLinkList
                title={item.title}
                links={item.links}
                description={item.description}
                anchor={item.anchor}
              />
            </li>
          );
        }

        if (item?.__typename === 'LayoutPages') {
          return item?.pages?.map((page) => (
            <PostListItem key={page?.id} {...page} />
          ));
        }

        if (item?.__typename === 'LayoutArticles') {
          return item?.articles?.map((article) => (
            <PostListItem key={article?.id} {...article} />
          ));
        }

        return null;
      })}
    </ul>
  );
};

export default CmsSidebarContent;
