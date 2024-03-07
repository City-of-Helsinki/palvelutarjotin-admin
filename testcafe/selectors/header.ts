import { screen } from '@testing-library/testcafe';

export const header = {
  languageSelectorItemEn: screen.getByRole('button', { name: /^English$/ }),
  languageSelectorItemFi: screen.getByRole('button', { name: /^Suomi$/ }),
  languageSelectorItemSv: screen.getByRole('button', { name: /^Svenska$/ }),
};
