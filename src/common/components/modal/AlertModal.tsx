import { Button, ButtonVariant } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import BaseDialogModal from './BaseDialogModal';

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
    <BaseDialogModal
      id="alert-modal"
      isOpen={isOpen}
      title={title}
      toggleModal={toggleModal}
      variant="danger"
      actions={
        <>
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
        </>
      }
    >
      {children}
    </BaseDialogModal>
  );
};

export default AlertModal;
