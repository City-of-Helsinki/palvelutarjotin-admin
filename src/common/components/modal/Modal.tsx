import classNames from 'classnames';
import * as React from 'react';
import ReactModal from 'react-modal';

import styles from './modal.module.scss';

interface Props {
  className?: string;
  icon: React.ReactElement;
  isOpen: boolean;
  title: string;
  toggleModal: () => void;
}

const Modal: React.FC<Props> = ({
  children,
  className,
  icon,
  isOpen,
  title,
  toggleModal,
}) => {
  return (
    <div className={styles.modalWrapper}>
      {isOpen && (
        <ReactModal
          isOpen={isOpen}
          onRequestClose={toggleModal}
          bodyOpenClassName={styles.bodyOpen}
          className={styles.modal}
          overlayClassName={styles.overlay}
          shouldCloseOnOverlayClick={false}
        >
          <div className={classNames(styles.modalContent, className)}>
            <div className={styles.iconWrapper}>{icon}</div>
            <div className={styles.contentWrapper}>
              <div className={styles.title}>{title}</div>
              <div className={styles.modalChildren}>{children}</div>
            </div>
          </div>
        </ReactModal>
      )}
    </div>
  );
};

export default Modal;
