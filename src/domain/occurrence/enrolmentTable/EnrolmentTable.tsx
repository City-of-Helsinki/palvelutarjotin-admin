import React from 'react';
import { useTranslation } from 'react-i18next';

import Table from '../../../common/components/table/Table';
import { EnrolmentFieldsFragment } from '../../../generated/graphql';
import formatDate from '../../../utils/formatDate';
import EnrolmentStatusBadge from '../../enrolment/enrolmentStatusBadge/EnrolmentStatusBadge';

interface Props {
  enrolments: EnrolmentFieldsFragment[];
}

const EnrolmentTable: React.FC<Props> = ({ enrolments }) => {
  const { t } = useTranslation();

  const columns = [
    {
      Header: t('occurrenceDetails.enrolmentTable.columnEnrolmentTime'),
      accessor: (row: EnrolmentFieldsFragment) =>
        formatDate(new Date(row.enrolmentTime)),
      id: 'enrolmentTime',
    },
    {
      Header: t('occurrenceDetails.enrolmentTable.columnPersonName'),
      accessor: (row: EnrolmentFieldsFragment) => row.person?.name,
      id: 'personName',
    },
    {
      Header: t('occurrenceDetails.enrolmentTable.columnStudyGroupName'),
      accessor: (row: EnrolmentFieldsFragment) => row.studyGroup.name,
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
      accessor: (row: EnrolmentFieldsFragment) => (
        <EnrolmentStatusBadge status={row.status} />
      ),
      id: 'status',
    },
  ];
  return <Table columns={columns} data={enrolments} />;
};

export default EnrolmentTable;
