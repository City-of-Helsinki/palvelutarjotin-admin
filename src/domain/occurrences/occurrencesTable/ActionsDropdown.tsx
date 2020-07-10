import { IconCrossCircle, IconPenLine, IconUser } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import AlertModal from '../../../common/components/modal/AlertModal';
import TableDropdown, {
  MenuItemProps,
} from '../../../common/components/tableDropdown/TableDropdown';
import { OccurrenceFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import { ROUTES } from '../../app/routes/constants';
import styles from './actionsDropdown.module.scss';

interface Props {
  eventId: string;
  onDelete: (row: OccurrenceFieldsFragment) => void;
  row: OccurrenceFieldsFragment;
}

const ActionsDropdown: React.FC<Props> = ({ eventId, onDelete, row }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const goToOccurrenceDetailsPage = () => {
    history.push(
      `/${locale}${ROUTES.OCCURRENCE_DETAILS.replace(':id', eventId).replace(
        ':occurrenceId',
        row.id
      )}`
    );
  };

  const goToEditOccurrencePage = () => {
    history.push(
      `/${locale}${ROUTES.EDIT_OCCURRENCE.replace(':id', eventId).replace(
        ':occurrenceId',
        row.id
      )}`
    );
  };

  const openDeleteModal = () => {
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    onDelete(row);
    toggleModal();
  };

  const items: MenuItemProps[] = [
    {
      children: (
        <>
          <IconUser />
          {t('occurrences.actionsDropdown.menuItemEnrolments')}
        </>
      ),
      onClick: goToOccurrenceDetailsPage,
    },
    {
      children: (
        <>
          <IconPenLine />
          {t('occurrences.actionsDropdown.menuItemEdit')}
        </>
      ),
      onClick: goToEditOccurrencePage,
    },
    {
      onClick: openDeleteModal,
      children: (
        <>
          <IconCrossCircle className={styles.iconDelete} />
          {t('occurrences.actionsDropdown.menuItemDelete')}
        </>
      ),
    },
  ];

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
      <TableDropdown items={items} row={row} />
    </div>
  );
};

export default ActionsDropdown;
