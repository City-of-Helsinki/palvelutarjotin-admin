import * as React from 'react';
import { useLocation } from 'react-router-dom';

import { useMyProfileQuery } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import CreateMyProfile from '../../myProfile/CreateMyProfile';
import RegistrationPendingPage from '../register/RegistrationPendingPage';
import { ROUTES } from '../routes/constants';

const ProtectedPageWrapper: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { data, refetch } = useMyProfileQuery();
  const { pathname } = useLocation();
  const locale = useLocale();

  const isNotStaff = data?.myProfile && !data.myProfile.isStaff;
  const hasNoOrganisations = !data?.myProfile?.organisations.edges.length;
  const hasProfile = !!data?.myProfile;
  const registrationPending = hasProfile && (isNotStaff || hasNoOrganisations);
  const isNotProfilePage = pathname !== `/${locale}${ROUTES.MY_PROFILE}`;
  const showRegistrationPendingPage = registrationPending && isNotProfilePage;

  return showRegistrationPendingPage ? (
    <RegistrationPendingPage />
  ) : !hasProfile ? (
    <CreateMyProfile refetch={refetch} />
  ) : (
    <>{children}</>
  );
};

// TODO: Delete if not needed in the future
// const formUrl =
//   // eslint-disable-next-line max-len
//   'https://forms.office.com/pages/responsepage.aspx?id=wWvrPyLXJkeWbFtYtk33Ur0bt-wUL5dOlM97YAn7aadUNUhZVjdXMlRZTlBQUUNLT01VWlpVR1o2NiQlQCN0PWcu';

// const StaffRightsNotification: React.FC = () => {
//   const { t } = useTranslation();

//   return (
//     <Container>
//       <Notification type="alert" label={t('common.notification')}>
//         <span
//           dangerouslySetInnerHTML={{
//             __html: t('common.getStaffRightsInstructionsText', {
//               url: formUrl,
//               openInNewTab: t('common.openInNewTab'),
//             }),
//           }}
//         ></span>
//       </Notification>
//     </Container>
//   );
// };

export default ProtectedPageWrapper;
