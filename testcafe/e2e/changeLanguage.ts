import { screen } from '@testing-library/testcafe';

import { header } from '../selectors/header';
import { getPathname } from '../utils/clientUtils';
import { getEnvUrl } from '../utils/settings';

fixture('Landing page').page(getEnvUrl('fi'));

test('Changing language on login page', async (t) => {
  // Expect default language to be Finnish
  await t
    .expect(
      screen.getByRole('heading', { name: /tapahtumien hallinta/i }).exists
    )
    .ok()
    .expect(screen.getByRole('button', { name: /kirjaudu sisään/i }).exists)
    .ok();

  // Change language to Swedish
  await t.click(header.languageSelectorItemSv).expect(getPathname()).eql('/sv');

  // Check that language was changed to Swedish
  await t
    .expect(
      screen.getByRole('heading', { name: /hantering av evenemang/i }).exists
    )
    .ok()
    .expect(screen.getByRole('button', { name: /logga in/i }).exists)
    .ok();

  // Change language to English
  await t.click(header.languageSelectorItemEn).expect(getPathname()).eql('/en');

  // Check that language was changed to English
  await t
    .expect(screen.getByRole('heading', { name: /event management/i }).exists)
    .ok()
    .expect(screen.getByRole('button', { name: /log in/i }).exists)
    .ok();

  // Change language to Finnish
  await t.click(header.languageSelectorItemFi).expect(getPathname()).eql('/fi');

  // Check that language was changed to Finnish
  await t
    .expect(
      screen.getByRole('heading', { name: /tapahtumien hallinta/i }).exists
    )
    .ok()
    .expect(screen.getByRole('button', { name: /kirjaudu sisään/i }).exists)
    .ok();
});
