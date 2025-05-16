import type { Locator, Page, Request, Response } from '@playwright/test';

import { mockGraphQL } from '../routeInterceptors';
import { expect } from '../testWithFixtures';
import type { Timeout } from '../types';
import { authorize } from '../utils/jwt/clientUtils/login';

type LanguageButton = 'Suomi' | 'Svenska' | 'English';
type HeaderButton = LanguageButton;

type MockGraphQLParams = {
  operationName: string;
  responseData: Record<string, unknown>;
  variables?: Record<string, unknown>;
};

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

  /**
   * Wait for a GraphQL operation request to be sent using Page.waitForRequest.
   * @param operationName - The name of the GraphQL operation to wait for.
   * See documentation:
   * - https://playwright.dev/docs/api/class-page#page-wait-for-request
   * - https://playwright.dev/docs/events#waiting-for-event
   */
  waitForGraphQLRequest(operationName: string): Promise<Request> {
    return this.page.waitForRequest(
      (request: Request) =>
        request.url().includes('/graphql') &&
        request.method() === 'POST' &&
        request.postDataJSON()?.operationName === operationName
    );
  }

  /**
   * Wait for a GraphQL operation response to be received using Page.waitForResponse.
   * @param operationName - The name of the GraphQL operation to wait for.
   * See documentation:
   * - https://playwright.dev/docs/api/class-page#page-wait-for-response
   * - https://playwright.dev/docs/events#waiting-for-event
   */
  waitForGraphQLResponse(operationName: string): Promise<Response> {
    return this.page.waitForResponse(
      (response: Response) =>
        response.url().includes('/graphql') &&
        response.request().method() === 'POST' &&
        response.request().postDataJSON()?.operationName === operationName
    );
  }

  /**
   * Please use mock fixtures instead whenever available! Only use this when you must,
   * e.g. when you need to overwrite an already mocked operation in a test.
   *
   * Mock GraphQL requests for a specific operation using the current page object.
   * - Can be used to mock responses for GraphQL queries or mutations.
   * - Multiple operations can be mocked one at a time.
   * - Can optionally match specific variables.
   *
   * @param operationName - The name of the GraphQL operation to mock.
   * @param responseData - The mock response data to return for the operation.
   * @param variables - Optional. When provided, the mock will only match requests with exactly these variables.
   */
  async mockGraphQL({
    operationName,
    responseData,
    variables,
  }: MockGraphQLParams) {
    return await mockGraphQL(this.page, operationName, responseData, variables);
  }

  protected async hasVisibleHeading(name: string | RegExp, timeout?: Timeout) {
    await expect(this.page.getByRole('heading', { name })).toBeVisible(timeout);
  }

  protected async hasVisibleButton(name: string | RegExp, timeout?: Timeout) {
    await expect(this.page.getByRole('button', { name })).toBeVisible(timeout);
  }
}
