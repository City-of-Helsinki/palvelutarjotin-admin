import React from 'react';
import { useLocation } from 'react-router';

// Ensure that browser scrolls to top when pathname changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
