import classNames from 'classnames';
import { IconCross } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactModal from 'react-modal';

import styles from './enrolmentModals.module.scss';

interface ApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const EnrolmentModal: React.FC<ApproveModalProps> = ({
  isOpen,
  children,
  onClose,
  title,
}) => {
  const { t } = useTranslation();

  return (
    <ReactModal
      isOpen={isOpen}
      bodyOpenClassName={styles.bodyOpen}
      className={classNames(styles.modal)}
      overlayClassName={styles.overlay}
    >
      <div className={styles.titleRow}>
        <p>{title}</p>
        <button className={styles.closeButton} onClick={onClose}>
          <IconCross />
          {t('common.buttonClose')}
        </button>
      </div>
      {children}
    </ReactModal>
  );
};

export default EnrolmentModal;
