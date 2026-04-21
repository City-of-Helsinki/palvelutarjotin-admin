import { ColumnDef } from '@tanstack/react-table';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import QueueActionsDropdown from './actionsDropdown/QueueActionsDropdown';
import AdditionalInfo from './additionalInfo/AdditionalInfo';
import EnrolmentExpandToggleCell from './EnrolmentExpandToggleCell';
import EnrolmentGroupSizeCell from './EnrolmentGroupSizeCell';
import EnrolmentStatusCell from './EnrolmentStatusCell';
import styles from './enrolmentTable.module.scss';
import Table from '../../../common/components/table/Table';
import { EventQueueEnrolmentFieldsFragment } from '../../../generated/graphql';
import { formatLocalizedDate } from '../../../utils/time/format';

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
        <EnrolmentGroupSizeCell studyGroup={row.original.studyGroup} />
      ),
      id: 'groupSize',
    },
    {
      header: t('occurrenceDetails.enrolmentTable.columnStatus'),
      cell: ({ row }) => <EnrolmentStatusCell status={row.original.status} />,
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
        <EnrolmentExpandToggleCell
          ariaLabel={t('occurrenceDetails.enrolmentTable.showEnrolmentDetails')}
          isExpanded={row.getIsExpanded()}
          onToggle={() => row.toggleExpanded()}
        />
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
          expandedAreaOffset={1}
        />
      )}
    </div>
  );
};

export default EnrolmentQueueTable;
