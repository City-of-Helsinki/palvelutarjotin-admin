import React from 'react';
import { useLocation } from 'react-router-dom';

export const useQuery = () => {
  const search = useLocation().search;

  const query = React.useMemo(() => {
    return new URLSearchParams(search);
  }, [search]);

  return query;
};
