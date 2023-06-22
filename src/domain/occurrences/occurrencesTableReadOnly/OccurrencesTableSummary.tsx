import { LoadingSpinner } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Row } from 'react-table';

import Table from '../../../common/components/table/Table';
import {
  EventQuery,
  OccurrenceFieldsFragment,
  OccurrenceSeatType,
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
import styles from './occurrencesTableSummary.module.scss';

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

  const enrolmentColumns = [
    {
      Header: t('occurrences.table.columnAmountOfSeats'),
      accessor: (row: OccurrenceFieldsFragment) => {
        if (row.seatType === OccurrenceSeatType.EnrolmentCount) {
          return t('occurrenceDetails.textAmountOfGroups', {
            count: row.amountOfSeats,
          });
        }
        return row.amountOfSeats;
      },
      id: 'amountOfSeats',
    },
    {
      Header: t('occurrences.table.columnEnrolmentStarts'),
      accessor: (row: OccurrenceFieldsFragment) =>
        eventData?.event?.pEvent?.enrolmentStart
          ? formatLocalizedDate(
              new Date(eventData?.event?.pEvent?.enrolmentStart)
            )
          : '',
      id: 'enrolmentStarts',
    },
    {
      Header: (
        <>
          <div>{t('occurrences.table.columnEnrolments')}</div>
          <div className={styles.enrolmentsInfoText}>
            {t('occurrences.table.columnEnrolmentsHelper')}
          </div>
        </>
      ),
      accessor: (row: OccurrenceFieldsFragment) => {
        if (loadingOccurrences.includes(row.id)) {
          return <LoadingSpinner small />;
        }
        if (row.cancelled) {
          return (
            <span className={styles.cancelledText}>
              {t('occurrences.status.cancelled')}
            </span>
          );
        }
        if (row.seatsTaken != null && row.seatsApproved != null) {
          return (
            <EnrolmentsBadge
              approvedSeatsCount={row.seatsApproved}
              pendingSeatsCount={row.seatsTaken - row.seatsApproved}
              isOccurrenceFull={row.remainingSeats === 0}
            />
          );
        }
        return null;
      },
      id: 'enrolments',
    },
  ];

  const columns = [
    {
      Header: t('occurrences.table.columnDate'),
      accessor: (row: OccurrenceFieldsFragment) => {
        return isMultidayOccurrence(row)
          ? formatDateRange(new Date(row.startTime), new Date(row.endTime))
          : formatLocalizedDate(new Date(row.startTime), DATE_FORMAT, locale);
      },
      id: 'date',
    },
    {
      accessor: (row: OccurrenceFieldsFragment) =>
        isMultidayOccurrence(row)
          ? null
          : formatTimeRange(new Date(row.startTime), new Date(row.endTime)),
      id: 'time',
    },
    {
      Header: t('occurrences.table.columnLocation'),
      accessor: (row: OccurrenceFieldsFragment) => {
        const placeId = row.placeId || eventLocationId;
        return placeId ? <PlaceText id={placeId} /> : '-';
      },
      id: 'place',
    },
    ...(isInternalEnrolment ? enrolmentColumns : []),
    {
      Header: t('occurrences.table.columnActions'),
      accessor: (row: OccurrenceFieldsFragment) => (
        <ActionsDropdown
          event={event}
          eventId={eventId}
          onCancel={onCancel}
          onDelete={onDelete}
          row={row}
          enrolmentType={enrolmentType}
        />
      ),
      id: 'actions',
      rowClickDisabled: true,
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
