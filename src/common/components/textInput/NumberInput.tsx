import React from 'react';

import InputWrapper, { InputWrapperProps } from './InputWrapper';
import styles from './inputWrapper.module.scss';

export type NumberInputProps = {
  defaultValue?: number;
  max?: number;
  min?: number;
  step?: number;
  value?: number;
} & Omit<InputWrapperProps, 'defaultValue'>;

const NumberInput: React.FC<NumberInputProps> = ({
  step,
  defaultValue,
  value,
  min,
  max,
  ...props
}) => {
  const {
    labelledBy,
    disabled,
    id,
    readOnly,
    onBlur,
    onChange,
    placeholder,
  } = props;
  return (
    <InputWrapper {...props}>
      <input
        type="number"
        step={step}
        className={styles.input}
        defaultValue={defaultValue}
        aria-labelledby={labelledBy}
        disabled={disabled}
        id={id}
        readOnly={readOnly}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        min={min}
        max={max}
      />
    </InputWrapper>
  );
};

export default NumberInput;
