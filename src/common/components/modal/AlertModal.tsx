import { Button, ButtonVariant, Dialog, IconInfoCircle } from 'hds-react';
import { useTranslation } from 'react-i18next';

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
  const id = 'alert-modal';
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
      variant="danger"
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
          variant={ButtonVariant.Danger}
        >
          {confirmButtonText}
        </Button>
      </Dialog.ActionButtons>
    </Dialog>
  );
};

export default AlertModal;
