import { screen } from '@testing-library/testcafe';

// import translations from '../../src/domain/app/i18n/fi.json';

export const header = {
  languageSelector: screen.getByRole('button', {
    name: /fi kielivalikko/i,
  }),
  languageSelectorItemEn: screen.getByText(/in english/i),
  languageSelectorItemFi: screen.getByText(/suomeksi/i),
  languageSelectorItemSv: screen.getByText(/på svenska/i),
};
