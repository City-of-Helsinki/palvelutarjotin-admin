import { IconCheck, IconCrossCircle } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import TableDropdown, {
  MenuItemProps,
} from '../../../../common/components/tableDropdown/TableDropdown';
import {
  EventQueueEnrolmentFieldsFragment,
  usePickEnrolmentFromQueueMutation,
  useUnenrolEventQueueMutation,
} from '../../../../generated/graphql';
import DeleteEnrolmentModal from '../enrolmentModals/DeleteEnrolmentModal';
import PickQueueEnrolmentModal from '../enrolmentModals/PickQueueEnrolmentModal';
import styles from './actionsDropdown.module.scss';

export interface Props {
  row: EventQueueEnrolmentFieldsFragment;
  eventId: string;
  occurrenceId: string;
  onEnrolmentsModified: () => Promise<void>;
}

const QueueActionsDropdown: React.FC<Props> = ({
  row,
  eventId,
  occurrenceId,
  onEnrolmentsModified,
}) => {
  const pEventId = row.pEvent.id;
  const { t } = useTranslation();
  const [pickEnrolmentModalOpen, setPickEnrolmentModalOpen] =
    React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

  const [pickEnrolment] = usePickEnrolmentFromQueueMutation({
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error({ error });
      if (
        error.graphQLErrors.find(
          (e) => e?.extensions?.code === 'ALREADY_JOINED_EVENT_ERROR'
        )
      ) {
        toast.error(t('enrolment.pickQueueEnrolmentDuplicateEntryError'));
      } else {
        toast.error(t('enrolment.pickQueueEnrolmentError'));
      }
    },
    onCompleted: () => {
      setPickEnrolmentModalOpen(false);
      (async () => await onEnrolmentsModified())();
    },
  });

  const [deleteEnrolment] = useUnenrolEventQueueMutation({
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error(error.message);
      toast.error(t('enrolment.deleteEnrolmentError'));
    },
    onCompleted: () => {
      setDeleteModalOpen(false);
      (async () => await onEnrolmentsModified())();
    },
  });

  const handleOpenApproveModal = () => {
    setPickEnrolmentModalOpen(true);
  };

  const handlePickEnrolment = () => {
    (async () =>
      await pickEnrolment({
        variables: {
          input: {
            eventQueueEnrolmentId: row.id,
            occurrenceId,
          },
        },
        // TODO: Would be better handled here, but is now done with onEnrolmentsModified
        // move the enrolment from queue to the occurrence enrolments
        // refetchQueries: [EventQueueEnrolmentsDocument],
      }))();
  };

  const handleDeleteEnrolment = () => {
    if (eventId) {
      (async () =>
        await deleteEnrolment({
          variables: {
            input: { pEventId, studyGroupId: row.studyGroup.id },
          },
          // TODO: Would be better handled here, but is now done with onEnrolmentsModified
          // refetch the list of event queue enrolments
          // refetchQueries: [EventQueueEnrolmentsDocument],
        }))();
    }
  };

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const items = [
    {
      children: (
        <>
          <IconCheck className={styles.iconApprove} />
          {t(
            'occurrenceDetails.enrolmentTable.queueActionsDropdown.menuItemEnrol'
          )}
        </>
      ),
      onClick: handleOpenApproveModal,
    },
    {
      children: (
        <>
          <IconCrossCircle className={styles.iconDelete} />
          {t(
            'occurrenceDetails.enrolmentTable.queueActionsDropdown.menuItemDelete'
          )}
        </>
      ),
      onClick: handleOpenDeleteModal,
    },
  ].filter((o) => o) as MenuItemProps[];

  const enrollees = row.person ? [{ personName: row.person.name }] : [];

  return (
    <div className={styles.actionsDropdown}>
      <TableDropdown items={items} row={row} />
      {pickEnrolmentModalOpen && (
        <PickQueueEnrolmentModal
          onClose={() => setPickEnrolmentModalOpen(false)}
          enrollees={enrollees}
          pickQueueEnrolment={handlePickEnrolment}
        />
      )}
      {deleteModalOpen && (
        <DeleteEnrolmentModal
          onClose={() => setDeleteModalOpen(false)}
          enrollees={enrollees}
          deleteEnrolment={handleDeleteEnrolment}
        />
      )}
    </div>
  );
};

export default QueueActionsDropdown;
