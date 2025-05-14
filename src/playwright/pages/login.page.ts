import type { Page } from '@playwright/test';

import { BasePage } from './base.page';
import type { Language } from '../../types';
import { expect } from '../testWithFixtures';
import { Translation } from '../types';

type AllowedLoginPagePaths = '/' | `/${Language}`;

// Translations used by the login page
const TRANS = {
  eventManagement: {
    fi: /^Tapahtumien hallinta$/i,
    sv: /^Hantering av evenemang$/i,
    en: /^Event management$/i,
  },
  logIn: {
    fi: /^Kirjaudu sisään$/i,
    sv: /^Logga in$/i,
    en: /^Log in$/i,
  },
} as const satisfies Record<string, Translation>;

type TranslationsOf<Keys extends keyof typeof TRANS> =
  (typeof TRANS)[Keys][Language];

type LoginButton = TranslationsOf<'logIn'>;

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  static async create(page: Page, path: AllowedLoginPagePaths) {
    const loginPage = new LoginPage(page);
    await loginPage.page.goto(path);
    await loginPage.isReady();
    return loginPage;
  }

  async isFinnish() {
    await this.hasTitle(TRANS.eventManagement.fi);
    await this.hasVisibleLoginButton(TRANS.logIn.fi);
  }

  async isSwedish() {
    await this.hasTitle(TRANS.eventManagement.sv);
    await this.hasVisibleLoginButton(TRANS.logIn.sv);
  }

  async isEnglish() {
    await this.hasTitle(TRANS.eventManagement.en);
    await this.hasVisibleLoginButton(TRANS.logIn.en);
  }

  protected async hasVisibleLoginButton(name: LoginButton) {
    await expect(this.mainContent.getByRole('button', { name })).toBeVisible();
  }
}
