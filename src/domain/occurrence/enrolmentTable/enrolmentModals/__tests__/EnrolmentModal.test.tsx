import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { customRender } from '../../../../../utils/testUtils';
import EnrolmentModal from '../EnrolmentModal';

it('matches snapshot', () => {
  const { baseElement } = customRender(
    <EnrolmentModal
      title="Title"
      onClose={vi.fn()}
      appElement={document.body}
      submitButtonText={''}
      handleSubmit={function (): void {
        throw new Error('Function not implemented.');
      }}
    />
  );

  expect(baseElement).toMatchSnapshot();
});

it('renders correctly and calls onClose handler when close button is clicked', async () => {
  const onCloseHandler = vi.fn();
  customRender(
    <EnrolmentModal
      title="Title"
      onClose={onCloseHandler}
      appElement={document.body}
      submitButtonText={''}
      handleSubmit={function (): void {
        throw new Error('Function not implemented.');
      }}
    />
  );

  expect(screen.getByText(/Title/i)).toBeInTheDocument();

  const closeButton = screen.getByText(/sulje/i);
  await userEvent.click(closeButton);

  expect(onCloseHandler).toHaveBeenCalledTimes(1);
});
