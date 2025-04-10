import React from 'react';

import OrganisationContext from './OrganisationContext';
import type { OrganisationContextType } from './OrganisationContext';
import { useStoredOrganisationState } from './useStoredOrganisationState';

export function OrganisationProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const { activeOrganisation, setActiveOrganisation } =
    useStoredOrganisationState();

  const context: OrganisationContextType = React.useMemo(
    () => ({
      activeOrganisation,
      setActiveOrganisation,
    }),
    [activeOrganisation, setActiveOrganisation]
  );

  return (
    <OrganisationContext.Provider value={context}>
      {children}
    </OrganisationContext.Provider>
  );
}
