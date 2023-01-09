import { screen } from '@testing-library/testcafe';

import { header } from '../selectors/header';
import { getPathname } from '../utils/clientUtils';
import { getEnvUrl } from '../utils/settings';

fixture('Landing page').page(getEnvUrl('fi'));

test('Changing language on login page', async (t) => {
  await t
    .expect(
      screen.getByRole('heading', { name: /tapahtumien hallinta/i }).exists
    )
    .ok()
    .expect(screen.getByRole('button', { name: /kirjaudu sisään/i }).exists)
    .ok();

  await t
    .click(header.languageSelector)
    .click(header.languageSelectorItemSv)
    .expect(getPathname())
    .eql('/sv');

  await t
    .expect(
      screen.getByRole('heading', { name: /hantering av evenemang/i }).exists
    )
    .ok()
    .expect(screen.getByRole('button', { name: /logga in/i }).exists)
    .ok();
});
