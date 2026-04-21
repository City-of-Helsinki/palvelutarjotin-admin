import { ColumnDef, Row } from '@tanstack/react-table';
import classNames from 'classnames';
import { IconAngleDown } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import ActionsDropdown from './actionsDropdown/ActionsDropdown';
import AdditionalInfo from './additionalInfo/AdditionalInfo';
import styles from './enrolmentTable.module.scss';
import Table from '../../../common/components/table/Table';
import {
  EnrolmentFieldsFragment,
  EnrolmentStatus,
} from '../../../generated/graphql';
import useNavigate from '../../../hooks/useNavigate';
import { formatLocalizedDate } from '../../../utils/time/format';
import { ROUTES } from '../../app/routes/constants';
import EnrolmentStatusBadge from '../../enrolment/enrolmentStatusBadge/EnrolmentStatusBadge';
import { getNumberOfParticipants } from '../../enrolment/utils';

interface Props {
  enrolments: EnrolmentFieldsFragment[];
  seatsTaken?: number;
  seatsRemaining?: number;
  eventId?: string | null;
  occurrenceId?: string | null;
  onEnrolmentsModified: () => Promise<void>;
}

const EnrolmentTable: React.FC<Props> = ({
  enrolments,
  seatsTaken = 0,
  seatsRemaining = 0,
  eventId,
  occurrenceId,
  onEnrolmentsModified,
}) => {
  const { t } = useTranslation();
  const { search } = useLocation();
  const { pushWithLocale } = useNavigate();

  const goToEnrolmentDetailsPage = (row: Row<EnrolmentFieldsFragment>) => {
    if (eventId && occurrenceId) {
      // we need to preserve returnPath in url -> add query string
      pushWithLocale({
        pathname: ROUTES.ENROLMENT_DETAILS.replace(
          ':enrolmentId',
          row.original.id
        )
          .replace(':id', eventId)
          .replace(':occurrenceId', occurrenceId),
        search,
      });
    }
  };

  const approvedCount = getNumberOfParticipants(
    enrolments,
    EnrolmentStatus.Approved
  );

  const pendingCount = getNumberOfParticipants(
    enrolments,
    EnrolmentStatus.Pending
  );

  const columns: ColumnDef<EnrolmentFieldsFragment>[] = [
    {
      header: t('occurrenceDetails.enrolmentTable.columnEnrolmentTime'),
      accessorFn: (row) => formatLocalizedDate(new Date(row.enrolmentTime)),
      id: 'enrolmentTime',
    },
    {
      header: t('occurrenceDetails.enrolmentTable.columnPersonName'),
      accessorFn: (row) => row.person?.name,
      id: 'personName',
    },
    {
      header: t('occurrenceDetails.enrolmentTable.columnStudyGroupName'),
      accessorFn: (row) => row.studyGroup.unitName,
      id: 'studyGroupName',
    },
    {
      header: t('occurrenceDetails.enrolmentTable.columnStudyGroupGroupName'),
      accessorFn: (row) => row.studyGroup.groupName,
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
        <ActionsDropdown
          row={row.original}
          eventId={eventId}
          onEnrolmentsModified={onEnrolmentsModified}
        />
      ),
      id: 'actions',
    },
    {
      header: t('occurrenceDetails.enrolmentTable.columnAdditionalInfo'),
      accessorFn: (row: EnrolmentFieldsFragment) => row,
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

  const renderEnrolmentInfo = (enrolment: EnrolmentFieldsFragment) => (
    <AdditionalInfo enrolment={enrolment} />
  );

  return (
    <div className={styles.enrolmentTable}>
      <div className={styles.count}>
        <strong>{t('occurrenceDetails.enrolmentTable.titleEnrolled')} </strong>{' '}
        {t('occurrenceDetails.enrolmentTable.count', {
          approvedCount,
          pendingCount,
          seatsTaken,
        })}
        {seatsRemaining === 0 && (
          <span> ({t('occurrences.occurrenceIsFull')})</span>
        )}
      </div>
      {!!enrolments.length && (
        <Table
          data-testid="enrolments-table"
          columns={columns}
          data={enrolments}
          renderExpandedArea={renderEnrolmentInfo}
          onRowClick={goToEnrolmentDetailsPage}
          expandedAreaOffset={1}
        />
      )}
    </div>
  );
};

export default EnrolmentTable;
