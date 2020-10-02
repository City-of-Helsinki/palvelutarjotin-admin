import React from 'react';
import { matchPath, useLocation } from 'react-router';

import useLocale from '../../hooks/useLocale';

// Ensure that browser scrolls to top when pathname changes
const ScrollToTop: React.FC<{ ignoredPaths: string[] }> = ({
  ignoredPaths,
}) => {
  const { pathname } = useLocation();
  const locale = useLocale();

  React.useEffect(() => {
    const isIgnoredPath = ignoredPaths.some((path) =>
      matchPath(pathname, {
        path: `/${locale}${path}`,
        exact: true,
        strict: true,
      })
    );

    if (!isIgnoredPath) {
      window.scrollTo(0, 0);
    }
  }, [ignoredPaths, locale, pathname]);

  return null;
};

export default ScrollToTop;
