import type { Locator, Page } from '@playwright/test';

import { expect } from '../testWithFixtures';
import type { Translations } from '../types';
import { BasePage } from './base.page';
import { Language } from '../../types';

// Translations used by authenticated pages
const TRANS = {
  helsinkiProfile: {
    fi: /^Helsinki-profiili$/i,
    sv: /^Helsingforsprofilen$/i,
    en: /^Helsinki Profile$/i,
  },
  logOut: {
    fi: /^Kirjaudu ulos$/i,
    sv: /^Logga ut$/i,
    en: /^Log out$/i,
  },
  myProfile: {
    fi: /^Omat tiedot$/i,
    sv: /^Min profil$/i,
    en: /^My profile$/i,
  },
  openUserMenu: {
    fi: /^Avaa käyttäjän valikko$/i,
    sv: /^Öppna användarmenyn$/i,
    en: /^Open user menu$/i,
  },
} as const satisfies Translations;

export class AuthenticatedPage extends BasePage {
  protected readonly userMenu: Locator;
  protected readonly userMenuDropdown: Locator;

  constructor(page: Page) {
    super(page);
    if (this.constructor === AuthenticatedPage) {
      throw new Error(
        'Abstract AuthenticatedPage class cannot be instantiated directly'
      );
    }
    this.userMenu = page.locator('#user-menu');
    this.userMenuDropdown = page.locator('#user-menu-dropdown');
  }

  async clickUserMenuButton(lang: Language) {
    await this.userMenuButton(lang).click();
  }

  async hasVisibleHeadingInUserMenuDropdown(name: string | RegExp) {
    await expect(
      this.userMenuDropdown.getByRole('heading', { name })
    ).toBeVisible();
  }

  async hasVisibleButtonInUserMenuDropdown(name: string | RegExp) {
    await expect(this.userMenuDropdownButton(name)).toBeVisible();
  }

  async hasVisibleUserMenuButton(lang: Language) {
    await expect(this.userMenuButton(lang)).toBeVisible();
  }

  async hasVisibleMyProfileButton(lang: Language) {
    await expect(this.myProfileButton(lang)).toBeVisible();
  }

  async clickMyProfileButton(lang: Language) {
    await this.myProfileButton(lang).click();
  }

  async hasVisibleHelsinkiProfileButton(lang: Language) {
    await expect(this.helsinkiProfileButton(lang)).toBeVisible();
  }

  async hasVisibleLogOutButton(lang: Language) {
    await expect(this.logOutButton(lang)).toBeVisible();
  }

  async waitForAutoSuggestListsToBeLoaded() {
    // Based on AutoSuggest component's translations from
    // common.autoSuggest.loading and common.autoSuggest.noResults.
    // Prefix matches so matches also with e.g. " ..." at the end:
    const loading = /^(Ladataan|Laddning|Loading)/i; // fi/sv/en
    const noResults = /^(Ei tuloksia|Inga resultat|No results)/i; // fi/sv/en

    // Loop twice because the order of "Loading" and "No results" is unknown and
    // thus waiting for them in the wrong order could make the waiting ineffective.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _ of [1, 2]) {
      await expect(this.page.getByText(loading)).not.toBeVisible();
      await expect(this.page.getByText(noResults)).not.toBeVisible();
    }
  }

  /**
   * Fill a normal (i.e. not a rich text editor) text box with the given value.
   */
  async fillTextBox(textBox: Locator, value: string) {
    await textBox.fill(value);
    await expect(textBox).toHaveValue(value);
  }

  /**
   * Fill a rich text editor's text box with the given value.
   */
  async fillRichEditorTextBox(textBox: Locator, value: string) {
    await textBox.click(); // First focus on the text box by clicking on it
    await this.page.keyboard.type(value); // Type the value into the text box
    await expect(textBox).toHaveText(value);
  }

  async isDropdownOpen(dropdownButton: Locator) {
    await expect(dropdownButton).toHaveAttribute('aria-expanded', 'true');
  }

  async isDropdownClosed(dropdownButton: Locator) {
    await expect(dropdownButton).toHaveAttribute('aria-expanded', 'false');
  }

  async openDropdown(dropdownButton: Locator) {
    await this.isDropdownClosed(dropdownButton);
    await this.clickDropdownButton(dropdownButton);
    await this.isDropdownOpen(dropdownButton);
  }

  async closeDropdown(dropdownButton: Locator) {
    await this.isDropdownOpen(dropdownButton);
    await this.clickDropdownButton(dropdownButton);
    await this.isDropdownClosed(dropdownButton);
  }

  async hasListBoxOption(listBox: Locator, name: string | RegExp) {
    const option = listBox.getByRole('option', { name });
    await expect(option).toBeVisible();
    await expect(option).toBeEnabled();
  }

  async checkListBoxOption(listBox: Locator, name: string | RegExp) {
    const option = listBox.getByRole('option', { name });
    await expect(option).toHaveAttribute('aria-selected', 'false');
    await option.click();
    await expect(option).toHaveAttribute('aria-selected', 'true');
  }

  async clickListBoxOption(listBox: Locator, name: string | RegExp) {
    await listBox.getByRole('option', { name }).click();
  }

  async clickSingleSelectListBoxOption(
    listBox: Locator,
    optionName: string | RegExp
  ) {
    const option = listBox.getByRole('option', { name: optionName });
    // This is more complicated than in multiselect dropdowns because
    // the elements in the dropdown change when an option is hovered over or clicked.
    // If one does not wait for the option to have changed state, the click doesn't work.
    await expect(option).toBeVisible();
    await option.hover(); // Hover so that the option and the listbox change state
    const optionId = await option.getAttribute('id');
    expect(optionId).not.toBeNull();
    await expect(listBox).toHaveAttribute('aria-activedescendant', optionId!);
    await option.click();
  }

  async clickDropdownButton(dropdownButton: Locator) {
    // Further restrict the button to the angle down label in a dropdown
    // (on the right end of the line normally) to not click on selected
    // tags that are on the same line as the dropdown button.
    const button = dropdownButton.locator('[aria-label="angle-down"]');

    // Force click to circumvent Playwright's actionability check
    // "element Receives Events, as in not obscured by other elements"
    // (See https://playwright.dev/docs/actionability)
    // that fails when dropdown has selected tags because they partially
    // obscure the dropdown's button line.
    await button.click({ force: true });
  }

  protected userMenuButton(lang: Language) {
    return this.userMenu.getByRole('button', {
      name: TRANS.openUserMenu[lang],
    });
  }

  protected userMenuDropdownButton(name: string | RegExp) {
    return this.userMenuDropdown.getByRole('button', { name });
  }

  protected myProfileButton(lang: Language) {
    return this.userMenuDropdownButton(TRANS.myProfile[lang]);
  }

  protected helsinkiProfileButton(lang: Language) {
    return this.userMenuDropdownButton(TRANS.helsinkiProfile[lang]);
  }

  protected logOutButton(lang: Language) {
    return this.userMenuDropdownButton(TRANS.logOut[lang]);
  }
}
