import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import * as React from 'react';

import LoadingSpinner from '../LoadingSpinner';

it('LoadingSpinner matches snapshot', () => {
  const { container } = render(<LoadingSpinner isLoading={true} />);
  expect(container).toMatchSnapshot();
});

it('render spinner if isLoading is true', () => {
  const spinner = shallow(<LoadingSpinner isLoading={true} />).children();
  expect(spinner.prop('className')).toContain('spinner');
});

it('render child component if isLoading is false', () => {
  const spinner = shallow(
    <LoadingSpinner isLoading={false}>
      <div className="component"></div>
    </LoadingSpinner>
  ).children();
  expect(spinner.prop('className')).toEqual('component');
});
