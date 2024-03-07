import { Button, IconInfoCircle } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Modal from './Modal';
import styles from './modal.module.scss';

interface Props {
  isOpen: boolean;
  onConfirm: () => void;
  title: string;
  toggleModal: () => void;
  children?: React.ReactNode;
}

const NotificationModal: React.FC<Props> = ({
  children,
  isOpen,
  title,
  toggleModal,
  onConfirm,
}) => {
  const { t } = useTranslation();
  return (
    <Modal
      icon={<IconInfoCircle />}
      isOpen={isOpen}
      title={title}
      toggleModal={toggleModal}
    >
      {children}
      <div className={styles.notificationButtonWrapper}>
        <Button
          type="button"
          onClick={onConfirm}
          variant="secondary"
          style={{ width: '100%' }}
        >
          {t('common.notificationModal.buttonClose')}
        </Button>
      </div>
    </Modal>
  );
};

export default NotificationModal;
