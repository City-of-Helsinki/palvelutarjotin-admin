import { format } from 'date-fns';
import parseDate from 'date-fns/parse';
import { axe } from 'jest-axe';
import { advanceTo, clear } from 'jest-date-mock';
import * as React from 'react';
import wait from 'waait';

import {
  DATE_FORMAT,
  DATETIME_FORMAT,
} from '../../../../common/components/datepicker/contants';
import { actWait, render } from '../../../../utils/testUtils';
import EventForm, { createEventInitialValues } from '../EventForm';

afterAll(() => {
  clear();
});

const renderForm = () =>
  render(
    <EventForm
      title="Testilomake"
      persons={[]}
      initialValues={createEventInitialValues}
      onCancel={jest.fn()}
      onSubmit={jest.fn()}
    />
  );

it('test for accessibility violations', async () => {
  const { container } = renderForm();

  // Formik seems to be updating for a long time so lets wait for one sec
  await actWait(1000);
  expect(await axe(container)).toHaveNoViolations();
});
