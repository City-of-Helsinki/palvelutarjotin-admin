import { IconCheck, IconCross, IconCrossCircle, IconPen } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { MenuItem } from '../../../../common/components/menuDropdown/MenuDropdown';
import TableDropdown, {
  MenuItemProps,
} from '../../../../common/components/tableDropdown/TableDropdown';
import {
  EnrolmentFieldsFragment,
  EnrolmentStatus,
  useApproveEnrolmentMutation,
  useDeclineEnrolmentMutation,
} from '../../../../generated/graphql';
import ApproveEnrolmentModal from '../enrolmentModals/ApproveEnrolmentModal';
import DeclineEnrolmentModal from '../enrolmentModals/DeclineEnrolmentModal';
import styles from './actionsDropdown.module.scss';

interface Props {
  row: EnrolmentFieldsFragment;
}

const ActionsDropdown: React.FC<Props> = ({ row }) => {
  const { t } = useTranslation();
  const [approveModalOpen, setApproveModalOpen] = React.useState(false);
  const [declineModalOpen, setDeclineModalOpen] = React.useState(false);
  const enrolmentIsNotApproved = row.status !== EnrolmentStatus.Approved;
  const enrolmentIsNotDeclined = row.status !== EnrolmentStatus.Declined;

  const [approveEnrolment] = useApproveEnrolmentMutation({
    onError: (error) => {
      console.log(error.message);
      toast(t('createOccurrence.error'), {
        type: toast.TYPE.ERROR,
      });
    },
    onCompleted: () => setApproveModalOpen(false),
  });

  const [declineEnrolment] = useDeclineEnrolmentMutation({
    onError: (error) => {
      console.log(error.message);
      toast(t('createOccurrence.error'), {
        type: toast.TYPE.ERROR,
      });
    },
    onCompleted: () => setDeclineModalOpen(false),
  });

  const handleOpenApproveModal = () => {
    setApproveModalOpen(true);
  };

  const handleApproveEnrolment = async () => {
    approveEnrolment({ variables: { input: { enrolmentId: row.id } } });
  };

  const handleDeclineEnrolment = () => {
    declineEnrolment({ variables: { input: { enrolmentId: row.id } } });
  };

  const handleOpenDeclineModal = () => {
    setDeclineModalOpen(true);
  };

  const handleEdit = () => {
    alert('TODO: Go to edit enrolment page');
  };

  const handleDelete = () => {
    alert('TODO: Open delete enrolment modal');
  };

  const items = [
    enrolmentIsNotApproved && {
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
    enrolmentIsNotDeclined && {
      children: (
        <>
          <IconCross className={styles.iconDecline} />
          {t(
            'occurrenceDetails.enrolmentTable.actionsDropdown.menuItemDecline'
          )}
        </>
      ),
      onClick: handleOpenDeclineModal,
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
  ].filter((o) => o) as MenuItemProps[];

  return (
    <div className={styles.actionsDropdown}>
      <TableDropdown items={items} row={row} />
      <ApproveEnrolmentModal
        isOpen={approveModalOpen}
        onClose={() => setApproveModalOpen(false)}
        // TODO: Will there be a way to approve many at the same time?
        enrollees={row.person ? [row.person] : undefined}
        approveEnrolment={handleApproveEnrolment}
      />
      <DeclineEnrolmentModal
        isOpen={declineModalOpen}
        onClose={() => setDeclineModalOpen(false)}
        // TODO: Will there be a way to decline many at the same time?
        enrollees={row.person ? [row.person] : undefined}
        declineEnrolment={handleDeclineEnrolment}
      />
    </div>
  );
};

export default ActionsDropdown;
