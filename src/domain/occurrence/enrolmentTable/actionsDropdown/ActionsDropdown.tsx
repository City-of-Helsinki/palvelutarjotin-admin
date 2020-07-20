import { IconCheck, IconCross, IconCrossCircle, IconPen } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import TableDropdown, {
  MenuItemProps,
} from '../../../../common/components/tableDropdown/TableDropdown';
import {
  EnrolmentFieldsFragment,
  useApproveEnrolmentMutation,
} from '../../../../generated/graphql';
import ApproveEnrolmentModal from '../enrolmentModals/ApproveEnrolmentModal';
import styles from './actionsDropdown.module.scss';

interface Props {
  row: EnrolmentFieldsFragment;
}

const ActionsDropdown: React.FC<Props> = ({ row }) => {
  const { t } = useTranslation();
  const [approveModalOpen, setApproveModalOpen] = React.useState(false);

  const [approveEnrolment] = useApproveEnrolmentMutation({
    onError: (error) => {
      console.log(error.message);
      toast(t('createOccurrence.error'), {
        type: toast.TYPE.ERROR,
      });
    },
  });

  const handleOpenApproveModal = () => {
    setApproveModalOpen(true);
  };

  const handleApproveEnrolment = async () => {
    approveEnrolment({ variables: { input: { enrolmentId: row.id } } });
  };

  const handleDecline = () => {
    alert('TODO: Open declined enrolment modal');
  };

  const handleEdit = () => {
    alert('TODO: Go to edit enrolment page');
  };

  const handleDelete = () => {
    alert('TODO: Open delete enrolment modal');
  };

  const items: MenuItemProps[] = [
    {
      children: (
        <>
          <IconCheck className={styles.iconApprove} />
          {t(
            'occurrenceDetails.enrolmentTable.actionsDropdown.menuItemApprove'
          )}
        </>
      ),
      onClick: handleOpenApproveModal,
    },
    {
      children: (
        <>
          <IconCross className={styles.iconDecline} />
          {t(
            'occurrenceDetails.enrolmentTable.actionsDropdown.menuItemDecline'
          )}
        </>
      ),
      onClick: handleDecline,
    },
    {
      children: (
        <>
          <IconPen />
          {t('occurrenceDetails.enrolmentTable.actionsDropdown.menuItemEdit')}
        </>
      ),
      onClick: handleEdit,
    },
    {
      children: (
        <>
          <IconCrossCircle className={styles.iconDelete} />
          {t('occurrenceDetails.enrolmentTable.actionsDropdown.menuItemDelete')}
        </>
      ),
      onClick: handleDelete,
    },
  ];

  console.log(row);

  return (
    <div className={styles.actionsDropdown}>
      <TableDropdown items={items} row={row} />
      <ApproveEnrolmentModal
        isOpen={approveModalOpen}
        onClose={() => setApproveModalOpen(false)}
        enrollees={row.person ? [row.person] : undefined}
        approveEnrolment={handleApproveEnrolment}
      />
    </div>
  );
};

export default ActionsDropdown;
