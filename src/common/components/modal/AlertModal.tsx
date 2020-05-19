import { Button, IconAttention } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './alertModal.module.scss';
import Modal from './Modal';

interface Props {
  confirmButtonText: string;
  isOpen: boolean;
  onConfirm: () => void;
  title: string;
  toggleModal: () => void;
}

const AlertModal: React.FC<Props> = ({
  children,
  confirmButtonText,
  isOpen,
  onConfirm,
  title,
  toggleModal,
}) => {
  const { t } = useTranslation();
  return (
    <Modal
      className={styles.alertModal}
      icon={<IconAttention />}
      isOpen={isOpen}
      title={title}
      toggleModal={toggleModal}
    >
      {children}
      <div className={styles.buttonWrapper}>
        <Button type="button" onClick={toggleModal} variant="secondary">
          {t('common.alertModal.buttonCancel')}
        </Button>
        <Button type="button" onClick={onConfirm} variant="danger">
          {confirmButtonText}
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
