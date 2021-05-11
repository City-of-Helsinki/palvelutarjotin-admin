import { Notification } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { useMyProfileQuery } from '../../generated/graphql';
import Container from '../app/layout/Container';
import CreateMyProfile from './CreateMyProfile';

const MyProfileWrapper: React.FC = ({ children }) => {
  const { data, refetch } = useMyProfileQuery();
  const isNotStaff = data?.myProfile && !data.myProfile.isStaff;

  return data?.myProfile ? (
    <>
      {isNotStaff && <StaffRightsNotification />}
      {children}
    </>
  ) : (
    <CreateMyProfile refetch={refetch} />
  );
};

const formUrl =
  // eslint-disable-next-line max-len
  'https://forms.office.com/pages/responsepage.aspx?id=wWvrPyLXJkeWbFtYtk33Ur0bt-wUL5dOlM97YAn7aadUNUhZVjdXMlRZTlBQUUNLT01VWlpVR1o2NiQlQCN0PWcu';

const StaffRightsNotification: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Notification type="alert" label={t('common.notification')}>
        <span
          dangerouslySetInnerHTML={{
            __html: t('common.getStaffRightsInstructionsText', {
              url: formUrl,
              openInNewTab: t('common.openInNewTab'),
            }),
          }}
        ></span>
      </Notification>
    </Container>
  );
};

export default MyProfileWrapper;
