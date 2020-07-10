import { IconCheck, IconCross, IconCrossCircle, IconPen } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import TableDropdown, {
  MenuItemProps,
} from '../../../../common/components/tableDropdown/TableDropdown';
import { EnrolmentFieldsFragment } from '../../../../generated/graphql';
import styles from './actionsDropdown.module.scss';

interface Props {
  row: EnrolmentFieldsFragment;
}

const ActionsDropdown: React.FC<Props> = ({ row }) => {
  const { t } = useTranslation();

  const handleApprove = () => {
    alert('TODO: Open approve enrolment modal');
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
      onClick: handleApprove,
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

  return (
    <div className={styles.actionsDropdown}>
      <TableDropdown items={items} row={row} />
    </div>
  );
};

export default ActionsDropdown;
