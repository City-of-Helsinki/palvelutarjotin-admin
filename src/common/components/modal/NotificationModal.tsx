import { Button, ButtonVariant, Dialog, IconInfoCircle } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

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

  const id = 'notification-modal';
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
          onClick={onConfirm}
          variant={ButtonVariant.Secondary}
          style={{ width: '100%' }}
        >
          {t('common.notificationModal.buttonClose')}
        </Button>
      </Dialog.ActionButtons>
    </Dialog>
  );
};

export default NotificationModal;
