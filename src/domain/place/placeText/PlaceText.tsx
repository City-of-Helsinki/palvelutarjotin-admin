import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { usePlaceQuery } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import getLocalisedString from '../../../utils/getLocalizedString';

interface Props {
  placeId: string;
  errorText?: string;
}

const PlaceText: React.FC<Props> = ({ placeId, errorText = '' }) => {
  const locale = useLocale();
  const { t } = useTranslation();
  const { data } = usePlaceQuery({
    variables: { id: placeId },
  });
  const text = getLocalisedString(data?.place?.name || {}, locale);
  return <>{text || errorText}</>;
};

export default PlaceText;
