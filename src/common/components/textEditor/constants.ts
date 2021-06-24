import { TFunction } from 'i18next';

export const toolbarOptions = {
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

export const getTextEditorLocalization = (t: TFunction) => ({
  translations: {
    // Generic
    'generic.add': t('common.textEditor.add'),
    'generic.cancel': t('common.textEditor.cancel'),
    // BlockType
    'components.controls.blocktype.h1': t('common.textEditor.blocktype.h1'),
    'components.controls.blocktype.h2': t('common.textEditor.blocktype.h2'),
    'components.controls.blocktype.h3': t('common.textEditor.blocktype.h3'),
    'components.controls.blocktype.h4': t('common.textEditor.blocktype.h4'),
    'components.controls.blocktype.h5': t('common.textEditor.blocktype.h5'),
    'components.controls.blocktype.h6': t('common.textEditor.blocktype.h6'),
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
    'components.controls.history.undo': t('common.textEditor.history.undo'),
    'components.controls.history.redo': t('common.textEditor.history.redo'),
    // Inline
    'components.controls.inline.bold': t('common.textEditor.inline.bold'),
    'components.controls.inline.italic': t('common.textEditor.inline.italic'),
    'components.controls.inline.underline': t(
      'common.textEditor.inline.underline'
    ),
    // Link
    'components.controls.link.linkTitle': t('common.textEditor.link.linkTitle'),
    'components.controls.link.linkTarget': t(
      'common.textEditor.link.linkTarget'
    ),
    'components.controls.link.linkTargetOption': t(
      'common.textEditor.link.linkTargetOption'
    ),
    'components.controls.link.link': t('common.textEditor.link.link'),
    'components.controls.link.unlink': t('common.textEditor.link.unlink'),
    // List
    'components.controls.list.list': t('common.textEditor.list.list'),
    'components.controls.list.unordered': t('common.textEditor.list.unordered'),
    'components.controls.list.ordered': t('common.textEditor.list.ordered'),
  },
});
