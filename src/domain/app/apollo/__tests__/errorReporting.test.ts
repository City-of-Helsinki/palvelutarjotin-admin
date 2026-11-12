import type { Operation } from '@apollo/client';
import * as Sentry from '@sentry/browser';

import {
  BEFORE_UNLOAD_GRACE_PERIOD_MS,
  GraphQLNetworkError,
  getGraphQLSentryTags,
  registerUnloadTracking,
  reportNetworkError,
  resetErrorReportingState,
} from '../errorReporting';

vi.mock('@sentry/browser', () => ({
  captureException: vi.fn(),
  captureMessage: vi.fn(),
}));

const operation = { operationName: 'TestOperation' } as Operation;

const createServerError = (statusCode: number) =>
  Object.assign(new Error('Response not successful'), {
    name: 'ServerError',
    statusCode,
    response: {} as Response,
    result: {},
  });

const failedFetch = () => new TypeError('Failed to fetch');

describe('reportNetworkError', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(true);
    resetErrorReportingState();
    registerUnloadTracking();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it('reports an HTTP error as an exception with status code', () => {
    reportNetworkError('kultus-api', operation, createServerError(502));

    expect(Sentry.captureException).toHaveBeenCalledTimes(1);
    const [error, hint] = vi.mocked(Sentry.captureException).mock.calls[0];
    expect(error).toBeInstanceOf(GraphQLNetworkError);
    expect((error as Error).message).toBe(
      '[kultus-api] TestOperation failed: HTTP 502'
    );
    expect((error as { cause: { statusCode: number } }).cause.statusCode).toBe(
      502
    );
    expect(hint).toEqual({
      level: 'error',
      tags: {
        'graphql.client': 'kultus-api',
        'graphql.operation': 'TestOperation',
        'graphql.status_code': '502',
      },
      fingerprint: ['graphql-network-error', 'kultus-api', '502'],
    });
  });

  it('reports a failed fetch without status code as a warning', () => {
    reportNetworkError('headless-cms', operation, failedFetch());

    expect(Sentry.captureException).toHaveBeenCalledTimes(1);
    const [error, hint] = vi.mocked(Sentry.captureException).mock.calls[0];
    expect((error as Error).message).toBe(
      '[headless-cms] TestOperation failed: TypeError: Failed to fetch'
    );
    expect(hint).toEqual({
      level: 'warning',
      tags: {
        'graphql.client': 'headless-cms',
        'graphql.operation': 'TestOperation',
        'graphql.status_code': 'none',
      },
      fingerprint: ['graphql-network-error', 'headless-cms', 'TypeError'],
    });
  });

  it('logs the network error details to the console', () => {
    reportNetworkError('kultus-api', operation, failedFetch());

    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalledWith(
      `[GraphQL networkError]: ${JSON.stringify({
        Client: 'kultus-api',
        Operation: 'TestOperation',
        Name: 'TypeError',
        Message: 'Failed to fetch',
      })}`
    );
  });

  it('does not report aborted requests', () => {
    const abortError = new Error('The operation was aborted');
    abortError.name = 'AbortError';

    reportNetworkError('kultus-api', operation, abortError);

    expect(Sentry.captureException).not.toHaveBeenCalled();
  });

  it('does not report network errors while the user is offline', () => {
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false);

    reportNetworkError('kultus-api', operation, failedFetch());

    expect(Sentry.captureException).not.toHaveBeenCalled();
  });

  it('does not report network errors after the page is hidden', () => {
    window.dispatchEvent(new Event('pagehide'));
    reportNetworkError('kultus-api', operation, failedFetch());
    expect(Sentry.captureException).not.toHaveBeenCalled();

    // Restored from the back/forward cache: errors are reported again.
    window.dispatchEvent(new Event('pageshow'));
    reportNetworkError('kultus-api', operation, failedFetch());
    expect(Sentry.captureException).toHaveBeenCalledTimes(1);
  });

  it('does not report network errors shortly after beforeunload', () => {
    const now = 1_000_000;
    const dateNowSpy = vi.spyOn(Date, 'now').mockReturnValue(now);

    window.dispatchEvent(new Event('beforeunload'));
    dateNowSpy.mockReturnValue(now + BEFORE_UNLOAD_GRACE_PERIOD_MS - 1);
    reportNetworkError('kultus-api', operation, failedFetch());
    expect(Sentry.captureException).not.toHaveBeenCalled();

    // The page did not leave (e.g. a cancelled navigation or a mailto link),
    // so errors are reported again after the grace period.
    dateNowSpy.mockReturnValue(now + BEFORE_UNLOAD_GRACE_PERIOD_MS);
    reportNetworkError('kultus-api', operation, failedFetch());
    expect(Sentry.captureException).toHaveBeenCalledTimes(1);
  });

  it('reports HTTP errors even while the user is offline', () => {
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false);

    reportNetworkError('kultus-api', operation, createServerError(502));

    expect(Sentry.captureException).toHaveBeenCalledTimes(1);
  });

  it('reports HTTP errors even while the page is unloading', () => {
    window.dispatchEvent(new Event('beforeunload'));
    window.dispatchEvent(new Event('pagehide'));

    reportNetworkError('kultus-api', operation, createServerError(502));

    expect(Sentry.captureException).toHaveBeenCalledTimes(1);
  });
});

describe('getGraphQLSentryTags', () => {
  it('uses "unknown" when the operation has no name', () => {
    expect(
      getGraphQLSentryTags('kultus-api', { operationName: '' } as Operation)
    ).toEqual({
      'graphql.client': 'kultus-api',
      'graphql.operation': 'unknown',
    });
  });
});
