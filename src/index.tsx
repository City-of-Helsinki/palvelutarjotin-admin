import './setWindowGlobal';
import './styles/main.scss';
import './domain/app/i18n/i18nInit';

import * as Sentry from '@sentry/browser';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';

import App from './domain/app/App';
import * as serviceWorker from './serviceWorker';

if (import.meta.env.VITE_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_APP_SENTRY_DSN,
    environment: import.meta.env.VITE_APP_SENTRY_ENVIRONMENT,
    release: import.meta.env.VITE_APP_SENTRY_RELEASE,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: parseFloat(
      import.meta.env.VITE_APP_SENTRY_TRACES_SAMPLE_RATE || '0'
    ),
    tracePropagationTargets: (
      import.meta.env.VITE_APP_SENTRY_TRACE_PROPAGATION_TARGETS || ''
    ).split(','),
    replaysSessionSampleRate: parseFloat(
      import.meta.env.VITE_APP_SENTRY_REPLAYS_SESSION_SAMPLE_RATE || '0'
    ),
    replaysOnErrorSampleRate: parseFloat(
      import.meta.env.VITE_APP_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE || '0'
    ),
  });
}

Modal.setAppElement('#root');

const container = document.getElementById('root') as Element;
const root = createRoot(container);
// HDS Login Component is too aggressive with the login time issues and the StrictMode gives unwanted issues.
root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
