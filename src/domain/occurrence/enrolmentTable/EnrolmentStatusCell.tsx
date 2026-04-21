import * as React from 'react';

import EnrolmentStatusBadge from '../../enrolment/enrolmentStatusBadge/EnrolmentStatusBadge';

type Props = {
  status?: React.ComponentProps<typeof EnrolmentStatusBadge>['status'] | null;
};

const EnrolmentStatusCell: React.FC<Props> = ({ status }) => {
  return status ? <EnrolmentStatusBadge status={status} /> : null;
};

export default EnrolmentStatusCell;
