import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { PUBLICATION_STATUS } from '../../../events/constants';
import EventCard from '../EventCard';

const defaultEventCardProps = {
  id: 'id',
  name: 'TestiTapahtuma',
  enrolmentsCount: 2,
  occurrencesCount: 8,
  publicationStatus: PUBLICATION_STATUS.PUBLIC,
  image: 'test.url',
};

it('matches snapshot', () => {
  const { container } = render(<EventCard {...defaultEventCardProps} />);

  expect(container).toMatchSnapshot();
});

it('is accessible', async () => {
  const { container } = render(<EventCard {...defaultEventCardProps} />);

  const result = await axe(container);
  expect(result).toHaveNoViolations();
});

it('displays correct texts and handles click', () => {
  const { rerender } = render(<EventCard {...defaultEventCardProps} />);

  expect(screen.queryByRole('button')).toBeInTheDocument();
  expect(screen.queryByText(/^8 tapahtuma-aikaa$/i)).toBeInTheDocument();
  expect(screen.queryByText(/^2 ilmoittautunutta$/i));
  expect(screen.queryByText(/^julkaistu$/i));

  rerender(
    <EventCard
      {...defaultEventCardProps}
      publicationStatus={PUBLICATION_STATUS.DRAFT}
    />
  );

  expect(screen.queryByText(/^julkaistu$/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/^ei julkaistu$/i)).toBeInTheDocument();

  const image = screen.getByTestId(`event-image-${defaultEventCardProps.id}`);
  expect(image).toHaveStyle(
    `background-image: url(${defaultEventCardProps.image});`
  );
});
