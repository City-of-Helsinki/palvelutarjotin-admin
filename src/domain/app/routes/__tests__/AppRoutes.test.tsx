/* eslint-disable @typescript-eslint/no-explicit-any */
import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router';

import AppRoutes from '../AppRoutes';
import LocaleRoutes from '../LocaleRoutes';

const wrapperCreator = (route: string) =>
  mount(
    <MemoryRouter initialEntries={[route]}>
      <AppRoutes />
    </MemoryRouter>
  );

it('redirect user from root to /fi by default', () => {
  const wrapper = wrapperCreator('/');
  expect(wrapper.children().props().history.location.pathname).toBe('/fi');
});

it('user from root will be redirect to LocaleRoutes with guarantee fi locale', () => {
  const wrapper = wrapperCreator('/');
  const app: any = wrapper.find(LocaleRoutes);

  expect(app).toBeDefined();
  expect(app.props().match.params.locale).toEqual('fi');
});

it('user from supported locale will be redirect to LocaleRoutes with that locale', () => {
  const wrapper = wrapperCreator('/en/');
  const app: any = wrapper.find(LocaleRoutes);

  expect(app).toBeDefined();
  expect(app.props().match.params.locale).toEqual('en');
});

it('user from unsupported locale prefix will be redirect to route with support prefix', () => {
  const wrapper = wrapperCreator('/vi/');
  const app: any = wrapper.find(LocaleRoutes);

  expect(app.props().match.params.locale).toEqual('fi');
  expect(app.props().location.pathname).toContain('/fi/vi/');
});

it('user without locale prefix will be redirect to route with support prefix', () => {
  const wrapper = wrapperCreator('/foo-url');
  const app: any = wrapper.find(LocaleRoutes);

  expect(app.props().match.params.locale).toEqual('fi');
  expect(app.props().location.pathname).toContain('/fi/foo-url');
});

it('user with route with unsupport locale will be redirect to LocaleRoutes anyway, with supported locale', () => {
  const wrapper = wrapperCreator('/dk/foo');
  const app: any = wrapper.find(LocaleRoutes);

  expect(app.props().match.params.locale).toEqual('fi');
  expect(app.props().location.pathname).toContain('/fi/dk/foo');
});
