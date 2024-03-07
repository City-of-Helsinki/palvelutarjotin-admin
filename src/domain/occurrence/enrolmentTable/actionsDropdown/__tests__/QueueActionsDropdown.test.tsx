import * as React from 'react';
import Modal from 'react-modal';

import { tableDropdownTestId } from '../../../../../common/components/tableDropdown/TableDropdown';
import {
  EventQueueEnrolmentsDocument,
  PickEnrolmentFromQueueDocument,
  UnenrolEventQueueDocument,
} from '../../../../../generated/graphql';
import {
  fakeEventQueueEnrolment,
  fakePerson,
  fakePEvent,
  fakeStudyGroup,
} from '../../../../../utils/mockDataUtils';
import {
  render,
  screen,
  userEvent,
  waitFor,
} from '../../../../../utils/testUtils';
import QueueActionsDropdown, { Props } from '../QueueActionsDropdown';

const pEventId = 'testEventId123';
const linkedEventId = 'linkedEventId123';
const queuedEnrolmentId = 'eventQueueEnrolmentId123';
const occurrenceId = 'occurrenceId123';
const person = fakePerson({ name: 'Test Guy' });

const mockPEvent = fakePEvent({ id: pEventId, linkedEventId });
const mockQueueEnrolment = fakeEventQueueEnrolment({
  id: queuedEnrolmentId,
  pEvent: mockPEvent,
  studyGroup: fakeStudyGroup({ person }),
  person,
});

const mocks = [
  {
    request: {
      query: UnenrolEventQueueDocument,
      variables: {
        input: {
          pEventId,
          studyGroupId: mockQueueEnrolment.studyGroup.id,
        },
      },
    },
    result: {
      data: {
        unenrolEventQueue: {
          pEvent: {
            linkedEventId,
          },
          studyGroup: {
            unitName: mockQueueEnrolment.studyGroup.unitName,
          },
        },
      },
    },
  },
  {
    request: {
      query: PickEnrolmentFromQueueDocument,
      variables: {
        input: {
          eventQueueEnrolmentId: mockQueueEnrolment.id,
          occurrenceId,
        },
      },
    },
    result: {
      data: {
        pickEnrolmentFromQueue: {
          enrolment: {
            id: 'enrolmentId',
            studyGroup: {
              ...mockQueueEnrolment.studyGroup,
            },
            occurrence: {
              pEvent: {
                linkedEventId,
              },
            },
          },
        },
      },
    },
  },
  {
    request: {
      query: EventQueueEnrolmentsDocument,
      variables: {
        pEventId,
        orderBy: 'enrolment_time',
      },
    },
    result: {
      data: {
        eventQueueEnrolments: {
          count: 1,
          edges: [{ node: mockQueueEnrolment }],
        },
      },
    },
    newData: vi.fn(() => ({
      data: {
        eventQueueEnrolments: {
          count: 0,
          edges: [],
        },
      },
    })),
  },
];

const renderComponent = (props?: Partial<Props>) => {
  return render(
    <QueueActionsDropdown
      occurrenceId={occurrenceId}
      eventId={linkedEventId}
      row={mockQueueEnrolment}
      onEnrolmentsModified={vi.fn()}
      {...props}
    />,
    { mocks }
  );
};

it('open menu correctly', async () => {
  renderComponent();

  expect(screen.getByRole('menu')).not.toHaveClass('isOpen');

  await userEvent.click(screen.getByRole('button', { name: 'Valitse' }));

  expect(screen.getByTestId(tableDropdownTestId)).toHaveClass('isMenuOpen');
});

it('add to the enrolments list works from dropdown', async () => {
  const { container } = renderComponent();

  Modal.setAppElement(container);

  await userEvent.click(screen.getByRole('button', { name: 'Valitse' }));

  await userEvent.click(
    screen.getByRole('menuitem', { name: 'Lisää ilmoittautumislistalle' })
  );

  expect(screen.getByText(/valitut osallistujat:/i)).toBeInTheDocument();
  expect(screen.getByText(person.name)).toBeInTheDocument();

  await userEvent.click(
    screen.getByRole('button', { name: 'Lisää ilmoittautumislistalle' })
  );

  await waitFor(() => {
    expect(
      screen.queryByText(/valitut osallistujat:/i)
    ).not.toBeInTheDocument();
  });
});

it('removing queued enrolment works from dropdown', async () => {
  const { container } = renderComponent();

  Modal.setAppElement(container);

  await userEvent.click(screen.getByRole('button', { name: 'Valitse' }));

  await userEvent.click(
    screen.getByRole('menuitem', { name: 'Poista jonosta' })
  );

  expect(screen.getByText(/valitut osallistujat:/i)).toBeInTheDocument();
  expect(screen.getByText(person.name)).toBeInTheDocument();

  await userEvent.click(
    screen.getByRole('button', { name: 'Poista ilmoittautuminen' })
  );

  await waitFor(() => {
    expect(
      screen.queryByText(/valitut osallistujat:/i)
    ).not.toBeInTheDocument();
  });
});
