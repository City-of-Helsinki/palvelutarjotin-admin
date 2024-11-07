import classNames from 'classnames';
import { IconAngleDown } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Column } from 'react-table';

import Table from '../../../common/components/table/Table';
import { EventQueueEnrolmentFieldsFragment } from '../../../generated/graphql';
import { formatLocalizedDate } from '../../../utils/time/format';
import EnrolmentStatusBadge from '../../enrolment/enrolmentStatusBadge/EnrolmentStatusBadge';
import QueueActionsDropdown from './actionsDropdown/QueueActionsDropdown';
import AdditionalInfo from './additionalInfo/AdditionalInfo';
import styles from './enrolmentTable.module.scss';

interface Props {
  enrolments: EventQueueEnrolmentFieldsFragment[];
  eventId: string;
  occurrenceId: string;
  onEnrolmentsModified: () => Promise<void>;
}

const EnrolmentQueueTable: React.FC<Props> = ({
  enrolments,
  eventId,
  occurrenceId,
  onEnrolmentsModified,
}) => {
  const { t } = useTranslation();

  const queuedEnrolmentsCount = enrolments.length;

  const columns: Array<Column<EventQueueEnrolmentFieldsFragment>> = [
    {
      Header: t('occurrenceDetails.enrolmentTable.columnEnrolmentTime'),
      accessor: (row) => formatLocalizedDate(new Date(row.enrolmentTime)),
      id: 'enrolmentTime',
    },
    {
      Header: t('occurrenceDetails.enrolmentTable.columnPersonName'),
      accessor: (row) => row.person?.name,
      id: 'personName',
    },
    {
      Header: t('occurrenceDetails.enrolmentTable.columnStudyGroupName'),
      accessor: (row) => row.studyGroup.unitName,
      id: 'studyGroupName',
    },
    {
      Header: t('occurrenceDetails.enrolmentTable.columnStudyGroupGroupName'),
      accessor: (row) => row.studyGroup.groupName,
      id: 'studyGroupGroupName',
    },
    {
      Header: t('occurrenceDetails.enrolmentTable.columnGroupSize'),
      accessor: (row) => (
        <>
          {row.studyGroup.groupSize} / {row.studyGroup.amountOfAdult}
        </>
      ),
      id: 'groupSize',
    },
    {
      Header: t('occurrenceDetails.enrolmentTable.columnStatus'),
      accessor: (row) =>
        row.status ? <EnrolmentStatusBadge status={row.status} /> : null,
      id: 'status',
    },
    {
      Header: t('occurrenceDetails.enrolmentTable.columnActions'),
      accessor: (row) => (
        <QueueActionsDropdown
          row={row}
          eventId={eventId}
          occurrenceId={occurrenceId}
          onEnrolmentsModified={onEnrolmentsModified}
        />
      ),
      id: 'actions',
      // rowClickDisabled: true,
    },
    {
      Header: t('occurrenceDetails.enrolmentTable.columnAdditionalInfo'),
      accessor: (row) => row,
      // FIXME: type with UseExpandedColumnCell
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Cell: ({ row }: any) => {
        return (
          <button
            aria-label={t(
              'occurrenceDetails.enrolmentTable.showEnrolmentDetails'
            )}
            {...row.getToggleRowExpandedProps()}
            // row.isExpanded is undefined when is not expanded for some reason
            aria-expanded={row.isExpanded ? true : false}
          >
            <IconAngleDown
              className={classNames(styles.iconAngle, {
                [styles.iconAngleUp]: row.isExpanded,
              })}
            />
          </button>
        );
      },
      // TODO: Styling after deps update
      // styles: {
      //   textAlign: 'center',
      //   width: '1%',
      // },
      id: 'additionalInfo',
    },
  ];

  const renderEnrolmentInfo = (
    enrolment: EventQueueEnrolmentFieldsFragment
  ) => <AdditionalInfo enrolment={enrolment} />;

  return (
    <div className={styles.enrolmentTable}>
      <div className={styles.count}>
        <strong>
          {t('occurrenceDetails.enrolmentTable.titleEnrolledToQueue')}
        </strong>{' '}
        {queuedEnrolmentsCount}
      </div>
      {!!enrolments.length && (
        <Table
          data-testid="enrolments-queued-table"
          columns={columns}
          data={enrolments}
          renderExpandedArea={renderEnrolmentInfo}
          onRowClick={() => {}}
          expandedAreaOffset={1}
        />
      )}
    </div>
  );
};

export default EnrolmentQueueTable;
