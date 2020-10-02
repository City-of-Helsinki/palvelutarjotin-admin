import React from 'react';

import { IS_CLIENT } from '../constants';

export default () => {
  const getSize = React.useCallback(() => {
    return {
      width: IS_CLIENT ? window.innerWidth : undefined,
      height: IS_CLIENT ? window.innerHeight : undefined,
    };
  }, []);

  const [windowSize, setWindowSize] = React.useState(getSize);

  React.useEffect(() => {
    if (!IS_CLIENT) {
      return;
    }
    const handleResize = () => {
      setWindowSize(getSize());
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [getSize]); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
};
