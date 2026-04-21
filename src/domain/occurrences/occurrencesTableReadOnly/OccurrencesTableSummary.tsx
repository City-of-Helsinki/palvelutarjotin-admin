import { ColumnDef, Row } from '@tanstack/react-table';
import { LoadingSpinner } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './occurrencesTableSummary.module.scss';
import Table from '../../../common/components/table/Table';
import {
  EventQuery,
  OccurrenceFieldsFragment,
  OccurrencesOccurrenceSeatTypeChoices,
} from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import useNavigate from '../../../hooks/useNavigate';
import formatTimeRange from '../../../utils/formatTimeRange';
import {
  DATE_FORMAT,
  formatDateRange,
  formatLocalizedDate,
} from '../../../utils/time/format';
import { ROUTES } from '../../app/routes/constants';
import { EnrolmentType } from '../../occurrence/constants';
import { getEnrolmentType, isMultidayOccurrence } from '../../occurrence/utils';
import PlaceText from '../../place/PlaceText';
import EnrolmentsBadge from '../enrolmentsBadge/EnrolmentsBadge';
import ActionsDropdown from '../occurrencesTable/ActionsDropdown';

export interface Props {
  eventData?: EventQuery;
  occurrences: OccurrenceFieldsFragment[];
  onCancel?: (occurrence: OccurrenceFieldsFragment, message?: string) => void;
  onDelete?: (occurrence: OccurrenceFieldsFragment) => void;
  loadingOccurrences: string[];
}

const OccurrencesTableSummary: React.FC<Props> = ({
  eventData,
  occurrences,
  onCancel,
  onDelete,
  loadingOccurrences,
}) => {
  const { t } = useTranslation();
  const { pushWithReturnPath } = useNavigate();
  const locale = useLocale();
  const event = eventData?.event;
  const eventId = event?.id || '';
  const eventLocationId = event?.location?.id || '';

  const goToOccurrenceDetailsPage = (row: Row<OccurrenceFieldsFragment>) => {
    pushWithReturnPath(
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
  const isInternalEnrolment = EnrolmentType.Internal === enrolmentType;

  const enrolmentColumns: ColumnDef<OccurrenceFieldsFragment>[] = [
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
        if (loadingOccurrences.includes(row.original.id)) {
          return <LoadingSpinner small />;
        }
        if (row.original.cancelled) {
          return (
            <span className={styles.cancelledText}>
              {t('occurrences.status.cancelled')}
            </span>
          );
        }
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
  ];

  const columns: Array<ColumnDef<OccurrenceFieldsFragment>> = [
    {
      header: t('occurrences.table.columnDate'),
      accessorFn: (row) => {
        return isMultidayOccurrence(row)
          ? formatDateRange(new Date(row.startTime), new Date(row.endTime))
          : formatLocalizedDate(new Date(row.startTime), DATE_FORMAT, locale);
      },
      id: 'date',
    },
    {
      accessorFn: (row) =>
        isMultidayOccurrence(row)
          ? null
          : formatTimeRange(new Date(row.startTime), new Date(row.endTime)),
      id: 'time',
    },
    {
      header: t('occurrences.table.columnLocation'),
      cell: ({ row }) => {
        const placeId = row.original.placeId || eventLocationId;
        return placeId ? <PlaceText id={placeId} /> : '-';
      },
      id: 'place',
    },
    ...(isInternalEnrolment ? enrolmentColumns : []),
    {
      header: t('occurrences.table.columnActions'),
      cell: ({ row }) => (
        <ActionsDropdown
          event={event}
          eventId={eventId}
          onCancel={onCancel}
          onDelete={onDelete}
          row={row.original}
          enrolmentType={enrolmentType}
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

export default OccurrencesTableSummary;
