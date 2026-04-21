import { ColumnDef, Row } from '@tanstack/react-table';
import { Checkbox } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import ActionsDropdown from './ActionsDropdown';
import styles from './occurrencesTable.module.scss';
import Table from '../../../common/components/table/Table';
import {
  EventQuery,
  OccurrenceFieldsFragment,
  OccurrencesOccurrenceSeatTypeChoices,
} from '../../../generated/graphql';
import useNavigate from '../../../hooks/useNavigate';
import formatTimeRange from '../../../utils/formatTimeRange';
import { formatLocalizedDate } from '../../../utils/time/format';
import { ROUTES } from '../../app/routes/constants';
import { PUBLICATION_STATUS } from '../../events/constants';
import { EnrolmentType } from '../../occurrence/constants';
import { getEnrolmentType } from '../../occurrence/utils';
import PlaceText from '../../place/PlaceText';
import EnrolmentsBadge from '../enrolmentsBadge/EnrolmentsBadge';

interface Props {
  eventData?: EventQuery;
  id: string;
  occurrences: OccurrenceFieldsFragment[];
  onDelete: (occurrence: OccurrenceFieldsFragment) => void;
  onCancel?: (occurrence: OccurrenceFieldsFragment, message?: string) => void;
}

const OccurrencesTable: React.FC<Props> = ({
  eventData,
  id,
  occurrences,
  onDelete,
  onCancel,
}) => {
  const { t } = useTranslation();
  const { pushWithLocale } = useNavigate();
  const [selectedOccurrences, setSelectedOccurrences] = React.useState<
    string[]
  >([]);
  const eventId = eventData?.event?.id || '';
  const eventLocationId = eventData?.event?.location?.id || '';
  const isEventDraft =
    eventData?.event?.publicationStatus === PUBLICATION_STATUS.DRAFT;
  const isAllSelected = React.useMemo(
    () => occurrences.every((o) => selectedOccurrences.includes(o.id)),
    [occurrences, selectedOccurrences]
  );

  const selectAll = () => {
    setSelectedOccurrences(occurrences.map((item) => item.id));
  };

  const unselectAll = () => {
    setSelectedOccurrences([]);
  };

  const handleCheckboxChange = (row: OccurrenceFieldsFragment) => {
    setSelectedOccurrences(
      selectedOccurrences.includes(row.id)
        ? selectedOccurrences.filter((item) => item !== row.id)
        : [...selectedOccurrences, row.id]
    );
  };

  const goToOccurrenceDetailsPage = (row: Row<OccurrenceFieldsFragment>) => {
    pushWithLocale(
      ROUTES.OCCURRENCE_DETAILS.replace(':id', eventId).replace(
        ':occurrenceId',
        row.original.id
      )
    );
  };

  // EnrolmentType.Internal is the default enrolment type instead of undefined, because it makes the testing much easier
  const enrolmentType = eventData?.event
    ? getEnrolmentType(eventData.event)
    : EnrolmentType.Internal;

  const columns: ColumnDef<OccurrenceFieldsFragment>[] = [
    {
      header: () => (
        <Checkbox
          id={`${id}_select-all_checkbox`}
          checked={isAllSelected}
          onChange={isAllSelected ? unselectAll : selectAll}
          aria-label={t('occurrences.table.labelChooseAllOccurrences')}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          id={`${id}_${row.id}_checkbox`}
          checked={selectedOccurrences.includes(row.id)}
          onChange={() => handleCheckboxChange(row.original)}
          aria-label={t('occurrences.table.labelChooseOccurrence', {
            info: `${formatLocalizedDate(
              new Date(row.original.startTime)
            )}  ${formatTimeRange(
              new Date(row.original.startTime),
              new Date(row.original.endTime)
            )}`,
          })}
        />
      ),
      id: 'selectRow',
    },
    {
      header: t('occurrences.table.columnDate'),
      accessorFn: (row) => formatLocalizedDate(new Date(row.startTime)),
      id: 'date',
    },
    {
      header: t('occurrences.table.columnTime'),
      accessorFn: (row) =>
        formatTimeRange(new Date(row.startTime), new Date(row.endTime)),
      id: 'time',
    },
    {
      header: t('occurrences.table.columnLocation'),
      accessorFn: (row) => {
        const placeId = row.placeId || eventLocationId;
        return placeId ? <PlaceText id={placeId} /> : '-';
      },
      id: 'place',
    },
    {
      header: t('occurrences.table.columnAmountOfSeats'),
      accessorFn: (row) => {
        if (
          row.seatType === OccurrencesOccurrenceSeatTypeChoices.EnrolmentCount
        ) {
          return t('occurrenceDetails.textAmountOfGroups', {
            count: row.amountOfSeats,
          });
        }
        return row.amountOfSeats;
      },
      id: 'amountOfSeats',
    },
    {
      header: t('occurrences.table.columnEnrolmentStarts'),
      accessorFn: () =>
        eventData?.event?.pEvent?.enrolmentStart
          ? formatLocalizedDate(
              new Date(eventData?.event?.pEvent?.enrolmentStart)
            )
          : '',
      id: 'enrolmentStarts',
    },
    {
      header: () => (
        <>
          <div>{t('occurrences.table.columnEnrolments')}</div>
          <div className={styles.enrolmentsInfoText}>
            {t('occurrences.table.columnEnrolmentsHelper')}
          </div>
        </>
      ),
      cell: ({ row }) => {
        if (
          row.original.seatsTaken != null &&
          row.original.seatsApproved != null
        ) {
          return (
            <EnrolmentsBadge
              approvedSeatsCount={row.original.seatsApproved}
              pendingSeatsCount={
                row.original.seatsTaken - row.original.seatsApproved
              }
              isOccurrenceFull={row.original.remainingSeats === 0}
            />
          );
        }
        return null;
      },
      id: 'enrolments',
    },
    {
      header: t('occurrences.table.columnActions'),
      cell: ({ row }) => (
        <ActionsDropdown
          event={eventData?.event}
          enrolmentType={enrolmentType}
          eventId={eventId}
          isEventDraft={isEventDraft}
          onDelete={onDelete}
          onCancel={onCancel}
          row={row.original}
        />
      ),
      id: 'actions',
    },
  ];

  return (
    <Table
      columns={columns}
      data={occurrences}
      onRowClick={goToOccurrenceDetailsPage}
      tableHeaderRowClassName={styles.tableHeaderRow}
    />
  );
};

export default OccurrencesTable;
