import './test/testi18nInit';
import '@testing-library/jest-dom/extend-expect';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure } from 'enzyme';
import { toHaveNoViolations } from 'jest-axe';
import * as React from 'react';

expect.extend(toHaveNoViolations);

jest.setTimeout(50000);

React.useLayoutEffect = React.useEffect;

// Mock scrollTo function
window.scrollTo = jest.fn();

configure({ adapter: new Adapter() });
