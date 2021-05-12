import { IconCross, IconCrossCircle, IconPenLine, IconUser } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import AlertModal from '../../../common/components/modal/AlertModal';
import TableDropdown, {
  MenuItemProps,
} from '../../../common/components/tableDropdown/TableDropdown';
import { OccurrenceFieldsFragment } from '../../../generated/graphql';
import useHistory from '../../../hooks/useHistory';
import { ROUTES } from '../../app/routes/constants';
import styles from './actionsDropdown.module.scss';
import CancelOccurrenceModal from './CancelOccurrenceModal';

export interface Props {
  eventId: string;
  isEventDraft?: boolean;
  onDelete?: (row: OccurrenceFieldsFragment) => void;
  onCancel?: (row: OccurrenceFieldsFragment, message?: string) => void;
  row: OccurrenceFieldsFragment;
}

const ActionsDropdown: React.FC<Props> = ({
  eventId,
  onDelete,
  onCancel,
  isEventDraft,
  row,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = React.useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const goToOccurrenceDetailsPage = () => {
    history.pushWithLocale(
      ROUTES.OCCURRENCE_DETAILS.replace(':id', eventId).replace(
        ':occurrenceId',
        row.id
      )
    );
  };

  const goToEditOccurrencePage = () => {
    history.pushWithLocale(
      ROUTES.CREATE_OCCURRENCE.replace(':id', eventId).replace(
        ':occurrenceId',
        row.id
      )
    );
  };

  const openDeleteModal = () => {
    setIsModalOpen(true);
  };

  const openCancelModal = () => {
    setIsCancelModalOpen(true);
  };

  const handleDelete = () => {
    onDelete?.(row);
    toggleModal();
  };

  const handleCancel = (row: OccurrenceFieldsFragment, message?: string) => {
    onCancel?.(row, message);
    setIsCancelModalOpen(false);
  };

  const showCancelAction = !row.cancelled && onCancel;

  const items = [
    {
      children: (
        <>
          <IconUser />
          {t('occurrences.actionsDropdown.menuItemEnrolments')}
        </>
      ),
      onClick: goToOccurrenceDetailsPage,
    },
    isEventDraft && {
      children: (
        <>
          <IconPenLine />
          {t('occurrences.actionsDropdown.menuItemEdit')}
        </>
      ),
      onClick: goToEditOccurrencePage,
    },
    showCancelAction && {
      onClick: openCancelModal,
      children: (
        <>
          <IconCross className={styles.iconDelete} />
          {t('occurrences.actionsDropdown.menuItemCancel')}
        </>
      ),
    },
    isEventDraft && {
      onClick: openDeleteModal,
      children: (
        <>
          <IconCrossCircle className={styles.iconDelete} />
          {t('occurrences.actionsDropdown.menuItemDelete')}
        </>
      ),
    },
  ].filter((i) => i) as MenuItemProps[];

  return (
    <div className={styles.actionsDropdown}>
      <AlertModal
        confirmButtonText={t('occurrences.deleteModal.buttonDelete')}
        onConfirm={handleDelete}
        isOpen={isModalOpen}
        title={t('occurrences.deleteModal.title')}
        toggleModal={toggleModal}
      >
        <p>{t('occurrences.deleteModal.text1')}</p>
        <p>{t('occurrences.deleteModal.text2')}</p>
      </AlertModal>
      {isCancelModalOpen && (
        <CancelOccurrenceModal
          occurrenceId={row.id}
          onClose={() => setIsCancelModalOpen(false)}
          cancelOccurrence={(message) => handleCancel(row, message)}
        />
      )}

      <TableDropdown items={items} row={row} />
    </div>
  );
};

export default ActionsDropdown;
