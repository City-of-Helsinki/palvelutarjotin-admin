import * as React from 'react';
import { useTranslation } from 'react-i18next';

import {
  OccurrenceFieldsFragment,
  OccurrencesOccurrenceSeatTypeChoices,
} from '../../../generated/graphql';

interface Props {
  occurrence: OccurrenceFieldsFragment;
}

const OccurrenceGroupInfo: React.FC<Props> = ({ occurrence }) => {
  const { t } = useTranslation();

  const amountOfSeats = occurrence.amountOfSeats;
  const maxGroupSize = occurrence.maxGroupSize;
  const minGroupSize = occurrence.minGroupSize;
  const groupInfo = [
    occurrence.seatType === OccurrencesOccurrenceSeatTypeChoices.EnrolmentCount
      ? t('occurrenceDetails.textAmountOfGroups', {
          count: amountOfSeats,
        })
      : t('occurrenceDetails.textAmountOfSeats', {
          count: amountOfSeats,
        }),
    t('occurrenceDetails.textGroupInfo', {
      maxGroupSize,
      minGroupSize,
    }),
  ]
    .filter((e) => e)
    .join(', ');

  return <p>{groupInfo}</p>;
};

export default OccurrenceGroupInfo;
