import { render, screen } from '@testing-library/react';
import * as React from 'react';

import AdditionalInfo from '../AdditionalInfo';

const createEnrolment = (overrides: Record<string, unknown> = {}) => {
  const base = {
    studyGroup: {
      extraNeeds: null,
      preferredTimes: null,
      person: {
        phoneNumber: null,
        emailAddress: null,
        language: null,
      },
    },
    person: {
      phoneNumber: null,
      emailAddress: null,
      language: null,
    },
  };

  return {
    ...base,
    ...overrides,
  } as any;
};

const renderAdditionalInfo = (overrides: Record<string, unknown> = {}) =>
  render(<AdditionalInfo enrolment={createEnrolment(overrides)} />);

describe('AdditionalInfo', () => {
  it('renders translated language message in lowercase', () => {
    renderAdditionalInfo({
      person: {
        language: 'fi',
      },
    });

    expect(screen.getByText('Viestit: suomi')).toBeInTheDocument();
  });

  it('renders study group and person contact info rows', () => {
    renderAdditionalInfo({
      studyGroup: {
        person: {
          phoneNumber: 'group-phone',
          emailAddress: 'group-email',
        },
      },
      person: {
        phoneNumber: 'person-phone',
        emailAddress: 'person-email',
      },
    });

    expect(screen.getByText('group-phone')).toBeInTheDocument();
    expect(screen.getByText('group-email')).toBeInTheDocument();
    expect(screen.getByText('person-phone')).toBeInTheDocument();
    expect(screen.getByText('person-email')).toBeInTheDocument();
  });

  it('renders extra needs and preferred times when present', () => {
    renderAdditionalInfo({
      studyGroup: {
        extraNeeds: 'Wheelchair access needed',
        preferredTimes: 'Mon 10:00–11:00',
      },
    });

    expect(screen.getByText('Wheelchair access needed')).toBeInTheDocument();
    expect(screen.getByText('Mon 10:00–11:00')).toBeInTheDocument();
  });

  it('does not render optional sections when fields are empty', () => {
    renderAdditionalInfo();

    expect(screen.queryByText(/Viestit:/)).not.toBeInTheDocument();
    expect(
      screen.queryByText('Wheelchair access needed')
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Mon 10:00–11:00')).not.toBeInTheDocument();
  });
});
