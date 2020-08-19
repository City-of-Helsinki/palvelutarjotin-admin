import { MockedProvider } from '@apollo/react-testing';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';
import Router from 'react-router';

import EventForm from '../EventForm';

beforeEach(() => {
  jest.spyOn(Router, 'useHistory').mockReturnValue({});
});

test('test for accessibility violations', async () => {
  const { container } = render(
    <MockedProvider>
      <EventForm
        title="Testilomake"
        persons={[]}
        onCancel={jest.fn()}
        selectedLanguage="fi"
        onSubmit={jest.fn()}
        setSelectedLanguage={jest.fn()}
      />
    </MockedProvider>
  );

  const result = await axe(container);
  expect(result).toHaveNoViolations();
});
