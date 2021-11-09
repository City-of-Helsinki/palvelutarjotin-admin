import classNames from 'classnames';
import { Checkbox, IconAngleDown } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Row } from 'react-table';

import Table from '../../../common/components/table/Table';
import { UseExpandedColumnCell } from '../../../common/components/table/types';
import {
  EnrolmentFieldsFragment,
  EnrolmentStatus,
} from '../../../generated/graphql';
import useHistory from '../../../hooks/useHistory';
import { formatLocalizedDate } from '../../../utils/time/format';
import { ROUTES } from '../../app/routes/constants';
import EnrolmentStatusBadge from '../../enrolment/enrolmentStatusBadge/EnrolmentStatusBadge';
import { getNumberOfParticipants } from '../../enrolment/utils';
import ActionsDropdown from './actionsDropdown/ActionsDropdown';
import AdditionalInfo from './additionalInfo/AdditionalInfo';
import styles from './enrolmentTable.module.scss';

interface Props {
  enrolments: EnrolmentFieldsFragment[];
  id: string;
  seatsTaken?: number;
  seatsRemaining?: number;
  eventId?: string | null;
  occurrenceId?: string | null;
  onEnrolmentsModified: () => void;
}

const EnrolmentTable: React.FC<Props> = ({
  enrolments,
  id,
  seatsTaken = 0,
  seatsRemaining = 0,
  eventId,
  occurrenceId,
  onEnrolmentsModified,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  const [selectedEnrolments, setSelectedEnrolments] = React.useState<string[]>(
    []
  );

  const isAllSelected = React.useMemo(
    () => enrolments.every((e) => selectedEnrolments.includes(e.id)),
    [enrolments, selectedEnrolments]
  );

  const selectAll = () => {
    setSelectedEnrolments(enrolments.map((e) => e.id));
  };

  const unselectAll = () => {
    setSelectedEnrolments([]);
  };

  const goToEnrolmentDetailsPage = (row: Row<EnrolmentFieldsFragment>) => {
    if (eventId && occurrenceId) {
      history.pushWithLocale(
        ROUTES.ENROLMENT_DETAILS.replace(':enrolmentId', row.original.id)
          .replace(':id', eventId)
          .replace(':occurrenceId', occurrenceId)
      );
    }
  };

  const handleCheckboxChange = (row: EnrolmentFieldsFragment) => {
    setSelectedEnrolments(
      selectedEnrolments.includes(row.id)
        ? selectedEnrolments.filter((e) => e !== row.id)
        : [...selectedEnrolments, row.id]
    );
  };

  const approvedCount = getNumberOfParticipants(
    enrolments,
    EnrolmentStatus.Approved
  );

  const pendingCount = getNumberOfParticipants(
    enrolments,
    EnrolmentStatus.Pending
  );

  const columns = [
    {
      Header: (
        <Checkbox
          id={`${id}_select-all_checkbox`}
          checked={isAllSelected}
          onChange={isAllSelected ? unselectAll : selectAll}
          aria-label={t(
            'occurrenceDetails.enrolmentTable.labelSelectAllEnrolments'
          )}
        />
      ),
      accessor: (row: EnrolmentFieldsFragment) => (
        <Checkbox
          id={`${id}_${row.id}_checkbox`}
          checked={selectedEnrolments.includes(row.id)}
          onChange={() => handleCheckboxChange(row)}
          aria-label={t(
            'occurrenceDetails.enrolmentTable.labelSelectEnrolment',
            {
              info: `${formatLocalizedDate(new Date(row.enrolmentTime))} ${
                row.person?.name
              }`,
            }
          )}
        />
      ),
      id: 'selectRow',
    },
    {
      Header: t('occurrenceDetails.enrolmentTable.columnEnrolmentTime'),
      accessor: (row: EnrolmentFieldsFragment) =>
        formatLocalizedDate(new Date(row.enrolmentTime)),
      id: 'enrolmentTime',
    },
    {
      Header: t('occurrenceDetails.enrolmentTable.columnPersonName'),
      accessor: (row: EnrolmentFieldsFragment) => row.person?.name,
      id: 'personName',
    },
    {
      Header: t('occurrenceDetails.enrolmentTable.columnStudyGroupName'),
      accessor: (row: EnrolmentFieldsFragment) => row.studyGroup.unitName,
      id: 'studyGroupName',
    },
    {
      Header: t('occurrenceDetails.enrolmentTable.columnStudyGroupGroupName'),
      accessor: (row: EnrolmentFieldsFragment) => row.studyGroup.groupName,
      id: 'studyGroupGroupName',
    },
    {
      Header: t('occurrenceDetails.enrolmentTable.columnGroupSize'),
      accessor: (row: EnrolmentFieldsFragment) => (
        <>
          {row.studyGroup.groupSize} / {row.studyGroup.amountOfAdult}
        </>
      ),
      id: 'groupSize',
    },
    {
      Header: t('occurrenceDetails.enrolmentTable.columnStatus'),
      accessor: (row: EnrolmentFieldsFragment) =>
        row.status ? <EnrolmentStatusBadge status={row.status} /> : null,
      id: 'status',
    },
    {
      Header: t('occurrenceDetails.enrolmentTable.columnActions'),
      accessor: (row: EnrolmentFieldsFragment) => (
        <ActionsDropdown
          row={row}
          eventId={eventId}
          onEnrolmentsModified={onEnrolmentsModified}
        />
      ),
      id: 'actions',
      rowClickDisabled: true,
    },
    {
      Header: t('occurrenceDetails.enrolmentTable.columnAdditionalInfo'),
      accessor: (row: EnrolmentFieldsFragment) => row,
      Cell: ({ row }: UseExpandedColumnCell<EnrolmentFieldsFragment>) => {
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
      style: {
        textAlign: 'center',
        width: '1%',
      },
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
