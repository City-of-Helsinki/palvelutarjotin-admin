import { storiesOf } from '@storybook/react';
import path from 'path';
import * as React from 'react';

const Wrapper = ({ children, size }) => (
  <div
    style={{
      margin: '10px',
      width: size,
      height: size,
      display: 'inline-block',
      verticalAlign: 'middle',
    }}
  >
    {children}
  </div>
);

const stories = storiesOf('Icons', module);

const makeSvgStyleRules = (color: string) => ({
  fill: color,
  padding: '10px',
});

const req = require.context('.', false, /^.\/Icon.*.tsx$/);

req.keys().forEach((fileName, index) => {
  const Component = req(fileName).default;
  const componentName = path.basename(fileName, '.tsx');
  Component.displayName = componentName;

  if (index === 0) {
    stories.addParameters({
      component: Component,
      docs: {
        disable: true,
      },
    });
  }

  stories.add(componentName, () => (
    <>
      <div style={makeSvgStyleRules('#111')}>
        <Wrapper size="200px">
          <Component />
        </Wrapper>
        <Wrapper size="100px">
          <Component />
        </Wrapper>
        <Wrapper size="50px">
          <Component />
        </Wrapper>
        <Wrapper size="25px">
          <Component />
        </Wrapper>
      </div>
      <div style={{ background: '#111', ...makeSvgStyleRules('#fff') }}>
        <Wrapper size="200px">
          <Component />
        </Wrapper>
        <Wrapper size="100px">
          <Component />
        </Wrapper>
        <Wrapper size="50px">
          <Component />
        </Wrapper>
        <Wrapper size="25px">
          <Component />
        </Wrapper>
      </div>
    </>
  ));
});
