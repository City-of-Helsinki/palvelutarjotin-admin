import { Notification } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import styles from './myProfile.module.scss';
import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import {
  useMyProfileQuery,
  useUpdateMyProfileMutation,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import scrollToTop from '../../utils/scrollToTop';
import HeroBackground from '../app/heroBackground/HeroBackground';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import ErrorPage from '../errorPage/ErrorPage';
import MyProfileForm, {
  MyProfileEditFormFields,
} from './myProfileForm/MyProfileForm';
import { getMyProfileEditPayload } from './utils';

const MyProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { data: myProfileData, loading } = useMyProfileQuery();
  const [updateMyProfile] = useUpdateMyProfileMutation();
  const [isSaved, setIsSaved] = React.useState(false);

  const initialValues = React.useMemo(
    () =>
      myProfileData?.myProfile
        ? {
            name: myProfileData.myProfile.name,
            emailAddress: myProfileData.myProfile.emailAddress,
            phoneNumber: myProfileData.myProfile.phoneNumber,
            locations: myProfileData.myProfile.placeIds,
            language: myProfileData.myProfile.language ?? locale,
          }
        : undefined,
    [myProfileData, locale]
  );

  const submit = async (values: MyProfileEditFormFields) => {
    try {
      await updateMyProfile({
        variables: {
          myProfile: getMyProfileEditPayload(values),
        },
      });
      scrollToTop();
      setIsSaved(true);
    } catch (error) {
      toast.error(t('editMyProfile.error'));
      setIsSaved(false);
      // eslint-disable-next-line no-console
      console.error('Failed to update my profile', { error });
    }
  };

  return (
    <PageWrapper className={styles.myProfile} title="editMyProfile.pageTitle">
      <LoadingSpinner isLoading={loading}>
        <HeroBackground height={400} />
        {myProfileData?.myProfile ? (
          <Container size="xsmall" className={styles.content}>
            {isSaved && (
              <Notification label={t('editMyProfile.success')} type="success" />
            )}
            <div>
              <h1>{t('editMyProfile.title')}</h1>
              <div className={styles.formContainer}>
                <MyProfileForm
                  buttonText={t('editMyProfile.buttonSubmit')}
                  initialValues={initialValues}
                  onSubmit={submit}
                  showCheckboxes={false}
                  type="edit"
                />
              </div>
            </div>
          </Container>
        ) : (
          <ErrorPage />
        )}
      </LoadingSpinner>
    </PageWrapper>
  );
};

export default MyProfilePage;
