import React from 'react';

import OrganisationContext from './OrganisationContext';
import type { OrganisationContextType } from './OrganisationContext';
import { useStoredOrganisationState } from './useStoredOrganisationState';

export function OrganisationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { activeOrganisation, setActiveOrganisation } =
    useStoredOrganisationState();

  const context: OrganisationContextType = {
    activeOrganisation,
    setActiveOrganisation,
  };
  return (
    <OrganisationContext.Provider value={context}>
      {children}
    </OrganisationContext.Provider>
  );
}
