import { axe } from 'jest-axe';
import React from 'react';
import wait from 'waait';

import { act, render } from '../../../../utils/testUtils';
import EventForm, { defaultInitialValues } from '../EventForm';

test('test for accessibility violations', async () => {
  const { container } = render(
    <EventForm
      title="Testilomake"
      persons={[]}
      initialValues={defaultInitialValues}
      onCancel={jest.fn()}
      selectedLanguage="fi"
      onSubmit={jest.fn()}
      setSelectedLanguage={jest.fn()}
    />
  );

  await act(wait);

  const result = await axe(container);
  expect(result).toHaveNoViolations();
});
