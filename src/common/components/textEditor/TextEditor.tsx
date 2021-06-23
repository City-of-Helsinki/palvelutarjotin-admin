import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { css } from '@emotion/css';
import classNames from 'classnames';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import React from 'react';
import { Editor, EditorState as EditorStateWysiwyg } from 'react-draft-wysiwyg';
import { useTranslation } from 'react-i18next';

import useIsMounted from '../../../hooks/useIsMounted';
// import { useTheme } from '../../../domain/app/theme/Theme';
import InputWrapper, { InputWrapperProps } from '../inputWrapper/InputWrapper';
import styles from './textEditor.module.scss';

const toolbarOptions = {
  options: ['inline', 'blockType', 'list', 'link', 'history'],
  inline: {
    inDropdown: false,
    options: ['bold', 'italic'],
  },
  blockType: {
    inDropdown: true,
    options: ['Normal', 'Blockquote'],
  },
  list: {
    inDropdown: false,
    options: ['unordered', 'ordered'],
  },
  link: {
    inDropdown: false,
    showOpenOptionOnHover: false,
    defaultTargetOption: '_blank',
    options: ['link', 'unlink'],
  },
  history: {
    inDropdown: false,
    options: ['undo', 'redo'],
  },
};

const covertHtmlToEditorState = (html: string) => {
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

// const useTheme: React.FC = ({ children }) => <>{children}</>;

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
  // const { theme } = useTheme();

  const [editorState, setEditorState] = React.useState(
    covertHtmlToEditorState(value)
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
        setEditorState(covertHtmlToEditorState(sanitizeAfterChange(value)));
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
      className={classNames(
        styles.textEditor,
        { [styles.invalid]: invalid }
        // css(theme.textEditor)
      )}
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
          onFocus={() => setFocused(true)}
          editorClassName={classNames(styles.editor, {
            [styles.focused]: focused,
          })}
          toolbarClassName={styles.toolbar}
          wrapperClassName={styles.wrapper}
          onEditorStateChange={onEditorStateChange}
          readOnly={disabled}
          localization={{
            translations: {
              // Generic
              'generic.add': t('common.textEditor.add'),
              'generic.cancel': t('common.textEditor.cancel'),
              // BlockType
              'components.controls.blocktype.h1': t(
                'common.textEditor.blocktype.h1'
              ),
              'components.controls.blocktype.h2': t(
                'common.textEditor.blocktype.h2'
              ),
              'components.controls.blocktype.h3': t(
                'common.textEditor.blocktype.h3'
              ),
              'components.controls.blocktype.h4': t(
                'common.textEditor.blocktype.h4'
              ),
              'components.controls.blocktype.h5': t(
                'common.textEditor.blocktype.h5'
              ),
              'components.controls.blocktype.h6': t(
                'common.textEditor.blocktype.h6'
              ),
              'components.controls.blocktype.blockquote': t(
                'common.textEditor.blocktype.blockquote'
              ),
              'components.controls.blocktype.blocktype': t(
                'common.textEditor.blocktype.blocktype'
              ),
              'components.controls.blocktype.normal': t(
                'common.textEditor.blocktype.normal'
              ),
              // History
              'components.controls.history.history': t(
                'common.textEditor.history.history'
              ),
              'components.controls.history.undo': t(
                'common.textEditor.history.undo'
              ),
              'components.controls.history.redo': t(
                'common.textEditor.history.redo'
              ),
              // Inline
              'components.controls.inline.bold': t(
                'common.textEditor.inline.bold'
              ),
              'components.controls.inline.italic': t(
                'common.textEditor.inline.italic'
              ),
              'components.controls.inline.underline': t(
                'common.textEditor.inline.underline'
              ),
              // Link
              'components.controls.link.linkTitle': t(
                'common.textEditor.link.linkTitle'
              ),
              'components.controls.link.linkTarget': t(
                'common.textEditor.link.linkTarget'
              ),
              'components.controls.link.linkTargetOption': t(
                'common.textEditor.link.linkTargetOption'
              ),
              'components.controls.link.link': t('common.textEditor.link.link'),
              'components.controls.link.unlink': t(
                'common.textEditor.link.unlink'
              ),
              // List
              'components.controls.list.list': t('common.textEditor.list.list'),
              'components.controls.list.unordered': t(
                'common.textEditor.list.unordered'
              ),
              'components.controls.list.ordered': t(
                'common.textEditor.list.ordered'
              ),
            },
          }}
          toolbar={toolbarOptions}
        />
      </InputWrapper>
    </div>
  );
};

export default TextEditor;
