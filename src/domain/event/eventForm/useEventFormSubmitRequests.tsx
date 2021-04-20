import { useUpdateSingleImageMutation } from '../../../generated/graphql';
import { getImageName } from '../../image/utils';
import { createOrUpdateVenue } from '../../venue/utils';
import { CreateEventFormFields, EventFormFields } from '../types';

const useCreateOrUpdateVenueRequest = () => {
  return (values: CreateEventFormFields | EventFormFields) => {
    const createOrUpdateVenueRequest = createOrUpdateVenue({
      venueFormData: values,
      locationId: values.location,
    });

    return createOrUpdateVenueRequest;
  };
};

const useUpdateImageRequest = () => {
  const [updateImage] = useUpdateSingleImageMutation();

  return (values: CreateEventFormFields | EventFormFields) => {
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

export { useCreateOrUpdateVenueRequest, useUpdateImageRequest };
