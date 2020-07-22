import { IconCheck, IconCross, IconCrossCircle, IconPen } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

import TableDropdown, {
  MenuItemProps,
} from '../../../../common/components/tableDropdown/TableDropdown';
import {
  EnrolmentFieldsFragment,
  EnrolmentStatus,
  OccurrenceDocument,
  OccurrenceQuery,
  useApproveEnrolmentMutation,
  useDeclineEnrolmentMutation,
  useDeleteEnrolmentMutation,
} from '../../../../generated/graphql';
import ApproveEnrolmentModal from '../enrolmentModals/ApproveEnrolmentModal';
import DeclineEnrolmentModal from '../enrolmentModals/DeclineEnrolmentModal';
import DeleteEnrolmentModal from '../enrolmentModals/DeleteEnrolmentModal';
import styles from './actionsDropdown.module.scss';

interface Props {
  row: EnrolmentFieldsFragment;
}

const ActionsDropdown: React.FC<Props> = ({ row }) => {
  const { t } = useTranslation();
  const { occurrenceId } = useParams();
  const [approveModalOpen, setApproveModalOpen] = React.useState(false);
  const [declineModalOpen, setDeclineModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const enrolmentIsNotApproved = row.status !== EnrolmentStatus.Approved;
  const enrolmentIsNotDeclined = row.status !== EnrolmentStatus.Declined;

  const [approveEnrolment] = useApproveEnrolmentMutation({
    onError: (error) => {
      // TODO: Better error message
      console.log(error.message);
      toast(t('enrolment.approveEnrolmentError'), {
        type: toast.TYPE.ERROR,
      });
    },
    onCompleted: () => setApproveModalOpen(false),
  });

  const [declineEnrolment] = useDeclineEnrolmentMutation({
    onError: (error) => {
      // TODO: Better error message
      console.log(error.message);
      toast(t('enrolment.declineEnrolmentError'), {
        type: toast.TYPE.ERROR,
      });
    },
    onCompleted: () => setDeclineModalOpen(false),
  });

  const [deleteEnrolment] = useDeleteEnrolmentMutation({
    onError: (error) => {
      // TODO: Better error message
      console.log(error.message);
      toast(t('enrolment.deleteEnrolmentError'), {
        type: toast.TYPE.ERROR,
      });
    },
    // TODO: might need a check if component is mounted
    onCompleted: () => setDeleteModalOpen(false),
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

  const handleDeleteEnrolment = async () => {
    if (occurrenceId) {
      await deleteEnrolment({
        variables: { input: { occurrenceId, studyGroupId: row.studyGroup.id } },
        // remove deleted enrolment from cache
        update: (cache) => {
          const occurrenceData = cache.readQuery<OccurrenceQuery>({
            query: OccurrenceDocument,
            variables: { id: occurrenceId },
          });
          const occurrence = occurrenceData?.occurrence;
          // overwrite occurrence from cache (delete enrolment)
          cache.writeQuery({
            query: OccurrenceDocument,
            data: {
              occurrence: {
                ...occurrence,
                enrolments: {
                  ...occurrence?.enrolments,
                  edges: occurrence?.enrolments.edges.filter(
                    (e) => e?.node?.id !== row.id
                  ),
                },
              },
            },
          });
        },
      });
    }
  };

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const handleOpenDeclineModal = () => {
    setDeclineModalOpen(true);
  };

  const handleEdit = () => {
    alert('TODO: Go to edit enrolment page');
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
      onClick: handleOpenDeleteModal,
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
      <DeleteEnrolmentModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        deleteEnrolment={handleDeleteEnrolment}
      />
    </div>
  );
};

export default ActionsDropdown;
