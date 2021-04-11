import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { Row } from 'react-table';

import Table from '../../../common/components/table/Table';
import {
  EventQuery,
  OccurrenceFieldsFragment,
  OccurrenceSeatType,
} from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import formatDate from '../../../utils/formatDate';
import formatTimeRange from '../../../utils/formatTimeRange';
import { ROUTES } from '../../app/routes/constants';
import PlaceText from '../../place/PlaceText';
import EnrolmentsBadge from '../enrolmentsBadge/EnrolmentsBadge';
import styles from './occurrencesTable.module.scss';

export interface Props {
  eventData?: EventQuery;
  occurrences: OccurrenceFieldsFragment[];
}

const OccurrencesTable: React.FC<Props> = ({ eventData, occurrences }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const locale = useLocale();
  const eventId = eventData?.event?.id || '';
  const eventLocationId = eventData?.event?.location?.id || '';

  const goToOccurrenceDetailsPage = (row: Row<OccurrenceFieldsFragment>) => {
    history.push(
      `/${locale}${ROUTES.OCCURRENCE_DETAILS.replace(':id', eventId).replace(
        ':occurrenceId',
        row.original.id
      )}`
    );
  };

  const columns = [
    {
      Header: t('occurrences.table.columnDate'),
      accessor: (row: OccurrenceFieldsFragment) =>
        formatDate(new Date(row.startTime)),
      id: 'date',
    },
    {
      Header: t('occurrences.table.columnTime'),
      accessor: (row: OccurrenceFieldsFragment) =>
        formatTimeRange(new Date(row.startTime), new Date(row.endTime), locale),
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
          ? formatDate(new Date(eventData?.event?.pEvent?.enrolmentStart))
          : '',
      id: 'elrolmentStarts',
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
