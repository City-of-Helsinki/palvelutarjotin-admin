import classNames from 'classnames';
import { IconAngleDown } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Column, Row } from 'react-table';

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

  const columns: Array<Column<EnrolmentFieldsFragment>> = [
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
        <ActionsDropdown
          row={row}
          eventId={eventId}
          onEnrolmentsModified={onEnrolmentsModified}
        />
      ),
      id: 'actions',
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
            aria-expanded={!!row.isExpanded}
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
      // style: {
      //   textAlign: 'center',
      //   width: '1%',
      // },
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
