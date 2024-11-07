import { Koros } from 'hds-react';
import * as React from 'react';

import styles from './heroBackground.module.scss';

const BANNER_IMAGE = '/images/Paperboat.png';

const HeroBackground: React.FC<{ height?: number }> = ({ height = 300 }) => (
  <div
    className={styles.bannerHeroContainer}
    data-testid="banner-hero-image"
    style={{
      backgroundImage: `url(${BANNER_IMAGE})`,
    }}
  >
    <div style={{ height: `${height}px` }} />
    <Koros className={styles.koros} />
  </div>
);

export default HeroBackground;
