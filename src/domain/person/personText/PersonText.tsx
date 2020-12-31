import * as React from 'react';

import { usePersonQuery } from '../../../generated/graphql';

interface Props {
  id: string;
}

const PersonText: React.FC<Props> = ({ id }) => {
  const { data } = usePersonQuery({
    variables: { id },
  });

  return <>{data?.person?.name}</>;
};

export default PersonText;
