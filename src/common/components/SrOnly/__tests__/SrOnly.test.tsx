import { screen } from '@testing-library/react';
import * as React from 'react';

import { customRender } from '../../../../utils/testUtils';
import SrOnly from '../SrOnly';

test('matches snapshot 1', () => {
  const { container } = customRender(<SrOnly as="h1">Test</SrOnly>);

  const srElement = screen.getByText('Test');
  expect(srElement.tagName).toBe('H1');

  expect(container).toMatchSnapshot();
});

test('matches snapshot 2', () => {
  const { container } = customRender(<SrOnly as="h2">Test</SrOnly>);

  const srElement = screen.getByText('Test');
  expect(srElement.tagName).toBe('H2');

  expect(container).toMatchSnapshot();
});

test('matches snapshot 3', () => {
  const { container } = customRender(
    <SrOnly className="testClass" as="span">
      Test
    </SrOnly>
  );

  const srElement = screen.getByText('Test');
  expect(srElement.tagName).toBe('SPAN');

  expect(srElement).toHaveClass('srOnly');
  expect(srElement).toHaveClass('testClass');

  expect(container).toMatchSnapshot();
});
