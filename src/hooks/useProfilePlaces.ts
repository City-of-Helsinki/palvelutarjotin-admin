import { useApolloClient } from '@apollo/client';
import React from 'react';

import {
  PlaceDocument,
  PlaceFieldsFragment,
  PlaceQuery,
  PlaceQueryVariables,
  useMyProfileQuery,
} from '../generated/graphql';
import useIsMounted from './useIsMounted';

const useProfilePlaces = () => {
  const [places, setPlaces] = React.useState<PlaceFieldsFragment[] | null>(
    null
  );
  const isMounted = useIsMounted();
  const [loadingPlaces, setLoadingPlaces] = React.useState<boolean>(true);
  const { data: profileData, loading: loadingMyProfile } = useMyProfileQuery();
  const apolloClient = useApolloClient();
  const profile = profileData?.myProfile;

  React.useEffect(() => {
    let cancel = false;

    const fetchPlaces = async () => {
      const placeIds = profile?.placeIds;
      if (placeIds) {
        setLoadingPlaces(true);
        try {
          const placeResponses = await Promise.all(
            placeIds.map((placeId) => {
              return apolloClient.query<PlaceQuery, PlaceQueryVariables>({
                query: PlaceDocument,
                variables: {
                  id: placeId,
                },
              });
            })
          );
          const places = placeResponses
            .map((placeResponse) => placeResponse.data.place!)
            .filter((p) => p);

          if (!cancel && isMounted.current) {
            setPlaces(places);
            setLoadingPlaces(false);
          }
        } catch (error) {
          setLoadingPlaces(false);
          // eslint-disable-next-line no-console
          console.error('Failed to fetch places', { error });
        }
      }
    };

    if (profile) {
      fetchPlaces();
    }

    return () => {
      setLoadingPlaces(false);
      cancel = true;
    };
  }, [profile, apolloClient, isMounted]);

  return { places, loading: loadingPlaces || loadingMyProfile };
};

export default useProfilePlaces;
