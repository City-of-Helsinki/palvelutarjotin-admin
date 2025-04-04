// FIXME: Make TextEditor component accessible and remove this eslint-disable comment:
/* eslint-disable jsx-a11y/click-events-have-key-events */
// "Visible, non-interactive elements with click handlers must have at least one
// keyboard listener. (jsx-a11y/click-events-have-key-events)"

// FIXME: Make TextEditor component accessible and remove this eslint-disable comment:
/* eslint-disable jsx-a11y/no-static-element-interactions */
// "Avoid non-native interactive elements. If using native HTML is not possible,
// add an appropriate role and support for tabbing, mouse, keyboard, and touch inputs to
// an interactive content element. (jsx-a11y/no-static-element-interactions)"

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import classNames from 'classnames';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import React from 'react';
import { Editor, EditorState as EditorStateWysiwyg } from 'react-draft-wysiwyg';
import { useTranslation } from 'react-i18next';

import { getTextEditorLocalization, toolbarOptions } from './constants';
import styles from './textEditor.module.scss';
import useIsMounted from '../../../hooks/useIsMounted';
import InputWrapper, { InputWrapperProps } from '../inputWrapper/InputWrapper';

const convertHtmlToEditorState = (html: string) => {
  const blocksFromHtml = htmlToDraft(html);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(
    contentBlocks,
    entityMap
  );

  return EditorState.createWithContent(contentState);
};

export type TextEditorProps = {
  disabled?: boolean;
  label: string;
  onBlur: (event?: React.SyntheticEvent) => void;
  onChange: (value: string) => void;
  placeholder?: string;
  sanitizeAfterChange?: (html: string) => string;
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
  required,
  sanitizeAfterChange,
  style,
  tooltipButtonLabel,
  tooltipLabel,
  tooltipText,
  value,
  ...rest
}) => {
  const isMounted = useIsMounted();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const editorRef = React.useRef<Editor>(null);
  const [focused, setFocused] = React.useState(false);
  const { t } = useTranslation();
  const [editorState, setEditorState] = React.useState(() =>
    value ? convertHtmlToEditorState(value) : ''
  );

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    if (editorState.getCurrentContent().getPlainText()) {
      onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    } else {
      onChange('');
    }
  };

  const handleChange = React.useCallback(
    (value: string) => {
      if (
        isMounted.current &&
        !containerRef.current?.contains(document.activeElement) &&
        sanitizeAfterChange
      ) {
        setEditorState(convertHtmlToEditorState(sanitizeAfterChange(value)));
      }
    },
    [isMounted, sanitizeAfterChange]
  );

  React.useEffect(() => {
    handleChange(value);
  }, [handleChange, value]);

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

  const setFocusToEditor = () => {
    editorRef.current?.focusEditor();
  };

  return (
    <div
      ref={containerRef}
      className={classNames(styles.textEditor, { [styles.invalid]: invalid })}
      id={`${id}-text-editor`}
      onClick={setFocusToEditor}
    >
      <InputWrapper {...wrapperProps} className={styles.inputWrapper}>
        <Editor
          ref={editorRef}
          {...rest}
          ariaLabel={label}
          editorState={editorState as EditorStateWysiwyg}
          onBlur={(ev: React.SyntheticEvent) => {
            onBlur(ev);
            handleChange(value);
            setFocused(false);
          }}
          stripPastedStyles
          onFocus={() => setFocused(true)}
          editorClassName={classNames(styles.editor, {
            [styles.focused]: focused,
          })}
          toolbarClassName={styles.toolbar}
          wrapperClassName={styles.wrapper}
          onEditorStateChange={onEditorStateChange}
          readOnly={disabled}
          localization={getTextEditorLocalization(t)}
          toolbar={toolbarOptions}
        />
      </InputWrapper>
    </div>
  );
};

export default TextEditor;
