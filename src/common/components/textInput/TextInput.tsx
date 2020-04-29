import React from 'react';

import InputWrapper, { InputWrapperProps } from './InputWrapper';
import styles from './inputWrapper.module.scss';

export type TextInputProps = {
  type?: string;
} & InputWrapperProps;

const TextInput: React.FC<TextInputProps> = ({ type = 'text', ...props }) => {
  const {
    defaultValue,
    labelledBy,
    disabled,
    id,
    readOnly,
    onBlur,
    onChange,
    placeholder,
    value,
  } = props;
  return (
    <InputWrapper {...props}>
      <input
        type={type}
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
      />
    </InputWrapper>
  );
};

export default TextInput;
