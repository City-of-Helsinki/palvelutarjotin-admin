import React from 'react';
import { useTranslation } from 'react-i18next';

import { OccurrenceQuery } from '../../../generated/graphql';

interface Props {
  occurrenceData: OccurrenceQuery;
}

const OccurrenceGroupInfo: React.FC<Props> = ({ occurrenceData }) => {
  const { t } = useTranslation();

  const languages = occurrenceData?.occurrence?.languages.map(
    (language) => language.id
  );
  const amountOfSeats = occurrenceData?.occurrence?.amountOfSeats;
  const maxGroupSize = occurrenceData?.occurrence?.maxGroupSize;
  const minGroupSize = occurrenceData?.occurrence?.minGroupSize;
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
