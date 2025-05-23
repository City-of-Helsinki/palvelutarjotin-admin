import { IconCheck, IconCross, IconCrossCircle, IconPen } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

import styles from './actionsDropdown.module.scss';
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
import useNavigate from '../../../../hooks/useNavigate';
import { ROUTES } from '../../../app/routes/constants';
import ApproveEnrolmentModal from '../enrolmentModals/ApproveEnrolmentModal';
import DeclineEnrolmentModal from '../enrolmentModals/DeclineEnrolmentModal';
import DeleteEnrolmentModal from '../enrolmentModals/DeleteEnrolmentModal';

export interface Props {
  row: EnrolmentFieldsFragment;
  eventId?: string | null;
  onEnrolmentsModified: () => Promise<void>;
}

const ActionsDropdown: React.FC<Props> = ({
  row,
  eventId,
  onEnrolmentsModified,
}) => {
  const { t } = useTranslation();
  const { occurrenceId } = useParams<{ occurrenceId: string }>();
  const { pushWithReturnPath } = useNavigate();
  const [approveModalOpen, setApproveModalOpen] = React.useState(false);
  const [declineModalOpen, setDeclineModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const enrolmentIsNotApproved = row.status !== EnrolmentStatus.Approved;
  const enrolmentIsNotDeclined = row.status !== EnrolmentStatus.Declined;

  const [approveEnrolment] = useApproveEnrolmentMutation({
    onError: (error) => {
      // TODO: Better error message
      // eslint-disable-next-line no-console
      console.log(error.message);
      toast.error(t('enrolment.approveEnrolmentError'));
    },
    onCompleted: () => {
      setApproveModalOpen(false);
      (async () => await onEnrolmentsModified())();
    },
  });

  const [declineEnrolment] = useDeclineEnrolmentMutation({
    onError: (error) => {
      // TODO: Better error message
      // eslint-disable-next-line no-console
      console.log(error.message);
      toast.error(t('enrolment.declineEnrolmentError'));
    },
    onCompleted: () => {
      setDeclineModalOpen(false);
      (async () => await onEnrolmentsModified())();
    },
  });

  const [deleteEnrolment] = useDeleteEnrolmentMutation({
    onError: (error) => {
      // TODO: Better error message
      // eslint-disable-next-line no-console
      console.log(error.message);
      toast.error(t('enrolment.deleteEnrolmentError'));
    },
    // TODO: might need a check if component is mounted
    onCompleted: () => {
      setDeleteModalOpen(false);
      (async () => await onEnrolmentsModified())();
    },
  });

  const handleOpenApproveModal = () => {
    setApproveModalOpen(true);
  };

  const handleApproveEnrolment = (message: string) => {
    (async () =>
      await approveEnrolment({
        variables: {
          input: { enrolmentId: row.id, customMessage: message },
        },
      }))();
  };

  const handleDeclineEnrolment = (message?: string) => {
    (async () =>
      await declineEnrolment({
        variables: { input: { enrolmentId: row.id, customMessage: message } },
      }))();
  };

  const handleDeleteEnrolment = () => {
    if (occurrenceId) {
      (async () =>
        await deleteEnrolment({
          variables: {
            input: { occurrenceId, studyGroupId: row.studyGroup.id },
          },
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
        }))();
    }
  };

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const handleOpenDeclineModal = () => {
    setDeclineModalOpen(true);
  };

  const handleEdit = () => {
    if (eventId) {
      pushWithReturnPath(
        ROUTES.EDIT_ENROLMENT.replace(':enrolmentId', row.id).replace(
          ':eventId',
          eventId
        )
      );
    }
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

  const enrollees = row.person ? [{ personName: row.person.name }] : [];

  return (
    <div className={styles.actionsDropdown}>
      <TableDropdown items={items} row={row} />
      {approveModalOpen && (
        <ApproveEnrolmentModal
          onClose={() => setApproveModalOpen(false)}
          // TODO: Will there be a way to approve many at the same time?
          enrollees={enrollees}
          approveEnrolment={handleApproveEnrolment}
        />
      )}
      {declineModalOpen && (
        <DeclineEnrolmentModal
          onClose={() => setDeclineModalOpen(false)}
          // TODO: Will there be a way to decline many at the same time?
          enrollees={enrollees}
          declineEnrolment={handleDeclineEnrolment}
        />
      )}
      {deleteModalOpen && (
        <DeleteEnrolmentModal
          onClose={() => setDeleteModalOpen(false)}
          deleteEnrolment={handleDeleteEnrolment}
        />
      )}
    </div>
  );
};

export default ActionsDropdown;
