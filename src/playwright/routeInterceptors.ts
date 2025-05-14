// This file is for intercepting network requests in Playwright tests.
import type { Page, Route } from '@playwright/test';

/**
 * Mock GraphQL requests for a specific operation.
 * - Can be used to mock responses for GraphQL queries or mutations.
 * - Multiple operations can be mocked one at a time.
 *
 * @param page - The Playwright page object.
 * @param operationName - The name of the GraphQL operation to mock.
 * @param responseData - The mock response data to return for the operation.
 */
export async function mockGraphQL(
  page: Page,
  operationName: string,
  responseData: Record<string, unknown>
) {
  await page.route('**/graphql', function (route: Route) {
    const req = route.request().postDataJSON();

    if (req.operationName !== operationName) {
      return route.fallback();
    }

    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: responseData }),
    });
  });
}

/**
 * Block all GraphQL mutations to prevent unintentional data changes.
 */
export async function blockGraphQLMutations(page: Page) {
  await page.route('**/graphql', function (route: Route) {
    const postData = (route.request().postData() ?? '').toLowerCase();
    if (postData.includes('mutation')) {
      return route.abort('blockedbyclient');
    }
    return route.fallback();
  });
}
