import * as React from 'react';

import DeleteButton from './DeleteButton';

export default {
  title: 'DeleteButton',
  component: DeleteButton,
};

export const Default = () => (
  <DeleteButton
    onClick={() => {
      /* noOp */
    }}
  >
    Poista
  </DeleteButton>
);
