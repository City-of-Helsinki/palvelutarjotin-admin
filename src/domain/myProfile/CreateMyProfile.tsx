import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useCreateMyProfileMutation } from '../../generated/graphql';
import scrollToTop from '../../utils/scrollToTop';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import styles from './myProfile.module.scss';
import MyProfileForm, {
  MyProfileFormFields,
} from './myProfileForm/MyProfileForm';
import { getMyProfilePayload } from './utils';

interface Props {
  refetch: () => void;
}

const CreateMyProfile: React.FC<Props> = ({ refetch }) => {
  const { t } = useTranslation();
  const [createMyProfile] = useCreateMyProfileMutation();

  const submit = async (values: MyProfileFormFields) => {
    try {
      await createMyProfile({
        variables: {
          myProfile: getMyProfilePayload(values),
        },
      });
      await refetch();
      scrollToTop();
    } catch (e) {
      toast(t('createMyProfile.error'), {
        type: toast.TYPE.ERROR,
      });
    }
  };

  return (
    <PageWrapper className={styles.myProfile} title="createMyProfile.pageTitle">
      <Container size="xsmall">
        <div>
          <h1>{t('createMyProfile.title')}</h1>
          <p>{t('createMyProfile.infoText1')}</p>
          <p>{t('createMyProfile.infoText2')}</p>

          <MyProfileForm
            buttonText={t('createMyProfile.buttonSubmit')}
            onSubmit={submit}
            showCheckboxes={true}
          />
        </div>
      </Container>
    </PageWrapper>
  );
};

export default CreateMyProfile;
