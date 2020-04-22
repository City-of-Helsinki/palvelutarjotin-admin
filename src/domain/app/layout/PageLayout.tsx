import React from 'react';

import styles from './pageLayout.module.scss';

const PageLayout: React.FC = ({ children }) => {
  return (
    <div className={styles.pageLayout}>
      {/* TODO: Add header component here when implemented */}
      <div>HEADER</div>

      <div className={styles.pageBody}>{children}</div>

      {/* TODO: Add footer component here when implemented */}
      <div>FOOTER</div>
    </div>
  );
};

export default PageLayout;
