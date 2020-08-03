import React from 'react';
import { useParams } from 'react-router';

import { useEnrolmentQuery } from '../../generated/graphql';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';

const EnrolmentDetailsPage: React.FC = () => {
  const { id: enrolmentId } = useParams<{ id: string }>();
  const { data: enrolmentData } = useEnrolmentQuery({
    variables: { id: enrolmentId },
  });
  const enrolment = enrolmentData?.enrolment;

  // TODO: Add layout/styling when design is available!!!
  return (
    <PageWrapper>
      <Container>
        <h1>Enrolment details</h1>
        {enrolment && <pre>{JSON.stringify(enrolment, null, 4)}</pre>}
      </Container>
    </PageWrapper>
  );
};

export default EnrolmentDetailsPage;
