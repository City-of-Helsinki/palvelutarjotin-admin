import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import apolloClient from '../../domain/app/apollo/apolloClient';
import {
  useCreateEventMutation,
  useCreateVenueMutation,
  useEditVenueMutation,
  useUpdateSingleImageMutation,
  VenueDocument,
  VenueQuery,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import { getImageName } from '../image/utils';
import EventForm, { EventFormFields } from './eventForm/EventForm';
import styles from './eventPage.module.scss';
import {
  getEventPayload,
  getExistingVenuePayload,
  getNewVenuePayload,
} from './utils';

const CreateEventPage: React.FC = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();
  const [selectedLanguage, setSelectedLanguage] = React.useState(locale);

  const [createEvent] = useCreateEventMutation();
  const [updateImage] = useUpdateSingleImageMutation();
  const [updateVenue] = useEditVenueMutation();
  const [createVenue] = useCreateVenueMutation();

  const submit = async (values: EventFormFields) => {
    try {
      const requests = [];

      const venueData = apolloClient.readQuery<VenueQuery>({
        query: VenueDocument,
        variables: { id: values.location },
      });

      const venueShouldBeUpdated = Boolean(
        venueData?.venue && values.locationDescription
      );
      const newVenueShouldBeCreated = Boolean(
        !venueData?.venue && values.locationDescription
      );

      if (venueShouldBeUpdated) {
        requests.push(
          updateVenue({
            variables: getExistingVenuePayload({
              formValues: values,
              selectedLanguage,
              venueData: venueData as VenueQuery,
            }),
          })
        );
      } else if (newVenueShouldBeCreated) {
        requests.push(
          createVenue({
            variables: getNewVenuePayload({
              selectedLanguage,
              formValues: values,
            }),
          })
        );
      }

      // Request to create new event
      requests.push(
        createEvent({
          variables: {
            event: getEventPayload(values, selectedLanguage),
          },
        })
      );

      const imageId = values.image;
      if (imageId) {
        const imageName = getImageName(imageId);
        if (imageName) {
          // Request to update image data
          requests.push(
            updateImage({
              variables: {
                image: {
                  altText: values.imageAltText,
                  id: values.image,
                  name: imageName,
                  photographerName: values.imagePhotographerName,
                },
              },
            })
          );
        }
      }

      // Run all requests parallel
      const responses: any[] = await Promise.all(requests);

      // TODO: come up with a better way to handle this
      // Find the request that made the eventMutation and get the id
      const id =
        responses.find((r) => r.data.addEventMutation).data.addEventMutation
          .response.body.id || '';

      history.push({
        pathname: `/${locale}${ROUTES.EVENT_DETAILS.replace(':id', id)}`,
        search: `?language=${selectedLanguage}`,
      });
    } catch (e) {
      console.log(e);
      // Check apolloClient to see error handling
    }
  };
  return (
    <PageWrapper title="createEvent.pageTitle">
      <Container>
        <div className={styles.eventPage}>
          <EventForm
            onSubmit={submit}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            title={t('createEvent.title')}
          />
        </div>
      </Container>
    </PageWrapper>
  );
};

export default CreateEventPage;
