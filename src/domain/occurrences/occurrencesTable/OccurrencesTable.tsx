import React from 'react';
import { useTranslation } from 'react-i18next';

import Table from '../../../common/components/table/Table';
import useLocale from '../../../hooks/useLocale';
import formatData from '../../../utils/formatDate';
import formatTimeRange from '../../../utils/formatTimeRange';
import PlaceText from '../../place/PlaceText';
import { OccurrenceInTable } from '../types';
import ActionsDropdown from './ActionsDropdown';

interface Props {
  eventId: string;
  occurrences: OccurrenceInTable[];
  onDelete: (occurrence: OccurrenceInTable) => void;
}

const OccurrencesTable: React.FC<Props> = ({
  eventId,
  occurrences,
  onDelete,
}) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const columns = React.useMemo(
    () => [
      {
        Header: t('occurrences.table.columnDate'),
        accessor: (row: OccurrenceInTable) =>
          formatData(new Date(row.startTime)),
        id: 'date',
      },
      {
        Header: t('occurrences.table.columnTime'),
        accessor: (row) =>
          formatTimeRange(
            new Date(row.startTime),
            new Date(row.endTime),
            locale
          ),
        id: 'time',
      },
      {
        Header: t('occurrences.table.columnLocation'),
        accessor: (row) => (row.placeId ? <PlaceText id={row.placeId} /> : '-'),
        id: 'place',
      },
      {
        Header: t('occurrences.table.columnMaxGroupSize'),
        accessor: (row) => row.maxGroupSize,
        id: 'maxGroupSize',
      },
      {
        Header: t('occurrences.table.columnEnrollmentStarts'),
        accessor: (row) => 'TODO',
        id: 'elrollmentStarts',
      },
      {
        Header: t('occurrences.table.columnEnrollments'),
        accessor: (row) => 'TODO',
        id: 'enrollments',
      },
      {
        Header: t('occurrences.table.columnActions'),
        accessor: (row) => (
          <ActionsDropdown eventId={eventId} onDelete={onDelete} row={row} />
        ),
        id: 'actions',
      },
    ],
    [eventId, locale, onDelete, t]
  );
  return <Table columns={columns} data={occurrences} />;
};

export default OccurrencesTable;
