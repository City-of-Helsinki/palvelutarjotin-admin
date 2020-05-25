import { Checkbox } from 'hds-react';
import forEach from 'lodash/forEach';
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
  id: string;
  occurrences: OccurrenceInTable[];
  onDelete: (occurrence: OccurrenceInTable) => void;
}

const OccurrencesTable: React.FC<Props> = ({
  eventId,
  id,
  occurrences,
  onDelete,
}) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const [selectedOccurrences, setSelectedOccurrences] = React.useState<
    string[]
  >([]);

  const selectAll = React.useCallback(() => {
    setSelectedOccurrences(occurrences.map((item) => item.id));
  }, [occurrences]);

  const unselectAll = React.useCallback(() => {
    setSelectedOccurrences([]);
  }, []);

  const isAllSelected = React.useMemo(() => {
    let allSelected = true;
    forEach(occurrences, (occurrence) => {
      if (!selectedOccurrences.includes(occurrence.id)) {
        allSelected = false;
        return false;
      }
    });
    return allSelected;
  }, [occurrences, selectedOccurrences]);

  const handleCheckboxChange = React.useCallback(
    (row: OccurrenceInTable) => {
      setSelectedOccurrences(
        selectedOccurrences.includes(row.id)
          ? selectedOccurrences.filter((item) => item !== row.id)
          : [...selectedOccurrences, row.id]
      );
    },
    [selectedOccurrences]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: (
          <Checkbox
            id={`${id}_select-all_checkbox`}
            checked={isAllSelected}
            onChange={isAllSelected ? unselectAll : selectAll}
          />
        ),
        accessor: (row: OccurrenceInTable) => (
          <Checkbox
            id={`${id}_${row.id}_checkbox`}
            checked={selectedOccurrences.includes(row.id)}
            onChange={() => handleCheckboxChange(row)}
          />
        ),
        id: 'selectRow',
      },
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
    [
      eventId,
      handleCheckboxChange,
      id,
      isAllSelected,
      locale,
      onDelete,
      selectAll,
      selectedOccurrences,
      t,
      unselectAll,
    ]
  );
  return <Table columns={columns} data={occurrences} />;
};

export default OccurrencesTable;
