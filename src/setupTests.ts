import './test/testi18nInit';
import '@testing-library/jest-dom/extend-expect';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

React.useLayoutEffect = React.useEffect;

// Mock scrollTo function
window.scrollTo = jest.fn();

configure({ adapter: new Adapter() });
