import { Tooltip } from 'hds-react';
import React from 'react';

import { RequiredIndicator } from '../requiredIndicator/RequiredIndicator';
import styles from './fieldLabel.module.scss';

type FieldLabelProps = {
  hidden?: boolean;
  inputId: string;
  label: string | React.ReactNode;
  required?: boolean;
  tooltipLabel?: string;
  tooltipButtonLabel?: string;
  tooltipText?: string;
};

const FieldLabel: React.FC<FieldLabelProps> = ({
  hidden,
  inputId,
  label,
  required,
  tooltipLabel,
  tooltipButtonLabel,
  tooltipText,
  ...rest
}) => (
  <>
    <label
      htmlFor={inputId}
      className={`${styles.label} ${hidden ? styles.hidden : ''}`}
      {...rest}
    >
      {label}
      {required && <RequiredIndicator />}
    </label>
    {tooltipText && (
      <Tooltip
        buttonClassName={styles.tooltipButton}
        tooltipLabel={tooltipLabel}
        buttonLabel={tooltipButtonLabel}
      >
        {tooltipText}
      </Tooltip>
    )}
  </>
);

export default FieldLabel;
