import * as React from 'react';

import { usePlaceQuery } from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import getLocalizedString from '../../utils/getLocalizedString';

interface Props {
  id: string;
}

const PlaceText: React.FC<Props> = ({ id }) => {
  const locale = useLocale();
  const { data } = usePlaceQuery({
    variables: { id },
  });

  return <>{getLocalizedString(data?.place?.name || {}, locale)}</>;
};

export default PlaceText;
