import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { PUBLICATION_STATUS } from '../../../events/constants';
import { EnrolmentType } from '../../../occurrence/constants';
import EventCard from '../EventCard';

const defaultEventCardProps = {
  id: 'id',
  name: 'TestiTapahtuma',
  enrolmentsCount: 2,
  occurrencesCount: 8,
  publicationStatus: PUBLICATION_STATUS.PUBLIC,
  image: 'test.url',
  enrolmentType: EnrolmentType.Internal,
};

it('matches snapshot', () => {
  const { container } = render(<EventCard {...defaultEventCardProps} />);

  expect(container).toMatchSnapshot();
});

// it('is accessible', async () => {
//   const { container } = render(<EventCard {...defaultEventCardProps} />);

//   const result = await axe(container);
//   expect(result).toHaveNoViolations();
// });

it('displays correct texts and handles click', () => {
  const { rerender } = render(<EventCard {...defaultEventCardProps} />);

  expect(screen.getByRole('button')).toBeInTheDocument();
  expect(screen.getByText(/^8 tapahtuma-aikaa$/i)).toBeInTheDocument();
  expect(screen.getByText(/^2 ilmoittautunutta$/i)).toBeInTheDocument();
  expect(screen.getByText(/^julkaistu$/i)).toBeInTheDocument();

  rerender(
    <EventCard
      {...defaultEventCardProps}
      publicationStatus={PUBLICATION_STATUS.DRAFT}
    />
  );

  expect(screen.queryByText(/^julkaistu$/i)).not.toBeInTheDocument();
  expect(screen.getByText(/^ei julkaistu$/i)).toBeInTheDocument();

  const image = screen.getByTestId(`event-image-${defaultEventCardProps.id}`);
  expect(image).toHaveStyle(
    `background-image: url(${defaultEventCardProps.image});`
  );
});

it('displays event with external enrolment correctly', () => {
  render(
    <EventCard
      {...defaultEventCardProps}
      enrolmentType={EnrolmentType.External}
    />
  );
  expect(screen.queryByText(/^2 ilmoittautunutta$/i)).not.toBeInTheDocument();
  expect(
    screen.getByText(/ilmoittautuminen muulla sivustolla/i)
  ).toBeInTheDocument();
});

it('displays unenrollable event correctly', () => {
  render(
    <EventCard
      {...defaultEventCardProps}
      enrolmentType={EnrolmentType.Unenrollable}
    />
  );
  expect(screen.queryByText(/^2 ilmoittautunutta$/i)).not.toBeInTheDocument();
  expect(screen.getByText(/ei ilmoittautumista/i)).toBeInTheDocument();
});
