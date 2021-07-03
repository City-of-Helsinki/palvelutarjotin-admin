import { ApolloClient } from '@apollo/client';

import { useUpdateSingleImageMutation } from '../../../generated/graphql';
import { getImageName } from '../../image/utils';
import { VenueDataFields } from '../../venue/types';
import { createOrUpdateVenue } from '../../venue/utils';
import { CreateEventFormFields } from '../types';

const useCreateOrUpdateVenueRequest = (apolloClient: ApolloClient<object>) => {
  return ({
    venueFormData,
    locationId,
  }: {
    venueFormData: VenueDataFields;
    locationId: string;
  }) => {
    return createOrUpdateVenue({
      venueFormData,
      locationId,
      apolloClient,
    });
  };
};

const useUpdateImageRequest = () => {
  const [updateImage] = useUpdateSingleImageMutation();

  return (values: CreateEventFormFields) => {
    const imageId = values.image;
    if (imageId) {
      const imageName = getImageName(imageId);
      if (imageName) {
        // Request to update image data
        return updateImage({
          variables: {
            image: {
              altText: values.imageAltText,
              id: values.image,
              name: imageName,
              photographerName: values.imagePhotographerName,
            },
          },
        });
      }
    }
  };
};

export { useUpdateImageRequest, useCreateOrUpdateVenueRequest };
