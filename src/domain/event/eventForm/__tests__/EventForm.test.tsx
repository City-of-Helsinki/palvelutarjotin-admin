import * as React from 'react';
import { axe } from 'vitest-axe';

import { actWait, customRender } from '../../../../utils/testUtils';
import EventForm, { createEventInitialValues } from '../EventForm';

afterAll(() => {
  vi.setSystemTime(vi.getRealSystemTime());
  vi.useRealTimers();
});

const renderForm = () =>
  customRender(
    <EventForm
      title="Testilomake"
      persons={[]}
      initialValues={createEventInitialValues}
      onCancel={vi.fn()}
      onSubmit={vi.fn()}
      eventMutationLoading={false}
    />
  );

it.skip('test for accessibility violations', async () => {
  const { container } = renderForm();

  // Formik seems to be updating for a long time so lets wait for one sec
  await actWait(1000);
  expect(await axe(container)).toHaveNoViolations();
});
