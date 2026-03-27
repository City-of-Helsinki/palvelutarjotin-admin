import { Button, ButtonVariant, IconInfoCircle } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Modal from './Modal';
import styles from './modal.module.scss';

interface Props {
  confirmButtonText: string;
  isOpen: boolean;
  onConfirm: () => void;
  title: string;
  toggleModal: () => void;
  children?: React.ReactNode;
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
      icon={<IconInfoCircle />}
      isOpen={isOpen}
      title={title}
      toggleModal={toggleModal}
    >
      {children}
      <div className={styles.buttonWrapper}>
        <Button
          type="button"
          onClick={toggleModal}
          variant={ButtonVariant.Secondary}
        >
          {t('common.alertModal.buttonCancel')}
        </Button>
        <Button
          type="button"
          onClick={onConfirm}
          variant={ButtonVariant.Danger}
        >
          {confirmButtonText}
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
