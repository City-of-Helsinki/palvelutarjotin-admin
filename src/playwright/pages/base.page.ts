import type { Locator, Page } from '@playwright/test';

import { expect } from '../testWithFixtures';
import type { Timeout } from '../types';

export type LanguageButton = 'Suomi' | 'Svenska' | 'English';
export type HeaderButton = LanguageButton;

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

  async clickHeaderButton(name: HeaderButton) {
    await this.header.getByRole('button', { name }).first().click();
  }

  async hasTitle(text: string | RegExp, timeout?: Timeout) {
    await expect(this.h1).toContainText(text, timeout);
  }
}
