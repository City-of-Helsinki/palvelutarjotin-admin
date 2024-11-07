import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './cmsSidebarContentCard.module.scss';

type Props = {
  title: string;
  url: string;
  image?: string;
  imageAlt?: string;
};

const CmsSidebarContentCard: React.FC<Props> = ({
  title,
  url,
  image,
  imageAlt,
}) => {
  return (
    <div
      className={classNames(styles.container, {
        [styles.withoutImage]: !image,
      })}
    >
      {image && (
        <div className={styles.image}>
          <img src={image} alt={imageAlt ?? ''} />
        </div>
      )}
      <h2 className={styles.title}>
        <Link to={url}>{title}</Link>
      </h2>
    </div>
  );
};

export default CmsSidebarContentCard;
