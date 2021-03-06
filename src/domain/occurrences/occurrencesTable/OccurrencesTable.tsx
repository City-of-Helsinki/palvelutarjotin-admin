import { Checkbox } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Row } from 'react-table';

import Table from '../../../common/components/table/Table';
import {
  EventQuery,
  OccurrenceFieldsFragment,
  OccurrenceSeatType,
} from '../../../generated/graphql';
import useHistory from '../../../hooks/useHistory';
import useLocale from '../../../hooks/useLocale';
import formatDate from '../../../utils/formatDate';
import formatTimeRange from '../../../utils/formatTimeRange';
import { ROUTES } from '../../app/routes/constants';
import { PUBLICATION_STATUS } from '../../events/constants';
import PlaceText from '../../place/PlaceText';
import EnrolmentsBadge from '../enrolmentsBadge/EnrolmentsBadge';
import ActionsDropdown from './ActionsDropdown';
import styles from './occurrencesTable.module.scss';

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
  const history = useHistory();
  const locale = useLocale();
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
    history.pushWithLocale(
      ROUTES.OCCURRENCE_DETAILS.replace(':id', eventId).replace(
        ':occurrenceId',
        row.original.id
      )
    );
  };

  const columns = [
    {
      Header: (
        <Checkbox
          id={`${id}_select-all_checkbox`}
          checked={isAllSelected}
          onChange={isAllSelected ? unselectAll : selectAll}
          aria-label={t('occurrences.table.labelChooseAllOccurrences')}
        />
      ),
      accessor: (row: OccurrenceFieldsFragment) => (
        <Checkbox
          id={`${id}_${row.id}_checkbox`}
          checked={selectedOccurrences.includes(row.id)}
          onChange={() => handleCheckboxChange(row)}
          aria-label={t('occurrences.table.labelChooseOccurrence', {
            info: `${formatDate(new Date(row.startTime))}  ${formatTimeRange(
              new Date(row.startTime),
              new Date(row.endTime),
              locale
            )}`,
          })}
        />
      ),
      id: 'selectRow',
    },
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
    {
      Header: t('occurrences.table.columnActions'),
      accessor: (row: OccurrenceFieldsFragment) => (
        <ActionsDropdown
          eventId={eventId}
          isEventDraft={isEventDraft}
          onDelete={onDelete}
          onCancel={onCancel}
          row={row}
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

export default OccurrencesTable;
