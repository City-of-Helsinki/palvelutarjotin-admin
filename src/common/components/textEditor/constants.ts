import {
  BlockQuote,
  Bold,
  type EditorConfig,
  Essentials,
  Italic,
  Link,
  List,
  Paragraph,
} from 'ckeditor5';
import fiTranslations from 'ckeditor5/translations/fi.js';
import svTranslations from 'ckeditor5/translations/sv.js';
import type { TFunction } from 'i18next';

import { Language } from '../../../types';

// CKEditor 5 is used under its GPL license, see https://ckeditor.com/legal/ckeditor-licensing-options/
export const CKEDITOR_LICENSE_KEY = 'GPL';

export const plugins: EditorConfig['plugins'] = [
  Essentials,
  Paragraph,
  Bold,
  Italic,
  BlockQuote,
  List,
  Link,
];

export const toolbarItems = [
  'bold',
  'italic',
  '|',
  'blockQuote',
  '|',
  'bulletedList',
  'numberedList',
  '|',
  'link',
  '|',
  'undo',
  'redo',
];

type GetEditorConfigParams = {
  label: string;
  locale: Language;
  placeholder?: string;
  t: TFunction;
};

export const getEditorConfig = ({
  label,
  locale,
  placeholder,
  t,
}: GetEditorConfigParams): EditorConfig => ({
  licenseKey: CKEDITOR_LICENSE_KEY,
  plugins,
  toolbar: { items: toolbarItems, shouldNotGroupWhenFull: true },
  language: locale,
  translations: [fiTranslations, svTranslations],
  root: { label, placeholder },
  link: {
    decorators: {
      openInNewTab: {
        mode: 'manual',
        label: t('common.textEditor.link.linkTargetOption'),
        defaultValue: true,
        attributes: { target: '_blank', rel: 'noopener noreferrer' },
      },
    },
  },
});
