import { Notification } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import {
  useMyProfileQuery,
  useUpdateMyProfileMutation,
} from '../../generated/graphql';
import scrollToTop from '../../utils/scrollToTop';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import ErrorPage from '../errorPage/ErrorPage';
import styles from './myProfile.module.scss';
import MyProfileForm, {
  MyProfileFormFields,
} from './myProfileForm/MyProfileForm';
import { getMyProfilePayload } from './utils';

const MyProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { data: myProfileData, loading } = useMyProfileQuery();
  const [updateMyProfile] = useUpdateMyProfileMutation();
  const [isSaved, setIsSaved] = React.useState(false);

  const initialValues = React.useMemo(
    () =>
      myProfileData?.myProfile
        ? {
            emailAddress: myProfileData.myProfile.emailAddress,
            isPrivacyPolicyAccepted: true,
            isTermsOfServiceRead: true,
            name: myProfileData.myProfile.name,
            organisations:
              myProfileData.myProfile.organisations.edges.map(
                (edge) => edge?.node?.id || ''
              ) || [],
            phoneNumber: myProfileData.myProfile.phoneNumber,
          }
        : undefined,
    [myProfileData]
  );

  const submit = async (values: MyProfileFormFields) => {
    try {
      await updateMyProfile({
        variables: {
          myProfile: getMyProfilePayload(values),
        },
      });
      scrollToTop();
      setIsSaved(true);
    } catch (e) {
      toast(t('editMyProfile.error'), {
        type: toast.TYPE.ERROR,
      });
      setIsSaved(false);
    }
  };

  return (
    <PageWrapper className={styles.myProfile} title="editMyProfile.pageTitle">
      <LoadingSpinner isLoading={loading}>
        {myProfileData?.myProfile ? (
          <Container isNarrow={true}>
            {isSaved && (
              <Notification
                labelText={t('editMyProfile.success')}
                type="success"
              />
            )}

            <div>
              <h1>{t('editMyProfile.title')}</h1>

              <MyProfileForm
                buttonText={t('editMyProfile.buttonSubmit')}
                initialValues={initialValues}
                onSubmit={submit}
                showCheckboxes={false}
              />
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
