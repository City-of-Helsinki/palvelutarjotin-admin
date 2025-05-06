import { useOidcClient } from 'hds-react';
import React from 'react';
import { useNavigate } from 'react-router';

import { OrganisationContextType } from './OrganisationContext';
import OrganisationStoragePersistor from './OrganisationStoragePersistor';
import { useMyProfileQuery } from '../../../generated/graphql';
import { getSelectedOrganisation } from '../../myProfile/utils';

/**
 * Fetches the user's profile data, specifically their organisations, when the user is authenticated.
 *
 * @returns The result of the `useMyProfileQuery` hook.
 */
function useProfileOrganisationsQuery() {
  const { isAuthenticated } = useOidcClient();
  const isNotLoggedIn = !isAuthenticated();
  return useMyProfileQuery({ skip: isNotLoggedIn });
}

/**
 * Manages the currently active organisation for the user, persisting it to local storage.
 * It attempts to load the last active organisation from local storage and updates it
 * based on the user's profile data.
 *
 * @returns An object containing the `activeOrganisation` state and the `setActiveOrganisation` setter.
 */
export function useStoredOrganisationState() {
  const [activeOrganisation, setActiveOrganisation] =
    React.useState<OrganisationContextType['activeOrganisation']>(null);

  const { data: myProfileData } = useProfileOrganisationsQuery();
  const navigate = useNavigate();
  React.useEffect(() => {
    // Load persisted organisation on initial mount if no active organisation is set
    if (!activeOrganisation) {
      const persistedOrganisationId = OrganisationStoragePersistor.load();
      const myProfile = myProfileData?.myProfile;
      const hasOrganisations = Boolean(myProfile?.organisations?.edges?.length);

      if (hasOrganisations && myProfile && persistedOrganisationId) {
        const organisation = getSelectedOrganisation(
          myProfile,
          persistedOrganisationId
        );
        if (organisation) {
          setActiveOrganisation(organisation);
          // eslint-disable-next-line no-console
          console.info('Persisted organisation set as active', {
            persistedOrganisationId,
            organisation,
          });
        } else {
          // eslint-disable-next-line no-console
          console.warn(
            "Persisted organisation ID not found in user's organisations",
            { persistedOrganisationId }
          );
          OrganisationStoragePersistor.clear(); // Clear invalid persisted ID
        }
      } else if (hasOrganisations && myProfile && !activeOrganisation) {
        const firstOrganisation = myProfile.organisations.edges[0]?.node;
        if (firstOrganisation) {
          setActiveOrganisation(firstOrganisation);
          // eslint-disable-next-line no-console
          console.info('First organisation set as active', firstOrganisation);
        }
      }
    }
  }, [activeOrganisation, myProfileData]);

  // Function to update and persist the active organisation
  const updateActiveOrganisation = React.useCallback(
    (organisation: OrganisationContextType['activeOrganisation']) => {
      setActiveOrganisation(organisation);
      if (organisation?.id) {
        OrganisationStoragePersistor.save(organisation.id);
        // eslint-disable-next-line no-console
        console.info(
          'Active organisation selected and persisted',
          {
            organisation,
          },
          "Now navigating to '/'."
        );
        // Navigate to root, so the user would be taken to fresh organisation context.
        // Without this navigation, user could be e.g. viewing an event from wrong organisation.
        navigate('/');
      } else {
        OrganisationStoragePersistor.clear();
        // eslint-disable-next-line no-console
        console.info('Active organisation cleared and persistence removed');
      }
    },
    [navigate]
  );

  return {
    activeOrganisation,
    setActiveOrganisation: updateActiveOrganisation, // Consistent naming
  };
}
