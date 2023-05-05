import { IconCheck, IconCrossCircle } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import TableDropdown, {
  MenuItemProps,
} from '../../../../common/components/tableDropdown/TableDropdown';
import {
  EventQueueEnrolmentFieldsFragment,
  EventQueueEnrolmentsDocument,
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
  onEnrolmentsModified: () => void;
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
        toast(t('enrolment.pickQueueEnrolmentDuplicateEntryError'), {
          type: toast.TYPE.ERROR,
        });
      } else {
        toast(t('enrolment.pickQueueEnrolmentError'), {
          type: toast.TYPE.ERROR,
        });
      }
    },
    onCompleted: () => {
      setPickEnrolmentModalOpen(false);
      onEnrolmentsModified();
    },
  });

  const [deleteEnrolment] = useUnenrolEventQueueMutation({
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error(error.message);
      toast(t('enrolment.deleteEnrolmentError'), {
        type: toast.TYPE.ERROR,
      });
    },
    onCompleted: () => {
      setDeleteModalOpen(false);
      onEnrolmentsModified();
    },
  });

  const handleOpenApproveModal = () => {
    setPickEnrolmentModalOpen(true);
  };

  const handlePickEnrolment = async () => {
    pickEnrolment({
      variables: {
        input: {
          eventQueueEnrolmentId: row.id,
          occurrenceId,
        },
      },
      // move the enrolment from queue to the occurrence enrolments
      refetchQueries: [EventQueueEnrolmentsDocument],
    });
  };

  const handleDeleteEnrolment = async (message?: string) => {
    if (eventId) {
      await deleteEnrolment({
        variables: {
          input: { pEventId, studyGroupId: row.studyGroup.id },
        },
        // refetch the list of event queue enrolments
        refetchQueries: [EventQueueEnrolmentsDocument],
      });
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
          deleteEnrolment={handleDeleteEnrolment}
        />
      )}
    </div>
  );
};

export default QueueActionsDropdown;
