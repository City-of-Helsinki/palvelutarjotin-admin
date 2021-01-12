import * as React from 'react';

import { usePlaceQuery } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import getLocalisedString from '../../../utils/getLocalizedString';

interface Props {
  placeId: string;
}

const PlaceText: React.FC<Props> = ({ placeId }) => {
  const locale = useLocale();
  const { data } = usePlaceQuery({
    variables: { id: placeId },
  });

  return <>{getLocalisedString(data?.place?.name || {}, locale)}</>;
};

export default PlaceText;
