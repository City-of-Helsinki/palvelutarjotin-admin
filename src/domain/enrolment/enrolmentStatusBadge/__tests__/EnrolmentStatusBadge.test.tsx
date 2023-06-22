import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { EnrolmentStatus } from '../../../../generated/graphql';
import messages from '../../../app/i18n/fi.json';
import EnrolmentStatusBadge from '../EnrolmentStatusBadge';

it('matches snapshot', () => {
  const { container } = render(
    <EnrolmentStatusBadge status={EnrolmentStatus.Approved} />
  );

  expect(container).toMatchSnapshot();
});

it('show correct status text', () => {
  const { rerender } = render(
    <EnrolmentStatusBadge status={EnrolmentStatus.Approved} />
  );

  expect(
    screen.getByText(messages.enrolment.status.approved)
  ).toBeInTheDocument();

  rerender(<EnrolmentStatusBadge status={EnrolmentStatus.Cancelled} />);

  expect(
    screen.getByText(messages.enrolment.status.cancelled)
  ).toBeInTheDocument();

  rerender(<EnrolmentStatusBadge status={EnrolmentStatus.Declined} />);

  expect(
    screen.getByText(messages.enrolment.status.declined)
  ).toBeInTheDocument();

  rerender(<EnrolmentStatusBadge status={EnrolmentStatus.Pending} />);

  expect(
    screen.getByText(messages.enrolment.status.pending)
  ).toBeInTheDocument();
});
