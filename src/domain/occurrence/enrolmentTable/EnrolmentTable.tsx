import { Checkbox } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Table from '../../../common/components/table/Table';
import { EnrolmentFieldsFragment } from '../../../generated/graphql';
import formatDate from '../../../utils/formatDate';
import EnrolmentStatusBadge from '../../enrolment/enrolmentStatusBadge/EnrolmentStatusBadge';

interface Props {
  enrolments: EnrolmentFieldsFragment[];
  id: string;
}

const EnrolmentTable: React.FC<Props> = ({ enrolments, id }) => {
  const { t } = useTranslation();

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

  const handleCheckboxChange = (row: EnrolmentFieldsFragment) => {
    setSelectedEnrolments(
      selectedEnrolments.includes(row.id)
        ? selectedEnrolments.filter((e) => e !== row.id)
        : [...selectedEnrolments, row.id]
    );
  };

  const columns = [
    {
      Header: (
        <Checkbox
          id={`${id}_select-all_checkbox`}
          checked={isAllSelected}
          onChange={isAllSelected ? unselectAll : selectAll}
        />
      ),
      accessor: (row: EnrolmentFieldsFragment) => (
        <Checkbox
          id={`${id}_${row.id}_checkbox`}
          checked={selectedEnrolments.includes(row.id)}
          onChange={() => handleCheckboxChange(row)}
        />
      ),
      id: 'selectRow',
    },
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
