import { Button, ButtonVariant, Dialog, IconInfoCircle } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  confirmButtonText: string;
  isOpen: boolean;
  onConfirm: () => void;
  title: string;
  toggleModal: () => void;
  children?: React.ReactNode;
}

const ConfirmationModal: React.FC<Props> = ({
  children,
  confirmButtonText,
  isOpen,
  onConfirm,
  title,
  toggleModal,
}) => {
  const { t } = useTranslation();

  const id = 'confirmation-modal';
  const titleId = `${id}-title`;
  const descriptionId = `${id}-content`;

  return (
    <Dialog
      id={id}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      isOpen={isOpen}
      title={title}
      close={toggleModal}
      closeButtonLabelText={t('common.close')}
    >
      <Dialog.Header
        id={titleId}
        title={title}
        iconStart={<IconInfoCircle />}
      />
      <Dialog.Content id={descriptionId}>{children}</Dialog.Content>
      <Dialog.ActionButtons>
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
          variant={ButtonVariant.Primary}
        >
          {confirmButtonText}
        </Button>
      </Dialog.ActionButtons>
    </Dialog>
  );
};

export default ConfirmationModal;
