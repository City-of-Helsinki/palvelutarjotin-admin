import './test/testi18nInit';
import '@testing-library/jest-dom/extend-expect';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { toHaveNoViolations } from 'jest-axe';
import * as React from 'react';

import { apolloCache } from './domain/app/apollo/apolloClient';

expect.extend(toHaveNoViolations);

jest.setTimeout(50000);

React.useLayoutEffect = React.useEffect;

// Mock scrollTo function
window.scrollTo = jest.fn();

afterEach(() => {
  apolloCache.reset();
});

configure({ adapter: new Adapter() });
