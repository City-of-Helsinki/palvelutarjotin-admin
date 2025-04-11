import React from 'react';

import { OrganisationNode } from '../../../generated/graphql';

export type OrganisationType = Omit<OrganisationNode, 'persons'> | null;

export type OrganisationContextType = {
  activeOrganisation: OrganisationType;
  setActiveOrganisation: (organisation: OrganisationType) => void;
};

const OrganisationContext = React.createContext<OrganisationContextType | null>(
  null
);

export default OrganisationContext;
