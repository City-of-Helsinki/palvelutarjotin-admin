import { ColumnDef } from '@tanstack/react-table';
import classNames from 'classnames';
import { IconAngleDown } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import QueueActionsDropdown from './actionsDropdown/QueueActionsDropdown';
import AdditionalInfo from './additionalInfo/AdditionalInfo';
import styles from './enrolmentTable.module.scss';
import Table from '../../../common/components/table/Table';
import { EventQueueEnrolmentFieldsFragment } from '../../../generated/graphql';
import { formatLocalizedDate } from '../../../utils/time/format';
import EnrolmentStatusBadge from '../../enrolment/enrolmentStatusBadge/EnrolmentStatusBadge';

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

  const columns: Array<ColumnDef<EventQueueEnrolmentFieldsFragment>> = [
    {
      header: t('occurrenceDetails.enrolmentTable.columnEnrolmentTime'),
      accessorFn: (row: EventQueueEnrolmentFieldsFragment) =>
        formatLocalizedDate(new Date(row.enrolmentTime)),
      id: 'enrolmentTime',
    },
    {
      header: t('occurrenceDetails.enrolmentTable.columnPersonName'),
      accessorFn: (row: EventQueueEnrolmentFieldsFragment) => row.person?.name,
      id: 'personName',
    },
    {
      header: t('occurrenceDetails.enrolmentTable.columnStudyGroupName'),
      accessorFn: (row: EventQueueEnrolmentFieldsFragment) =>
        row.studyGroup.unitName,
      id: 'studyGroupName',
    },
    {
      header: t('occurrenceDetails.enrolmentTable.columnStudyGroupGroupName'),
      accessorFn: (row: EventQueueEnrolmentFieldsFragment) =>
        row.studyGroup.groupName,
      id: 'studyGroupGroupName',
    },
    {
      header: t('occurrenceDetails.enrolmentTable.columnGroupSize'),
      cell: ({ row }) => (
        <>
          {row.original.studyGroup.groupSize} /{' '}
          {row.original.studyGroup.amountOfAdult}
        </>
      ),
      id: 'groupSize',
    },
    {
      header: t('occurrenceDetails.enrolmentTable.columnStatus'),
      cell: ({ row }) =>
        row.original.status ? (
          <EnrolmentStatusBadge status={row.original.status} />
        ) : null,
      id: 'status',
    },
    {
      header: t('occurrenceDetails.enrolmentTable.columnActions'),
      cell: ({ row }) => (
        <QueueActionsDropdown
          row={row.original}
          eventId={eventId}
          occurrenceId={occurrenceId}
          onEnrolmentsModified={onEnrolmentsModified}
        />
      ),
      id: 'actions',
    },
    {
      header: t('occurrenceDetails.enrolmentTable.columnAdditionalInfo'),
      accessorFn: (row: EventQueueEnrolmentFieldsFragment) => row,
      cell: ({ row }) => (
        <button
          aria-label={t(
            'occurrenceDetails.enrolmentTable.showEnrolmentDetails'
          )}
          onClick={() => row.toggleExpanded()}
          aria-expanded={row.getIsExpanded()}
        >
          <IconAngleDown
            className={classNames(styles.iconAngle, {
              [styles.iconAngleUp]: row.getIsExpanded(),
            })}
          />
        </button>
      ),
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
