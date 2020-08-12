import classNames from 'classnames';
import React from 'react';

import IconLoadingSpinner from '../../../icons/IconLoadingSpinner';
import styles from './loadingSpinner.module.scss';

interface Props {
  hasPadding?: boolean;
  isLoading: boolean;
}

const LoadingSpinner: React.FC<Props> = ({
  hasPadding = true,
  isLoading,
  children,
}) => {
  return (
    <>
      {isLoading ? (
        <div
          className={classNames(styles.spinnerWrapper, {
            [styles.hasPadding]: hasPadding,
          })}
          data-testid="loading-spinner"
        >
          <div className={styles.spinner}>
            <IconLoadingSpinner />
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default LoadingSpinner;
