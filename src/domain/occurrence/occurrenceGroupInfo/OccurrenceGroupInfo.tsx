import React from 'react';
import { useTranslation } from 'react-i18next';

import { OccurrenceFieldsFragment } from '../../../generated/graphql';

interface Props {
  occurrence: OccurrenceFieldsFragment;
}

const OccurrenceGroupInfo: React.FC<Props> = ({ occurrence }) => {
  const { t } = useTranslation();

  const languages = occurrence.languages.map((language) => language.id);
  const amountOfSeats = occurrence.amountOfSeats;
  const maxGroupSize = occurrence.maxGroupSize;
  const minGroupSize = occurrence.minGroupSize;
  const groupInfo = [
    t('occurrenceDetails.textAmountOfSeats', {
      count: amountOfSeats,
    }),
    t('occurrenceDetails.textGroupInfo', {
      maxGroupSize,
      minGroupSize,
    }),
    languages
      ?.map((language) => t(`occurrenceDetails.languages.${language}`))
      .join(', '),
  ]
    .filter((e) => e)
    .join(', ');

  return <p>{groupInfo}</p>;
};

export default OccurrenceGroupInfo;
