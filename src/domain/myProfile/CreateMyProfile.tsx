import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useCreateMyProfileMutation } from '../../generated/graphql';
import HeroBackground from '../app/heroBackground/HeroBackground';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import styles from './myProfile.module.scss';
import MyProfileForm, {
  MyProfileCreateFormFields,
} from './myProfileForm/MyProfileForm';
import { getMyProfileCreatePayload } from './utils';

interface Props {
  refetch: () => void;
}

const CreateMyProfile: React.FC<Props> = ({ refetch }) => {
  const { t } = useTranslation();
  const [createMyProfile] = useCreateMyProfileMutation();

  const submit = async (values: MyProfileCreateFormFields) => {
    try {
      await createMyProfile({
        variables: {
          myProfile: getMyProfileCreatePayload(values),
        },
      });
      refetch();
    } catch (error) {
      toast.error(t('createMyProfile.error'));
      // eslint-disable-next-line no-console
      console.error('Failed to create my profile', { error });
    }
  };

  return (
    <PageWrapper className={styles.myProfile} title="createMyProfile.pageTitle">
      <HeroBackground height={400} />
      <Container size="xsmall" className={styles.content}>
        <div>
          <h1>{t('createMyProfile.title')}</h1>
          <div className={styles.formContainer}>
            <p>{t('createMyProfile.infoText1')}</p>
            <p>{t('createMyProfile.infoText2')}</p>
            <MyProfileForm
              buttonText={t('createMyProfile.buttonSubmit')}
              onSubmit={submit}
              showCheckboxes={true}
              type="create"
            />
          </div>
        </div>
      </Container>
    </PageWrapper>
  );
};

export default CreateMyProfile;
