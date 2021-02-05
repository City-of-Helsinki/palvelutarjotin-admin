import * as React from 'react';
import { matchPath, useLocation } from 'react-router';

import useLocale from '../../hooks/useLocale';

export const resetFocusId = 'reset-focus';

// Ensure that browser scrolls to top when pathname changes
const ScrollToTop: React.FC<{
  ignoredPaths: string[];
  forceScrollToTopPaths?: string[];
}> = ({ ignoredPaths, forceScrollToTopPaths = [] }) => {
  const { pathname } = useLocation();
  const locale = useLocale();
  const resetFocusNode = React.useRef<HTMLDivElement>(null);

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

  const resetScrollAndFocus = () => {
    resetFocusNode.current?.focus();
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (isMatch(forceScrollToTopPaths) || !isMatch(ignoredPaths)) {
      resetScrollAndFocus();
    }
  }, [forceScrollToTopPaths, ignoredPaths, isMatch]);

  return (
    <div
      ref={resetFocusNode}
      tabIndex={-1}
      id={resetFocusId}
      data-testid={resetFocusId}
    />
  );
};

export default ScrollToTop;
