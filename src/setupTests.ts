import './test/testi18nInit';
import '@testing-library/jest-dom/extend-expect';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { toHaveNoViolations } from 'jest-axe';
import React from 'react';

expect.extend(toHaveNoViolations);

jest.setTimeout(50000);

React.useLayoutEffect = React.useEffect;

// Mock scrollTo function
window.scrollTo = jest.fn();

configure({ adapter: new Adapter() });
