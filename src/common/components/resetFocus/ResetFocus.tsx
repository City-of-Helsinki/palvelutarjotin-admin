import React from 'react';

export const resetFocusId = 'reset-focus';

/**
 * Ensure that browser focus is set to body when navigating using
 * <Link> from react-router.
 */
const ResetFocus = (): React.ReactElement => {
  const pathname = window?.location?.pathname;
  const node = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const isClient = typeof window !== 'undefined';
    if (isClient) {
      node.current?.focus();
    }
  }, [pathname]);

  return <div ref={node} tabIndex={-1} id={resetFocusId} />;
};

export default ResetFocus;
