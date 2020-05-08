import React from 'react';

import { useKeywordQuery } from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import getLocalizedString from '../../utils/getLocalizedString';

interface Props {
  id: string;
}

const KeywordText: React.FC<Props> = ({ id }) => {
  const locale = useLocale();
  const { data } = useKeywordQuery({
    variables: { id },
  });

  return <>{getLocalizedString(data?.keyword?.name || {}, locale)}</>;
};

export default KeywordText;
