import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { I18nextProvider } from 'react-i18next';

import '../src/styles/main.scss';
import 'hds-core/lib/base.css';
import i18n from '../src/domain/app/i18n/i18nInit';

addDecorator(withA11y);
addDecorator(story => <I18nextProvider i18n={i18n}>{story()}</I18nextProvider>);

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.(ts|js|md)x$/), module);
