import { Dialog, IconInfoCircle } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  id: string;
  isOpen: boolean;
  title: string;
  toggleModal: () => void;
  actions: React.ReactNode;
  children?: React.ReactNode;
  variant?: React.ComponentProps<typeof Dialog>['variant'];
  iconStart?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const BaseDialogModal: React.FC<Props> = ({
  actions,
  children,
  id,
  isOpen,
  title,
  toggleModal,
  variant,
  iconStart,
  className,
  style,
}) => {
  const { t } = useTranslation();
  const instanceSuffix = React.useId().replaceAll(':', '');
  const dialogId = `${id}-${instanceSuffix}`;

  const titleId = `${dialogId}-title`;
  const descriptionId = `${dialogId}-content`;

  return (
    <Dialog
      id={dialogId}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      isOpen={isOpen}
      title={title}
      close={toggleModal}
      closeButtonLabelText={t('common.close')}
      variant={variant}
      className={className}
      style={style}
    >
      <Dialog.Header
        id={titleId}
        title={title}
        iconStart={iconStart ?? <IconInfoCircle />}
      />
      <Dialog.Content id={descriptionId}>{children}</Dialog.Content>
      <Dialog.ActionButtons>{actions}</Dialog.ActionButtons>
    </Dialog>
  );
};

export default BaseDialogModal;
