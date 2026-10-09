import 'ckeditor5/ckeditor5.css';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from 'ckeditor5';
import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { getEditorConfig } from './constants';
import styles from './textEditor.module.scss';
import useLocale from '../../../hooks/useLocale';
import InputWrapper, { InputWrapperProps } from '../inputWrapper/InputWrapper';

export type TextEditorProps = {
  disabled?: boolean;
  label: string;
  onBlur: (event?: React.SyntheticEvent) => void;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
} & InputWrapperProps;

const TextEditor: React.FC<TextEditorProps> = ({
  className,
  disabled,
  errorText,
  helperText,
  hideLabel,
  id,
  invalid,
  label,
  onBlur,
  onChange,
  placeholder,
  required,
  style,
  tooltipButtonLabel,
  tooltipLabel,
  tooltipText,
  value,
}) => {
  const { t } = useTranslation();
  const locale = useLocale();

  // CKEditor reads its config only when the editor is created,
  // so the editor is re-created (see `key` below) when the locale changes.
  const config = React.useMemo(
    () => getEditorConfig({ label, locale, placeholder, t }),
    [label, locale, placeholder, t]
  );

  const wrapperProps = {
    className,
    disabled,
    errorText,
    hasIcon: false,
    helperText,
    hideLabel,
    id,
    invalid,
    label,
    required,
    style,
    tooltipLabel,
    tooltipText,
    tooltipButtonLabel,
  };

  return (
    <div
      className={classNames(styles.textEditor, { [styles.invalid]: invalid })}
      id={`${id}-text-editor`}
    >
      <InputWrapper {...wrapperProps} className={styles.inputWrapper}>
        <CKEditor
          key={locale}
          editor={ClassicEditor}
          config={config}
          data={value}
          disabled={disabled}
          onChange={(_event, editor) => onChange(editor.getData())}
          onBlur={() => onBlur()}
        />
      </InputWrapper>
    </div>
  );
};

export default TextEditor;
