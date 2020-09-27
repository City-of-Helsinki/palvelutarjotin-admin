import { screen } from '@testing-library/testcafe';

// import translations from '../../src/domain/app/i18n/fi.json';

export const header = {
  languageSelector: screen.getByRole('button', {
    name: /fi kielivalikko/i,
  }),
  languageSelectorItemEn: screen.getByRole('menuitem', { name: /in english/i }),
  languageSelectorItemFi: screen.getByRole('menuitem', { name: /suomeksi/i }),
  languageSelectorItemSv: screen.getByRole('menuitem', { name: /på svenska/i }),
};
