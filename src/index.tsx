import './setWindowGlobal';
import './styles/main.scss';
import './domain/app/i18n/i18nInit';

import * as Sentry from '@sentry/browser';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';

import App from './domain/app/App';
import * as serviceWorker from './serviceWorker';

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: import.meta.env.VITE_APP_SENTRY_DSN,
    environment: import.meta.env.VITE_APP_ENVIRONMENT,
    release: `${import.meta.env.VITE_APP_APPLICATION_NAME}@${import.meta.env.VITE_APP_VERSION
      }`,
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
