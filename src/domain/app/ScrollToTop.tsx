import * as React from 'react';
import { matchPath, useLocation } from 'react-router';

import useLocale from '../../hooks/useLocale';

// Ensure that browser scrolls to top when pathname changes
const ScrollToTop: React.FC<{
  ignoredPaths: string[];
  forceScrollToTopPaths?: string[];
}> = ({ ignoredPaths, forceScrollToTopPaths = [] }) => {
  const { pathname } = useLocation();
  const locale = useLocale();

  const isMatch = React.useCallback(
    (paths: string[]) =>
      paths.some((path) =>
        matchPath(pathname, {
          path: `/${locale}${path}`,
          exact: true,
          strict: true,
        })
      ),
    [locale, pathname]
  );

  React.useEffect(() => {
    if (isMatch(forceScrollToTopPaths)) {
      scrollToTop();
    } else if (!isMatch(ignoredPaths)) {
      scrollToTop();
    }
  }, [forceScrollToTopPaths, ignoredPaths, isMatch]);

  return null;
};

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

export default ScrollToTop;
