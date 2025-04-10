import React from 'react';

import OrganisationContext from './OrganisationContext';

export default function useOrganisationContext() {
  const context = React.useContext(OrganisationContext);
  if (!context) {
    throw new Error(
      `OrganisationContext components cannot be rendered outside the OrganisationProvider.`
    );
  }
  return context;
}
