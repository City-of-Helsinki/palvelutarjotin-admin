import type { Locator, Page } from '@playwright/test';

import { expect } from '../testWithFixtures';
import type { Timeout } from '../types';
import { authorize } from '../utils/jwt/clientUtils/login';

type LanguageButton = 'Suomi' | 'Svenska' | 'English';
type HeaderButton = LanguageButton;

export class BasePage {
  protected readonly page: Page;
  protected readonly h1: Locator;
  protected readonly header: Locator;
  protected readonly mainContent: Locator;

  constructor(page: Page) {
    if (this.constructor === BasePage) {
      throw new Error(
        'Abstract BasePage class cannot be instantiated directly'
      );
    }
    this.page = page;
    this.h1 = page.locator('h1');
    this.header = page.getByRole('banner');
    this.mainContent = page.locator('#main-content');
  }

  async isReady() {
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }); // Network can be slow
  }

  async authorize() {
    return await authorize(this.page);
  }

  async reload() {
    return await this.page.reload();
  }

  async clickHeaderButton(name: HeaderButton) {
    await this.header.getByRole('button', { name }).first().click();
  }

  async hasTitle(text: string | RegExp, timeout?: Timeout) {
    await expect(this.h1).toContainText(text, timeout);
  }

  protected async hasVisibleHeading(name: string | RegExp, timeout?: Timeout) {
    await expect(this.page.getByRole('heading', { name })).toBeVisible(timeout);
  }

  protected async hasVisibleButton(name: string | RegExp, timeout?: Timeout) {
    await expect(this.page.getByRole('button', { name })).toBeVisible(timeout);
  }
}
