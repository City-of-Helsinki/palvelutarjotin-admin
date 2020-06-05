import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

import {
  useCreateEventMutation,
  useUpdateSingleImageMutation,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import { clearApolloCache } from '../app/apollo/utils';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import { getImageName } from '../image/utils';
import EventForm, { EventFormFields } from './eventForm/EventForm';
import styles from './eventPage.module.scss';
import { createOrUpdateVenue, getEventPayload } from './utils';

const CreateEventPage: React.FC = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();
  const [selectedLanguage, setSelectedLanguage] = React.useState(locale);

  const [createEvent] = useCreateEventMutation();
  const [updateImage] = useUpdateSingleImageMutation();

  const submit = async (values: EventFormFields) => {
    try {
      const requests = [];

      requests.push(
        createOrUpdateVenue({
          formValues: values,
          selectedLanguage,
        })
      );

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

      // TODO: After apollo-client 3.0 release check is there a better way to force
      // eventlist reload
      // https://github.com/apollographql/apollo-client/blob/v3.0.0-rc.0/CHANGELOG.md
      // Clear apollo cache to force eventlist reload
      await clearApolloCache();
      history.push({
        pathname: `/${locale}${ROUTES.EVENT_DETAILS.replace(':id', id)}`,
        search: `?language=${selectedLanguage}`,
      });
    } catch (e) {
      // TODO: Improve error handling when API returns more informative errors
      toast(t('createEvent.error'), {
        type: toast.TYPE.ERROR,
      });
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
